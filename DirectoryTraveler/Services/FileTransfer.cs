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
                string sourceFile = Path.Combine(targetChange.OldPath, targetChange.OldName ?? "");
                string destFile = Path.Combine(targetChange.NewPath, targetChange.NewName ?? "");

                if(!Directory.Exists($"{targetChange.NewPath}/{targetChange.OldName}"))
                    Directory.CreateDirectory($"{targetChange.NewPath}/{targetChange.OldName}");

                if (Directory.Exists(targetChange.OldPath))
                {
                    var files = Directory.GetFiles(targetChange.OldPath);

                    foreach (var pathToFile in files)
                    {
                        var fileName = Path.GetFileName(pathToFile);
                        destFile = Path.Combine(targetChange.NewPath, fileName);
                        File.Copy(pathToFile, destFile, true);
                    }
                    
                    var directories = Directory.GetDirectories(targetChange.OldPath);

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