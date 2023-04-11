import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function InnerGrid({props}) {
    //console.log(props)
    return (
        <Grid item xs={6} sx={{ borderRadius: "10px", borderStyle: "outset", borderColor: "white", borderWidth: "10px" }}>
            <Typography gutterBottom variant='h2' sx={{ color: "#ff0000", marginBottom: "0px" }}>               
                {props.nazev}
            </Typography>
            <Typography gutterBottom variant='h3' sx={{ color: "white", marginBottom: "25px" }}>               
                {props.popis}
            </Typography>
            <Typography gutterBottom variant='h2' sx={{ color: "#ff0000", marginBottom: "0px" }}>               
                {props.telefon}
            </Typography>
            <Typography gutterBottom variant='h3' sx={{ color: "white" }}>               
                {props.jmeno}
            </Typography>
        </Grid>
    );
}