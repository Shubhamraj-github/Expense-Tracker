import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import CryptoJS from 'crypto-js';
import { jwtDecode } from 'jwt-decode';
import axios from '../utils/axios';
import authReducer from './auth-reducer/auth';
import { LOGIN, LOGOUT } from './auth-reducer/actions';
import { useSnackbar } from '../utils/SnackbarProvider';
import Loader from '../commoncomponents/Loader/LoaderCommon';
import { StatusCode } from '../utils/commonEnum';

const JWT_SECRET = 'a2a70b769e6d4d12336723d11273e93b';

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};


const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, JWT_SECRET);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) return false;
    const decoded = jwtDecode(decryptData(serviceToken));
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        sessionStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        sessionStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};


const JWTContext = createContext(0);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [isInitializing, setIsInitializing] = useState(true);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = sessionStorage.getItem('serviceToken');
                if (serviceToken && verifyToken(serviceToken)) {
                    setSession(serviceToken);

                    const response = await axios.post('auth/getProfile', {});
                    const user = response.data.data[0];
                    const enToken = jwtDecode(decryptData(serviceToken));
                    user.type = enToken.userType;
                    dispatch({
                        type: LOGIN,
                        payload: { isLoggedIn: true, user }
                    });

                } else {
                    dispatch({ type: LOGOUT });
                }
            } catch (err) {
                console.error('err', err);
                dispatch({ type: LOGOUT });
            } finally {
                setIsInitializing(false);
            }
        };

        init();
    }, []);

    const login = async (email, password) => {
        let apiRoute = 'auth/login';
        try {
            const response = await axios.post(apiRoute, { email, password });
            if (response.data.statusCode == StatusCode.success) {
                const serviceToken = response.data?.data[0]?.token;
                const user = response.data?.data[0];
                const enToken = jwtDecode(decryptData(serviceToken));
                user.type = enToken.userType;
                setSession(serviceToken);
                dispatch({
                    type: LOGIN,
                    payload: { isLoggedIn: true, user }
                });
                showSnackbar(response.data.message, 'success');
                return true;
            }
        } catch (err) {
            showSnackbar(err.message, 'error')
        }
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    if (isInitializing) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout }}>
            {children}
        </JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
