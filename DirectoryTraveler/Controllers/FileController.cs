using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using DirectoryTraveler.Models;
using DirectoryTraveler.Services;
using DirectoryTraveler.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DirectoryTraveler.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly IFileTransfer _fileTransfer;
        
        public FileController(IFileService fileService, IFileTransfer fileTransfer)
        {
            _fileService = fileService;
            _fileTransfer = fileTransfer;
        }
        
        [HttpGet]
        public List<File> Get(string targetDirectory)
        {
            return _fileService.GetAllInDirectory(targetDirectory);
        }

        [HttpPost]
        public bool Post(FileChange change)
        {
            switch(change.Mode)
            {
                case "Cut":    
                    return _fileTransfer.Cut(change);
                case "Copy":
                    return _fileTransfer.Copy(change);
                default:
                    return false;
            }
        }
    }
}