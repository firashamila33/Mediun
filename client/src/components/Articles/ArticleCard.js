import React,{Component} from 'react'


export default class ArticleCard extends Component {
    render(){
        let {id,title}=this.props ; 

        return(
            <div key={id} className="col-md-6">
                <div className="blog-entry ">
                    <img src={`${process.env.PUBLIC_URL}/images/img_11.jpg`} alt="aa"/>
                    <div className="blog-content-body">
                        <div className="post-meta">
                            <span className="category">Food</span>
                            <span className="mr-2" style={{color:"#f35c52"}}>March 15, 2018 </span> 
                            <span className="ml-2"><span className="fa fa-comments"></span> 3</span>
                        </div>
                        <h4>{title}</h4>
                    </div>
                </div>
            </div>
        )
    }
}

                