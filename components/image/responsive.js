import React, { Component } from 'react'
import Spinner from '@/components/spinner'
import classnames from 'classnames'

class ResponsiveImage extends Component {
  state = {
    loading: true
  }

  static defaultProps = {
    ratio: '16/9',
    onLoad() {},
    onError() {}
  }

  constructor(props) {
    super(props)
    this.imageRef = React.createRef()
  }

  calcRatio(ratio) {
    if (typeof ratio === 'string') {
      const [a, b] = ratio.split(/\//)
      return (b * 100) / a
    }

    return ratio * 100
  }

  onLoad = () => {
    this.setState({ loading: false })
    this.props.onLoad(this.imageRef.current)
  }

  onError = () => {
    this.setState({ loading: false })
    this.props.onError(this.imageRef.current)
  }

  componentDidMount() {
    const img = new Image()

    img.src = this.props.src

    img.onload = this.onLoad
    img.onerror = this.onError

    this.img = img
  }

  componentWillUnmount() {
    this.img.onload = null
    this.img.onerror = null
  }

  render() {
    return (
      <div
        className={classnames('container', {
          flex: this.props.flexible,
          autoWidth: this.props.autoWidth
        })}
        style={{ paddingBottom: `${this.calcRatio(this.props.ratio)}%` }}
      >
        <img
          ref={this.imageRef}
          src={this.props.src}
          className={classnames({
            cover: this.props.cover,
            [this.props.imageClassName]: true
          })}
        />
        {/*this.state.loading &&
          // TODO: переделать на CSS анимацию
            <div className="loading">
            <Spinner />
          </div>
        */}
        <style jsx>{`
          img,
          .loading {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
            position: absolute;
          }
          .container {
            position: relative;
          }
          .loading {
            display: flex;
            align-items: flex-end;
            justify-content: center;
          }
          .flex {
            display: flex;
            flex: 1;
          }
          .autoWidth {
            width: 100%;
            height: 100%;
            padding: 0 !important;
          }
          .cover {
            object-fit: cover;
          }
        `}</style>
      </div>
    )
  }
}

export default ResponsiveImage
