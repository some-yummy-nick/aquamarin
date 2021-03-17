let hasLocalStorage = process.browser
if (hasLocalStorage) {
  let testKey = 'react-localstorage.hoc.test-key'
  try {
    localStorage.setItem(testKey, 'foo')
    localStorage.removeItem(testKey)
  } catch (e) {
    hasLocalStorage = false
  }
}

let WrapWithLocalStorate = Component => {
  if (!hasLocalStorage) return Component

  let name =
    Component.displayName ||
    Component.constructor.displayName ||
    Component.constructor.name

  class LocalStorageComponent extends Component {
    UNSAFE_componentWillMount() {
      this.setState(JSON.parse(localStorage.getItem(name)))
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
      localStorage.setItem(name, JSON.stringify(nextState))
    }
  }

  LocalStorageComponent.displayName = name

  return LocalStorageComponent
}

export default WrapWithLocalStorate
