using API.Data;
using API.DTOs;
using API.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{

    public class ItemController : BaseApiController
    {
        private readonly DataContext context;

        public ItemController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            var items = await context.Items.ToListAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<Item>> CreateItem(Item item)
        {
           // item.StartTime = DateTime.Parse(item.StartTime);
            context.Items.Add(item);
            await context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Item>> UpdateItem(int id, Item item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }
            context.Entry(item).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return Ok(item);
        }


    }
}
