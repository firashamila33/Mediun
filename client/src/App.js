import React, {Component} from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import ArticlePreview from './components/Articles/ArticlePreview';
import ArticleForm from './components/Articles/ArticleForm';

class App extends Component {


    render() {
        return (
          <div>
                <BrowserRouter>
                    <div>
                        <Header/>
                            <Route exact path="/newarticle" component={ArticleForm}/>
                            <Route exact path="/home" component={Home}/>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/previewArticle" component={ArticlePreview}/>
                        <Footer/>
                    </div>
                </BrowserRouter>

          </div>
                
        );
    }
}

export default App;
