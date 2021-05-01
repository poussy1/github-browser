import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

import './App.css';
import Card from './widgets/Card'
const api = "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc"

function extractResponseData(result){
  var itemsDetails = [] 
  result.items.forEach(item=>{
    var repoDetail = {
      imgUrl:item.owner.avatar_url,
      title:item.owner.login,
      brief:item.description,
      stars:item.forks,
      issues:item.open_issues,
      days:20,
      username:item.name 
    }
    itemsDetails.push(repoDetail)
  })
  return itemsDetails
}
function getReposDetails(result,page,reposDetails){
  if(page==1){
    return extractResponseData(result)
  } else {
    return reposDetails.concat(extractResponseData(result))
  }
}
function App() {

  const [reposDetails,setReposDetails] = React.useState([])
  const [page,setPage] = React.useState(1)

  React.useEffect(()=>{
    var apiUrl = page==1?api:api+`&page=${page}`
    fetch(apiUrl)
    .then(res => res.json())
    .then(
      (result) => { 
        setReposDetails(reposDetails=>getReposDetails(result,page,reposDetails))
      }
    )
  },[page])

  return (
    <div className="App">
      <InfiniteScroll
        dataLength={reposDetails.length}
        next={()=>setPage(page=>page+1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {
          reposDetails.map(repoDetails=>(
              <Card
                key      = {repoDetails.id} 
                imgUrl   = {repoDetails.imgUrl}
                title    = {repoDetails.title}
                brief    = {repoDetails.brief}
                stars    = {repoDetails.stars}
                issues   = {repoDetails.issues}
                days     = {repoDetails.days}
                username = {repoDetails.username}
              />
          ))
        }
      </InfiniteScroll>
    </div>
  );
}

export default App;
