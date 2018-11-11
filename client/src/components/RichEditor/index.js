import React, { Component } from "react";
import Editor, {
  composeDecorators
} from "draft-js-plugins-editor";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import * as actions from "../../actions";
import { connect } from "react-redux";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton
} from "draft-js-buttons";

import ImageAdd from "./ImageAdd";
import VideoAdd from "./VideoAdd";
import { preloadedContent } from "./initialState";

import createToolbarPlugin, { Separator } from "draft-js-static-toolbar-plugin";
import createImagePlugin from "draft-js-image-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import createResizeablePlugin from "draft-js-resizeable-plugin";
import createVideoPlugin from "draft-js-video-plugin";
import createAlignmentPlugin from "draft-js-alignment-plugin";
import createHashtagPlugin from "draft-js-hashtag-plugin";

import "draft-js-static-toolbar-plugin/lib/plugin.css";
import "draft-js-emoji-plugin/lib/plugin.css";
import "draft-js-linkify-plugin/lib/plugin.css";
import "draft-js-image-plugin/lib/plugin.css";
import "draft-js-hashtag-plugin/lib/plugin.css";
import "draft-js-focus-plugin/lib/plugin.css";
import "draft-js-alignment-plugin/lib/plugin.css";

class HeadlinesPicker extends Component {
  componentDidMount() {
    setTimeout(() => {
      window.addEventListener("click", this.onWindowClick);
    });
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onWindowClick);
  }

  onWindowClick = () =>
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((
          Button,
          i //eslint-disable-next-line
        ) => (
          <Button key={i} {...this.props} />
        ))}
      </div>
    );
  }
}

class HeadlinesButton extends Component {
  onClick = () => this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div className="headlineButtonWrapper">
        <button onClick={this.onClick} className="headlineButton">
          H
        </button>
      </div>
    );
  }
}

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const linkifyPlugin = createLinkifyPlugin({ target: "_blank" });
const hashtagPlugin = createHashtagPlugin();
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;
const decorator = composeDecorators(
  //resizeablePlugin.decorator
   alignmentPlugin.decorator,
  focusPlugin.decorator
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


class CustomToolbarEditor extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      editorState: EditorState.createEmpty()
    };
  }

  componentDidMount() {
    let {isNew, selectedArticle } = this.props;
    if (isNew) {
      const content = window.localStorage.getItem("articleContent");
      if (content) {
        this.setState({
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
        })
      } else {
        this.setState({
          editorState: EditorState.createWithContent(convertFromRaw(preloadedContent))
        })
      }
    }
    else {
      this.setState({
        editorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(selectedArticle.description))
        )
      });
    }
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  onChange = editorState => {
    let { isNew, editArticle } = this.props;
    let { _id, title } = this.props.editedArticle;
    if (isNew) {
      window.localStorage.setItem(
        "articleContent",
        JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      ); 
    }// <<--- do not save to localstorage if its not a new article
    else {
      editArticle({
        _id,
        title,
        description: JSON.stringify(
          convertToRaw(editorState.getCurrentContent())
        )
      });
    }
    this.setState({
      editorState
    });
  };

  focus = () => {
    this.editor.focus();
  };
  render() {
    let { isReadOnly } = this.props;
    console.log('renderiiing')
    return (
      <div>
        <div
          className={`${!isReadOnly ? "editor" : "editorReadOnly"}`}
          onClick={this.focus}
        >
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={element => {
              this.editor = element;
            }}
            readOnly={isReadOnly}
          />
          {!isReadOnly && (
            <div>
              <Toolbar />
              <AlignmentTool />
              <EmojiSuggestions />
            </div>
          )}
        </div>

        {!isReadOnly && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <ImageAdd
              editorState={this.state.editorState}
              onChange={this.onChange}
              modifier={imagePlugin.addImage}
            />
            <div style={{ marginLeft: "20px", marginRight: "20px" }}>
              <EmojiSelect />
            </div>

            <VideoAdd
              editorState={this.state.editorState}
              onChange={this.onChange}
              modifier={videoPlugin.addVideo}
            />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ selectedArticle, editedArticle }) {
  return { selectedArticle, editedArticle };
}

export default connect(
  mapStateToProps,
  actions
)(CustomToolbarEditor);
