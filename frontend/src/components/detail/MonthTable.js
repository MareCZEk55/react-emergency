import React from 'react'

import {Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material';
import DetailTableRow from './DetailTableRow';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

export default function MonthTable({ props }) {
    return (
        <>
        <TableContainer component={Paper}>
            <Table size="small" sx={{width: "900px"}}>
            <TableHead>
                <TableRow>
                    <StyledTableCell sx={{width: "100px"}}>
                        Datum
                    </StyledTableCell>
                    <StyledTableCell>
                        Den
                    </StyledTableCell>
                    <StyledTableCell>
                        HW
                    </StyledTableCell>
                    <StyledTableCell>
                        SW
                    </StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <DetailTableRow props={props}/>
            </TableBody>
            </Table>
            </TableContainer>
        </>
    )
}