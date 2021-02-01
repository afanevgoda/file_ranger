namespace DirectoryTraveler.Models
{
    public class File
    {
        public string Name { get; set; }
        public long SizeKb { get; set; }
        public string Type { get; set; }
        public bool IsFolder { get; set; }
        
        public string Path { get; set; }
    }
}