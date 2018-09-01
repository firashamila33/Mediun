import React, {Component} from 'react';
import {Link
} from 'react-router-dom';



class Header extends Component {

     constructor(){
         super();
         this.state={
             location :'/newarticle',
             isScrolled:false,
         }
         
     }

    componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        let {scrollY} = window;
        if(scrollY > 74){
            this.setState({isScrolled:true})
        }
        if(scrollY < 74){
            this.setState({isScrolled:false})
        }
      };
   
    render() {
        let text =`A work by Firas Hamila, I implemented a rich text editing modules
        based on Draft JS plugins  by Facebook & @DraftJsPlugins `
        let newText = text.split ('\n').map ((item, i) => <p style={{fontSize:'15px',opacity:'0.9',marginBottom:'0px'}} key={i}>{item}</p>);
        return (
            <header style={{opacity:`${this.state.isScrolled ? '0.85' : '1'}`,position:'fixed',transition:' .3s'}} role="banner">
                <div className="top-bar" style={{paddingBottom:'0px'}}>
                    <div className="container">
                        <div className="row"  style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                            <div >
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/logo_header.png`}
                                    style={{height:`${this.state.isScrolled ? '50px' : '80px'}`,width:`${this.state.isScrolled ? '100px' : '150px'}`,transition:' .3s'}}
                                    alt=""
                                />
                            </div>
                            { this.state.isScrolled &&
                                <p style={{marginTop:'15px'}}><strong>A work By Firas Hamila</strong></p>
                            }

                            { !this.state.isScrolled &&
                                <div style={{marginTop:'10px'}}>
                                    {newText}
                                    <div style={{display:'flex',flexDirection:'row'}}>
                                        <p style={{fontSize:'15px',opacity:'0.9'}} >Technologies used : ReactJS, GraphQL, NodeJS ... => view</p>
                                        
                                        <a target="_blank" href='https://github.com/firashamila33/Mediun' style={{opacity:'0.9',marginLeft:'10px',marginBottom:'40px'}}>Github Repo</a>
                                    </div>

                                </div>
                            }
                                
                           
                            <div style={{marginTop:`${this.state.isScrolled ? '0px' : '15px'}`,transition:' .3s'}} className=" social">
                                <ul className="navbar-nav mx-auto" style={{display:'flex',flexDirection:'row',marginRight:'100px'}}>
                                    <li className="nav-item">
                                        <Link to={"/home"}  style={{opacity:`${this.state.location === '/home' ? '1' : '0'}`,transition:' .3s'}} className="nav-link active"
                                            onClick={() => this.setState({ location: '/home' })}
                                            style={{marginRight:'12px',fontSize:'30px'}}
                                        >Home</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to={"/newarticle/edit"}  style={{opacity:`${this.state.location === '/newarticle/edit' ? '1' : '0'}`,transition:' .3s'}}className="nav-link"
                                            onClick={() => this.setState({ location: '/newarticle/edit' })}
                                            style={{marginLeft:'12px',fontSize:'30px'}}
                                        >New Article</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }


}


export default Header

