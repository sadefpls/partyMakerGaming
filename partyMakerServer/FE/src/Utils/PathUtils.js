import axios from "axios";
import fileDownload from "js-file-download";

const getFolder = (fullPath, setPartyFiles) => async (event) => {
    const data = await axios.post('http://localhost:8080/files/list', {
        path: fullPath,
        headers: {"Access-Control-Allow-Origin": "*"}
    });
    setPartyFiles(data.data);
}
const getFileName = (fullPath) => {
    let splitPath = fullPath.split("\\");
    return splitPath[splitPath.length - 1];
}
const getFile = (fullPath) => (event) => {
    let data = axios.post('http://localhost:8080/file/get', {
        path: fullPath,
        responseType: "blob",
        headers: {"Access-Control-Allow-Origin": "*"}
    }).then((response) => {
        fileDownload(response.data, getFileName(fullPath));
    });
}
const handleClick = (file, setPartyFiles) => async (event) => {
    if (file.file !== true) {
        await getFolder(file.path, setPartyFiles);
    }
}
const getFullPath = (path, index) => {
    let fullPath = "";
    for (let x = 0; x <= index; x++) {
        fullPath = fullPath + path[x] + "\\";
    }
    return fullPath;
}
const getParsedPaths = (path) => {
    let index = 0;
    let preparedPath = [];
    let splitPath = path.split("\\");
    splitPath.forEach((parsedPath) => {
        preparedPath.push({index: index, preparedPath: parsedPath, fullPath: getFullPath(splitPath, index)});
        index++;
    })
    return preparedPath;
}

export default {getFullPath, getFolder, getFileName, getFile, handleClick, getParsedPaths}
