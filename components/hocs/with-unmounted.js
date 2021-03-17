import React from 'react'

const withUnmounted = WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.childRef = React.createRef()
    }

    static async getInitialProps(ctx) {
      let wrappedComponentProps = {}

      try {
        if (WrappedComponent.getInitialProps) {
          wrappedComponentProps = await WrappedComponent.getInitialProps(ctx)
        }
      } catch (error) {
        throw error
      }

      return wrappedComponentProps
    }

    componentDidMount() {
      if (this.childRef.current) {
        this.childRef.current.hasMounted = true
      }
    }

    componentWillUnmount() {
      if (this.childRef.current) {
        this.childRef.current.hasUnmounted = true
        this.childRef.current.hasMounted = false
      }
    }

    render() {
      return <WrappedComponent ref={this.childRef} {...this.props} />
    }
  }
}

export default withUnmounted
