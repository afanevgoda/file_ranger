export function getFileName(fullPath)
{
    const previousFolderIndex = fullPath.lastIndexOf("\\");
    
    return fullPath.substring(previousFolderIndex);
}