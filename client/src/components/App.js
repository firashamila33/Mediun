import React, {Component} from 'react';
import Footer from './Footer';
import Header from './Header';
import {BrowserRouter, Route} from "react-router-dom";
import {connect} from 'react-redux';
import ArticleList from './ArticlesList';
import Login from './Login';
import SingleArticle from './SingleArticle';
import NewArticleForm from './NewArticleForm';

import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import {AUTH_TOKEN} from "../actions/types";
import {setUserlogin} from "../actions";

export const client = new ApolloClient({
    uri: "https://dev.api.monsupervoisin.fr/graphql"
});

class App extends Component {


    render() {
        window.addEventListener("beforeunload", this.props.setUserlogin(localStorage.getItem(AUTH_TOKEN)));
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route exact path="/newarticle" component={NewArticleForm}/>
                        <Route exact path="/home" component={ArticleList}/>
                        <Route exact path="/" component={ArticleList}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/singleArticle" component={SingleArticle}/>
                        <Footer/>
                    </div>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

export default connect(null,{setUserlogin})(App);
