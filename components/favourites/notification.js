import classnames from 'classnames'

const Notification = ({count, theme, menuOpened}) => (
    <div
        className={classnames('notification', {
            [theme]: true,
            opened: menuOpened
        })}
    >
        {/* prettier-ignore */}
        <span>
     <svg width="44" height="88" viewBox="0 0 44 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
            d="M41.9274 69.3593C43.5311 67.7904 43.5311 65.2096 41.9274 63.6407L24.6474 46.7364C23.0928 45.2155 20.6078 45.2155 19.0531 46.7364L1.77314 63.6407C0.169371 65.2096 0.169372 67.7904 1.77314 69.3593L19.0531 86.2636C20.6078 87.7845 23.0928 87.7845 24.6474 86.2636L41.9274 69.3593ZM21.3634 55.1622C22.9755 55.1622 24.2823 53.8554 24.2823 52.2433C24.2823 50.6312 22.9755 49.3244 21.3634 49.3244C19.7513 49.3244 18.4445 50.6312 18.4445 52.2433C18.4445 53.8554 19.7513 55.1622 21.3634 55.1622Z"
            fill="#A6CE38"/>
            <g className="key-top">
                      <path
                          d="M25.9691 39.2819C30.4364 34.7937 30.4364 27.4928 25.9691 23.0113C24.9764 22.0139 23.8381 21.2226 22.574 20.6508V5.09164C22.574 4.87221 22.488 4.65279 22.3291 4.49986L18.0935 0.244359C17.7692 -0.0814529 17.2398 -0.0814529 16.9155 0.244359L13.4211 3.75514C13.2623 3.91473 13.1763 4.1275 13.1763 4.34692V6.7074C13.1763 6.92682 13.2623 7.14624 13.4211 7.29918L14.8639 8.7487L13.4211 10.1982C13.0968 10.524 13.0968 11.056 13.4211 11.3818L13.9969 11.9603L13.4211 12.5388C13.0968 12.8646 13.0968 13.3965 13.4211 13.7223L14.6918 14.999L13.4145 16.2823C13.2557 16.4418 13.1696 16.6546 13.1696 16.874V20.6441C11.9056 21.216 10.7606 22.0072 9.76791 23.0046C5.30067 27.4928 5.30067 34.7937 9.76791 39.2752C14.2418 43.7635 21.5019 43.7635 25.9691 39.2819ZM10.9526 24.1948C11.9188 23.224 13.0505 22.4793 14.308 21.9873C14.6322 21.861 14.8374 21.5484 14.8374 21.216C14.8374 21.2093 14.8374 21.2093 14.8374 21.2027V17.2198L16.4522 15.5974C16.7765 15.2716 16.7765 14.7396 16.4522 14.4138L15.1816 13.1372L15.7573 12.5587C16.0816 12.2329 16.0816 11.701 15.7573 11.3751L15.1816 10.7967L16.6243 9.34713C16.9486 9.02132 16.9486 8.48938 16.6243 8.16357L14.8308 6.36164V4.69268L17.4913 2.0197L18.3318 2.85085V17.3461C18.3318 17.765 18.6693 18.1041 19.0796 18.0975C19.4966 18.0975 19.8275 17.7584 19.8341 17.3395V4.35357L20.8996 5.4241V21.196C20.8996 21.2027 20.8996 21.2027 20.8996 21.2027C20.9062 21.5351 21.1048 21.8477 21.4291 21.974C22.6931 22.466 23.8182 23.2107 24.7845 24.1815C28.5965 28.0115 28.5965 34.2484 24.7845 38.085C20.9724 41.9216 14.7646 41.915 10.9459 38.085C7.14051 34.2617 7.14051 28.0248 10.9526 24.1948Z"
                      />
      <path
          d="M20.0857 38.3173C21.3034 37.0938 21.3034 35.0991 20.0857 33.8756C18.8679 32.6521 16.8825 32.6521 15.6648 33.8756C14.447 35.0991 14.447 37.0938 15.6648 38.3173C16.8825 39.5407 18.8613 39.5407 20.0857 38.3173ZM16.8428 35.0592C17.412 34.4873 18.3385 34.4873 18.901 35.0592C19.4702 35.631 19.4702 36.5619 18.901 37.1271C18.3319 37.6989 17.4053 37.6989 16.8428 37.1271C16.2736 36.5619 16.2736 35.631 16.8428 35.0592Z"
      />
      <path
          d="M19.6125 52.2162C19.4331 52.2162 19.2536 52.1494 19.114 52.0089C18.8415 51.7348 18.8481 51.2868 19.1207 51.0193C19.1473 50.9926 21.8194 48.2577 21.8592 43.8579C21.8991 39.5449 18.23 37.3383 18.1967 37.3116C17.8644 37.1177 17.7514 36.683 17.9441 36.3487C18.1369 36.0144 18.569 35.9007 18.9013 36.0946C18.9478 36.1214 20.0313 36.7633 21.1015 38.0338C22.5306 39.7255 23.2751 41.7382 23.2551 43.8645C23.2086 48.8662 20.2307 51.8886 20.1044 52.0156C19.9648 52.1494 19.792 52.2162 19.6125 52.2162Z"
      />
      <path
          d="M15.5821 46.6566C15.226 46.6566 14.9227 46.3255 14.8898 45.8998C14.8634 45.5451 14.8502 44.1903 14.8502 43.8356C14.8436 43.3784 15.1535 43.0079 15.5359 43H15.5425C15.9249 43 16.2282 43.3626 16.2348 43.8198C16.2348 44.1351 16.248 45.4505 16.2678 45.7658C16.3007 46.223 16.0172 46.625 15.6348 46.6566C15.6216 46.6566 15.6018 46.6566 15.5821 46.6566Z"
      />
            </g>

     </svg>
    </span>
        <div className="count">{count}</div>
        <div className="label">
            <div>??????????????????</div>
            ??????????????
        </div>
        <style jsx>{`
      .notification {
        width: 40px;
        height: 88px;
        position: relative;
        cursor: pointer;
        color: black;
         .key-top{
          fill:black;
         }
        span {
          color: white;
        }
        &.transparent {
        .key-top{
        fill:white;
        }
       
        }
        &.opened {
          span {
            color: black;
          }
        }
        &:hover {
          .label {
            display: block;
          }
          .count {
          }
          svg {
          }
        }
        &.opened {
          &:hover {
            svg {
            }
          }
        }
      }
      .count {
        color: #fff;
        font-size: 20px;
        font-weight: 500;
        top: 76%;
        left: 50%;
        text-align: center;
        position: absolute;
        transform: translate(-50%, -50%);
        .transparent & {
          color: white;
        }
        .opened & {
          color: var(--color1);
        }
      }
      .label {
        font-weight: 500;
        font-size: 10px;
        text-transform: uppercase;
        color: #646464;
        position: absolute;
        line-height: 1;
        bottom: 10px;
        left: 50px;
        .transparent & {
          color: white;
        }
        .opened & {
          color: #646464;
        }
      }
    `}</style>
    </div>
)

export default Notification
