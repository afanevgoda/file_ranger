using System;
using System.IO;
using DirectoryTraveler.Models;
using DirectoryTraveler.Services.Interfaces;
using File = System.IO.File;

namespace DirectoryTraveler.Services
{
    public class FileTransfer : IFileTransfer
    {
        public bool Copy(FileChange targetChange)
        {
            try
            {
                var sourceFile = targetChange.OldPath;
                var destFile = targetChange.NewPath;
                var oldFoler = Path.GetDirectoryName(sourceFile);
                
                if (!Directory.Exists($"{targetChange.NewPath}"))
                    Directory.CreateDirectory($"{targetChange.NewPath}");

                if (!Directory.Exists(oldFoler))
                    throw new FileNotFoundException();

                var files = Directory.GetFiles(oldFoler);

                foreach (var pathToFile in files)
                {
                    var fileName = Path.GetFileName(pathToFile);
                    destFile = Path.Combine(targetChange.NewPath, fileName);
                    File.Copy(pathToFile, destFile, true);
                }

                var directories = Directory.GetDirectories(oldFoler);

                foreach (var pathToDirectory in directories)
                {
                    var relativePathToParent = pathToDirectory.Replace(targetChange.OldPath, "");
                    var newPath = $"{targetChange.NewPath}//{targetChange.OldName}//{relativePathToParent}";

                    var targetChangeForInner = new FileChange
                    {
                        Force = targetChange.Force,
                        Mode = targetChange.Mode,
                        OldPath = pathToDirectory,
                        NewPath = newPath
                    };

                    this.Copy(targetChangeForInner);
                }

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }

        public bool Cut(FileChange targetChange)
        {
            Directory.Move(targetChange.OldPath, targetChange.NewPath);

            return true;
        }
    }
}