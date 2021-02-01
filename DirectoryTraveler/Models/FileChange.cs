namespace DirectoryTraveler.Models
{
    public class FileChange
    {
        public string Mode { get; set; }
        
        public string OldName { get; set; }
        
        public string NewName { get; set; }
        
        public string OldPath { get; set; }
        
        public string NewPath { get; set; }
        
        public bool Force { get; set; }
    }
}