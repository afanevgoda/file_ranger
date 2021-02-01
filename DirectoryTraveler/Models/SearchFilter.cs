namespace DirectoryTraveler.Models
{
    public class SearchFilter
    {
        public string Name { get; set; }
        public int MinSizeKb { get; set; }
        public int MaxSizeKb { get; set; }
        public string Type { get; set; }
        public string TargetDirectory { get; set; }
    }
}