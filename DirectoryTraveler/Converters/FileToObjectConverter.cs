using System.Collections.Generic;
using System.IO;
using System.Linq;
using File = DirectoryTraveler.Models.File;

namespace DirectoryTraveler.Converters
{
    public class FileToObjectConverter
    {
        public List<File> Convert(IEnumerable<FileInfo> sourceList)
        {
            return sourceList.Select(fileInfo => 
                    new File
                    {
                        Name = fileInfo.Name,
                        Type = fileInfo.Extension,
                        IsFolder = false,
                        SizeKb = fileInfo.Length
                    })
                .ToList();
        }
    }
}