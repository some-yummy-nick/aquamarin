import { PagePhablet } from '@/components/page'
import Swiper from 'react-id-swiper'
import 'swiper/dist/css/swiper.css'
import classnames from 'classnames'

export default function Main() {
  const [current, setCurrent] = React.useState(0)

  const swiperRef = React.useRef(null)
  const swiperParams = {
    slidesPerView: 1,
    mousewheel: true,
    effect: 'fade',
    autoplay: {
      delay: 4000
    },
    on: {
      slideChange: () => {
        setCurrent(swiperRef.current.swiper.realIndex)
      }
    }
  }

  return (
    <PagePhablet theme="transparent" footer={false}>
      <div className="all">
        <div className="swiper">
          <Swiper ref={swiperRef} {...swiperParams}>
            {SLIDES.map(slide => (
              <div className="slide hero-slide" key={slide}>
                <img src={slide} className="slide-pic" />
                {/* <div className="slide-box" /> */}
                {/* <div className="slide-name"> */}
                {/*   уютный дом <br /> */}
                {/*   для комфортной <br /> */}
                {/*   жизни */}
                {/* </div> */}
              </div>
            ))}
          </Swiper>
          <div className="p">
            {SLIDES.map((slide, index) => (
              <div
                key={slide}
                onClick={() => swiperRef.current.swiper.slideTo(index)}
                className={classnames('pp hero-slide', {
                  current: current === index
                })}
              />
            ))}
          </div>
        </div>
        <div className="slide-name">
          {/* prettier-ignore */}
          <svg width="349" height="71" viewBox="0 0 349 71" fill="none">
              <path d="M90.548 63.29H92.06V67.538H90.152V65H82.142V67.538H80.234V63.29H81.17C82.286 62.294 82.844 59.468 82.844 54.812V53.12H90.548V63.29ZM83.258 63.29H88.64V54.83H84.608C84.584 59.066 84.134 61.886 83.258 63.29ZM94.0448 65V53.12H98.3828C99.5828 53.12 100.555 53.462 101.299 54.146C102.043 54.818 102.415 55.688 102.415 56.756C102.415 57.824 102.037 58.7 101.281 59.384C100.537 60.068 99.5708 60.41 98.3828 60.41H95.9528V65H94.0448ZM95.9528 58.718H98.3468C99.0068 58.718 99.5228 58.544 99.8948 58.196C100.267 57.848 100.453 57.374 100.453 56.774C100.453 56.174 100.267 55.7 99.8948 55.352C99.5228 54.992 99.0068 54.812 98.3468 54.812H95.9528V58.718ZM112.089 53.12H114.087L109.911 62.102C109.371 63.254 108.861 64.052 108.381 64.496C107.901 64.94 107.199 65.174 106.275 65.198C105.939 65.198 105.555 65.132 105.123 65V63.362C105.375 63.41 105.687 63.434 106.059 63.434C106.815 63.434 107.397 63.098 107.805 62.426L103.215 53.12H105.357L108.849 60.284L112.089 53.12ZM115.316 53.12H117.674L122.282 58.682L117.242 65H114.884L120.032 58.682L115.316 53.12ZM122.336 65V53.12H124.244V65H122.336ZM126.566 58.682L131.714 65H129.356L124.298 58.682L128.924 53.12H131.264L126.566 58.682ZM133.596 65V53.12H135.504V57.854H141.48V53.12H143.388V65H141.48V59.564H135.504V65H133.596ZM146.392 65V53.12H148.3V57.512H150.694C151.918 57.512 152.914 57.86 153.682 58.556C154.462 59.252 154.852 60.152 154.852 61.256C154.852 62.36 154.468 63.26 153.7 63.956C152.932 64.652 151.93 65 150.694 65H146.392ZM148.3 63.308H150.676C151.36 63.308 151.9 63.122 152.296 62.75C152.692 62.378 152.89 61.88 152.89 61.256C152.89 60.632 152.692 60.134 152.296 59.762C151.9 59.39 151.36 59.204 150.676 59.204H148.3V63.308ZM156.958 65V53.12H158.866V65H156.958ZM171.149 52.922H171.815V65H169.907V56.702L162.545 65.198H161.879V53.12H163.787V61.4L171.149 52.922ZM164.093 48.98V48.62H165.641V49.034C165.641 49.526 165.755 49.916 165.983 50.204C166.223 50.48 166.559 50.618 166.991 50.618C167.423 50.618 167.759 50.48 167.999 50.204C168.239 49.928 168.359 49.538 168.359 49.034V48.62H169.925V48.98C169.925 49.88 169.655 50.606 169.115 51.158C168.575 51.71 167.867 51.986 166.991 51.986C166.127 51.986 165.425 51.71 164.885 51.158C164.357 50.606 164.093 49.88 164.093 48.98ZM179.844 65V53.12H181.752V65H179.844ZM184.2 58.682L189.672 65H187.314L181.806 58.682L186.792 53.12H189.132L184.2 58.682ZM200.514 61.544C200.514 62.552 200.16 63.38 199.452 64.028C198.744 64.676 197.814 65 196.662 65H191.568V53.12H195.726C196.794 53.12 197.652 53.42 198.3 54.02C198.96 54.608 199.29 55.364 199.29 56.288C199.29 57.212 198.96 57.956 198.3 58.52C198.996 58.748 199.536 59.126 199.92 59.654C200.316 60.182 200.514 60.812 200.514 61.544ZM195.546 54.794H193.44V57.998H195.546C196.122 57.998 196.572 57.854 196.896 57.566C197.22 57.278 197.382 56.882 197.382 56.378C197.382 55.886 197.22 55.502 196.896 55.226C196.584 54.938 196.134 54.794 195.546 54.794ZM198.588 61.49C198.588 60.914 198.402 60.464 198.03 60.14C197.658 59.804 197.148 59.636 196.5 59.636H193.44V63.326H196.5C197.16 63.326 197.67 63.164 198.03 62.84C198.402 62.504 198.588 62.054 198.588 61.49ZM210.493 65L209.647 63.02H204.301L203.455 65H201.421L206.659 52.922H207.307L212.545 65H210.493ZM208.963 61.382L206.983 56.468L204.985 61.382H208.963ZM214.437 65V53.12H218.775C219.975 53.12 220.947 53.462 221.691 54.146C222.435 54.818 222.807 55.688 222.807 56.756C222.807 57.824 222.429 58.7 221.673 59.384C220.929 60.068 219.963 60.41 218.775 60.41H216.345V65H214.437ZM216.345 58.718H218.739C219.399 58.718 219.915 58.544 220.287 58.196C220.659 57.848 220.845 57.374 220.845 56.774C220.845 56.174 220.659 55.7 220.287 55.352C219.915 54.992 219.399 54.812 218.739 54.812H216.345V58.718ZM227.722 65V54.83H223.726V53.12H233.644V54.83H229.63V65H227.722ZM242.046 65L241.2 63.02H235.854L235.008 65H232.974L238.212 52.922H238.86L244.098 65H242.046ZM240.516 61.382L238.536 56.468L236.538 61.382H240.516ZM247.304 53.12H255.062V65H253.154V54.83H249.122C249.038 57.506 248.858 59.582 248.582 61.058C248.318 62.522 247.934 63.566 247.43 64.19C246.926 64.802 246.236 65.12 245.36 65.144C245.012 65.144 244.724 65.096 244.496 65V63.362C244.568 63.386 244.736 63.398 245 63.398C245.792 63.398 246.356 62.738 246.692 61.418C247.028 60.086 247.226 57.968 247.286 55.064L247.304 53.12Z" fill="white"/>
              <path d="M26.3634 34.9688L23.9484 29.3135H8.67434L6.25738 34.9688H0.447266L15.4116 0.462891H17.2621L32.2284 34.9688H26.3634ZM21.9941 24.6325L16.3369 10.5933L10.6287 24.6325H21.9941Z" fill="white"/>
              <path d="M46.8845 34.9692V5.91474H35.4681V1.02789H63.8032V5.91474H52.3359V34.9692H46.8845Z" fill="white"/>
              <path d="M104.429 0.462891H106.28V34.9688H100.83V13.6787L91.1097 26.4339H89.2593L79.4876 13.6278V34.9688H74.0381V0.462891H75.9395L90.1845 19.4379L104.429 0.462891Z" fill="white"/>
              <path d="M117.903 17.9975C117.835 13.1636 119.565 9.01578 123.098 5.55206C126.628 2.0903 130.827 0.392741 135.696 0.461349C140.53 0.392741 144.739 2.0903 148.322 5.55206C151.903 9.01578 153.644 13.1636 153.54 17.9975C153.644 22.8315 151.903 26.9813 148.322 30.443C144.739 33.9048 140.53 35.6023 135.696 35.5337C130.827 35.6023 126.62 33.9048 123.07 30.443C119.522 26.9832 117.801 22.8334 117.903 17.9975ZM147.936 17.9466C147.936 14.3809 146.769 11.4073 144.439 9.02362C142.106 6.64195 139.211 5.45013 135.747 5.45013C132.252 5.45013 129.345 6.63214 127.032 8.99814C124.717 11.3641 123.56 14.3456 123.56 17.9466C123.56 21.5808 124.709 24.5878 127.004 26.9715C129.302 29.3551 132.217 30.545 135.747 30.545C139.211 30.545 142.106 29.3453 144.439 26.946C146.769 24.5486 147.936 21.5475 147.936 17.9466Z" fill="white"/>
              <path d="M163.157 17.9985C163.053 13.1645 164.784 9.0167 168.349 5.55298C171.915 2.09121 176.133 0.393657 181.001 0.462265C184.086 0.462265 186.915 1.16599 189.486 2.57147C192.056 3.97695 194.079 5.88034 195.553 8.27966L191.439 11.3121C188.937 7.40539 185.476 5.45105 181.051 5.45105C177.556 5.45105 174.64 6.64286 172.311 9.02454C169.978 11.4082 168.814 14.3975 168.814 17.9985C168.814 21.5974 169.978 24.5887 172.311 26.9724C174.64 29.3541 177.556 30.5459 181.051 30.5459C185.476 30.5459 188.937 28.5915 191.439 24.6828L195.553 27.7173C194.079 30.1519 192.066 32.0631 189.512 33.4529C186.958 34.8407 184.119 35.5347 181.001 35.5347C176.133 35.6033 171.915 33.9057 168.349 30.4439C164.784 26.9802 163.053 22.8324 163.157 17.9985Z" fill="white"/>
              <path d="M226.408 31.8321V35.9976H220.959V31.8321C216.125 31.7302 212.216 30.4188 209.233 27.898C206.251 25.3791 204.759 21.9937 204.759 17.742C204.759 13.5256 206.251 10.1736 209.233 7.68801C212.216 5.20244 216.125 3.9087 220.959 3.8048V0H226.408V3.8048C231.277 3.9087 235.211 5.20244 238.211 7.68801C241.212 10.1736 242.711 13.5412 242.711 17.793C242.711 22.0094 241.212 25.3791 238.211 27.898C235.211 30.4188 231.277 31.7302 226.408 31.8321ZM220.959 27.0492V8.53679C217.632 8.60539 215.009 9.46202 213.09 11.1066C211.169 12.7532 210.211 15.0153 210.211 17.8949C210.211 20.7412 211.161 22.9601 213.065 24.5558C214.966 26.1494 217.597 26.9806 220.959 27.0492ZM237.26 17.793C237.26 14.9134 236.292 12.667 234.355 11.0557C232.418 9.44437 229.768 8.60539 226.408 8.53679V27.0492C229.735 27.0158 232.375 26.1749 234.329 24.5283C236.282 22.8837 237.26 20.6392 237.26 17.793Z" fill="white"/>
              <path d="M254.176 34.9692V1.02789H276.493V5.91474H259.627V14.6044H272.329V19.3364H259.627V30.0843H277.11V34.9692H254.176Z" fill="white"/>
              <path d="M288.584 34.9692V1.02789H300.978C304.405 1.02789 307.182 1.9982 309.309 3.93295C311.434 5.87161 312.497 8.36502 312.497 11.4151C312.497 14.4672 311.424 16.9704 309.282 18.9248C307.139 20.8791 304.372 21.8553 300.978 21.8553H294.035V34.9692H288.584ZM294.035 17.0214H300.874C302.76 17.0214 304.234 16.5235 305.297 15.5297C306.359 14.5358 306.892 13.1833 306.892 11.4681C306.892 9.75286 306.359 8.3905 305.297 7.37902C304.234 6.36951 302.76 5.86181 300.874 5.86181H294.035V17.0214Z" fill="white"/>
              <path d="M342.374 34.9688L339.957 29.3135H324.683L322.266 34.9688H316.456L331.42 0.462891H333.271L348.237 34.9688H342.374ZM338.003 24.6325L332.346 10.5933L326.637 24.6325H338.003Z" fill="white"/>
            </svg>
        </div>
        <div className="mask" />
        <div className="slide-mask" />
      </div>

      <style jsx>{`
        .all {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: fixed;
        }
        .mask {
          top: 0;
          right: 0;
          left: 0;
          height: 175px;
          position: absolute;
          z-index: 1000;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 100%,
            rgba(0, 0, 0, 0.0510417) 100%
          );
        }
        .swiper {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
          :global(.swiper-container) {
            height: 100%;
          }
        }
        .slide {
          width: 100%;
          height: 100%;
          position: relative;
          padding: 0 50px;
          box-sizing: border-box;
        }
        .slide-box {
          left: 20px;
          width: 150px;
          height: 150px;
          background: var(--color9);
          position: absolute;
          top: 50%;
          transform: translateY(-60%);
        }
        .slide-name {
          color: white;
          font-family: var(--heading-font);
          font-size: 24px;
          line-height: 120%;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          position: absolute;
          top: 50%;
          transform: translateY(-60%);
          z-index: 1;
          left: 60px;
        }
        .slide-pic {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.3) rotateY(20deg);
          transition: 5s cubic-bezier(0.24, 0.99, 0.6, 0.99);
        }
        .p {
          top: 50%;
          right: 20px;
          position: absolute;
          z-index: 10;
          transform: translateY(-60%);
          display: flex;
          align-items: flex-end;
          flex-direction: column;
        }
        .pp {
          width: 20px;
          height: 2px;
          background: white;
          margin: 15px 0;
          cursor: pointer;
          transition: 0.5s;
          display: none;
          &.current {
            width: 30px;
          }
        }
        .slide-mask {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 3;
          position: absolute;
          background: rgba(0, 0, 0, 0.35);
          pointer-events: none;
        }
        .slide-name {
          top: 50%;
          left: 50%;
          z-index: 4;
          position: absolute;
          transform: translate(-50%, -70%);
          pointer-events: none;
          svg {
            width: 260px;
          }
        }
      `}</style>
      <style jsx global>{`
        :global(.swiper-slide-active.hero-slide) img {
          transform: scale(1);
        }
      `}</style>
    </PagePhablet>
  )
}

const SLIDES = [
  require('@/static/main/01.jpg'),
  require('@/static/main/02.jpg'),
  require('@/static/main/03.jpg'),
  require('@/static/main/04.jpg')
]