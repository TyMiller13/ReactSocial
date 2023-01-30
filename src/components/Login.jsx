import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function Login(props) {

    const navigate = useNavigate()

    const handleSubmit = async event => {
        event.preventDefault();
        //get the data from the form
        let username = event.target.username.value;
        let password = event.target.password.value;
        let stringToEncode = `${username}:${password}`

        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Basic ${btoa(stringToEncode)}`)

        let response = await fetch("https://responsible-knowledgeable-restaurant.glitch.me/auth/token", {
            headers: myHeaders,
            method: 'POST',
            redirect: 'follow'
        })

        if (response.ok){
            let data = await response.json()
            // Get the token and token expiration from the response
            let token = data.token;
            let expiration = data.token_expiration

            //Store the value in local storage on the browser
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExp', expiration);

            //Flash a success message and redirect back home
            props.flashMessage('You have successfully logged in', 'success')
            props.logUserIn()
            navigate('/')
            
        } else {
            //flash a fail message
            props.flashMessage('Your username /or password is incorrect', 'danger');
        }
    }

    return (
        <>
            <h3 className='text-center my-3'> Login </h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="username" placeholder='Enter Username' className="form-control my-3" />
                    <input type="password" name="password" placeholder='Enter Password' className="form-control my-3" />

                    <input type="submit" value="Log in" className='btn btn-success w-100'/>
                </div>
            </form>
        </>
    )
}
