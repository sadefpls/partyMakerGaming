
const getFileName = (fullPath) => {
    let splitPath = fullPath.split("\\");
    return splitPath[splitPath.length - 1];
}


const getFullPath = (path, index) => {
    let fullPath = "";
    for (let x = 0; x <= index; x++) {
        fullPath = fullPath + path[x] + "\\";
    }
    return fullPath;
}
const getExtension = (path) => {
    let splitPath = path.split(".");
    return splitPath[splitPath.length - 1];
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

export default {getFullPath, getExtension, getFileName, getParsedPaths}
