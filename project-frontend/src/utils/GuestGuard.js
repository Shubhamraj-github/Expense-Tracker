import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JWTContext from '../contexts/JWTContext';

const GuestGuard = ({ children }) => {
    const { isLoggedIn, isInitializing } = useContext(JWTContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isInitializing) return;

        if (isLoggedIn) {
            navigate('/dashboard', { replace: true }); 
        }
    }, [isLoggedIn, isInitializing, navigate]);

    return !isInitializing && !isLoggedIn ? children : null;
};

GuestGuard.propTypes = {
    children: PropTypes.node.isRequired
};

export default GuestGuard;