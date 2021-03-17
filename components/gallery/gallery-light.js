import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
import 'swiper/dist/css/swiper.css'
import classnames from 'classnames'

const interleaveOffset = 1

class GalleryLight extends Component {
  constructor(props) {
    super(props)
    this.swiperRef = React.createRef()
  }

  state = {
    current: 0
  }

  prev = () => {
    if (!this.swiper) return
    this.swiper.slidePrev()
  }

  next = () => {
    if (!this.swiper) return
    this.swiper.slideNext()
  }

  slideToLoop = index => {
    if (!this.swiper) return
    this.swiper.slideToLoop(index)
  }

  componentDidMount() {
    if (!this.swiper) return
    this.swiper.update()
    this.swiper.autoplay.stop()
  }

  componentDidUpdate(prevProps) {
    if (this.swiper && prevProps.images !== this.props.images) {
      this.swiper.update()
      this.swiper.slideTo(0, 0)
    }
  }

  get swiper() {
    try {
      return this.swiperRef.current.swiper
    } catch (e) {}
  }

  render() {
    const { current } = this.state
    const {
      images,
      items,
      slideRenderer,
      showPager,
      showControlsMask
    } = this.props
    const swiperParams = Object.assign(
      {
        loop: false,
        speed: 1000,
        mousewheel: true,
        watchSlidesProgress: true,
        containerClass: 'h100 flex flex-auto',
        autoplay: {
          delay: 4000
        },
        on: {
          slideChange: () => {
            if (!this.swiper) return
            this.setState({ current: this.swiper.realIndex }, () =>
              this.props.onChangeIndex(this.state.current)
            )
          },

          imagesReady: () => {
            if (!this.swiper) return
            this.swiper.autoplay.start()
          },

          progress: () => {
            const swiper = this.swiper

            if (!swiper) return

            for (let i = 0; i < swiper.slides.length; i++) {
              const slideProgress = swiper.slides[i].progress
              const innerOffset = swiper.width * interleaveOffset
              const innerTranslate = slideProgress * innerOffset
              swiper.slides[i].querySelector('.slide-inner').style.transform =
                'translate3d(' + innerTranslate + 'px, 0, 0)'
            }
          },

          touchStart: () => {
            const swiper = this.swiper

            if (!swiper) return

            for (let i = 0; i < swiper.slides.length; i++) {
              swiper.slides[i].style.transition = ''
            }
          },

          setTransition: speed => {
            const swiper = this.swiper

            if (!swiper) return

            for (let i = 0; i < swiper.slides.length; i++) {
              swiper.slides[i].style.transition = speed + 'ms'
              swiper.slides[i].querySelector('.slide-inner').style.transition =
                speed + 'ms'
            }
          }
        }
      },
      this.props.options
    )

    return (
      <div className="gallery flex flex-column flex-auto">
        <div className="wrap-photos flex flex-auto">
          <div className="wrap-inner">
            <Swiper
              {...swiperParams}
              ref={this.swiperRef}
              shouldSwiperUpdate={true}
            >
              {images.map((image, index) => (
                <div className="h100 flex flex-auto" key={image}>
                  <div
                    className="slide-inner"
                    style={{ backgroundImage: `url(${image})` }}
                  >
                    {items && items.length && slideRenderer && (
                      <div className="slide-render">
                        {slideRenderer(items[index])}
                      </div>
                    )}
                  </div>
                  <img className="preloader" src={image} />
                </div>
              ))}
            </Swiper>
          </div>
          {images.length > 1 && this.props.showControls && (
            <div className="controls">
              <div
                className={classnames('prev', {
                  disabled: 0 === current
                })}
                onClick={this.prev}
              >
                {/* prettier-ignore */}
                <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle r="28.5" transform="matrix(-1 0 0 1 29 29)" fill="currentColor" fillOpacity="0.2" stroke="white"/>
                  <rect width="1.79763" height="12.4458" rx="0.898813" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 30.0001 37.9999)" fill="white"/>
                  <rect width="1.79763" height="12.4458" rx="0.898813" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 31.2711 21.6702)" fill="white"/>
                </svg>
              </div>
              <div
                className={classnames('next', {
                  disabled: current === images.length - 1
                })}
                onClick={this.next}
              >
                {/* prettier-ignore */}
                <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="29" cy="29" r="28.5" fill="currentColor" fillOpacity="0.2" stroke="white"/>
                  <rect x="28" y="37.9999" width="1.79763" height="12.4458" rx="0.898813" transform="rotate(-135 28 37.9999)" fill="white"/>
                  <rect x="26.7285" y="21.6702" width="1.79763" height="12.4458" rx="0.898813" transform="rotate(-45 26.7285 21.6702)" fill="white"/>
                </svg>
              </div>
              {showControlsMask && (
                <div>
                  <div className="prev-mask" />
                  <div className="next-mask" />
                </div>
              )}
            </div>
          )}
          {showPager && (
            <div className="pager">
              {images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => this.slideToLoop(index)}
                  className={classnames('pager-bullet', {
                    active: index === current
                  })}
                />
              ))}
            </div>
          )}
        </div>
        <style jsx>{`
          .gallery {
            height: 100%;
            overflow: hidden;
            transform: translateZ(0);
          }
          .wrap-photos {
            position: relative;
            :global(.is-mobile) & {
              flex-direction: column;
            }
          }
          .wrap-inner {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            position: absolute;
          }
          .slide-inner {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-size: cover;
          }
          .preloader {
            width: 0;
            height: 0;
            overflow: hidden;
            position: absolute;
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
          .prev,
          .next {
            color: white;
            circle {
              fill: #000;
            }
            &:hover:not(.disabled) circle {
              fill: #aac800;
              fill-opacity: 1;
              stroke: #aac800;
            }
          }
          .pager {
            height: 50px;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            position: absolute;
            left: 50%;
            bottom: 30px;
            z-index: 500;
            transform: translateX(-50%);
          }
          .pager-bullet {
            width: 10px;
            height: 10px;
            margin: 0 8px;
            cursor: pointer;
            border-radius: 50%;
            background: transparent;
            display: inline-block;
            border: solid 1px var(--color7);
            &.active {
              background: var(--color7);
            }
          }
          .prev-mask {
            top: 0;
            left: 0;
            bottom: 0;
            position: absolute;
            width: 245px;
            z-index: 10;
            background: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.2) 0%,
              rgba(0, 0, 0, 0) 100%
            );
          }
          .next-mask {
            top: 0;
            right: 0;
            bottom: 0;
            position: absolute;
            width: 245px;
            z-index: 10;
            background: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.2) 100%
            );
          }
        `}</style>
      </div>
    )
  }
}

GalleryLight.defaultProps = {
  onChangeIndex() {},
  showControls: true
}

export default GalleryLight
