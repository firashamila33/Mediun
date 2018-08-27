import React, {Component} from 'react';
import RichEditor from './RichEditor'

export default class Article extends Component {
    state = {
        article: []
    };

    render() {
        let {isReadOnly,isDisplay,isEditedArticle,isNew} = this.props
        return (
            /**
             * @prop isExistingArticleDiplay : to konw if this is a preview while editing the article or after a user clicked on an article
             * @prop isReadOnly to disable article editing
             */
            <RichEditor isReadOnly={isReadOnly} isDisplay={isDisplay} isEditedArticle={isEditedArticle} isNew={isNew}/> 
        );
    }
}
