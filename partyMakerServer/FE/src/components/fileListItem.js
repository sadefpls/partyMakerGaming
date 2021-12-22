import {Button, SvgIcon} from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ListItem from "@mui/material/ListItem";
import React from "react";
import PathUtils from "../Utils/PathUtils";

export default function FileListItem(props) {

    return (
        <ListItem
            style={{border: "1px solid black", display: "flex", justifyContent: "space-between"}}
            key={props.file.name}>
            <Button variant="contained"
                    aria-label="contained main button group"
                    color={props.file.file ? "info" : "warning"}
                    onClick={!props.file.file ? PathUtils.getFolder(props.file.path, props.setPartyFiles) : () => {
                    }}>{props.file.name}
            </Button>
            {props.file.file &&
            <Button onClick={PathUtils.getFile(props.file.path)} variant="contained"
                    aria-label="contained main button group"><SvgIcon
                component={FileDownloadOutlinedIcon}/>
            </Button>}
        </ListItem>);
}