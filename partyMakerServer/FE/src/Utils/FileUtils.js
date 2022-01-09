import axios from "axios";
import fileDownload from "js-file-download";
import PathUtils from "../Utils/PathUtils";

const playAudio = (fullPath) => async (event) => {
    console.log("audio");
    const response = await axios.post('http://localhost:8080/file/get', {
        path: fullPath,
        responseType: "arraybuffer",
        headers: {"Access-Control-Allow-Origin": "*"}
    });
    const mp3 = new Blob([response.data], {type: 'audio/mp3'})
    const url = window.URL.createObjectURL(mp3)
    const audio = new Audio(url);
    audio.load();
    audio.crossOrigin = 'anonymous';
    audio.play().then((response) => {
        console.log("playing")
    }).catch((e) => console.log(e));

}
const getFile = (fullPath) => (event) => {
    let data = axios.post('http://localhost:8080/file/get', {
        path: fullPath,
        responseType: "arraybuffer",
        headers: {"Access-Control-Allow-Origin": "*"}
    }).then((response) => {
        fileDownload(response.data, PathUtils.getFileName(fullPath));
    });
}
const getFolder = (fullPath, setPartyFiles) => async (event) => {
    const data = await axios.post('http://localhost:8080/files/list', {
        path: fullPath,
        headers: {"Access-Control-Allow-Origin": "*"}
    });
    setPartyFiles(data.data);
}
const handleClick = (file, setPartyFiles) => async (event) => {
    if (file.file !== true) {
        await getFolder(file.path, setPartyFiles);
    }
}
const renameFile = (fullPath, setPartyFiles) => async () => {
    let newName = prompt("New Name");
    const data = await axios.post('http://localhost:8080/file/rename', {
        path: fullPath.path,
        newName: newName,
        headers: {"Access-Control-Allow-Origin": "*"}
    });
    setPartyFiles(data.data);
}
const deleteFile = (fullPath, setPartyFiles) => async () => {
    const data = await axios.post('http://localhost:8080/file/delete', {
        path: fullPath.path,
        headers: {"Access-Control-Allow-Origin": "*"}
    });
    setPartyFiles(data.data);
}
export default {playAudio, getFile, getFolder, handleClick, renameFile, deleteFile}
