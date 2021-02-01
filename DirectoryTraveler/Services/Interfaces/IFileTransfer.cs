using DirectoryTraveler.Models;

namespace DirectoryTraveler.Services.Interfaces
{
    public interface IFileTransfer
    {
        bool Copy(FileChange targetChange);
        
        bool Cut(FileChange targetChange);
    }
}