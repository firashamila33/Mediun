import React, {Component} from 'react';
import RichEditor from './RichEditor'

export default class Article extends Component {
    state = {
        article: []
    };

    render() {
        return (
            /**
             * @prop isBeforeMutation : to konw if this is a preview while editing the article or after a user clicked on an article
             * @prop isReadOnly to disable article editing
             */
            <RichEditor isBeforeMutation={this.props.isBeforeMutation} isReadOnly={this.props.isReadOnly}/> 
        );
    }
}
