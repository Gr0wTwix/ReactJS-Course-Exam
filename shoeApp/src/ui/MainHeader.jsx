// Importing files from Material-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import authSlice from '../store/auth-slice';

import { Link } from 'react-router-dom';

const linkStyle = { color: 'white', fontSize: '1.3rem', textDecoration: 'none' };

const MainHeader = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <AppBar position="static" style={{ height: '10vh', display: 'flex', justifyContent: 'center' }}>
        <Toolbar variant="dense" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/" style={{ ...linkStyle, fontSize: '3rem', display: 'inline-block'}}>
            <img src="images/shoesImage1.png" alt="text" style={{}}></img>
          </Link>
          <ul style={{ display: 'flex' }}>
            <li style={{ marginRight: '1.5rem' }}>
              <Link to='/create' style={linkStyle}>Create</Link>
            </li>
            <li style={{ marginRight: '1.5rem' }}>
              <Link onClick={() => dispatch(authSlice.actions.logout())} to='/' style={linkStyle}>Logout</Link>
            </li>
          </ul>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default MainHeader;

