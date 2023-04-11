import React from 'react'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { format } from "date-fns";

export default function DetailEditTable({ setIsEditEnable, editedRows, setRefreshTable, month, emptyData }) {
    const [showEdit, setShowEdit] = useState(false);
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false)
    const [editButtonDisable, setEditButtonDisable] = useState(false)
    const TAJNE_HESLO = "Heslo456"
    const [users, setUsers] = useState([])
    const [newHwUser, setNewHwUser] = useState(editedRows.hw_jmeno ? editedRows.hw_jmeno : "");
    const [newSwUser, setNewSwUser] = useState(editedRows.sw_jmeno ? editedRows.sw_jmeno : "");


    useEffect(() => {
        axios.get("http://192.168.30.200:3030/getallusers").then(
            response => {
                let usersArray = []
                response.data.forEach(radek => {
                    usersArray.push(radek.jmeno)
                });

                setUsers(usersArray);
            }
        ).catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(()=>{
        setNewHwUser(editedRows.hw_jmeno ? editedRows.hw_jmeno : "")
        setNewSwUser(editedRows.sw_jmeno ? editedRows.sw_jmeno : "")
    }, [editedRows] )

    let handleEditClick = () => {
        setShowPasswordDialog(true);
    }

    let handleClosePassDialog = (event, reason) => {
        if (reason === "escapeKeyDown" || reason === undefined) {
            setShowPasswordDialog(false);
            setPassword("")
        }
    }

    let handleConfirmPassDialog = () => {
        handleClosePassDialog();
        if (password === TAJNE_HESLO) {
            setShowAlert(false)
            setShowEdit((prevState) => !prevState)
            setEditButtonDisable(true)
            setIsEditEnable(true)
        } else {
            setShowAlert(true)
        }
    }

    let handleEditToday = () => {
        let updateData = {
            id: editedRows.id,
            userHw: newHwUser,
            userSw: newSwUser,
        }

        axios.put("http://192.168.30.200:3030/editemergencyday", updateData).then(
            response => {
                console.log(response);
                setRefreshTable((prev) => !prev)
            }
        ).catch(err => {
            console.log(err);
        }) 
    }

    let handleEditTillEnd = () => {
        const day = editedRows.date.split(" ")[0].replace(".", "");
        const month = editedRows.date.split(" ")[1].replace(".", "");
        const year = editedRows.date.split(" ")[2].replace(".", "");
        const datum = new Date(year, month-1, day);

        let updateData = {
            date: format(datum, "yyyy-MM-dd"),
            userHw: newHwUser,
            userSw: newSwUser,
        }
        console.log(updateData);

        axios.put("http://192.168.30.200:3030/editEmergencytillendweek", updateData).then(
            response => {
                console.log(response);
                setRefreshTable((prev) => !prev)
            }
        ).catch(err => {
            console.log(err);
        }) 
    }

    const handleEditWholeWeek = () => {
        const day = editedRows.date.split(" ")[0].replace(".", "");
        const month = editedRows.date.split(" ")[1].replace(".", "");
        const year = editedRows.date.split(" ")[2].replace(".", "");
        const datum = new Date(year, month-1, day);

        let updateData = {
            date: format(datum, "yyyy-MM-dd"),
            userHw: newHwUser,
            userSw: newSwUser,
        }
        axios.put("http://192.168.30.200:3030/editEmergencywholeweek", updateData).then(
            response => {
                console.log(response);
                setRefreshTable((prev) => !prev)
            }
        ).catch(err => {
            console.log(err);
        }) 
    }

    const handleFillCalendar = () =>{
        const datum = new Date();
        const firstDayMonth = new Date(datum.getFullYear(), month-1, 1);
        const lastDayMonth = new Date(datum.getFullYear(), month, 0);
        const data = {startDate: format(firstDayMonth, "yyyy-MM-dd"),
                        endDate: format(lastDayMonth, "yyyy-MM-dd")}
        axios.put("http://192.168.30.200:3030/fillcalendarmonth", data).then(
            response => {
                console.log(response);
                setRefreshTable((prev) => !prev)
            }
        ).catch(err => {
            console.log(err);
        }) 
    }

    return (
        <>
            {/* <Button variant='contained' onClick={() => setShowEdit((prevState) => !prevState)}>Povolit úpravy</Button> */}
            <Button variant='contained' onClick={() => handleEditClick()} disabled={editButtonDisable}>Povolit úpravy</Button>

            <Dialog open={showPasswordDialog} onClose={handleClosePassDialog}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        handleConfirmPassDialog()
                    }
                }}>
                <DialogContent>
                    <DialogContentText>Zadejte heslo pro vstup do režimu úprav.</DialogContentText>
                    <TextField
                        autoFocus margin="dense" id="password" label="Heslo" type="password" variant='standard' fullWidth
                        onChange={(e) => setPassword(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePassDialog} variant="contained">Zrušit</Button>
                    <Button onClick={handleConfirmPassDialog} color="success" variant="contained">OK</Button>
                </DialogActions>
            </Dialog>

            <div>
                {showAlert ? <Alert severity='error'>Zadné špatné heslo pro editaci</Alert> : <></>}
            </div>

            {showEdit &&
                <div style={{ marginTop: "20px" }}>
                    <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>Den</Typography>
                    <TextField disabled margin="dense" size='small' value={editedRows.date ? editedRows.date : ""} 
                        inputProps={{style: {fontSize: 18, fontWeight: "bold"}}}/>
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "50%" }}>
                            <Typography>Hardware</Typography>
                            <Select value={newHwUser} size="small"
                                onChange={(e) => setNewHwUser(e.target.value)}>
                                {users.map(user => {
                                    return <MenuItem value={user} key={user}>{user}</MenuItem>
                                })}
                            </Select>
                        </div>
                        <div style={{ width: "50%" }}>
                            <Typography>Software</Typography>
                            <Select value={newSwUser} size="small"
                             onChange={(e) => setNewSwUser(e.target.value)}>
                                {users.map(user => {
                                    return <MenuItem value={user} key={user}>{user}</MenuItem>
                                })}
                            </Select>
                        </div>
                    </div>
                    <div style={{marginTop: "20px"}}>
                            <Button variant='contained' onClick={handleEditToday} disabled={!editedRows.id} sx={{marginRight: "10px"}}>Upravit den</Button>
                            <Button variant="contained" onClick={handleEditTillEnd} disabled={!editedRows.id} sx={{marginRight: "10px"}}>Upravit do konce pohotovosti</Button>
                            <Button variant='contained' onClick={handleEditWholeWeek} disabled={!editedRows.id}>Upravit celý týden</Button>
                        </div>
                    <div style={{marginTop: "20px"}}>
                        <Button variant='contained' onClick={handleFillCalendar} disabled={!emptyData}>Doplnit měsíc</Button>
                    </div>
                </div>
            }
        </>
    )
}