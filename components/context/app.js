import xor from 'lodash/xor'
import persist from 'react-localstorage-hoc'
import React, { createContext } from 'react'
import cookie from 'js-cookie'
import withFetch from '@/components/hocs/with-fetch'
import emitter from '@/emitter'

const AppContext = createContext({
  user: null,
  token: null,
  favouritesIds: [],
  cookiesShown: false
})

class AppProvider extends React.Component {
  state = {
    user: null,
    token: null,
    favouritesIds: [],
    cookiesShown: false
  }

  setCookiesShown = state => {
    this.setState({ cookiesShown: state })
  }

  addFavourite = id => {
    return new Promise(resolve => {
      const { favouritesIds } = this.state

      if (favouritesIds.includes(id)) {
        return resolve()
      }

      this.setState({ favouritesIds: [...favouritesIds, id] }, resolve)
    })
  }

  removeFavourite = id => {
    return new Promise(resolve => {
      const { favouritesIds } = this.state
      this.setState(
        { favouritesIds: favouritesIds.filter(x => x !== id) },
        resolve
      )
    })
  }

  toggleFavourite = id => {
    const favouritesIds = xor(this.state.favouritesIds, [id])
    this.setState({ favouritesIds })
  }

  hasFavourite = id => {
    return this.state.favouritesIds.some(x => x === id)
  }

  login = ({ user, token }) => {
    return new Promise(resolve => {
      this.setState({ user, token }, resolve)
      cookie.set('token', token, { expires: 1 })
    })
  }

  logout = () => {
    return new Promise(async resolve => {
      this.setState({ user: null, token: null }, () => {
        this.props.request.post('/logout')
        cookie.remove('token')
        resolve()
      })
    })
  }

  setUserSettings = ({ param, val }) => {
    return new Promise(resolve => {
      cookie.set('us' + param, val, { expires: 30 })
    })
  }

  userSettings = param => {
    return cookie.get('us' + param)
  }

  componentDidMount() {
    emitter.addListener('request/logout', this.logout)
  }

  render() {
    const { user, favouritesIds, cookiesShown } = this.state
    const {
      addFavourite,
      removeFavourite,
      hasFavourite,
      toggleFavourite,
      login,
      logout,
      setCookiesShown,
      setUserSettings,
      userSettings
    } = this

    return (
      <AppContext.Provider
        value={{
          user,
          favouritesIds,
          addFavourite,
          removeFavourite,
          hasFavourite,
          toggleFavourite,
          login,
          logout,
          cookiesShown,
          setCookiesShown,
          setUserSettings,
          userSettings
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

AppProvider.displayName = 'atmosfera.context.app.provider'

export const AppProviderPersisted = withFetch(persist(AppProvider))

const AppConsumer = AppContext.Consumer

export { AppContext, AppConsumer }
