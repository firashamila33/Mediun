import React,{Component} from 'react'


export default class ArticleCard extends Component {
    render(){
        let {id,title}=this.props ; 

        return(
            <div key={id} className="col-md-4 cardipost"  >
                <div className="blog-entry "style={{marginTop:'20px'}}>
                    <img src={`${process.env.PUBLIC_URL}/images/img_11.jpg`} alt="aa"/>
                    <div className="blog-content-body">
                        <div className="post-meta" style={{marginBottom:'0px'}}>     
                            <span className="mr-2" style={{color:"#f35c52"}}>March 15, 2018 </span> 
                        </div>
                        <h4>{title}</h4>
                    </div>
                </div>
            </div>
        )
    }
}

                