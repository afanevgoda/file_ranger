import React, {useState, useEffect} from 'react';
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import File from "../Explorer/File";
import {GetAllForDirectory, CopyDirectory, CutDirectory} from "../../services/FileService";
import {getFileName} from "../../helpers/fileHelper";

export default function FileTraveler() {

    const [foundFiles, setFoundFiles] = useState(undefined);
    const [targetDirectory, setTargetDirectory] = useState("C:\\");
    const [isLoading, setIsLoading] = useState(false);
    const [copyCutBuffer, setCopyCutBuffer] = useState([]);

    useEffect(() => {

        (async () => {
            const childFilesAndFolders = (await GetAllForDirectory(targetDirectory)).data;
            setFoundFiles(childFilesAndFolders);
            setIsLoading(false);
        })()
    }, [isLoading]);

    function onSearchInputChange(e) {
        setTargetDirectory(e.target.value);
    }

    function onGoClick() {
        if (isLoading)
            return;

        setIsLoading(true);
    }

    function copyFolder(fullPath) {

        let fileName = getFileName(fullPath);

        copyCutBuffer.push({
            path: fullPath,
            name: fileName,
            type: "copy"
        });
        setCopyCutBuffer(copyCutBuffer);
    }

    function onRemoveFromCutCopyBuffer(target) {
        const arrWithoutDeletedEl = copyCutBuffer.filter(function (obj) {
            return obj.path !== target;
        });

        setCopyCutBuffer(arrWithoutDeletedEl);
    }

    function cutFolder(fullPath) {
        let fileName = getFileName(fullPath);

        copyCutBuffer.push({
            path: fullPath,
            name: fileName,
            type: "cut"
        });

        setCopyCutBuffer(copyCutBuffer);
    }

    async function pasteFolder(target) {
        let func = target.type === "cut" ? CutDirectory : CopyDirectory;

        await func(target.path, targetDirectory);
    }

    function onBackClick() {
        if (isLoading)
            return;

        const previousFolderIndex = targetDirectory.lastIndexOf("\\");
        setTargetDirectory(`${targetDirectory.substring(0, previousFolderIndex)}`);

        setIsLoading(true);
    }

    function onFolderClickHandler(folderName) {
        setTargetDirectory(`${targetDirectory}\\${folderName}`);
        onGoClick();
    }

    return (
        <div>
            <div>Adress</div>
            <input onChange={onSearchInputChange} value={targetDirectory}/>
            <button onClick={onGoClick}>Go</button>
            <button onClick={onBackClick}>Back</button>
            <div>
                <div>Result:</div>
                <div>{foundFiles && foundFiles.map((file) => (
                    <File
                        copyFolder={copyFolder}
                        key={file.name}
                        onClick={onFolderClickHandler}
                        name={file.name}
                        type={file.type}
                        path={file.path}
                        isFolder={file.isFolder}
                        copyCutBuffer={copyCutBuffer}
                        cutFolder={cutFolder}
                        pasteFolder={pasteFolder}
                        onRemoveFromCutCopyBuffer={onRemoveFromCutCopyBuffer}
                    />))}</div>
            </div>
        </div>
    );
}