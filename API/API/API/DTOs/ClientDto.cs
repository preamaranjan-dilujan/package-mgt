using API.Entity;

namespace API.DTOs
{
    public class ClientDto : Client
    {
        public int[] PackageIds { get; set; }

    }
}
