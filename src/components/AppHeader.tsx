import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';

import { Link } from "react-router-dom";

export default function AppHeader() {

  type Anchor = 'menuDrawer'

  const [state, setState] = React.useState({
    menuDrawer: false,
  });
  
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const userName: string = ''

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={userName} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key='プロフィール編集' disablePadding>
          <ListItemButton>
            <Link to={`/ProfileEdit/`}>
              <ListItemText primary='プロフィール編集' />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem key='サインアウト' disablePadding>
          <ListItemButton>
            <ListItemText primary='サインアウト' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer('menuDrawer', true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            sx={{ width: 540}}
            anchor={'left'}
            open={state['menuDrawer']}
            onClose={toggleDrawer('menuDrawer', false)}
          >
            {list('menuDrawer')}
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} textAlign="center">
            Resume-app-react
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
