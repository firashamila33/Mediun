import React, { Component } from "react";
import {stateToHTML} from 'draft-js-export-html';
import {convertFromRaw} from 'draft-js';
import {Link} from 'react-router-dom'
import {FiSend} from 'react-icons/fi'
import {FiEye} from 'react-icons/fi'

import RichEditor from './RichEditor'


class NewArticleForm extends Component {

     constructor(){
       super();
       this.state = {
           title: ''
       }
     }
     _submitArticle = () => {
      
      console.log("ToSubmit----------------------------ToSubmit----------------------------------------------------ToSubmit")
       let submitObj = {
         'title' : this.setState.title,
         'body' : stateToHTML(convertFromRaw(JSON.parse(window.localStorage.getItem('articleContent')))) 
       }
       console.log(submitObj);
      console.log("ToSubmit----------------------------ToSubmit----------------------------------------------------ToSubmit")
      window.localStorage.removeItem('articleContent');
      this.setState({title:''});
    }
    
  render() {
    return (
       <section className="site-section pt-5">
         <div className="container">
           
               <div className="row">
                  <div className="col">
                    <div style={{display:'flex',flexDirection:'row'}}>
                      <div style={{marginRight:'430px'}} >
                        <label  style={{color:"#f35c52"}} >Article Title</label>
                        <input type="text" className="form-control"
                          style={{width:'530px'}}
                          value={this.state.title}
                          onChange={e => {
                            this.setState({ title: e.target.value });
                            
                          }}
                          
                        />
                      </div>
                      <div style={{marginTop:'40px',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <Link to={{
                            pathname: '/previewArticle',
                            state: {
                                preview_Edit:true,
                                article:{
                                  title: this.state.title
                                }
                            }
                        }} style={{backgroundColor:"#f35c52", color:"white"}} className="btn pull-right" >
                          <FiEye size={'20'}/>
                        </Link>
                        <button style={{backgroundColor:"#f35c52", color:"white",marginLeft:'20px'}} className="btn pull-right" onClick={()=>this._submitArticle()}>
                          <FiSend size={'20'}/>
                        </button>
                        
                      </div>
                    </div>
                  </div>
               </div>  

               <div className="form-group">
                 <label   style={{color:"#f35c52"}}>Description</label>
                 <RichEditor/>              
               </div>             
  
         </div>
       </section>
    );
  }
}

 


//  const CREATE_ARTICLE = gql`
//  mutation CreatePressArticle($input: CreatePressArticleInputType!,$authToken : String!) {
//    createPressArticle(
//      input: $input,authToken : $authToken
//    ){
//      pressArticle {
///      error {/        id
//      }

//        code
//        message
//      }
//    }
   
//  }
//  `;

//  export default connect(mapStateToProps)(compose(
//    graphql(CREATE_ARTICLE, {name: 'createarticlemutation'})
//  )(NewArticleForm));



export default NewArticleForm

