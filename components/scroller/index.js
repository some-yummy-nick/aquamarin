import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'

class Scroller extends Component {
  constructor(props) {
    super(props)

    this.scroller = null
    this.unlisten = null
  }

  componentDidMount() {
    this.unlisten = this.listen()
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten()
    }
  }

  listen = () => {
    if (!this.scroller) return

    if (this.props.inverse) {
      findDOMNode(this).addEventListener('mousewheel', this.onWheel, {
        passive: true
      })
      return () =>
        findDOMNode(this).removeEventListener('mousewheel', this.onWheel)
    } else {
      this.scroller._container.addEventListener('scroll', this.onScroll)
      return () =>
        this.scroller._container.removeEventListener('scroll', this.onScroll)
    }
  }

  onWheel = e => {
    this.scroller._container.scrollLeft += e.deltaY
  }

  onScroll = ({ target }) => {
    const { scrollTop, scrollHeight, clientHeight } = target
    const scrolled = scrollHeight - clientHeight
    if (scrollTop >= scrolled - scrolled / 2) {
      this.props.onScrollEnd()
    }
  }

  render() {
    const { props } = this
    return (
      <div className="scroller" style={{ height: '100%' }}>
        <PerfectScrollbar ref={node => (this.scroller = node)} {...props}>
          {props.children}
        </PerfectScrollbar>
        <style jsx global>{`
          .ps {
            overflow: hidden !important;
            overflow-anchor: none;
            -ms-overflow-style: none;
            touch-action: auto;
            -ms-touch-action: auto;
          }
          .ps__rail-x {
            display: none;
            opacity: 0;
            transition: background-color 0.2s linear, opacity 0.2s linear;
            -webkit-transition: background-color 0.2s linear,
              opacity 0.2s linear;
            height: 15px;
            bottom: 0px;
            position: absolute;
          }
          .ps__rail-y {
            display: none;
            opacity: 0;
            transition: background-color 0.2s linear, opacity 0.2s linear;
            -webkit-transition: background-color 0.2s linear,
              opacity 0.2s linear;
            width: 15px;
            right: 0;
            position: absolute;
          }
          .ps--active-x > .ps__rail-x,
          .ps--active-y > .ps__rail-y {
            display: block;
            background-color: transparent;
          }
          .ps:hover > .ps__rail-x,
          .ps:hover > .ps__rail-y,
          .ps--focus > .ps__rail-x,
          .ps--focus > .ps__rail-y,
          .ps--scrolling-x > .ps__rail-x,
          .ps--scrolling-y > .ps__rail-y {
            opacity: 0.6;
          }
          .ps .ps__rail-x:hover,
          .ps .ps__rail-y:hover,
          .ps .ps__rail-x:focus,
          .ps .ps__rail-y:focus,
          .ps .ps__rail-x.ps--clicking,
          .ps .ps__rail-y.ps--clicking {
            background-color: #eee;
            opacity: 0.9;
          }
          .ps__thumb-x {
            background-color: #aaa;
            border-radius: 6px;
            transition: background-color 0.2s linear, height 0.2s ease-in-out;
            -webkit-transition: background-color 0.2s linear,
              height 0.2s ease-in-out;
            height: 6px;
            bottom: 2px;
            position: absolute;
          }
          .ps__thumb-y {
            background-color: #aaa;
            border-radius: 6px;
            transition: background-color 0.2s linear, width 0.2s ease-in-out;
            -webkit-transition: background-color 0.2s linear,
              width 0.2s ease-in-out;
            width: 6px;
            right: 2px;
            position: absolute;
          }
          .ps__rail-x:hover > .ps__thumb-x,
          .ps__rail-x:focus > .ps__thumb-x,
          .ps__rail-x.ps--clicking .ps__thumb-x {
            background-color: #999;
            height: 11px;
          }
          .ps__rail-y:hover > .ps__thumb-y,
          .ps__rail-y:focus > .ps__thumb-y,
          .ps__rail-y.ps--clicking .ps__thumb-y {
            background-color: #999;
            width: 11px;
          }
          @supports (-ms-overflow-style: none) {
            .ps {
              overflow: auto !important;
            }
          }
          @media screen and (-ms-high-contrast: active),
            (-ms-high-contrast: none) {
            .ps {
              overflow: auto !important;
            }
          }
          .scrollbar-container {
            position: relative;
            height: 100%;
          }
        `}</style>
      </div>
    )
  }
}

Scroller.defaultProps = {
  onScrollEnd() {},
  offset: 1500
}

export default Scroller