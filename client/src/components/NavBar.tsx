import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TagIcon from '@mui/icons-material/Tag';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LoginIcon from '@mui/icons-material/Login';
import { Button, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectIsLogin, selectUser } from '../features/redux/user/userSlice';
import { addNewRoom, selectRooms, setRoomsTo } from '../features/redux/rooms/roomsSlice';
import { useEffect } from 'react';
import { joinRoom, loadRooms } from '../http/messageAPI';
import { useNavigate } from 'react-router-dom';
import { ROOM_WITH_PARAM_ROUTE } from '../lib/utils/routes';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '15ch',
      '&:focus': {
        width: '28ch',
      },
    },
  },
}));

const StyledModifInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: null
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function NavBar() {
  const isLogin = useAppSelector(selectIsLogin);
  const {id}: any = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const rooms = useAppSelector(selectRooms);
  const navigate = useNavigate();

  const [toggleBar, setToggleBar] = React.useState(false)
  const [roomToJoin, setRoomToJoin] = React.useState('')
  const theme = useTheme()

  const handleJoinRoom = (e: any) => {
    e.preventDefault();
    joinRoom(id, roomToJoin).then(data => {
      dispatch(addNewRoom({roomId: roomToJoin, id}));
      setRoomToJoin('');
    })
  }

  useEffect(() => {
    if(isLogin) {
      loadRooms(id).then(data => {
        dispatch(setRoomsTo(data));
      })
    }
  }, [isLogin])
  

  return (
    <Box className='navbar' sx={{ flexGrow: 1 }}>
      <CssBaseline />
      {isLogin ?
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => setToggleBar(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              {/* Logo */}
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                style={{transition: 'none'}}
              />
            </Search>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: 250,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 250,
              boxSizing: 'border-box',
            },
          }}
          style={{overflow: "hidden"}}
          variant="persistent"
          anchor="left"
          open={toggleBar}
        >
          <div style={{overflow: "auto"}}>
            <DrawerHeader>
              <form onSubmit={handleJoinRoom}>
                <Search>
                  <SearchIconWrapper>
                    <AddBoxIcon />
                  </SearchIconWrapper>
                  <StyledModifInputBase
                    placeholder="Join"
                    inputProps={{ 'aria-label': 'search' }}
                    value={roomToJoin}
                    onChange={e => {
                      setRoomToJoin(e.target.value)
                    }}
                  />
                </Search>
              </form>
              <IconButton onClick={() => setToggleBar(false)}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {rooms.map((room: any) => 
                <ListItem key={room.roomId}>
                  <ListItemButton onClick={() => {
                    navigate(ROOM_WITH_PARAM_ROUTE(room.roomId))
                  }}>
                    <ListItemIcon>
                      <TagIcon />
                    </ListItemIcon>
                    <ListItemText primary={room.roomId} />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </div>
        </Drawer>
      </>
      :
      <AppBar position="static">
        <Toolbar sx={{flexDirection: "row-reverse"}}>
          <Button style={{color: "inherit"}}>
            login
            <LoginIcon style={{marginLeft: "6px"}} />
          </Button>
        </Toolbar>
      </AppBar>
      }
      
    </Box>
  );
}