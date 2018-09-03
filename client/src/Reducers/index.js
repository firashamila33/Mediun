import { combineReducers } from "redux";
import selectedArticle from "./selectedArticleReducer";
import editedArticle from "./editedArticleReducer";

export default combineReducers({
  selectedArticle,
  editedArticle
});
