import React, { Component } from "react";
import {connect} from 'react-redux';
import {graphql, compose} from "react-apollo";
import gql from "graphql-tag";
import * as $ from 'jquery';
import CustomEditor from './articles_workspace/CustomEditor'



class NewArticleForm extends Component {

    constructor(){
      super();
      this.state = {
          title: '',
          description: '',
      }
    }
    
    _submitArticle = async () => {

      $('form').submit(function (evt) {
        evt.preventDefault(); //prevents the default action
     
      })
      


       var { title, description} = this.state;
       const authToken = this.props.loginToken ;
       console.log(authToken);
       const active = true;
       description=description;
       console.log(description);

         const result = await this.props.createarticlemutation({
             variables: {
                 input:{title,
                description,
                 active},
                authToken
            }
        });

        window.localStorage.removeItem('articleContent');

        if(result.data.createPressArticle.error !== "null"){
          this.props.history.push('/home');
        };  

  };
 


  render() {
    return (
      <section className="site-section pt-5">
        <div className="container">
          
          <form>
              <div className="row">
                <div className="col">
                  <label htmlFor="formGroupExampleInput" style={{color:"#f35c52"}} >Article Title</label>
                  <input type="text" className="form-control"
                    value={this.state.title}
                    onChange={e => this.setState({ title: e.target.value })}
                    required
                  />
                </div>
                <div className="col">
                <label htmlFor="formGroupExampleInput" style={{color:"#f35c52"}}>Article Photo</label>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="customFileLang" />
                      <label className="custom-file-label" htmlFor="customFileLang">Your Photo here</label>
                    </div>
                </div>
              </div>  

              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1" style={{color:"#f35c52"}}>Description</label>
                <CustomEditor/>              
              </div>
              
             <button style={{backgroundColor:"#f35c52", color:"white"}} className="btn pull-right" onClick={()=>this._submitArticle()}>Submit</button>
          </form>  
          
            
        </div>
      </section>



      
    );
  }
}

function mapStateToProps({loginToken}) {
  return {loginToken};
}


const CREATE_ARTICLE = gql`
mutation CreatePressArticle($input: CreatePressArticleInputType!,$authToken : String!) {
  createPressArticle(
    input: $input,authToken : $authToken
  ){
    pressArticle {
      id
    }
    error {
      code
      message
    }
  }
   
}
`;

export default connect(mapStateToProps)(compose(
  graphql(CREATE_ARTICLE, {name: 'createarticlemutation'})
)(NewArticleForm));

