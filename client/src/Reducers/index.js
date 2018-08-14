import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import allPressArticlesReducer from './allPressArticlesReducer';
import {reducer as reduxForm} from "redux-form";

export default combineReducers({
    loginToken:LoginReducer,
    allpressArticles:allPressArticlesReducer,
    form: reduxForm
});