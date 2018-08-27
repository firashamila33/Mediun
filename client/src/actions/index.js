import { SELECTED_ARTICLE, EDITED_ARTICLE } from './types';



export const selectArticle = (article) => {
    return({
        type : SELECTED_ARTICLE,
        payload : article
    });
};

export const editArticle = (editedArticle) => {
    return({
        type : EDITED_ARTICLE,
        payload : editedArticle
    });
};
