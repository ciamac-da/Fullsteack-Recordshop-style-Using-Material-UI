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
import userImg from '../../img/users.jpg';


const useStyles = makeStyles(theme => ({
  
  root: {
    maxWidth: 340,
    minWidth:340,
    backgroundColor:"#b65a3b",
    margin:"25px",
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
    fetch('/users/')
      .then(response => response.json())
      .then(users => {
        setAbgerufen(true);
        setDaten(users);
      })
  return (
    <div className={classes.DivStyle}>
            {daten ? (
              daten.map(user => (
          <Reveal>
          <Card className={classes.root}>
                
                <CardActionArea>
               <CardMedia
          className={classes.media}
          image={userImg}
        />
        <CardContent align="center"
        >
                      <Link
                        to={`/admin/users/${user.id}`}
                        className={classes.FabMainColor}
                       >
                        <Fab
                          className={classes.FabMainColor}
                          name="user ID"
                          variant="extended"
                         >
                          Click here to Modify
                        </Fab>
                      </Link>
                     
                      <Typography 
                      variant="body2" 
                      title={user.firstName}
                      color="textSecondary" 
                      component="p"
                      className={classes.Typo}
                      >
                      First Name :&nbsp;{user.firstName}
                     </Typography>

                     <Typography 
                      variant="body2" 
                      title={user.lastName}
                      color="textSecondary" 
                      component="p"
                      className={classes.Typo}
                      >
                      Last Name :&nbsp;{user.lastName}
                     </Typography>

                     <Typography 
                      variant="body2" 
                      title={user.fullName}
                      color="textSecondary" 
                      component="p"
                      className={classes.Typo}
                      >
                      Full Name :&nbsp;{user.fullName}
                     </Typography>



                     <Typography 
                      variant="body2" 
                      title={user.email}
                      color="textSecondary" 
                      component="p"
                      className={classes.Typo}
                      >
                      {user.email}
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
