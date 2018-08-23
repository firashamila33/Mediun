  /* eslint-disable react/no-multi-comp */
  import React, { Component } from 'react';
  import Editor, { createEditorStateWithText, composeDecorators } from 'draft-js-plugins-editor';
  import {convertToRaw ,convertFromRaw, EditorState} from 'draft-js';
  import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
  } from 'draft-js-buttons';

  import ImageAdd from './ImageAdd';
  import VideoAdd from './VideoAdd';

  import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
  import createImagePlugin from 'draft-js-image-plugin';
  import createEmojiPlugin from 'draft-js-emoji-plugin';
  import createLinkifyPlugin from 'draft-js-linkify-plugin';
  import createFocusPlugin from 'draft-js-focus-plugin';
  import createResizeablePlugin from 'draft-js-resizeable-plugin';
  import createVideoPlugin from 'draft-js-video-plugin';
  import createAlignmentPlugin from 'draft-js-alignment-plugin';
  import createHashtagPlugin from 'draft-js-hashtag-plugin';

  import 'draft-js-static-toolbar-plugin/lib/plugin.css';
  import 'draft-js-emoji-plugin/lib/plugin.css';
  import 'draft-js-linkify-plugin/lib/plugin.css';
  import 'draft-js-image-plugin/lib/plugin.css';
  import 'draft-js-hashtag-plugin/lib/plugin.css';
  import "draft-js-focus-plugin/lib/plugin.css";
  import 'draft-js-alignment-plugin/lib/plugin.css';



  
  class HeadlinesPicker extends Component {
    componentDidMount() {
      setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
    }

    componentWillUnmount() {
      window.removeEventListener('click', this.onWindowClick);
    }

    onWindowClick = () =>
        // Call `onOverrideContent` again with `undefined`
        // so the toolbar can show its regular content again.
      this.props.onOverrideContent(undefined);

    render() {
      const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
      return (
        <div>
          {buttons.map((Button, i) =>  //eslint-disable-next-line
            <Button key={i} {...this.props} />
          )}
        </div>
      );
    }
  }

  class HeadlinesButton extends Component {
    onClick = () =>
      this.props.onOverrideContent(HeadlinesPicker);

    render() {
      return (
        <div   className="headlineButtonWrapper">
          <button onClick={this.onClick} className="headlineButton">
            H
          </button>
        </div>
      );
    }
  }


const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const linkifyPlugin = createLinkifyPlugin({ target: '_blank' });
const hashtagPlugin = createHashtagPlugin();
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;
const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
);
const imagePlugin = createImagePlugin({ decorator });
const videoPlugin = createVideoPlugin({ decorator });
const toolbarPlugin = createToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    Separator,
    HeadlinesButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton
  ]
});
const { Toolbar } = toolbarPlugin;

const plugins = [
  toolbarPlugin,
  emojiPlugin,
  linkifyPlugin,
  focusPlugin,
  resizeablePlugin,
  imagePlugin,
  videoPlugin,
  alignmentPlugin,
  hashtagPlugin
];
  const text = `you can set a default text to apear by default for 
                each time the component is mounted : MSV BLOG EDITING,
                in that case go to else statelent and remove it so Editor state wont be charged with empy content`;

  export default class CustomToolbarEditor extends Component {


    constructor(){
      super();
      this.state = {
        description: '',
        editorState: createEditorStateWithText(text),
      };
      const content = window.localStorage.getItem('articleContent');

      if (content) {
        this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
      } else { //delete this else statement to see the text above in the editor by default
        this.state.editorState = EditorState.createEmpty();
      }
    }

    componentDidCatch(error, info) {
      console.log(error, info);
      window.localStorage.removeItem('articleContent');
    }

    onChange = (editorState) => {
       this.saveImmutableContent(editorState.getCurrentContent());
       this.setState({
         editorState
       });     
    };

    saveImmutableContent = (content) => {
       window.localStorage.setItem('articleContent', JSON.stringify(convertToRaw(content)));
    } 
    focus = () => {
      this.editor.focus();
    };
    render() {
      return (
        <div>
            <div className="editor" onClick={this.focus}>
              <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                plugins={plugins}
                ref={(element) => { this.editor = element; }}
              />
              <Toolbar />
               <AlignmentTool /> 
              <EmojiSuggestions />
            </div>

            <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
              <ImageAdd
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  modifier={imagePlugin.addImage}
                />
                <div style={{marginLeft:'20px',marginRight:'20px'}}>
                <EmojiSelect />
                </div>

                <VideoAdd
                editorState={this.state.editorState}
                onChange={this.onChange}
                modifier={videoPlugin.addVideo}
                />         
            </div>
                                                           
      </div>
      );
    }
  }


