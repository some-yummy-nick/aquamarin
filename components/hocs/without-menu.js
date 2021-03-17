import React from 'react'

const withoutMenu = WrappedComponent => {
  return class extends React.Component {
    static async getInitialProps(ctx) {
      let wrappedComponentProps = {}

      try {
        if (WrappedComponent.getInitialProps) {
          wrappedComponentProps = await WrappedComponent.getInitialProps(ctx)
        }
      } catch (error) {
        throw error
      }

      return {
        menu: false,
        ...wrappedComponentProps
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

export default withoutMenu
