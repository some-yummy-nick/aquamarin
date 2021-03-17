import React, { Component } from 'react'
import classnames from 'classnames'
import Swiper from 'react-id-swiper'
import 'swiper/dist/css/swiper.css'
import Title from '@/components/typo/title'
import PrevBtn from '@/components/prev-btn'
import NextBtn from '@/components/next-btn'
import Spinner from '@/components/spinner'
import withUnmounted from '@/components/hocs/with-unmounted'
import Counter from '@/components/gallery/counter'
import AlbumsPicker from '@/components/gallery/albums-picker'

const interleaveOffset = 1

function isPortrait(img) {
  if (!img) return false

  const h = img.naturalHeight || img.height
  const w = img.naturalWidth || img.width

  return h > w
}

class Gallery extends Component {
  constructor(props) {
    super(props)
    this.swiperRef = React.createRef()
  }

  preloadersRefs = []

  state = {
    current: 0,
    layouts: [],
    loading: true
  }

  prev = () => {
    if (!this.swiper) return
    this.swiper.slidePrev()
  }

  next = () => {
    if (!this.swiper) return
    this.swiper.slideNext()
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({ current: 0 }, () => {
      if (!this.swiper) return
      this.swiper.slideTo(0, 0)
    })
  }

  componentDidMount() {
    this.swiper.update()
    this.swiper.autoplay.stop()
  }

  get swiper() {
    try {
      return this.swiperRef.current.swiper
    } catch (e) {}
  }

  render() {
    const { current, layouts, loading } = this.state

    const {
      gallery,
      albums,
      onAlbumChange,
      title,
      showTitle,
      getTitle
    } = this.props

    const swiperParams = {
      loop: false,
      speed: 1000,
      mousewheel: true,
      preloadImages: true,
      watchSlidesProgress: true,
      containerClass: 'h100 flex flex-auto',
      autoplay: {
        delay: 4000
      },
      on: {
        slideChange: () => {
          if (!this.swiper) return
          this.setState({ current: this.swiper.realIndex })
        },

        imagesReady: () => {
          if (this.hasUnmounted) return

          const getLayouts = images => {
            return images.map(image => isPortrait(image))
          }

          if (this.swiper) {
            this.setState(
              {
                layouts: getLayouts(Array.from(this.swiper.imagesToLoad)),
                loading: false
              },
              () => this.swiper.autoplay.start()
            )
          } else {
            this.setState({
              layouts: getLayouts(this.preloadersRefs),
              loading: false
            })
          }
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
    }

    return (
      <div className="gallery flex flex-column flex-auto">
        {loading && (
          <div className="spinner-wrap">
            <Spinner center />
          </div>
        )}
        <div className="wrap-photos flex flex-auto">
          <div className="wrap-inner">
            <Swiper
              {...swiperParams}
              ref={this.swiperRef}
              shouldSwiperUpdate={true}
            >
              {gallery.photos.map((photo, index) => (
                <div className="h100 flex flex-auto" key={index}>
                  <div
                    className={classnames('slide-inner', {
                      portrait: layouts[index]
                    })}
                    style={{ backgroundImage: `url(${photo.url})` }}
                  />
                  <img
                    src={photo.url}
                    className="preloader"
                    ref={node => (this.preloadersRefs[index] = node)}
                  />
                  {showTitle && (
                    <div className="slide-name">{getTitle(photo)}</div>
                  )}
                </div>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="flex items-stretch">
          <div className="title flex items-center">
            <Title marginless>{title}</Title>
          </div>
          <div className="flex flex-auto">
            <AlbumsPicker
              albums={albums}
              current={gallery}
              changeAlbumClick={album => onAlbumChange(album)}
            />
          </div>
          <div className="counter flex items-center">
            <Counter current={current + 1} total={gallery.photos.length} />
          </div>
          <div>
            <PrevBtn onClick={this.prev} />
            <NextBtn onClick={this.next} />
          </div>
          <div className="spacer" />
        </div>
        <style jsx>{`
          @import 'mixins/r';
          .title,
          .counter {
            padding: 0 2rem;
          }
          .wrap-photos {
            position: relative;
          }
          .wrap-inner {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            position: absolute;
          }
          .spacer {
            width: 150px;
            @include r(1400) {
              width: 200px;
            }
          }
          .slide-inner {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background-size: cover;
            background-position: center;
          }
          .portrait {
            background-size: contain;
            background-repeat: no-repeat;
          }
          .preloader {
            width: 0;
            height: 0;
            overflow: hidden;
            position: absolute;
          }
          .slide-name {
            left: 0;
            right: 0;
            bottom: 0;
            font-size: 16px;
            font-weight: 400;
            position: absolute;
            padding: 0.3rem 2rem;
            background: rgba(255, 255, 255, 0.7);
          }
          .spinner-wrap {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            position: absolute;
            overflow: hidden;
            z-index: 500;
            background: white;
          }
        `}</style>
      </div>
    )
  }
}

Gallery.defaultProps = {
  getTitle(item) {
    return item
  }
}

export default withUnmounted(Gallery)
