import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
import Content from '@/components/content'
import CloseButton from '@/components/button/close'
import classnames from 'classnames'
import panAndZoomHoc from 'react-pan-and-zoom-hoc'

import 'swiper/dist/css/swiper.css'

class Figure extends React.Component {
  render() {
    const { x, y, scale, width, height, ...other } = this.props
    return (
      <div style={{ width, height, overflow: 'hidden' }}>
        <img
          style={{
            objectFit: 'contain',
            transform: `scale(${scale}, ${scale}) translate(${(0.5 - x) *
              width}px, ${(0.5 - y) * height}px`
          }}
          width={width}
          // TODO: потом, если тема зайдет, улучшим
          // height - footer height
          height={height - 110}
          {...other}
        />
      </div>
    )
  }
}

const PannableAndZoomableFigure = panAndZoomHoc(Figure)

class FlatGallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeIndex: 0,
      previewWidth: 0,
      previewHeight: 0,
      curScale: 1
    }

    this.renderWrapRef = React.createRef()
    this.thumbnailSwiperRef = React.createRef()
  }

  componentDidMount() {
    this.updateViewportSize()
    this.unlisten = this.listen()
  }

  componentWillUnmount() {
    this.unlisten()
  }

  updateViewportSize = () => {
    const { clientWidth, clientHeight } = this.renderWrapRef.current
    this.setState({ previewWidth: clientWidth, previewHeight: clientHeight })
  }

  listen = () => {
    window.addEventListener('resize', this.updateViewportSize)
    return () => window.removeEventListener('resize', this.updateViewportSize)
  }

  render() {
    const that = this
    const thumbnailSwiperParams = {
      spaceBetween: 30,
      centeredSlides: true,
      slidesPerView: 'auto',
      touchRatio: 0.2,
      slideToClickedSlide: true,
      containerClass: 'h100',
      slideClass: 'slide',
      keyboard: false,
      mousewheel: true,
      on: {
        slideChange() {
          that.setState({ activeIndex: this.activeIndex })
        }
      }
    }

    const { activeIndex, previewWidth, previewHeight } = this.state
    const { gallery, thumbnails, title, requestClose } = this.props

    return (
      <Content paddingless flexible autoHeight>
        <div
          className="flex flex-auto flex-column"
          style={{ userSelect: 'none' }}
        >
          <div className="wrap-top flex items-center">
            <div className="flex-auto" />
            <div className="wrap-close">
              <CloseButton
                onClick={requestClose}
                color="#646464"
                hoverColor="#AAC800"
              />
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="wrap-inner">
              <div
                className={classnames('render-wrap', {
                  fullscreen: this.state.curScale > 1
                })}
                ref={this.renderWrapRef}
              >
                <PannableAndZoomableFigure
                  minScale={1}
                  maxScale={5}
                  passOnProps={true}
                  renderOnChange={true}
                  disableZoomToMouse={false}
                  ignorePanOutside={true}
                  scaleFactor={1.07}
                  src={gallery[activeIndex]}
                  width={previewWidth}
                  height={previewHeight}
                  key={activeIndex}
                  onPanAndZoom={(x, y, scale) => {
                    this.setState({ curScale: scale })
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className={classnames('wrap thumbnails', {
              hidden: this.state.curScale > 1
            })}
          >
            <div className="wrap-inner">
              <Swiper {...thumbnailSwiperParams} ref={this.thumbnailSwiperRef}>
                {gallery.map(image => (
                  <div className="thumbnail" key={image}>
                    <img src={image} />
                  </div>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="controls">
          <div
            className={classnames('prev', {
              disabled: 0 === activeIndex
            })}
            onClick={() => {
              this.thumbnailSwiperRef.current.swiper.slidePrev()
              this.setState({ curScale: 1 })
            }}
          >
            {/* prettier-ignore */}
            <svg width="21" height="37" viewBox="0 0 21 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2.12158" y="16.2139" width="26.038" height="3" rx="1.5" transform="rotate(45 2.12158 16.2139)" fill="#A6CE38"/>
              <rect width="25.9546" height="3" rx="1.5" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 2.12158 20.4741)" fill="#A6CE38"/>
            </svg>
          </div>
          <div
            className={classnames('next', {
              disabled: activeIndex === gallery.length - 1
            })}
            onClick={() => {
              this.thumbnailSwiperRef.current.swiper.slideNext()
              this.setState({ curScale: 1 })
            }}
          >
            {/* prettier-ignore */}
            <svg width="21" height="37" viewBox="0 0 21 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="26.038" height="3" rx="1.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 18.4121 16.2139)" fill="#4E4B4B"/>
              <rect x="18.4121" y="20.4741" width="25.9546" height="3" rx="1.5" transform="rotate(-135 18.4121 20.4741)" fill="#4E4B4B"/>
            </svg>
          </div>
        </div>{' '}
        <style jsx>{`
          @import 'mixins/r';
          .wrap {
            position: relative;
          }
          .wrap-top {
            z-index: 1;
            position: relative;
            // padding: 2rem rem(90px) 0;
          }
          .wrap-inner {
            top: 80px;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            position: absolute;
          }
          .thumbnail {
            opacity: 0.4;
            width: 80px;
            height: 80px;
            padding: 10px;
            cursor: pointer;
            box-sizing: border-box;
            position: relative;
            border: solid 2px rgba(#00A9A4,0.1);
            img {
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              overflow: hidden;
              position: absolute;
              object-fit: cover;
              width: 100%;
              height: 100%;
            }
          }
          .thumbnail:hover {
            opacity: 1;
            
          }
          .thumbnail.swiper-slide-active {
            opacity: 1;
            border-color: #00A9A4;
          }
          .thumbnails {
            left: 0;
            right: 0;
            bottom: 0;
            position: fixed;
            height: 100px;
            transition: 0.35s;
            background: white;
            &.hidden {
              transform: translateY(100%);
            }
          }
          .thumbnails .wrap-inner {
            top: 10px;
          }
          .render-wrap {
            @extend %abs-container;
            user-select: none;
            display: flex;
            align-items: center;
            justify-content: center;
            bottom: 0;
            &.fullscreen {
            }
            :global(div):hover {
              cursor: all-scroll;
            }
            :global(img) {
              pointer-events: none;
            }
          }
          .controls {
            :global(.is-mobile) & {
              display: none;
            }
          }
          .prev {
            left: 50px;
            top: 50%;
            z-index: 500;
            position: absolute;
            cursor: pointer;
            transform: translateY(-50%);
            &.disabled {
              opacity: 0.5;
              cursor: default;
            }
          }
          .next {
            right: 50px;
            top: 50%;
            z-index: 500;
            cursor: pointer;
            position: absolute;
            transform: translateY(-50%);
            &.disabled {
              opacity: 0.5;
              cursor: default;
            }
          }
          .next,
          .prev {
            color: white;
            rect {
              fill: var(--color9);
            }
            &:hover:not(.disabled) {
              color: var(--color9);
            }
            &:hover:not(.disabled) rect {
              fill: #000;
            }
            &:hover:not(.disabled) circle {
              fill-opacity: 1;
            }
          }
        `}</style>
      </Content>
    )
  }
}

FlatGallery.defaultProps = {
  gallery: [],
  thumbnails: [],
  title: ''
}

export default FlatGallery
