import React, {useEffect, useState} from "react";
import List from "@mui/material/List";
import {Button, ButtonGroup} from "@mui/material";
import axios from "axios";
import FileListItem from "./fileListItem";
import PathUtils from "../Utils/PathUtils";
import FileUtils from "../Utils/FileUtils";
import UploadDialog from "./uploadDialog";

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

    return (<div style={{width: "60%", padding: "5%", justifyContent: "center"}}>
            {partyFiles.files !== undefined && (
                <div style={{width: "100%", border: "solid grey 1px", padding: "1em", borderRadius: "30px"}}>
                    <ButtonGroup fullWidth={true} sx={{
                        display: 'flex',
                        justifyContent: "auto",
                        alignItems: 'center'
                    }} variant="contained" color={"warning"}>
                        {PathUtils.getParsedPaths(partyFiles.queriedPath).map((path) => (
                            <Button
                                onClick={FileUtils.getFolder(path.fullPath, setPartyFiles)}>
                                <div>{path.preparedPath}</div>
                            </Button>
                        ))}
                    </ButtonGroup>
                    <List
                        sx={{width: '100%', bgcolor: 'background.paper'}}
                    >
                        {partyFiles.files.map((file) => (
                            <FileListItem file={file}
                                          setPartyFiles={setPartyFiles}/>
                        ))}
                    </List>
                    <UploadDialog style={{width: "100%"}} path={partyFiles.queriedPath}/>
                </div>)}
        </div>
    );
}

export default FileList;