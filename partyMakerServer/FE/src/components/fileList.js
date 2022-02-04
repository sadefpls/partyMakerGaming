import React, {useEffect, useState} from "react";
import List from "@mui/material/List";
import {Button, ButtonGroup} from "@mui/material";
import axios from "axios";
import FileListItem from "./fileListItem";
import PathUtils from "../Utils/PathUtils";
import FileUtils from "../Utils/FileUtils";

function FileList() {

    let [partyFiles, setPartyFiles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.post('http://localhost:8080/files/list', {
                headers: {"Access-Control-Allow-Origin": "*"}
            });
            setPartyFiles(data.data);
        }
        fetchData()
            .catch(console.error);
    }, [])

    return (<>
            {partyFiles.files !== undefined && (
                <>
                    <ButtonGroup variant="contained" color={"warning"}>
                        {PathUtils.getParsedPaths(partyFiles.queriedPath).map((path) => (
                            <Button style={{transform: "skew(30deg)"}}
                                    onClick={FileUtils.getFolder(path.fullPath, setPartyFiles)}>
                                <div style={{transform: "skew(-30deg)"}}>{path.preparedPath}</div>
                            </Button>
                        ))}
                    </ButtonGroup>
                    <List
                        sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                    >
                        {partyFiles.files.map((file) => (
                            <FileListItem file={file} setPartyFiles={setPartyFiles}/>
                        ))}
                    </List></>)}< />
    );
}

export default FileList;