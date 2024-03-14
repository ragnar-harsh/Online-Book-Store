namespace BookStoreWebAPI.Data
{
    public class Books 
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required string Catagory { get; set; }
    }
}