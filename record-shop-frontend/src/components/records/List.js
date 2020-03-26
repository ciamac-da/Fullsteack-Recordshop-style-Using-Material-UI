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
import Fab from '@material-ui/core/Fab';


const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
    backgroundColor: "#b65a3b",
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  none: {
    backgroundColor: "#696969"
  },
  textColor: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "'Ubuntu', sans-serif",
  },
  FabColor: {
    color: "black",
    fontFamily: "'Ubuntu', sans-serif",
    fontWeight: "bold"
  },
  FabMainColor: {
    color: "black",
    fontWeight: "bold",
    fontFamily: "'Ubuntu', sans-serif",
    textDecoration: "none"
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
    <div>
      <Reveal>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table" >
            <TableHead>
            </TableHead>
            {daten ? (
              daten.map(record => (

                <TableBody>
                  <TableRow>
                    <TableCell align="center" className={classes.textColor}>Record Details&nbsp;
                      <Link
                        to={`/admin/records/${record._id}`}
                        className={classes.FabMainColor}
                        >
                        <Fab
                          className={classes.FabMainColor}
                          name="Record ID"
                          variant="extended"
                        >
                          Click here to see more details
                       </Fab>
                      </Link>
                    </TableCell>
                  </TableRow>


                  <TableRow>
                    <TableCell align="center" className={classes.textColor}>Year &nbsp;
                      <Fab
                        className={classes.FabColor}
                        name="Record Year"
                        variant="extended"
                       >
                        {record.year}
                      </Fab>
                    </TableCell>
                  </TableRow>


                  <TableRow>
                    <TableCell align="center" className={classes.textColor}>Title &nbsp;
                      <Fab
                        className={classes.FabColor}
                        name="Record Title"
                        variant="extended"
                       >
                        {record.title}
                      </Fab>
                    </TableCell>
                  </TableRow>


                  <TableRow>
                    <TableCell align="center" className={classes.textColor}>Artist &nbsp;
                      <Fab
                        className={classes.FabColor}
                        name="Record Artist"
                        variant="extended"
                      >
                        {record.artist}
                      </Fab>
                    </TableCell>
                  </TableRow>


                  <TableRow>
                    <TableCell align="center" className={classes.textColor}>Price &nbsp;
                      <Fab
                        className={classes.FabColor}
                        name="Record Price"
                        variant="extended"
                       >
                        {record.price} $
                      </Fab>
                    </TableCell>
                  </TableRow>


                  <TableRow className={classes.none}>
                    <TableCell> <h5>&nbsp;</h5> </TableCell>
                  </TableRow>

                </TableBody>
              ))
            ) : null}
          </Table>
        </TableContainer>
      </Reveal>
    </div>)
}

export default List;
