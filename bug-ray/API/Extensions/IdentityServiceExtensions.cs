using System;
using System.Text;
using System.Threading.Tasks;
using API.Services;
using Domain;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Persistance;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>()
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<AppUser>>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt =>
           {
               opt.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuerSigningKey = true,
                   IssuerSigningKey = key,
                   ValidateIssuer = false,
                   ValidateAudience = false,
                   //has default 5 mins
                   ValidateLifetime = true,
                   //Remove default 5 mins
                   ClockSkew = TimeSpan.Zero,
               };

               opt.Events = new JwtBearerEvents
               {
                   OnMessageReceived = context =>
                   {
                       var accessToken = context.Request.Query["access_token"];
                       var path = context.HttpContext.Request.Path;
                       if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/discuss")))
                       {
                           context.Token = accessToken;
                       }

                       return Task.CompletedTask;
                   }
               };
           });

            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsOwnerRequirement", policy =>
                {
                    policy.Requirements.Add(new IsOwnerRequirement());
                });
            }
            );
            services.AddTransient<IAuthorizationHandler, IsOwnerRequirementHandler>();
            services.AddScoped<TokenService>();

            return services;
        }
    }
}