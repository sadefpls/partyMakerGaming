import {Button, Input} from "@mui/material";
import React, {useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FileUtils from "../Utils/FileUtils";

function UploadDialog(props) {
    const [open, setOpen] = useState(false);
    const [selectedFile, selectFile] = useState();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (newFile) => {
        selectFile(newFile.target.files[0]);
    }
    const handleUpload = () => {
        setOpen(false);
        FileUtils.saveFile(selectedFile, props.path);
    }
    return (<><Button style={{width: "100%"}} color={"secondary"} variant="contained" onClick={handleClickOpen}>Upload
        File</Button> <Dialog open={open}
                              onClose={handleClose}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
            <Input
                autoFocus
                margin="dense"
                id="file"
                label="File"
                onChange={handleChange}
                type="file"
                fullWidth
                variant="standard"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpload}>Upload</Button>
        </DialogActions>
    </Dialog></>)
}

export default UploadDialog;