import React, {useEffect, useState} from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import {Button, ButtonGroup, SvgIcon} from "@mui/material";
import axios from "axios";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

var fileDownload = require('js-file-download');

function FileList(props) {
    let [partyFiles, setPartyFiles] = useState([]);
    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
            // get the data from the api
            const data = await axios.post('http://localhost:8080/files/list', {
                headers: {"Access-Control-Allow-Origin": "*"}
            });
            setPartyFiles(data.data);
        }
        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [])
    const _getFullPath = (path, index) => {
        let fullPath = "";
        for (let x = 0; x <= index; x++) {
            fullPath = fullPath + path[x] + "\\";
        }
        return fullPath;
    }

    const _getParsedPaths = (path) => {
        let index = 0;
        let preparedPath = [];
        let splitPath = path.split("\\");
        splitPath.forEach((parsedPath) => {
            preparedPath.push({index: index, preparedPath: parsedPath, fullPath: _getFullPath(splitPath, index)});
            index++;
        })
        return preparedPath;
    }
    const _getFolder = (fullPath) => async (event) => {
        const data = await axios.post('http://localhost:8080/files/list', {
            path: fullPath,
            headers: {"Access-Control-Allow-Origin": "*"}
        });
        setPartyFiles(data.data);
    }
    const _getFileName = (fullPath) => {
        let splitPath = fullPath.split("\\");
        return splitPath[splitPath.length - 1];
    }
    const _getFile = (fullPath) => (event) => {
        console.log(fullPath);
        let data = axios.post('http://localhost:8080/file/get', {
            path: fullPath,
            responseType: "blob",
            headers: {"Access-Control-Allow-Origin": "*"}
        }).then((response) => {
            fileDownload(response.data, _getFileName(fullPath));
        });
    }
    const _handleClick = (file) => async (event) => {
        file.file ? await _getFile(file.path) : await _getFolder(file.path);
    }

    return (<>
            {partyFiles.files !== undefined && (
                <><ButtonGroup variant="contained" color={"warning"}>
                    {_getParsedPaths(partyFiles.queriedPath).map((path) => (
                        <Button style={{transform: "skew(30deg)"}} onClick={_handleClick(path.fullPath)}>
                            <div style={{transform: "skew(-30deg)"}}>{path.preparedPath}</div>
                        </Button>
                    ))}
                </ButtonGroup>
                    <List
                        sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                        subheader={<ListSubheader>Files</ListSubheader>}
                    >
                        {partyFiles.files.map((file) => (
                            <ListItem
                                style={{border: "1px solid black", display: "flex", justifyContent: "space-between"}}
                                key={file.name}>
                                <Button variant="contained"
                                        aria-label="contained main button group"
                                        color={file.file ? "info" : "warning"}
                                        onClick={!file.file ? _handleClick(file) : () => {
                                        }}>{file.name}</Button>{file.file &&
                            <Button onClick={_getFile(file.path)} variant="contained" aria-label="contained main button group"><SvgIcon
                                component={FileDownloadOutlinedIcon}/></Button>}
                            </ListItem>
                        ))}
                    </List></>)}< />
    );
}

export default FileList;