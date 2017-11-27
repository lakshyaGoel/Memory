
console.log(`loading configuration (dev mode=${__DEV__})`);

const config = {
  // TODO: domain name of your heroku app, e.g.:
  //   API_BASE: 'https://foo-bar-baz.herokuapp.com',
  API_BASE: 'https://react-native-template-5117.herokuapp.com/',

  // can use same client/api id as in module 3 project
  AUTH0_DOMAIN: 'lakshyagoel.auth0.com',
  AUTH0_CLIENT_ID: 'QT3Y6D3RWNw5uPMX4p1JLYYiWo01PZUo',
  AUTH0_API_ID: 'https://lakshyagoel.auth0.com/api/v2/',
}

const devModeOverrides = {
  // TODO: in some expo modes, you need to set this to the IP address of your
  //   computer, rather than just 'localhost'. E.g.:
  //   API_BASE: 'http://192.168.2.12:3000'
  API_BASE: 'http://localhost:3000',
  //API_BASE: 'http://192.168.2.12:3000'
}

if (__DEV__) {
  Object.assign(config, devModeOverrides)
}

console.log('config:', config)

export default config;
