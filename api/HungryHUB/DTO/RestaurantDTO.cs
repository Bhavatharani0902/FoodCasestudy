
namespace HungryHUB.DTO
{
    public class RestaurantDTO
    {

        public int RestaurantId { get; set; }
        public string Name { get; set; }
        public int CityId { get; set; }

        public string? image { get; set; }
        public string? description { get; set; }
    }
}
