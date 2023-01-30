import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function CreatePost(props) {

    const navigate = useNavigate();
    useEffect(() => {
        if(!props.loggedIn){
            props.flashMessage('You must be logged in to view this page', 'danger');
            navigate('/login');
        }
    })


    const handleSubmit = async event => {
        event.preventDefault();
        console.log(event);

        //get data from form
        let title = event.target.title.value;
        let body = event.target.body.value;
        //get the token from local storage
        let token = localStorage.getItem('token')
        //set up request headers
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`)
        //set up request body
        let requestBody = JSON.stringify({title,body})
        //make fetch request
        let response = await fetch("https://responsible-knowledgeable-restaurant.glitch.me/blog/posts", {
            method: 'POST',
            headers: myHeaders,
            body: requestBody
        })

        if(response.ok){
            let data = await response.json();
            props.flashMessage(`${data.title} has been created`, 'primary')
            navigate('/')
        } else {
            props.flashMessage('There was an issue, please try again', 'warning')
        }
    }



  return (
    <>
        <h3 className="text-center my-3">Create A New Post</h3>
        <form action="" onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" className='form-control my-3' placeholder='Enter Title of Post' name="title" />
                <input type="text" className='form-control my-3' placeholder='Enter Body of Post' name="body" />
                
                <input type="submit" value="Create Post" className='btn btn-success w-100'  />
            </div>
        </form>
    </>
  )
}
