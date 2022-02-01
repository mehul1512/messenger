import * as api from '../api/index';

export const login = (email, password, router) => async (dispatch) => {
    try {
        dispatch({ type: 'LOGIN_START' });
        const result = await api.postLogin(email, password);
        console.log('result', result.data.existingUser);
        localStorage.setItem(
            'profile',
            JSON.stringify(result.data.existingUser)
        );
        dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.existingUser });
        router.push('/messenger');
    } catch (err) {
        dispatch({ type: 'LOGIN_FAILURE', payload: err });
        console.log(err);
    }
};

export const register = (user, router) => async (dispatch) => {
    try {
        dispatch({ type: 'REGISTER_START' });
        const result = await api.postRegister(user);
        dispatch({ type: 'REGISTER_SUCCESS', payload: result.data });
        router.push('/messenger');
    } catch (err) {
        dispatch({ type: 'REGISTER_FAILURE', payload: err });
        console.log(err);
    }
};

export const logout = () => (dispatch, router) => {
    dispatch({ type: 'LOGOUT' });
    router.push('/login');
};
