import { SET_USER_TOKEN, FETCH_ARTICLES} from './types';

export const fetchAllArticles = (articles) => async dispatch => {
    dispatch({
        type : FETCH_ARTICLES,
        payload : articles
    });
};


export const setUserlogin = (token) => async dispatch => {
    dispatch({
        type : SET_USER_TOKEN,
        payload : token
    });
};
