using System.Collections.Generic;
using DirectoryTraveler.Models;

namespace DirectoryTraveler.Services.Interfaces
{
    public interface IFileService
    {
        List<File> GetAllInDirectory(string targetDirectory);
    }
}