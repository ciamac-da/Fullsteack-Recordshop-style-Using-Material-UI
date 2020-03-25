import React from 'react';
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
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import { FilledInput } from '@material-ui/core'

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
  field:{
    '& label.Mui-focused': {
      color: 'green',
    },
    width:"25ch",
  },
  saveButton: {
    margin: theme.spacing(2),
    backgroundColor: "#ffffff",
    color: "green",
    fontFamily: "'Ubuntu', sans-serif",


  },
  deleteButton: {
    margin: theme.spacing(2),
    backgroundColor: "#ffffff",
    fontFamily: "'Ubuntu', sans-serif",

  },
  textColor: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "'Ubuntu', sans-serif",
    display:"flex", 
    flexDirection:"row", 
    justifyContent:"center", 
    alignItems:"center"
  },
  FabColor: {
    color: "#ff6f00",
    fontWeight: "bold"
  }
}));
/*
  Die Editor Komponente soll einen Benutzer
  vollständig bearbeiten können.
    - Dafür müssen wir als erstes,
      die daten für diesen Benutzer abholen
    - Ein Formular soll dem Admin die änderungen
      ermöglichen
    - Drückte der Admin speichern, sollen die daten
      zum Backend geschickt werden
*/

function Editor({ match }) {
  const classes = useStyles()
  // Die [match]-prop kommt von React-Router-DOM und ist verfügar Wenn
  // wir einen :paramerter in der Route definiert haben.
  // Lese unseren :id paramer us react-router-dom mittels der [match]-prop
  //  id ist die id aus der datenbank
  const id = match.params.id;
  // definiere einen State um uns zu merken ob das fetch schon passiert ist
  const [abgerufen, setAbgerufen] = React.useState(false);
  // definiere einen State um uns die Benuterdaten zu merken
  const [daten, setDaten] = React.useState(false);
  // Wenn das fetch noch nicht passiert ist, dann rufe die
  // Daten aus dem backend ab
  if (!abgerufen) {
    setAbgerufen(true); // damit fetch nicht 2 mal passiert
    fetch(`/users/${id}`)
      .then(response => response.json())
      .then(data => setDaten(data))
  }
  // solange es keine daten gibt zeige nichts
  if (!daten) return null;
  // der altbekannte universal onChange handler
  const change = e => setDaten({
    ...daten,
    [e.target.name]: e.target.value
  });
  // Ein Benutzer wurde vom Admin geändert und soll
  // im Backend gespeichert werden
  //  - preventDefault damit das Formular sich nich verselbständigt
  //  - ein fetch mit der PUT methode schick die änderungen im
  //    JSON format an das Backend.
  const submit = e => {
    e.preventDefault();
    fetch(`/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(daten)
    })
      .then(response => response.json())
      .then(data => setDaten(data))
  }
  // Um einen Benutzer zu löschen schicken wir ein fetch
  //   mit der DELETE methode an das Backend
  const remove = e => {
    e.preventDefault();
    if (!window.confirm("Wirklich?!?!")) return;
    fetch(`/users/${id}`, { method: "DELETE" })
      .then(response => response.json())
      .then(data => console.log("und hopp"))
  }
  // Ganz einfaches JSX um es so klar wie möglich zu halten.
  return (
    <div >
      <Reveal>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table" >
            <TableHead>

              <TableRow>
                <TableCell align="center" className={classes.textColor}>First Name &nbsp; &nbsp; &nbsp;
      
                <form className={classes.field} noValidate autoComplete="off">
                
                    <TextField 
                     variant="filled" 
                     value={daten.firstName}
                     id="filled-size-normal"
                     name="firstName"
                     onChange={change}
                     spellCheck="false"

                     />
                
                </form>
     
                </TableCell>
              </TableRow>



              <TableRow >
                <TableCell 
                align="center" className={classes.textColor}>Last Name &nbsp; &nbsp; &nbsp;
      
                <form className={classes.field} noValidate autoComplete="off">
                
                    <TextField 
                     variant="filled" 
                     value={daten.lastName}
                     id="filled-size-normal"
                     name="lastName"
                     onChange={change}
                     spellCheck="false"
                     />
                
                </form>
                </TableCell>
      
                  
              </TableRow>
              
              <TableRow>
                <TableCell align="center" className={classes.textColor}>E-Mail Address
                
                <form className={classes.field} noValidate autoComplete="off">
                
                <FilledInput 
                  variant="filled" 
                 value={daten.email}
                 id="filled-size-normal"
                 name="email"
                //  onChange={change}
                readOnly
                 />
            
            </form>

    
                </TableCell>
              </TableRow>

              {/* <TableRow>
                <TableCell align="center" className={classes.textColor}>Password &nbsp;
      <Fab
                    name="password"
                    className={classes.FabColor}
                    variant="extended"
                    type="submit"
                    value={daten.password}
                    onChange={change}
                  >{daten.password}
                  </Fab>
                </TableCell>
              </TableRow> */}

            </TableHead>

            
            <TableBody>
              <TableRow>
                <TableCell align="center">

                  <Button
                    onClick={submit}
                    variant="contained"
                    className={classes.saveButton}
                    startIcon={<SaveIcon />}
                  >Save</Button>

                  <Button
                    onClick={remove}
                    vatiant="contained"
                    color="secondary"
                    className={classes.deleteButton}
                    startIcon={<DeleteIcon />}
                  >Delete
                 </Button>

                </TableCell>
              </TableRow>
              </TableBody>
          
          </Table>
        </TableContainer>
      </Reveal>
    </div>
  );
}

export default Editor;
