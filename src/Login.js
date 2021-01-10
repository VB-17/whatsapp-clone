import React from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, provider } from "./firebase";
import {useStateValue} from './Stateprovider';
import {actionTypes} from './reducer'


function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
          dispatch({
              type: actionTypes.SET_USER,
              user: result.user,
          })
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div class="login">
      <div class="login__circle"></div>
      <div class="login__container">
        <img
          src="https://cdn.discordapp.com/attachments/782316820862074920/782327760529260604/bc3.jpg"
          alt=""
        />
        <div class="login__text">
          <h1>BOYS & CO CHAT</h1>
        </div>

        <Button onClick={signIn}>Sign in</Button>
      </div>
    </div>
  );
}

export default Login;

  