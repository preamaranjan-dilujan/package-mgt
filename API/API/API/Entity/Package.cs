using System.Collections.Generic;

namespace API.Entity
{
    public class Package
    {
       
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int NoOfAtt { get; set; }
        public int TotalPrice { get; set; }
        public bool Active { get; set; }
        public ICollection<PackageItem> PackageItems { get; set; }

    }
}
