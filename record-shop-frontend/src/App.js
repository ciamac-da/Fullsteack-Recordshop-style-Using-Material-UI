
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import OrderEditor from './components/orders/Editor';
import OrderList from './components/orders/List';
import RecordList   from './components/records/List';
import RecordEditor from './components/records/Editor';
import UserEditor   from './components/users/Editor';
import UserList     from './components/users/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AlbumIcon from '@material-ui/icons/Album';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  navBack:{
    backgroundColor:"#696969"
  },
  navjustify:{
    color:"	#D3D3D3" ,
    textDecoration:"none", 
    fontFamily: "'Ubuntu', sans-serif", 
    fontSize:"30px",
    fontWeight:"bold",
    textShadow:"3px 3px 3px  black"
  },
  records:{
      color:"#42a5f5",
      filter: "drop-shadow(0  0.3rem black)",
  },
   users:{
      color:"green",
      filter: "drop-shadow(0  0.3rem black)",
  },
  orders:{
    color:"red",
    filter: "drop-shadow(0  0.3rem black)",
  }
  
 
  
}));

function App() {
  const classes = useStyles()
  return (
  <div>
  <AppBar position="static">
<Toolbar className={classes.navBack}>
<Table>
  <TableRow>
    <TableCell align="center" >
    <Link to="/admin/records/" className={classes.navjustify}> <AlbumIcon className={classes.records}/>  Records &nbsp;</Link>
    <Link to="/admin/users/" className={classes.navjustify}><PersonIcon className={classes.users} /> Users &nbsp; </Link>
    <Link to="/admin/orders/" className={classes.navjustify}><ShoppingCartIcon className={classes.orders} /> Orders &nbsp;</Link>
    </TableCell>
  </TableRow>
</Table>



</Toolbar>
  </AppBar>

    <Switch>
     <Route path="/admin/orders/:id" component={OrderEditor}/>
      <Route path="/admin/orders/"    component={OrderList}/>
      <Route path="/admin/records/:id" component={RecordEditor}/>
      <Route path="/admin/records/"    component={RecordList}/>
      <Route path="/admin/users/:id"   component={UserEditor}/>
      <Route path="/admin/users/"      component={UserList}/>
    </Switch>

  </div>
  )}

export default App;
