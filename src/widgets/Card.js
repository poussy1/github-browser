import React from 'react';
import styled from "styled-components";

const CardContainer = styled.div`
    display:flex;
    flex-direction: row;
    margin-bottom:40px;
`
const Image = styled.img`
    width:100px;
    height:100px;
`
const Details = styled.div`
    margin-left:20px;
`
const Title = styled.div`
    font-weight:bold;
` 
const Brief = styled.p`
` 
const Status = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
`
const StatusDetail = styled.div`
    border:3px solid black;
    margin-right:10px;
    padding:5px 3px 5px 3px;
`

function Card({imgUrl,title,brief,stars,issues,days,username}) {

    return <>
      <CardContainer>
         <Image src={imgUrl}/>
         <Details>
            <Title>{title}</Title>
            <Brief>{brief}</Brief>
            <Status>
                <StatusDetail>Stars: {stars}</StatusDetail>
                <StatusDetail>Issues: {issues}</StatusDetail>
                <div>Submitted {days} days ago by {username}</div>
            </Status>
        </Details>   
      </CardContainer>
    </>;
  }
   
  export default Card;