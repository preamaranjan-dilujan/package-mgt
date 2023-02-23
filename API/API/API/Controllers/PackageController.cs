using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using System.Linq;
using API.DTOs;
using System.Collections.Generic;

namespace API.Controllers
{

    public class PackageController : BaseApiController
    {
        private readonly DataContext context;

        public PackageController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet("packages/{id}")]
        public async Task<ActionResult<IEnumerable<Package>>> GetPackage(int id)
        {
            // Look up the package with the given id, including its associated PackageItems and Item objects
            var package = await context.Packages
                .Include(p => p.PackageItems)
                .ThenInclude(pi => pi.Item)
                .FirstOrDefaultAsync(p => p.Id == id);

            // If the package wasn't found, return a 404 status code
            if (package == null)
            {
                return NotFound();
            }

            // Return the package items with a 200 status code
            return Ok(package);
        }


        [HttpPost]
        public async Task<ActionResult<Package>> CreatePackage(PackageDto packageDto)
        {
            // Create a new Package object based on the input data
            var package = new Package
            {
                Name = packageDto.Name,
                Description = packageDto.Description,
                NoOfAtt = 0,
                TotalPrice = 0,
                Active = packageDto.Active,
                PackageItems = new List<PackageItem>()
            };

            // Iterate through the list of item ids and add the corresponding PackageItem objects
            foreach (int itemId in packageDto.ItemIds)
            {
                var item = await context.Items.FindAsync(itemId);

                if (item != null)
                {
                    var packageItem = new PackageItem
                    {
                        Package = package,
                        Item = item
                    };

                    if (package.PackageItems == null) 
                    {
                        package.PackageItems = new List<PackageItem>();
                    }

                    package.TotalPrice = package.TotalPrice + item.Price;
                    package.PackageItems.Add(packageItem);
                }
            }

            // Add the new package to the context and save changes
            context.Packages.Add(package);
            await context.SaveChangesAsync();

            // Return the new package object with a 201 status code
            return CreatedAtAction(nameof(GetPackage), new { id = package.Id }, package);
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Package>>> GetPackages()
        {
            return await context.Packages
                .Include(p => p.PackageItems)
                .ThenInclude(pi => pi.Item)
                .ToListAsync();
           
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Item>> UpdatePackage(int id, PackageDto packageDto)
        {

            var package = await context.Packages
               .SingleOrDefaultAsync(x => x.Name == packageDto.Name);

            package.Name = packageDto.Name;
            package.Description = packageDto.Description;
            package.Active = packageDto.Active;

            foreach (int itemId in packageDto.ItemIds)
            {
                var item = await context.Items.FindAsync(itemId);

                if (item != null)
                {
                    var packageItem = new PackageItem
                    {
                        Package = package,
                        Item = item
                    };

                    if (package.PackageItems == null)
                    {
                        package.PackageItems = new List<PackageItem>();
                    }

                    package.TotalPrice = package.TotalPrice + item.Price;
                    package.PackageItems.Add(packageItem);
                }
            }

            
            context.Entry(package).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(package);
        }
    }

}

