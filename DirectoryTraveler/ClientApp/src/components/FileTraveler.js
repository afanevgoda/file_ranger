import React, {useState, useEffect, useCallback, useRef} from 'react';
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import File from "../components/File";
import {GetAllForDirectory, CopyDirectory, CutDirectory} from "../services/FileService";

export default function FileTraveler() {

    const [foundFiles, setFoundFiles] = useState(undefined);
    const [targetDirectory, setTargetDirectory] = useState("F:\\");
    const [isLoading, setIsLoading] = useState(false);
    const [copyCutBuffer, setCopyCutBuffer] = useState([]);

    useEffect(() => {

        GetAllForDirectory(targetDirectory).then((result) => {
            console.log(result.data);
            setFoundFiles(result.data);
            setIsLoading(false);
        });
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
        copyCutBuffer.push({
            path: fullPath,
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
        copyCutBuffer.push({
            path: fullPath,
            type: "cut"
        });
        setCopyCutBuffer(copyCutBuffer);
    }

    function pasteFolder(target) {
        if (target.type === "cut")
            CutDirectory(target.path, targetDirectory);
        else
            CopyDirectory(target.path, targetDirectory);
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
                <div>{foundFiles && foundFiles.map((file) => (<File
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