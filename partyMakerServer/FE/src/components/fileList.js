import React, {useEffect, useState} from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import {Button, ButtonGroup} from "@mui/material";
import axios from "axios";
import FileListItem from "./fileListItem";
import PathUtils from "../Utils/PathUtils";

function FileList(props) {

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
                                    onClick={PathUtils.getFolder(path.fullPath, setPartyFiles)}>
                                <div style={{transform: "skew(-30deg)"}}>{path.preparedPath}</div>
                            </Button>
                        ))}
                    </ButtonGroup>
                    <List
                        sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                        subheader={<ListSubheader>Files</ListSubheader>}
                    >
                        {partyFiles.files.map((file) => (
                            <FileListItem file={file} setPartyFiles={setPartyFiles}/>
                        ))}
                    </List></>)}< />
    );
}

export default FileList;