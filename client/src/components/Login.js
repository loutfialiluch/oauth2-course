import React, { useState, useEffect } from "react";
import GoogleButton from "react-google-button";
import axios from 'axios';
const Login = () => {

  return (
    <div>
      <a href="http://localhost:5000/auth/google">
        <GoogleButton />
      </a>
    </div>
  );
};

export default Login;
