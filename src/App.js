import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

import './App.css';
import Card from './widgets/Card'
const api = "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc"

function getDetails(result){
  var itemsDetails = [] 
  result.items.forEach(item=>{
    var repoDetail = {
      imgUrl: item.owner.avatar_url,
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

function App() {

  const [reposDetails,setReposDetails] = React.useState([])
  const [page,setPage] = React.useState(1)

  React.useEffect(()=>{
    fetch(api)
    .then(res => res.json())
    .then(
      (result) => { 
        setReposDetails(getDetails(result))
      }
    )
  },[])
  
  function fetchMoreData(){
    fetch(api+`&page=${page}`)
    .then(res => res.json())
    .then(
      (result) => { 
        setReposDetails(reposDetails.concat(getDetails(result)))
        setPage(page=>page+1)
      }
    )
  }

  return (
    <div className="App">
      <InfiniteScroll
        dataLength={reposDetails.length}
        next={fetchMoreData}
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
