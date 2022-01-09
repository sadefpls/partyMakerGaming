import React from "react";
import {Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, SvgIcon} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function EditButton(props) {
    const [open, setOpen] = React.useState(false);
    const [renameOpen, setRenameOpen] = React.useState(false);


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const anchorRef = React.useRef(null);
    return (<>
            <ButtonGroup style={{marginRight: "5px"}} ref={anchorRef}>
                <Button
                    variant="contained"
                    aria-label="contained main button group" color={"info"}
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                > <SvgIcon component={ArrowDropDownIcon}/>
                </Button>
            </ButtonGroup>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                style={{zIndex: "2"}}
            >
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {props.operations.map((operation) =>
                                        <MenuItem
                                            key={operation.name}
                                            onClick={
                                                operation.execute(props.file, props.setPartyFiles)
                                            }
                                        >
                                            {operation.name}
                                        </MenuItem>
                                    )}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )
}