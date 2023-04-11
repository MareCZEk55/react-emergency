import React from 'react'
import { TableCell, TableRow } from '@mui/material';


export default function DetailTableRow({ props }) {
    const getFormatedDate = (date) => {
        let formatedDate = "";
        formatedDate = new Date(date).toLocaleDateString("cs-cz")
        return formatedDate;
    }

    const getNameDayFormated = (date) => {
        let retVal = "";
        retVal = new Date(date).toLocaleDateString("cs-CZ", { weekday: "long"})

        return retVal;
    }

    const isWeekend = (date) => {
        let numberOfDay = new Date(date).getDay();
        return (numberOfDay > 5 || numberOfDay === 0);
    }

    const isToday = (date) => {
        return new Date(date).setHours(0,0,0,0) === new Date().setHours(0,0,0,0);
    }

    let rowItems = [];
    const getRows = () => {
        props.map((row, i) => {
            rowItems.push(
                <TableRow key={i} sx={{ backgroundColor: isWeekend(row.date) ? 'lightskyblue' : '#fff', border: isToday(row.date) ? "solid" : "none"}}>
                    <TableCell>
                        {getFormatedDate(row.date)}
                    </TableCell>
                    <TableCell>
                        {getNameDayFormated(row.date)}
                    </TableCell>
                    <TableCell>
                        {row.hw_jmeno}
                    </TableCell>
                    <TableCell>
                        {row.sw_jmeno}
                    </TableCell>
                </TableRow>
            )
        })
        return rowItems;
    };

    return (
        <>
        { getRows() }
        </>
    )
}