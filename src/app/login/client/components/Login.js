import Page from 'shared/components/Page';
import React, {Component} from 'react';
import 'login/css/login.scss';

export default class Login extends Component {

  signIn = () => {
    console.log('signin');
  };

  signUp = () => {
    console.log('signup');
  };

  render () {
    return (
      <Page>
        <div className='login__container shadow'>
          <form method='post' action='auth/signin' className='login__form flex'>
            <h2 className='login__form-title'>Login</h2>
            <input type='text'
              ref='username'
              name='username'
              placeholder='Username'
              className='login__form-input no-outline' />
            <input type='password'
              ref='password'
              name='password'
              placeholder='Password'
              className='login__form-input no-outline' />
            <div className='login__form-actions flex'>
              <button type='submit'
                onClick={this.signIn}
                className='login__form-buttons button-theme no-outline'>
                Sign In
              </button>
              <button type='button'
                onClick={this.signUp}
                className='login__form-buttons button-theme no-outline'>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </Page>
    );
  }
}
