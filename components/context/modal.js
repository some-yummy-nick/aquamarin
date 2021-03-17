import React, { Component, createContext } from 'react'

const ModalContext = createContext({
  props: {},
  component: null,
  showModal() {},
  hideModal() {}
})

export class ModalProvider extends Component {
  state = {
    props: {},
    component: null
  }

  showModal = (component, props = {}) => {
    this.setState({ component, props })
  }

  hideModal = () => {
    this.setState({
      props: {},
      component: null
    })
  }

  render() {
    const { showModal, hideModal } = this
    const { props, component } = this.state
    return (
      <ModalContext.Provider
        value={{
          props,
          component,
          showModal,
          hideModal
        }}
      >
        {this.props.children}
      </ModalContext.Provider>
    )
  }
}

const ModalConsumer = ModalContext.Consumer
export { ModalContext, ModalConsumer }
