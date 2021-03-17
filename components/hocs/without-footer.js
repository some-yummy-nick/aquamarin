import React from 'react'

const withoutFooter = WrappedComponent => {
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
        footer: false,
        ...wrappedComponentProps
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

export default withoutFooter
