using API.Data;
using API.DTOs;
using API.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{

    public class ClientController : BaseApiController
    {
        private readonly DataContext context;

        public ClientController(DataContext context)
        {
            this.context = context;
        }

        [HttpPost("AddClient")]
        public async Task<ActionResult<Client>> AddClient(ClientDto clientDto)
        {
            var client = new Client
            {
                Id = clientDto.Id,
                Name = clientDto.Name,
                Email = clientDto.Email,
                Phone = clientDto.Phone,
                Type = clientDto.Type,
                Address = clientDto.Address,
                IsActive = clientDto.IsActive,
                Gender = clientDto.Gender,
            };

            foreach(int packageId in clientDto.PackageIds)
            {
                var package = await context.Packages.FindAsync(packageId);

                if (package != null)
                {
                    package.NoOfAtt = package.NoOfAtt + 1;
                    context.Entry(package).State = EntityState.Modified;

                }
            }

            context.Clients.Add(client);
            await context.SaveChangesAsync();
            return Ok(client);



            /*workin code 
            context.Clients.Add(client);
            await context.SaveChangesAsync();
            return Ok(client);
            */

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetClient()
        {
            return await context.Clients.ToListAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClient(int id)
        {
            return await context.Clients.FindAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Item>> UpdateClient(int id, Client client)
        {
            if (id != client.Id)
            {
                return BadRequest();
            }
            context.Entry(client).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(client);
        }

    }
}
