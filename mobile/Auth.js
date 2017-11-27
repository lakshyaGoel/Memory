import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';
import jwtDecoder from 'jwt-decode';
import uuid from 'uuid';

import config from './config'

const DEFAULT_PROFILE = {};
const DEFAULT_ACCESS_TOKEN = null;

/**
 * Converts an object to a query string.
 */
function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

/**
 * Auth0 authentication methods.
 *
 * Wraps a component to inject auth0 methods as props.
 *
 * @see docs: https://reactjs.org/docs/higher-order-components.html
 */
function withAuth(WrappedComponent) {

  class ComponentWithAuth extends Component {

    constructor(props) {
      super(props);

      // see https://auth0.com/docs/api-auth/tutorials/nonce
      this.nonce = uuid.v4();

      this._setProfile = this._setProfile.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.getAuthorizationHeader = this.getAuthorizationHeader.bind(this);

      this.state = {
        profile: DEFAULT_PROFILE,
        accessToken: DEFAULT_ACCESS_TOKEN
      };
    }

    componentWillMount() {
      this._setProfile()
    }

    async _setProfile() {
      const profile = await AsyncStorage.getItem('5117Auth:profile');
      const accessToken = await AsyncStorage.getItem('5117Auth:accessToken');
      if (profile) {
        this.setState({
          profile: JSON.parse(profile),
          accessToken: accessToken
        });
      }
      // console.log('user profile:', profile, accessToken);
    }

    /**
     * summon the auth0 login interface; store the results to AsyncStorage.
     */
    async login() {
      const redirectUrl = AuthSession.getRedirectUrl();

      const url = `https://${config.AUTH0_DOMAIN}/authorize` + toQueryString({
        audience: config.AUTH0_API_ID,
        scope: 'openid profile',
        response_type: 'token id_token',
        client_id: config.AUTH0_CLIENT_ID,
        redirect_uri: redirectUrl,
        nonce: this.nonce,
      })

      // console.log('URL', url);
      const result = await AuthSession.startAsync({ authUrl: url });

      if (result.type !== 'success' || result.params.error) {
        console.error('Error fetching', result.type, result.params.error,
          result.params.error_description);
        return;
      }

      const encodedToken = result.params.id_token;
      const decodedToken = jwtDecoder(encodedToken);
      if (decodedToken.nonce !== this.nonce) {
        console.error('Error validating', decodedToken.nonce, this.nonce);
        return;
      }

      // console.log('profile', decodedToken);
      // console.log('result.params', result.params);

      try {
        await AsyncStorage.setItem('5117Auth:profile', JSON.stringify(decodedToken));
        await AsyncStorage.setItem('5117Auth:accessToken', result.params.access_token);
      } catch (error) {
        console.error('Error saving to storage', error);
      }
      this.setState({
        profile: decodedToken,
        accessToken: result.params.access_token
      });
    }

    async logout() {
      try {
        await AsyncStorage.removeItem('5117Auth:profile');
        await AsyncStorage.removeItem('5117Auth:accessToken');
      } catch (error) {
        console.error('Error logging out', error);
      }
      this.setState({
        profile: DEFAULT_PROFILE,
        accessToken: DEFAULT_ACCESS_TOKEN
      });
    }

    /**
     * returns an {Authorization: Bearer token} object for use in a fetch header.
     * returns an empty object if not logged in.
     */
    getAuthorizationHeader() {
      const token = this.state.accessToken;
      return !token ? {} : {
        'Authorization': `Bearer ${token}`
      };
    }

    render() {
      return (
        <WrappedComponent
          profile={this.state.profile}
          login={this.login}
          logout={this.logout}
          getAuthorizationHeader={this.getAuthorizationHeader}
          />
      );
    }
  };

  return ComponentWithAuth;
}

export { withAuth };
