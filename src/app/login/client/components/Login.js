import React, {Component} from 'react';
import 'login/css/login.scss';

export default class Login extends Component {
  render () {
    return (
      <div className='login__container shadow flex'>
        <h2 className='login__form-title'>Login</h2>
        <input type='text'
          ref='username'
          name='username'
          placeholder='Username'
          className='login__input no-outline' />
        <input type='password'
          ref='password'
          name='password'
          placeholder='Password'
          className='login__input no-outline' />
        <div className='login__actions flex'>
          <button type='submit' className='login__button button-theme no-outline'>
            Sign In
          </button>
          <button type='button' className='login__button button-theme no-outline'>
            Sign Up
          </button>
        </div>
        {/* <form method='post' action='auth/signin'>
          <input type='text' name='username' />
          <input type='password' name='password' />
          <input type='submit' value='Sign In' />
        </form> */}
      </div>
    );
  }
}
