import { authenticated } from './stores'

let accessToken = ''
let idToken = ''
let profile = {}
let expiresAt = 0
let webAuth

window.addEventListener('load', function () {
  webAuth = new auth0.WebAuth({
    domain: 'dev-d57r8oa8.auth0.com',
    clientID: 'ZWD2kP4RJu1C61dqVrOZ4dY4yvYUzJ98',
    responseType: 'token id_token',
    scope: 'openid email profile',
    redirectUri: window.location.href,
    leeway: 60
  })

  function localLogin (authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true')
    authenticated.set(true)

    // Set the time that the access token will expire at
    expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    accessToken = authResult.accessToken
    idToken = authResult.idToken
    profile = authResult.idTokenPayload
  }

  function renewTokens () {
    webAuth.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        localLogin(authResult)
      } else if (err) {
        logOut()
      }
      updateAuth()
    })
  }

  function isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    var expiration = parseInt(expiresAt) || 0
    return localStorage.getItem('isLoggedIn') === 'true' && new Date().getTime() < expiration
  }

  function handleAuthentication () {
    webAuth.parseHash(function (err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = ''
        localLogin(authResult)
      } else if (err) {
        logOut()
      }
      updateAuth()
    })
  }

  function updateAuth () {
    authenticated.set(isAuthenticated())
  }

  if (localStorage.getItem('isLoggedIn') === 'true') {
    renewTokens()
  } else {
    handleAuthentication()
  }
})

export const logIn = () => webAuth.authorize()
export const logOut = () => {
  // Remove isLoggedIn flag from localStorage
  localStorage.removeItem('isLoggedIn')
  // Remove tokens and expiry time
  accessToken = ''
  idToken = ''
  profile = {}
  expiresAt = 0
  webAuth.logout({
    return_to: window.location.origin
  })
  authenticated.set(false)
}
export const getAccessToken = () => accessToken
export const getIdToken = () => idToken
export const getProfile = () => ({...profile})
