import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

const phone2path = "/pohotovost/phone2.png";
const phone3path = "/pohotovost/phone3.png";

export default function ResInnerGrid() {
    return (
        <Grid item xs={6} sx={{ borderRadius: "10px", borderStyle: "outset", borderColor: "white", borderWidth: "10px" }}>
            <Typography gutterBottom variant='h4' sx={{ color: "#ff0000", marginBottom: "0px" }}>
                OUN RES TÝM
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography gutterBottom variant='h5' sx={{ color: "white", marginBottom: "0px" }}>
                        Z pevné linky
                    </Typography>
                    <Typography gutterBottom variant='h5' sx={{ color: "white", marginBottom: "0px" }}>
                        ARO: 2222
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom variant='h5' sx={{ color: "white", marginBottom: "0px" }}>
                        Ze služ. mob. tel.
                    </Typography>
                    <Typography gutterBottom variant='h5' sx={{ color: "white", marginBottom: "0px" }}>
                        ARO: 52222
                    </Typography>
                </Grid>

            </Grid>
            <Typography gutterBottom variant='h5' sx={{ color: "white", marginBottom: "0px" , marginTop: "10px"}}>
                V případě výpadku pevných linek
            </Typography>
            <Typography gutterBottom variant='h5' sx={{ color: "white", marginBottom: "0px" }}>
                ARO: 702 289 564&ensp;
                <img src={phone3path}
                        alt="Stolni telefon"
                        style={{
                            height: "32px",
                            width: "32px",
                            verticalAlign: "middle"
                        }} />
            </Typography>
            <hr />

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography gutterBottom variant='h5' sx={{ color: "white", marginBottom: "0px" }}>
                        Záchranka: 155
                    </Typography>
                    <Typography gutterBottom variant='h5' sx={{ color: "white", marginBottom: "0px" }}>
                        Tísňová volání: 112
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom variant='h5' sx={{ color: "white", marginBottom: "0px" }}>
                        Hasiči: 150
                    </Typography>
                    <Typography gutterBottom variant='h5' sx={{ color: "white", marginBottom: "0px" }}>
                        Policie: 158
                    </Typography>
                </Grid>
            </Grid>

            <hr />


            <Grid container spacing={2} alignItems="center" sx={{color: "white", fontSize: "22px"}} >
                <Grid item xs={6}>
                    <img
                        src={phone2path}
                        alt="Stolni telefon"
                        style={{
                            height: "32px",
                            width: "32px",
                            verticalAlign: "middle"
                        }} /> Ostraha: 7777
                </Grid>
                <Grid item xs={6}>
                <img
                        src={phone3path}
                        alt="Stolni telefon"
                        style={{
                            height: "32px",
                            width: "32px",
                            verticalAlign: "middle"
                        }} />  Ostraha: 725 639 835
                </Grid>
            </Grid>
        </Grid>
    );
}
