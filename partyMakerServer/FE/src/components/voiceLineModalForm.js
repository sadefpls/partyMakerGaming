import {Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";

function VoiceLineModalForm(props) {
    let open = props.open;
    let champions = props.champions;
    const [selectedChampion, setChampion] = useState("Ahri");

    function handleClose() {
        props.setOpen(false);
    }

    function handleChange(opt) {
        setChampion(opt.target.value);
    }

    function setAsVoiceLine() {
        console.log("champion", selectedChampion);
        console.log("path", props.path);
    }

    return (<div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Set file as Voice Line</DialogTitle>
            <DialogContent>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Champion
                </InputLabel>
                <Select label={"Champion"} value={selectedChampion} onChange={handleChange}>
                    {champions.map((champion) => {
                        return <MenuItem value={champion.id}>{champion.id}</MenuItem>
                    })}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={setAsVoiceLine}>Send</Button>
            </DialogActions>
        </Dialog>
    </div>)
}

export default VoiceLineModalForm;
