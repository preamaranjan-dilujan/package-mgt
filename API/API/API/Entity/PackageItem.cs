namespace API.Entity
{
    public class PackageItem
    {
        public int ItemId { get; set; }
        public Item Item { get; set; }
        public int PackageId { get; set; }
        public Package Package { get; set; }

    }
}
