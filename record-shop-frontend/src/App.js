
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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AlbumIcon from '@material-ui/icons/Album';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 180;



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  navBack:{
    backgroundColor:"#696969",
    color:"#D3D3D3"
  },
  navjustify:{
    color:"	#D3D3D3" ,
    textDecoration:"none", 
    fontFamily: "'Ubuntu', sans-serif", 
    fontSize:"30px",
    fontWeight:"bold",
    textShadow:"3px 3px 3px  black",
  },
DrawerText:{
  color:"	#D3D3D3" ,
  textDecoration:"none", 
  fontFamily: "'Ubuntu', sans-serif", 
  fontSize:"20px",
  fontWeight:"bold",
  textShadow:"3px 3px 3px  black",
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
  },
  list: {
    width: 150,
  },
  fullList: {
    width: 'auto',
  },

  dis: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:"#696969"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function App() {
  
  const classes = useStyles()

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return(
  <div className={classes.dis}>
  <CssBaseline />
  <AppBar
    position="fixed"
    className={clsx(classes.appBar, {
      [classes.appBarShift]: open,
    })}
  >
    <Toolbar
    className={classes.navBack}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Link to="/" style={{textDecoration:"none"}}
    >
      <Typography variant="h4" noWrap
      className={classes.navjustify}
      >
      
        Record Shop
      </Typography>
      </Link>
    </Toolbar>
  </AppBar>
  <Drawer
    className={classes.drawer}
    variant="persistent"
    anchor="left"
    open={open}
    classes={{
      paper: classes.drawerPaper,
    }}
  >
  
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    <div className={classes.drawerHeader}>
    </div>
    <Divider />

    <List >
        <Link to="/admin/records/" className={classes.DrawerText}> <AlbumIcon className={classes.records}/>  Records &nbsp;</Link>
    </List>


    <List>
        <Link to="/admin/users/" className={classes.DrawerText}><PersonIcon className={classes.users} /> Users &nbsp; </Link>
    </List>

    <List>
       <Link to="/admin/orders/" className={classes.DrawerText}><ShoppingCartIcon className={classes.orders} /> Orders &nbsp;</Link>
    </List>

    <Divider />
  </Drawer>
  <main
    className={clsx(classes.content, {
      [classes.contentShift]: open,
    })}
  >
    <div className={classes.drawerHeader} />
   
    <Switch>
     <Route path="/admin/orders/:id" component={OrderEditor}/>
      <Route path="/admin/orders/"    component={OrderList}/>
      <Route path="/admin/records/:id" component={RecordEditor}/>
      <Route path="/admin/records/"    component={RecordList}/>
      <Route path="/admin/users/:id"   component={UserEditor}/>
      <Route path="/admin/users/"      component={UserList}/>
    </Switch>
  </main>
</div>
);
}  
export default App;
