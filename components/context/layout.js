import React, { createContext } from 'react'
import debounce from 'lodash/debounce'

// Исходные размеры артборда из фигмы
const originalW = 1440
const originalH = 1024

const LayoutContext = createContext({
  menuOpened: false,
  scaleFactor: 1
})

export class LayoutProvider extends React.Component {
  state = {
    menuOpened: false,
    scaleFactor: 1
  }

  openMenu = () => {
    this.setState({ menuOpened: true }, state => {
      this.setDocumentScrolling(this.state.menuOpened)
    })
  }

  closeMenu = () => {
    this.setState({ menuOpened: false }, () => {
      this.setDocumentScrolling(this.state.menuOpened)
    })
  }

  toggleMenu = () => {
    this.setState({ menuOpened: !this.state.menuOpened }, () => {
      this.setDocumentScrolling(this.state.menuOpened)
    })
  }

  setDocumentScrolling = state => {
    document.documentElement.classList[state ? 'add' : 'remove'](
      'stop-scrolling'
    )
  }

  updateScaleFactor = debounce(() => {
    if (typeof window !== void 0) {
      const { innerWidth, innerHeight } = window
      const factor = Math.min(innerWidth / originalW, innerHeight / originalH)
      this.setState({ scaleFactor: factor })
    }
  }, 250)

  listen() {
    window.addEventListener('resize', this.updateScaleFactor)
    return () => window.removeEventListener('resize', this.updateScaleFactor)
  }

  componentDidMount() {
    this.updateScaleFactor()
    this.unlisten = this.listen()
  }

  render() {
    const { menuOpened, scaleFactor } = this.state
    const { openMenu, closeMenu, toggleMenu } = this
    return (
      <LayoutContext.Provider
        value={{
          menuOpened,
          openMenu,
          closeMenu,
          toggleMenu,
          scaleFactor
        }}
      >
        {this.props.children}
      </LayoutContext.Provider>
    )
  }
}

const LayoutConsumer = LayoutContext.Consumer
export { LayoutContext, LayoutConsumer }
