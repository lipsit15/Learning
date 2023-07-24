import React, { useEffect,useState } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalresults] = useState(0);
  // document.title = `${this.capitalizeFirstLetter(props.category)}-HeadlineHub`;
  
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  
  const  updateNews=async()=> {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c1efc6015da0433088c9acfc1ed39735&page=${page}&pageSize=${props.pageSize}`;
  
    setloading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles)
    settotalresults(parsedData.totalResults)
    setloading(false)
   

    
  }
  useEffect(() => {
    updateNews();
  },[])
  // async componentDidMount() {
   
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c1efc6015da0433088c9acfc1ed39735&page=1&pageSize=${props.pageSize}`;
  //   // this.setState({ loading: true });
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
  //   // this.setState({
  //   //   articles: parsedData.articles,
  //   //   totalResults: parsedData.totalResults,
  //   //   loading:false
  //   // })
  //   updateNews();

  // }

   const handlePrevclick = async () => {
    // console.log("previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c1efc6015da0433088c9acfc1ed39735&page=1${this.setState.page - 1}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading:false
    // })
    setpage(page-1)
    updateNews();
    
  }
  const handleNextclick = async () => {
    // console.log("Next");
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {
      
   
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c1efc6015da0433088c9acfc1ed39735&page=1${this.setState.page + 1}&pageSize=${props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
     
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading:false
    //   })
    // }
    setpage(page+1)
    updateNews();
   
    
  }
  const fetchMoreData = async() => {
   
   
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c1efc6015da0433088c9acfc1ed39735&page=${page + 1}&pageSize=${props.pageSize}`;
    setpage(page+1)
    
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    settotalresults(parsedData.totalResults)
    console.log(parsedData);
   

    
  };

  
  
    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px',marginTop:'90px' }}>HeadlineHub-Top { capitalizeFirstLetter(props.category)} Headlines</h1>
        {/* {loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
        
       <div className="container">
        <div className="row">
        {!loading &&  articles.map((element) => {
          return  <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={ element.source.name} />
          </div>
        })}
            </div>
            </div>
          </InfiniteScroll>
       
           
           
           
        
      </>
    )
  
}
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category:'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category:PropTypes.string
}

export default News
