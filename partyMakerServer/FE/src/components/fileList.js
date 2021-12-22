import React, {useEffect, useState} from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import {Button, ButtonGroup} from "@mui/material";
import axios from "axios";

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
        splitPath.map((parsedPath) => {
            preparedPath.push({index: index, preparedPath: parsedPath, fullPath: _getFullPath(splitPath, index)});
            index++;
        })
        return preparedPath;
    }
    const _handleClick = (fullPath) => async (event) => {
        console.log(fullPath);
        // get the data from the api
        const data = await axios.post('http://localhost:8080/files/list', {
            path: fullPath,
            headers: {"Access-Control-Allow-Origin": "*"}
        });
        console.log(data.data);
        setPartyFiles(data.data);
    }


    return (<>
            {partyFiles.files !== undefined && (
                <><ButtonGroup variant="contained">
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
                            <ListItem key={file.name}>
                                <Button variant="outlined"
                                        aria-label="outlined primary button group"
                                        onClick={_handleClick(file.path)}>{file.name}</Button>
                            </ListItem>
                        ))}
                    </List></>)}< />
    );
}

export default FileList;