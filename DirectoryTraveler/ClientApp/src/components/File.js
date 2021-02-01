import React, {useState, useEffect} from 'react';
import styles from "./../custom.css";
import {ContextMenu, ContextMenuTrigger, MenuItem, SubMenu} from "react-contextmenu";
import { FaCut, FaTimes, FaCopy } from 'react-icons/fa';


export default function File({name, isFolder, type, onClick, path, copyFolder, copyCutBuffer, cutFolder, pasteFolder, onRemoveFromCutCopyBuffer}) {

    const [isPasteActive, setIsPasteActive] = useState(false);

    return (
        <span>
            <ContextMenuTrigger id={name} renderTag={"span"}>
                <div onClick={() => onClick(name)} className={isFolder ? "folder" : "file"}>
                    <span className={"fileName"}>{name}</span>
                    <span>{type}</span>
                </div>
            </ContextMenuTrigger>

            <ContextMenu id={name}>
                <MenuItem
                    onClick={() => copyFolder(path)}
                    attributes={{
                        className: "contextMenuItem menuItem-highest"
                    }}>
                    Copy
                </MenuItem>
                <SubMenu title={"Paste"}
                         preventCloseOnClick={true}
                         onClick={() => setIsPasteActive(!isPasteActive)}
                         attributes={{
                             className: "contextMenuItem"
                         }}>
                {copyCutBuffer.map(x => (
                    <MenuItem key={x.path}
                        attributes={{
                            hidden: !isPasteActive,
                            className: "contextMenuItem"
                        }}
                              onClick={() => pasteFolder(x)}
                    >
                        <span className={"itemType"}>
                            {x.type === "copy"? (<FaCopy/>) : (<FaCut/>)}
                        </span> 
                            {x.name} 
                        <span className={"deleteItem"}>
                            <FaTimes onClick={() => onRemoveFromCutCopyBuffer(x.path)}/>
                        </span>
                    </MenuItem>
                ))}
                </SubMenu>
                <MenuItem
                    onClick={() => cutFolder(path)}
                    attributes={{
                        className: "contextMenuItem"
                    }}>
                Cut
                </MenuItem>
                <MenuItem
                    attributes={{
                        className: "contextMenuItem menuItem-lowest"
                    }}>
                Delete
                </MenuItem>
            </ContextMenu>
        </span>

    )
}