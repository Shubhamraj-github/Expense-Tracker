import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import JWTContext from '../contexts/JWTContext';

const AuthGuard = ({ children }) => {
    const { isLoggedIn, isInitializing, logout } = useContext(JWTContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isInitializing) return;

        const token = sessionStorage.getItem('serviceToken');

        if (!isLoggedIn || !token) {
            logout();
            navigate('/', {
                state: { from: location.pathname },
                replace: true
            });
        }
    }, [isLoggedIn, navigate, location.pathname, isInitializing, logout]);

    return !isInitializing && isLoggedIn ? children : null;
};

AuthGuard.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthGuard;