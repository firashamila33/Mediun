import React, {Component} from 'react';
import {Link
} from 'react-router-dom';



class Header extends Component {

    constructor() {
        super();
        this.state = {
            location: '/newarticle',
            isScrolled: false,
            isSmall:false,
            isTiny: false,
        }

    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleScreenResize);
        
        if(window.outerWidth < 1080){
            this.setState({ isSmall: true })
            console.log('ASGHAAAR')
        }
        if(window.outerWidth > 1080){
            this.setState({ isSmall: false })
        }
        if(window.outerWidth < 420 ){
            this.setState({ isTiny: true })
        }
        if(window.outerWidth > 420 ){
            this.setState({ isTiny: false })
        }

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleScreenResize);

    }

    handleScroll = () => {
        let { scrollY } = window;
        if (scrollY > 74) {
            this.setState({ isScrolled: true })
        }
        if (scrollY < 74) {
            this.setState({ isScrolled: false })
        }
    };

    handleScreenResize= () => {
        console.log('outerWidth --->',window.outerWidth)
        if(window.outerWidth < 1080){
            this.setState({ isSmall: true })
        }
        if(window.outerWidth > 1080){
            this.setState({ isSmall: false })
        }
        if(window.outerWidth < 420 ){
            console.log('Tinyyyyy')

            this.setState({ isTiny: true })
        }
        if(window.outerWidth > 420 ){
            this.setState({ isTiny: false })
        }
    }

    render() {
        let { isScrolled, isSmall, isTiny } = this.state
        let text =`A rich text editing modules based on Draft JS plugins  by Facebook & @DraftJsPlugins `
        let newText = text.split ('\n').map ((item, i) => <p style={{fontSize:'15',marginBottom:'0px'}} key={i}>{item}</p>);
        return (
            <header style={{opacity:`${isScrolled ? '0.85' : '1'}`,position:'fixed',transition:' .3s'}} role="banner">
                <div className="top-bar" style={{paddingBottom:'0px'}}>
                    <div className="container">
                        <div className="row"  style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                            <div >
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/logo_header.png`}
                                    style={{marginBottom:'5px',marginLeft:'5px',height:`${isScrolled ? '40px' : '60px'}`,width:`${isScrolled ? '60px' : '80px'}`,transition:' .3s'}}
                                    alt=""
                                />
                            </div>
                           
                                { (!isSmall && isScrolled) &&
                                    <div style={{marginTop:'10px'}}>
                                        <strong>
                                            made with <i className="fa fa-heart-o" aria-hidden="true" />{" "} by{" "}
                                            <a href="https://github.com/firashamila33" target="_blank"  rel="noopener noreferrer">
                                                Firas Hamila
                                            </a>
                                        </strong>
                                    </div>
                                }

                                { (!isSmall && !isScrolled ) &&
                                    <div style={{marginTop:'10px'}}>
                                        {newText}
                                        <div style={{display:'flex',flexDirection:'row'}}>
                                            <p style={{fontSize:'15px'}} >Technologies used : ReactJS, GraphQL, NodeJS ... => view</p>
                                            
                                            <a target="_blank" href='https://github.com/firashamila33/Mediun'  rel="noopener noreferrer" style={{opacity:'0.9',marginLeft:'10px'}}>Github Repo</a>
                                        </div>

                                    </div>
                                }
                            
                            <div style={{marginTop:`${isScrolled ? '0px' : '15px'}`,transition:' .3s', marginRight:'5px'}} className=" social">
                                <ul className="navbar-nav mx-auto" style={{display:'flex',flexDirection:'row',marginRight:'100px'}}>
                                    <li className="nav-item">
                                        <Link to={"/home"}  style={{marginRight:'12px',fontSize:`${isTiny ? '15px': '30px'}`,transition:' .3s'}} 
                                            className="nav-link active"
                                            onClick={() => this.setState({ location: '/home' })}
                                        >Home</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to={"/workspace/newarticle/edit"}  style={{marginLeft:'12px',fontSize:`${isTiny ? '15px': '30px'}`,transition:' .3s'}}
                                            className="nav-link"
                                            onClick={() => this.setState({ location: '/newarticle/edit' })}
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

