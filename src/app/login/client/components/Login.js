import React, {Component} from 'react';
import 'login/css/login.scss';

export default class Login extends Component {
  render () {
    return (
      <div className='login__form-container'>
        <form method='post' action='auth/signin'>
          <input type='text' name='username' />
          <input type='password' name='password' />
          <input type='submit' value='submit' />
        </form>
      </div>
    );
  }
}
