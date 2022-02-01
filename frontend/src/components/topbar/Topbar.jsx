import './topbar.css';
import { Person, Chat, Notifications } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../actions/auth';
import decode from 'jwt-decode';

export default function Topbar() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const logout = () => {
        logout(dispatch, history);
    };

    const token = user.auth_token;
    if (token) {
        const decodeToken = decode(token);
        if (decodeToken.exp * 1000 < new Date().getTime()) logout();
    }

    return (
        <div className='topbarContainer'>
            <div className='topbarLeft'>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <span className='logo'>Messenger</span>
                </Link>
            </div>
            <div className='topbarRight'>
                <div className='topbarIcons'>
                    <div className='topbarIconItem'>
                        <Button onClick={logout}>
                            <Person />
                        </Button>
                    </div>
                    <div className='topbarIconItem'>
                        <Chat />
                        <span className='topbarIconBadge'>2</span>
                    </div>
                    <div className='topbarIconItem'>
                        <Notifications />
                        <span className='topbarIconBadge'>1</span>
                    </div>
                </div>
                {/* <Link to={`/profile/${user.username}`}>
                    <img
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : PF + 'person/noAvatar.png'
                        }
                        alt=''
                        className='topbarImg'
                    />
                </Link> */}
            </div>
        </div>
    );
}
