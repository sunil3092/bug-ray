using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Persistance;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {

            if (!userManager.Users.Any() && !context.Projects.Any())
            {
                var users = new List<AppUser>
                {
                new AppUser{DisplayName = "Bob", UserName="bob", Email="bob@test.com"},
                new AppUser{DisplayName = "Tom", UserName="tom", Email="tom@test.com"},
                new AppUser{DisplayName = "Jane", UserName="jane", Email="jane@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var projects = new List<Project>
            {
                new Project
                {
                    Name = "Inventory Management",
                    Description="General Purpose inventory management",
                    Estimate = DateTime.Now.AddYears(2),
                    IsFavourate = false,
                    IsCancelled = false,
                    Contributors= new List<ProjectContributor>
                    {
                        new ProjectContributor{
                            AppUser = users[0],
                            IsOwner = true,
                        },
                        new ProjectContributor{
                            AppUser = users[1],
                            IsOwner = false,
                        },
                    }
                },

                new Project
                {
                    Name = "Attendence Management",
                    Description="Compnay Attendence managemnt management",
                    Estimate = DateTime.Now.AddYears(1),
                    IsFavourate = true,
                    IsCancelled = false,
                    Contributors= new List<ProjectContributor>
                    {
                        new ProjectContributor{
                            AppUser = users[1],
                            IsOwner = true,
                        },
                        new ProjectContributor{
                            AppUser = users[2],
                            IsOwner = false,
                        },
                    }
                },
            };
                await context.Projects.AddRangeAsync(projects);
                await context.SaveChangesAsync();
            }




            // if (!context.Efforts.Any())
            // {

            //     var efforts = new List<Effort>
            // {
            //     new Effort
            //     {
            //         Title = "UI Refresh Issue",
            //         Date = DateTime.Now.AddMonths(-2),
            //         Description = "UI Refreshes for no reason",
            //         Catagory = 1,
            //         Estimate = DateTime.Now.AddMonths(-1),
            //         Priority = 1,
            //     },
            //       new Effort
            //     {
            //         Title = "Package Build issue",
            //         Date = DateTime.Now.AddMonths(-3),
            //         Description = "Webpack config issue",
            //         Catagory = 1,
            //         Estimate = DateTime.Now.AddMonths(-2),
            //         Priority = 1,
            //     },
            //     new Effort
            //     {
            //         Title = "User management feature needed",
            //         Date = DateTime.Now.AddMonths(-5),
            //         Description = "Activity 2 months ago",
            //         Catagory = 2,
            //         Estimate = DateTime.Now.AddMonths(-2),
            //         Priority = 2,
            //     },
            //     new Effort
            //     {
            //         Title = "Photo Upload for Profile needed",
            //         Date = DateTime.Now.AddMonths(-2),
            //         Description = "Need a photo upload widget to profile directly",
            //         Catagory = 2,
            //         Estimate = DateTime.Now.AddMonths(-1),
            //         Priority = 1,
            //     },
            //     new Effort
            //     {
            //         Title = "7 Tabs needed",
            //         Date = DateTime.Now.AddMonths(-3),
            //         Description = "7 tabs needed for classifying catagory based data",
            //         Catagory = 2,
            //         Estimate = DateTime.Now.AddMonths(-1),
            //         Priority = 3,
            //     },

            // };

            //     await context.Efforts.AddRangeAsync(efforts);
            //     await context.SaveChangesAsync();
            // }
        }

    }
}