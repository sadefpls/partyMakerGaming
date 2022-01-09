import {Button, SvgIcon} from "@mui/material";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import ListItem from "@mui/material/ListItem";
import React from "react";
import PathUtils from "../Utils/PathUtils";
import EditButton from "./editButton";
import FileUtils from "../Utils/FileUtils";

export default function FileListItem(props) {

    const renderFile = () => {
        if (PathUtils.getExtension(props.file.path) === "mp3" || PathUtils.getExtension(props.file.path) === "mp4") {
            return (<Button onClick={FileUtils.playAudio(props.file.path)} color={"success"} variant="contained"
                            aria-label="contained main button group"><SvgIcon
                component={PlayArrowOutlinedIcon}/>
            </Button>)
        }
        return (<></>)
    }
    const generateOperations = (isFile) => {
        let operations = [{
            name: "Rename", execute: FileUtils.renameFile
        }, {
            name: "Delete", execute: FileUtils.deleteFile
        }];
        if (isFile) {
            operations.push({name: "Download", execute: FileUtils.getFile});
        }
        return operations;
    }
    return (
        <ListItem
            style={{
                border: "1px solid black",
                minWidth: "660px",
                display: "flex",
                justifyContent: "space-between"
            }}
            key={props.file.name}>

            <Button variant="contained"
                    aria-label="contained main button group"
                    color={props.file.file ? "info" : "warning"}
                    onClick={!props.file.file ? FileUtils.getFolder(props.file.path, props.setPartyFiles) : () => {
                    }}
                    style={{flexGrow: "1", marginRight: "5px", minWidth: "500px"}}>{props.file.name}
            </Button>
            <EditButton operations={generateOperations(props.file.file)} setPartyFiles={props.setPartyFiles}
                        file={props.file}/>
            {props.file.file &&
                renderFile(props.file)
            }

        </ListItem>)
        ;
}