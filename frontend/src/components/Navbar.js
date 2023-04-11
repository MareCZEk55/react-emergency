import React from "react";
import { Button } from "@mui/material"
import { Link as DomLink} from 'react-router-dom';

function getCurrentDate() {
    let retVal = "";
    let datum = new Date();

    let denTextCesky = datum.toLocaleDateString("cs", { weekday: "long" })
    denTextCesky = getCapitalizeFirstLetter(denTextCesky);
    retVal = denTextCesky + ", " + datum.getDate() + "." + (datum.getMonth() + 1) + "." + datum.getFullYear();

    return retVal;
}

function getCapitalizeFirstLetter(text) {
    const str = text.charAt(0).toUpperCase() + text.slice(1);
    return str;
}

export default function Navbar() {
    return (
        <>

            <header className='headerBorder'>
                <div className='headerLinks' style={{display: "flex", width: "100%"}}>
                    <div style={{width: "33%", marginTop: "10px"}}>
                    <Button component={DomLink} to="/" variant="contained" color="primary" sx={{marginRight: "5px"}}>Aktuální den</Button>
                    <Button component={DomLink} to="/detail" variant="contained" color="primary">Měsíční přehled</Button>
                    </div>

                    <div className='mainHeader' style={{width: "33%"}}>
                        <p>Tabulka pohotovostí pro aktuální den.</p>
                        <p>Dnes je: {getCurrentDate()}</p>
                    </div>
                </div>
            </header>
        </>
    )
}