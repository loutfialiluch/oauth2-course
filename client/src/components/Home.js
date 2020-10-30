import axios from 'axios';
import React from 'react'

const Home = () => {
    return (
        <div>
            <h1>You're logged in !</h1>
            <button type="button" className="logoutBtn" onClick={() => {
                axios.get('/auth/logout')
                .then(response => {
                    if(!response.data.isLoggedIn){
                        window.location.reload();
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }}>Log out !</button>
        </div>
    )
}

export default Home
