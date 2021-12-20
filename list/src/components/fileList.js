import React from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {Button} from "@mui/material";

function FileList(props) {
    return (<>
            <Button variant={"outlined"}>Find Files</Button>
            {props.files !== undefined && (
                <List
                    sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                    subheader={<ListSubheader>Settings</ListSubheader>}
                >
                    {props.files.map((file) => (
                        <ListItem>
                            <ListItemText id={file.text} primary={file.text}/>
                        </ListItem>
                    ))}
                </List>)}< />
    );
}

export default FileList;