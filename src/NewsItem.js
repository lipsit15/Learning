import React from 'react'

const NewsItem =(props)=> {
    
        let { title, description,imageUrl,newsUrl,author,date,source } = props;
    return (
        <div className="my-3">
            <div className="card" >
            <img src={!imageUrl?"https://images.hindustantimes.com/tech/img/2023/06/12/1600x900/AI_writing_tools_1686575205441_1686575205765.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                    <h5 className="card-title">{title}   <span className="badge text-bg-danger">{ source}</span></h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a  rel = "noreferrer"href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
        
      </div>
    )
  
}

export default NewsItem
