import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Reveal from 'react-reveal/Reveal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
    backgroundColor: "#ff6f00",
    
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),

    },
  },
  none:{
    color: "gray",
    backgroundColor:"gray"
   },
  textColor: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "'Ubuntu', sans-serif",
  },
  FabColor: {
    color: "#ff6f00",
    fontFamily: "'Ubuntu', sans-serif",
    fontWeight: "bold"
  },
  FabMainColor: {
    color: "#ff6f00",
    fontWeight: "bold",
    fontFamily: "'Ubuntu', sans-serif",
    textDecoration:"none"

  }
}));
function List() {
  const classes = useStyles()
  const [abgerufen,setAbgerufen] = React.useState(false);
  const [daten,setDaten]         = React.useState(false);
  if ( ! abgerufen )
    fetch('/users/')
    .then( response => response.json() )
    .then( users => {
      setAbgerufen(true);
      setDaten(users);
    })
  return (
    <div>
    <Reveal>

<TableContainer component={Paper}>
<Table className={classes.table} size="small" aria-label="a dense table" >
  <TableHead>
  </TableHead>
    { daten ? (
      daten.map( user => (
        <TableBody>
       
        <TableRow>
          <TableCell  align="center" className={classes.textColor}>User Details&nbsp;
        <Link 
        to={`/admin/users/${user.id}`}
        className={classes.FabMainColor}
        >
        <Fab
            className={classes.FabMainColor}
                   name="user ID"
                    variant="extended"
        >
         Click here to see more details
        </Fab>
        </Link>
        </TableCell>
        </TableRow>

        <TableRow>
        <TableCell  align="center" className={classes.textColor}>First Name &nbsp;
        <Fab
          className={classes.FabColor}
                    name="First Name"
                    variant="extended"
                    
        >
        {user.firstName}
        </Fab>
        </TableCell>
    </TableRow>

    <TableRow>
        <TableCell  align="center" className={classes.textColor}>Last Name &nbsp;
        <Fab
          className={classes.FabColor}
                    name="Last Name"
                    variant="extended"
                    
        >
        {user.lastName}
        </Fab>
        </TableCell>
    </TableRow>


    <TableRow>
        <TableCell  align="center" className={classes.textColor}>Full Name &nbsp;
        <Fab
          className={classes.FabColor}
                    name="Full Name"
                    variant="extended"
                    
        >
        {user.fullName}
        </Fab>
        </TableCell>
    </TableRow>

    <TableRow>
        <TableCell  align="center" className={classes.textColor}>E-Mail Address &nbsp;
        <Fab
          className={classes.FabColor}
                    name="Full Name"
                    variant="extended"
                    
        >
        {user.email}
        </Fab>
        </TableCell>
    </TableRow>

    <TableRow>
        <TableCell  align="center" className={classes.textColor}>Password &nbsp;
        <Fab
          className={classes.FabColor}
                    name="Password"
                    variant="extended"
                    
        >
        {user.password}
        </Fab>
        </TableCell>
    </TableRow>
    
    <TableRow className={classes.none}>
                <TableCell> <h5 className={classes.none}>HÄ:D</h5> </TableCell>
              </TableRow>

      </TableBody>

      ))
  ) : null }
  </Table>
        </TableContainer>
      </Reveal>
  </div> )
}

export default List;
