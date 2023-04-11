import { Button, IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import MonthTable from '../components/detail/MonthTable.js'
import { getCapitalizeFirstLetter } from "../utils/utils.js"
import DetailDataGrid from '../components/detail/DetailDataGrid.js';
import DetailEditTable from '../components/detail/DetailEditTable.js';

export default function Detail() {
    const [data, setData] = useState([]);

    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [isEditEnable, setIsEditEnable] = useState(false);
    const [editedRows, setEditedRows] = useState({})
    const [refreshTable, setRefreshTable] = useState(false)

    const onChangeIsEditEnable = (newState) => {
        setIsEditEnable(newState)
    };

    const handleSetEditedRows = (newRow) => {
        setEditedRows(newRow)
    };

    const handleSetRefreshTable = (newState) => {
        setRefreshTable(newState)
    };

    const getMonthName = () => {
        let monthLocale = new Date(year, (month - 1)).toLocaleDateString("cs-cz", { month: "long" });
        monthLocale = getCapitalizeFirstLetter(monthLocale);
        return monthLocale;
    }

    useEffect(() => {
        axios.get("http://192.168.30.200:3030/currentmonth", { params: { month: month, year: year } }).then(
            response => {
                setData(response.data);
            }
        ).catch(err => {
            console.log(err);
        })
        // eslint-disable-next-line
    }, [month, refreshTable])

    const handleClick = (direction) => {
        let newMonth = month;
        if (direction === "back") {
            if (month === 1) {
                newMonth = 12;
                setYear(year - 1)
            } else {
                newMonth--;
            }
        } else if(direction === "forward") {
            if (month === 12) {
                newMonth = 1;
                setYear(year + 1);
            } else {
                newMonth++;
            }
        } else{
           newMonth = new Date().getMonth() +1; 
        }
        setMonth(newMonth)
    }

    return (
        <div style={{ marginLeft: "20px", marginRight: "20px" }}>
            <div style={{ marginBottom: "10px" }}>
                <div>
                    <IconButton color="primary" aria-label="back-button" size="large" sx={{padding: "0px", paddingLeft: "8px", paddingRight: "8px"}}
                        onClick={() => handleClick("back")}>
                        <ArrowCircleLeftOutlinedIcon fontSize="inherit" />
                    </IconButton>
                    Měsíc: {getMonthName()},
                    Rok: {year}
                    <IconButton color="secondary" aria-label="forward-button" size="large" sx={{ padding: "0px", paddingLeft: "8px", paddingRight: "8px" }}
                        onClick={() => handleClick("forward")}>
                        <ArrowCircleRightOutlinedIcon fontSize="inherit" />
                    </IconButton>
                </div>
                <div>
                    <Button sx={{padding: "0px"}} title='Dnešní datum' variant='contained'
                        onClick={() => handleClick("today")}>
                        Dnes
                    </Button>
                </div>
            </div>

            {/* <MonthTable props={data} /> */}

            <div style={{display: "flex"}}>
            <DetailDataGrid props={data} isEditEnable={isEditEnable} setEditedRows={handleSetEditedRows} />
            <div style={{flex: "50%"}}>
                <DetailEditTable setIsEditEnable={onChangeIsEditEnable} editedRows={editedRows} setRefreshTable={handleSetRefreshTable} month={month} emptyData={data.length === 0}/>
            </div>
            </div>
        </div>
    )
}
