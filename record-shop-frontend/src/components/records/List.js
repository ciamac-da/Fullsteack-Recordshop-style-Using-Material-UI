import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Reveal from 'react-reveal/Reveal';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import recordImg from '../../img/records.JPG';

const useStyles = makeStyles(theme => ({
  
  root: {
    maxWidth: 330,
    minWidth: 330,
    backgroundColor:"#42a5f5",
    margin:"15px",
    wordBreak:"no-break",
    display:"inline-table"
  
  },
  media: {
    height: 140,
  },
  FabMainColor: {
    color: "black",
    fontWeight: "bold",
    fontFamily: "'Ubuntu', sans-serif",
    textDecoration: "none"},
  Typo:{
    fontSize:"20px" ,   
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "'Ubuntu', sans-serif",
    color:"#ffffff",
    textShadow:"3px 3px 3px  black",
  },
  DivStyle:{
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"space-around",
    backgroundColor:"silver",
  }
}));



function List() {
  const classes = useStyles()
  const [abgerufen, setAbgerufen] = React.useState(false);
  const [daten, setDaten] = React.useState(false);
  if (!abgerufen)
    fetch('/records/')
      .then(response => response.json())
      .then(records => {
        setAbgerufen(true);
        console.log(records);
        setDaten(records);
      })
  return (
    <div className={classes.DivStyle}>
    {daten ? (
              daten.map(record => (
      <Reveal>
      <Card className={classes.root} 
      >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={recordImg}
        />
        <CardContent align="center"
        >
          <Link
                      to={`/admin/records/${record._id}`}
                      className={classes.FabMainColor}
                      >
                        <Fab
                        className={classes.FabMainColor}
                        name="Record ID"
                        variant="extended"
                      >
                        Click here to Modify
                     </Fab>
                    </Link>

          <Typography 
          variant="body2" 
          title={record.year}
          color="textSecondary" 
          component="p"
          className={classes.Typo}
          >
           Year :&nbsp;{record.year}
          </Typography>
        
          <Typography 
          variant="body2" 
          title={record.title}
          color="textSecondary" 
          component="p"
          className={classes.Typo}
          >
           Title :&nbsp;{record.title}
          </Typography>

          <Typography 
          variant="body2" 
          title={record.artist}
          color="textSecondary" 
          component="p"
          className={classes.Typo}
          >
           Artist :&nbsp;{record.artist}
          </Typography>


          <Typography 
          variant="body2" 
          title={record.price}
          color="textSecondary" 
          component="p"
          className={classes.Typo}
          >
           Price :&nbsp;{record.price}$
          </Typography>

        </CardContent>
      </CardActionArea>

</Card>

      </Reveal>
              ))
            ) : null}
    </div>)
}

export default List;
