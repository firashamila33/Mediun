import React, { Component } from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {stateToHTML} from 'draft-js-export-html';
import {convertFromRaw} from 'draft-js';
import { gql, graphql } from 'react-apollo';
import {FiSend} from 'react-icons/fi'
import {FiEye} from 'react-icons/fi'
import {FiEdit} from 'react-icons/fi'
import {articlesListQuery} from './ArticlesList'
import Article from './Article'

const style = {
  toolButton: {
    backgroundColor: "#f35c52",
    color: "white",
    marginLeft: '20px',
  },
  buttonsGroup: {
    marginTop:'40px',
    display:'flex',
    flexDirection:'row-reverse',
    justifyContent:'space-between',
  },
}

class _ArticleWorkspace extends Component {

     constructor(){
       super();
       this.state = {
           title: '',
           isPreview:false
       }
       this.handleTitleChange=this.handleTitleChange.bind(this)
     }

    //  componentDidMount(){
    //   let title = JSON.parse(window.localStorage.getItem('title'));
    //   //this.setState({title}); 
    //  }
     componentDidMount(){
       let title = JSON.parse(window.localStorage.getItem('articleTitle'))
       if(title){
        this.setState({title})
       }
       
       if(this.props.history.location.pathname !=='/newarticle'){
        this.setState({isPreview:true})
       }
       
     }

     togglePreview(){
       this.setState({isPreview:!this.state.isPreview})
     }
     handleTitleChange(e){
      let title = e.target.value
      window.localStorage.setItem('articleTitle', JSON.stringify(title));
      this.setState({ title });
     }

     _submitArticle = () => {
        var  {mutate}=this.props;
        let title = this.state.title;
        let description = stateToHTML(convertFromRaw(JSON.parse(window.localStorage.getItem('articleContent'))))      
        mutate({ 
          variables: { title, description },
          // ====> refetchQueries: [ { query: articlesListQuery }], to tell appolo to 
          // the Articles List once the article is added ,, ==> bad UX , replaced with 
          //OptimisticUI and store updating

          //this is optimisticUI managed by appolo client 
          //it's about adding an article to the store before it gets added 
          //to the server date with a negative ID to distinguish between the 
          //fake article and the one added to the server date  
          //So The optimisticResponse predicts the responce from the server.
          optimisticResponse: {
                addArticle: {
                title,
                description,
                id: Math.round(Math.random() * -1000000),
                __typename: 'Article',
              },
            },
          //As its a new entity Apollo doesn't automatically know what to do with it.
          // this one replace refetchQueries , so no need to refresh the page or 
          // send new request to the server t get all the list of articles
          //once mutated , the aticle is added to the store
          update: (store, { data: { addArticle } }) => {
              // Read the data from the cache for this query.
              const data = store.readQuery({query: articlesListQuery });
              // Add our channel from the mutation to the end.
              data.articles.push(addArticle);
              // Write the data back to the cache.
              store.writeQuery({ query: articlesListQuery, data });
            },
        }).then(()=>{
          window.localStorage.removeItem('articleContent');
          window.localStorage.removeItem('articleTitle');
          this.props.history.push('/home')
        })
        
      }
    
  render() {
    return (
       <section className="site-section pt-5" style={{marginTop:'140px'}}>
         <div className="container">
                <div className="row blog-entries">
                    <div className="col-md-12 col-lg-12 main-content">
                        <h1 className="mb-4" 
                        style={{color:"#f35c52",opacity:`${!this.state.isPreview ? '0' : '1' }`,marginBottom:'0px'}}>{this.state.title ? this.state.title : 'Your Title Here'}</h1>
                    </div>
                </div>
               <div className="row">
                  <div className="col">
                    <div style={{display:'flex',flexDirection:'row'}}>
                      <div style={{marginRight:'430px'}} >
                        <label  style={{color:"#f35c52",opacity:`${this.state.isPreview ? '0' : '1' }`}} >Article Title</label>
                        <input type="text" className="form-control"
                          style={{width:'530px',opacity:`${this.state.isPreview ? '0' : '1' }`}}
                          value={this.state.title}
                          onChange={ this.handleTitleChange }
                          
                        />
                      </div>
                      <div style={style.buttonsGroup}>
                        <button style={style.toolButton} className="btn pull-right" onClick={()=>this._submitArticle()}>
                            <FiSend size={'20'}/>
                        </button>                          
                        <button style={style.toolButton} className="btn pull-right" 
                        onClick={()=>{
                          this.props.history.push(`${this.state.isPreview ? '/newarticle' : '/newarticle/preview'}`)
                          console.log('setting the state noooooow 2')
                          this.togglePreview
                        }}
                        >
                          {this.state.isPreview ? <FiEdit size={'20'}/> : <FiEye size={'20'}/>}
                        </button>
                      </div>
                    </div>
                  </div>
               </div>  
                <div className="form-group">
                    <label style={{color:"#f35c52",opacity:`${this.state.isPreview ? '0' : '1' }`}}>Description</label>
                    <BrowserRouter>
                        <div>
                            <Route exact path="/newarticle/preview" render={() => <Article isBeforeMutation={true} isReadOnly={true}/>}/>
                            <Route exact path="/newarticle" render={() => <Article isBeforeMutation={true} isReadOnly={false}/>}/>
                        </div>
                    </BrowserRouter>          
                </div>           
  
         </div>
       </section>
    );
  }
}



const addArticleMutation = gql`
  mutation addArticle($title: String!,$description: String!) {
    addArticle(title: $title,description: $description) {
      id
      title
      description
    }
  }
`;

const ArticleWorkspace = graphql(
    addArticleMutation,
)(_ArticleWorkspace)

export default ArticleWorkspace;

