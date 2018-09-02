import React, {Component} from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import ArticleWorkspace from './components/Articles/workspace';

class App extends Component {


    render() {
        return (
          <div>
                <BrowserRouter>
                    <div>
                        <Header/>
                            <Route path="/workspace" component={ArticleWorkspace}/>
                            {/* <Route exact path="/newarticle/edit/preview" component={ArticleWorkspace}/>
                            <Route exact path="/myarticle/edit" component={ArticleWorkspace}/>
                            <Route exact path="/myarticle/edit/preview" component={ArticleWorkspace}/>
                            <Route exact path="/myarticle/display" component={ArticleWorkspace}/> */}

                            <Route exact path="/home" component={Home}/>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/login" component={Login}/>
                        <Footer/>
                    </div>
                </BrowserRouter>

          </div>
                
        );
    }
}

export default App;
