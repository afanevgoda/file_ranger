import axios from "axios";
import {getFileName} from "../helpers/fileHelper";

export function GetAllForDirectory(targetDirectory) {
    return axios.request(
        {
            url: "File",
            method: 'get',
            params: {targetDirectory},
            headers: {'Content-Type': 'application/json'},
        }
    );
}

export function CopyDirectory(targetDirectory, newPath) {
    const oldName = getFileName(targetDirectory);

    return axios.request(
        {
            url: "File",
            method: 'post',
            data: {
                OldPath: targetDirectory,
                newPath,
                mode: "Copy",
                oldName
            },
            headers: {'Content-Type': 'application/json'},
        }
    );
}

export function CutDirectory(targetDirectory, newPath) {
    const oldName = getFileName(targetDirectory);

    return axios.request(
        {
            url: "File",
            method: 'post',
            data: {
                OldPath: targetDirectory,
                newPath,
                mode: "Cut",
                oldName
            },
            headers: {'Content-Type': 'application/json'},
        }
    );
}