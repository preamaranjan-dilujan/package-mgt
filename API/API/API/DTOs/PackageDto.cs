using API.Entity;
using System.Collections.Generic;

namespace API.DTOs
{
    public class PackageDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        //public int NoOfAtt { get; set; }
       // public int TotalPrice { get; set; }
        public bool Active { get; set; }
        public List<int> ItemIds { get; set; }
        public List<Item> Items { get; set; }
    }
}
