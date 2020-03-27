import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Reveal from 'react-reveal/Reveal';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { FilledInput, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import modifyImg from '../../img/modify.jpg';
import CardActions from '@material-ui/core/CardActions';

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
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 340,
    minWidth:340,
    backgroundColor:"#42a5f5",
    margin:"25px",
    wordBreak:"no-break",
    display:"inline-table"
    },
    media: {
      height: 140,
    },
  field: {
    '& label.Mui-focused': {
      color: 'green',
    },
    width: "25ch",
  },
  textColor: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "'Ubuntu', sans-serif",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

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
  },
  filledStyle:{
    color:"white", 
    fontWeight:"bold"
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
  Buttons:{
    justifyContent:"center"
  }
}));
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
    fetch(`/records/${id}`)
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
    fetch(`/records/${id}`, {
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
    fetch(`/records/${id}`, { method: "DELETE" })
      .then(response => response.json())
      .then(data => console.log("hä"))
  }
  // Ganz einfaches JSX um es so klar wie möglich zu halten.
  return (

    <div className={classes.DivStyle}>
      <Reveal>
      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={modifyImg}
        />
        <CardContent align="center"
        >
                <Typography
               className={classes.Typo}
                >
                Year&nbsp;
                    <FilledInput
                      className={classes.filledStyle}
                      variant="filled"
                      value={daten.year}
                      id="filled-size-normal"
                      name="year"
                      onChange={change}
                      spellCheck="false"
                      //readOnly
                    />
          </Typography>
            

                   <Typography
        className={classes.Typo}
                   > 
                   Title&nbsp;&nbsp;
                    <FilledInput
                      className={classes.filledStyle}
                      variant="filled"
                      value={daten.title}
                      id="filled-size-normal"
                      name="title"
                      onChange={change}
                      spellCheck="false"
                      //readOnly
                    />
                  </Typography>


                    <Typography
                   className={classes.Typo}
                    >
                    Artist
                    <FilledInput
                      className={classes.filledStyle}
                      variant="filled"
                      value={daten.artist}
                      id="filled-size-normal"
                      name="artist"
                      onChange={change}
                      spellCheck="false"
                     // readOnly
                    />
                  </Typography>


                   <Typography
                 className={classes.Typo}
                   >
                    Price&nbsp;
                    <FilledInput
                      className={classes.filledStyle}
                      variant="filled"
                      value={daten.price} $
                      id="filled-size-normal"
                      name="price"
                      onChange={change}
                      type="number"
                      spellCheck="false"
                    />
                  </Typography>


        </CardContent>
        </CardActionArea>

<CardActions className={classes.Buttons} >
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
               </CardActions>

      </Card>
      </Reveal>
    </div>

  );
}

export default Editor;
