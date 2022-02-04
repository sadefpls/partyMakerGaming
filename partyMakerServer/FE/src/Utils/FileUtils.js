import axios from "axios";
import {saveAs} from 'file-saver';
import PathUtils from "../Utils/PathUtils"

const playAudio = (fullPath) => async () => {
    let xhr = prepareXhr();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            let mp3 = new Blob([xhr.response], {type: 'image/jpeg'});
            const url = window.URL.createObjectURL(mp3)
            const audio = new Audio(url);
            audio.load();
            audio.crossOrigin = 'anonymous';
            audio.play().then(() => {
                console.log("playing")
            }).catch((e) => console.log(e));
        }
    };
    let body = {path: fullPath};
    xhr.send(JSON.stringify(body)); //Request is sent
}

function prepareXhr() {
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost:8080/file/get';
    xhr.responseType = 'arraybuffer'; //Set the response type to arraybuffer so xhr.response returns ArrayBuffer
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    return xhr;
}

const getFile = (file) => async (event) => {
    let filename = PathUtils.getFileName(file.path);

    let xhr = prepareXhr();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            //When request is done
            //xhr.response will be an ArrayBuffer
            let file = new Blob([xhr.response], {type: 'image/jpeg'});
            saveAs(file, filename);
        }
    };
    let body = {path: file.path};
    xhr.send(JSON.stringify(body)); //Request is sent
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
const renameFile = (file, setPartyFiles) => async () => {
    let newName = prompt("New Name");
    const data = await axios.post('http://localhost:8080/file/rename', {
        path: file.path,
        newName: newName,
        headers: {"Access-Control-Allow-Origin": "*"}
    });
    setPartyFiles(data.data);
}

const deleteFile = (file, setPartyFiles) => async () => {
    const data = await axios.post('http://localhost:8080/file/delete', {
        path: file.path,
        headers: {"Access-Control-Allow-Origin": "*"}
    });
    setPartyFiles(data.data);
}
export default {playAudio, getFile, getFolder, handleClick, renameFile, deleteFile}
