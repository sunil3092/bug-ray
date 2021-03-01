using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Persistance;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Efforts.Any()) return;

            var efforts = new List<Effort>
            {
                new Effort
                {
                    Title = "UI Refresh Issue",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "UI Refreshes for no reason",
                    Catagory = 1,
                    Estimate = DateTime.Now.AddMonths(-1),
                    Priority = 1,
                },
                  new Effort
                {
                    Title = "Package Build issue",
                    Date = DateTime.Now.AddMonths(-3),
                    Description = "Webpack config issue",
                    Catagory = 1,
                    Estimate = DateTime.Now.AddMonths(-2),
                    Priority = 1,
                },
                new Effort
                {
                    Title = "User management feature needed",
                    Date = DateTime.Now.AddMonths(-5),
                    Description = "Activity 2 months ago",
                    Catagory = 2,
                    Estimate = DateTime.Now.AddMonths(-2),
                    Priority = 2,
                },
                new Effort
                {
                    Title = "Photo Upload for Profile needed",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Need a photo upload widget to profile directly",
                    Catagory = 2,
                    Estimate = DateTime.Now.AddMonths(-1),
                    Priority = 1,
                },
                new Effort
                {
                    Title = "7 Tabs needed",
                    Date = DateTime.Now.AddMonths(-3),
                    Description = "7 tabs needed for classifying catagory based data",
                    Catagory = 2,
                    Estimate = DateTime.Now.AddMonths(-1),
                    Priority = 3,
                },

            };

            await context.Efforts.AddRangeAsync(efforts);
            await context.SaveChangesAsync();
        }
    }
}