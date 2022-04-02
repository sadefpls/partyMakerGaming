import {Button, SvgIcon} from "@mui/material";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import ListItem from "@mui/material/ListItem";
import React, {useEffect, useState} from "react";
import PathUtils from "../Utils/PathUtils";
import EditButton from "./editButton";
import FileUtils from "../Utils/FileUtils";
import VoiceLineModalForm from "./voiceLineModalForm";
import axios from "axios";

export default function FileListItem(props) {
    const [voiceLineOpen, setVoiceLineOpen] = React.useState(false);
    const [champions, setChampions] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get('http://localhost:8080/champions/list', {
                headers: {"Access-Control-Allow-Origin": "*"}
            });
            setChampions(data.data);
        }
        fetchData()
            .catch(console.error);
    }, [])
    const renderFile = () => {
        if (PathUtils.getExtension(props.file.path) === "mp3" || PathUtils.getExtension(props.file.path) === "mp4") {
            return (<Button onClick={FileUtils.playAudio(props.file.path)} color={"success"} variant="contained"
                            aria-label="contained main button group"><SvgIcon
                component={PlayArrowOutlinedIcon}/>
            </Button>)
        }
        return (<></>)
    }
    const openSetAsVoiceLineModal = (setOpen) => () => async () => {
        setOpen(true);
    }
    const generateOperations = (isFile) => {
        let operations = [{
            name: "Rename", execute: FileUtils.renameFile
        }, {
            name: "Delete", execute: FileUtils.deleteFile
        }, {
            name: "Set as Voice Line", execute: openSetAsVoiceLineModal(setVoiceLineOpen)
        }];
        if (isFile) {
            operations.push({name: "Download", execute: FileUtils.getFile});
        }
        return operations;
    }
    return (
        <ListItem
            style={{
                minWidth: "660px",
                paddingLeft: "0", paddingRight: "0",
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
            <EditButton operations={generateOperations(props.file.file)} style={{paddingRight: "0"}}
                        setPartyFiles={props.setPartyFiles}
                        file={props.file}/>
            {props.file.file &&
                renderFile(props.file)
            }
            {champions !== [] &&
                <VoiceLineModalForm open={voiceLineOpen} path={props.file.path} setOpen={setVoiceLineOpen}
                                    champions={champions}/>}
        </ListItem>
    )
}