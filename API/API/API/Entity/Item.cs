using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace API.Entity
{
    public class Item
    {
    
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public int Price { get; set; }
        public ICollection<PackageItem> PackageItems { get; set; }

    }
}
