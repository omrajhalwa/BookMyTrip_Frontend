

import NavBar from './NavBar';
import Home from './Home';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';



export default function Parent() {

    const navigate = useNavigate();
    const user = useSelector((store: RootState) => store.userSlice.user);

    useEffect(() => {
    
        if (!user.email) {
            navigate('/login');
        }
    }, [])

    return (
        <div>
            
            <Home />
        </div>
    )
}