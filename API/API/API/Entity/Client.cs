namespace API.Entity
{
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int Type { get; set; }
        public string Address { get; set; }
        public bool IsActive { get; set; }
        public string Gender { get; set; }
    }
}
