import * as actionType from '../constants/actionTypes';

const authReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case actionType.LOGIN_START:
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case actionType.LOGIN_SUCCESS:
            localStorage.setItem(
                'profile',
                JSON.stringify({ ...action?.payload })
            );
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case actionType.LOGIN_FAILURE:
            return {
                user: null,
                isFetching: false,
                error: true,
            };
        case actionType.REGISTER_START:
            return {
                user: null,
                isFetching: true,
                error: false,
            };

        case actionType.REGISTER_SUCCESS:
            localStorage.setItem(
                'profile',
                JSON.stringify({ ...action?.payload })
            );
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case actionType.REGISTER_FAILURE:
            return {
                user: null,
                isFetching: false,
                error: true,
            };

        case actionType.LOGOUT:
            localStorage.removeItem('profile');
            return {
                user: null,
                isFetching: false,
                error: false,
            };

        default:
            return state;
    }
};

export default authReducer;
