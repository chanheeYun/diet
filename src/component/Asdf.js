import React from 'react'

export default function Asdf() {
  const loadBoard = async() => {
    await fetch('http://10.125.121.219:8080/member')
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.error('Error fetching Board:', error));
    
  };
  return (
    <div>
      <button onClick={loadBoard}>불러오기</button>
    </div>
  )
}
