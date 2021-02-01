using System.Collections.Generic;
using System.IO;
using System.Linq;
using DirectoryTraveler.Models;
using DirectoryTraveler.Services.Interfaces;
using File = DirectoryTraveler.Models.File;

namespace DirectoryTraveler.Services
{
    public class FileService : IFileService
    {
        public List<File> GetAllInDirectory(string targetDirectory)
        {
            var directoryInfo = new DirectoryInfo(targetDirectory);
            var fileList = directoryInfo.GetFiles();
            var folderList = directoryInfo.GetDirectories();

            var result = new List<File>();

            result.AddRange(fileList.Select(fileInfo =>
                    new File
                    {
                        Name = fileInfo.Name,
                        Type = fileInfo.Extension,
                        IsFolder = false,
                        SizeKb = fileInfo.Length,
                        Path = fileInfo.FullName
                    })
                .ToList());

            result.AddRange(folderList.Select(fileInfo =>
                    new File
                    {
                        Name = fileInfo.Name,
                        Type = fileInfo.Extension,
                        IsFolder = true,
                        Path = fileInfo.FullName
                    })
                .ToList());

            return result;
        }
    }
}