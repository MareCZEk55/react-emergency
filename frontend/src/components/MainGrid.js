import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { grid } from '@mui/system';
import InnerGrid from './InnerGrid';
import ResInnerGrid from './ResInnerGrid';

export default function MainGrid({ props }) {

  let gridItems = [];


  const getGridItems = () => {
    for (let i = 0; i < Object.keys(props).length; i++) {
      const keyValue = Object.keys(props)[i];
      const zkratkaZodpovednost = props[i].zkratka;
      if (zkratkaZodpovednost === "hw" && i === 0) {
        gridItems.push(<InnerGrid props={props[i]} key={keyValue}/>)
      } else if(zkratkaZodpovednost === "sw" && i === 1){
        gridItems.push(<InnerGrid props={props[i]} key={keyValue}/>)
      } else if(zkratkaZodpovednost === "ptu" && i === 2){
        gridItems.push(<InnerGrid props={props[i]} key={keyValue}/>)
      }
    }
    return gridItems;
  };

  return (
    <Paper
      sx={{
        backgroundColor: "#00408b"
      }}>
      <Grid container rowSpacing={3} columnSpacing={3} alignItems="stretch" justifyContent="space-evenly" sx={{ height: "85vh", borderRadius: "10px", marginLeft: "0px", marginTop: "0px", paddingRight: "25px" }}>
        {getGridItems()}
        <ResInnerGrid/>
      </Grid>
    </Paper>
  );
}