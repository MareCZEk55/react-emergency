import * as React from 'react';
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { getCapitalizeFirstLetter } from "../../utils/utils.js";
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import { Box } from '@mui/material';
import { Stack } from '@mui/system';

export default function DetailDataGrid({ props , isEditEnable, setEditedRows } ) {
    
    const handleSaveClick = React.useCallback(
        (id) => () => {
            gridRows.forEach((row) => {
                if(row.id === id){
                setEditedRows(row)
                }
            })
        }
    )

    const gridCols = [
        { field: "date", headerName: "Datum", width: 150, sortable: false },
        { field: "day", headerName: "Den", sortable: false },
        { field: "hw_jmeno", headerName: "HW", width: 200, sortable: false, type: "singleSelect", editable: true },
        { field: "sw_jmeno", headerName: "SW", width: 200, sortable: false, type: "string", editable: true },
        {
            field: "upravit", headerName: "Upravit", sortable: false, type: "actions",
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<ModeEditIcon />}
                    label="Upravit"
                    onClick={handleSaveClick(params.id)}
                />
            ]
        },
    ];

    const getCols = () => {
        let retVal = [{ field: "date", headerName: "Datum", width: 150, sortable: false },
        { field: "day", headerName: "Den", sortable: false },
        { field: "hw_jmeno", headerName: "HW", width: 200, sortable: false, type: "singleSelect", editable: true },
        { field: "sw_jmeno", headerName: "SW", width: 200, sortable: false, type: "string", editable: true }];

        if(isEditEnable === true){
            retVal.push({
                field: "upravit", headerName: "Upravit", sortable: false, type: "actions",
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<ModeEditIcon />}
                        label="Upravit"
                        onClick={handleSaveClick(params.id)}
                    />
                ]
            })
        }

        return retVal;
    }

    const gridRows = [];
    props.forEach(row => {
        let newRow = {
            id: row.id,
            date: new Date(row.date).toLocaleDateString("cs-cz"),
            day: getCapitalizeFirstLetter(new Date(row.date).toLocaleDateString("cs-cz", { weekday: "long" })),
            hw_jmeno: row.hw_jmeno === null ? "" : row.hw_jmeno,
            sw_jmeno: row.sw_jmeno === null ? "" : row.sw_jmeno
        }
        gridRows.push(newRow);
    });

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport printOptions={{ hideFooter: true, hideToolbar: true }} csvOptions={{ disableToolbarButton: true }} />
            </GridToolbarContainer>
        )
    }

    const customNoRowsOverlay= () =>{
        return (
            <Stack height="100%" alignItems="center" justifyContent="center">
                <h1>Nenalezany žádné výsledky</h1>
            </Stack>
            )
    }

    return (
        <div style={{ height: "750px", width: "50%" }}>
            <Box sx={{height: "750px", 
                    '.weekend-row': {backgroundColor: "lightskyblue", "&:hover": {backgroundColor: "#56b6f1"}},
                    ".today-row": {border: "solid 1px red"},
                    }}>
            <DataGrid rows={gridRows}
                columns={getCols()}
                hideFooter
                disableColumnMenu
                components={{ Toolbar: CustomToolbar, NoRowsOverlay: customNoRowsOverlay}}
                localeText={{ toolbarExportPrint: "Tisk" }}
                rowHeight={25}
                getRowClassName={(params) => {
                    let retVal = "";
                    let todayDate = new Date();
                    let todayDateNoTime = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
                    if(params.row.day === "Sobota" || params.row.day ==="Neděle"){
                        retVal = "weekend-row";
                    }
                    let dateRow = new Date(params.row.date.split(".").reverse().join("/"))
                    if(dateRow.getTime() == todayDateNoTime.getTime()){
                        retVal += " today-row"
                    }
                    return retVal;
                }}
            />
            </Box>
        </div>
    )
}