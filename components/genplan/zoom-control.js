import classnames from 'classnames'
const ZoomControl = props => (
  <div className="zoom" style={props.position}>
    <div className="flex items-center">
      <div className="flex-none">
        <div
          className={classnames('zoom-btn zoom-in', {
            disabled: props.maxDisabled
          })}
          onClick={ev => {
            ev.stopPropagation()
            props.onZoomIn()
          }}
        >
          <span className="label">
            <svg width="20px" height="20px">
              <path
                fill="currentColor"
                d="M19.265,10.748 L10.744,10.748 L10.744,19.267 C10.744,19.679 10.411,20.013 9.998,20.013 C9.588,20.013 9.253,19.679 9.253,19.267 L9.253,10.748 L0.732,10.748 C0.321,10.748 -0.014,10.413 -0.014,10.001 C-0.014,9.589 0.321,9.255 0.732,9.255 L9.253,9.255 L9.253,0.736 C9.253,0.323 9.588,-0.011 9.998,-0.011 C10.411,-0.011 10.744,0.323 10.744,0.736 L10.744,9.255 L19.265,9.255 C19.676,9.255 20.011,9.589 20.011,10.001 C20.011,10.413 19.676,10.748 19.265,10.748 Z"
              />
            </svg>
          </span>
        </div>
        <div
          className={classnames('zoom-btn zoom-out', {
            disabled: props.minDisabled
          })}
          onClick={ev => {
            ev.stopPropagation()
            ev.nativeEvent.stopImmediatePropagation()
            props.onZoomOut()
          }}
        >
          <span className="label">
            <svg width="20px" height="2px">
              <path
                fill="currentColor"
                d="M19.263,1.747 L0.732,1.747 C0.321,1.747 -0.014,1.413 -0.014,1.001 C-0.014,0.589 0.321,0.255 0.732,0.255 L19.263,0.255 C19.676,0.255 20.011,0.589 20.011,1.001 C20.011,1.413 19.676,1.747 19.263,1.747 Z"
              />
            </svg>
          </span>
        </div>
      </div>
      {props.helpTextShown && (
        <div className="flex-none">
          <div className="scroll-help flex items-end">
            <div className="scroll-icon">
              <svg width="21px" height="57px" viewBox="0 0 21 57">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g transform="translate(1.000000, -1.000000)">
                    <path
                      d="M9.03,28.906 L9.06,28.906 C11.4552409,28.9054692 13.7525167,29.8568084 15.446114,31.5505932 C17.1397113,33.2443781 18.090796,35.5417592 18.09,37.937 L18.09,47.968 C18.0907959,50.3633327 17.1397431,52.6608166 15.4461745,54.3547602 C13.752606,56.0487038 11.4553328,57.0002654 9.06,57 L9.03,57 C6.63466718,57.0002654 4.33739399,56.0487038 2.64382546,54.3547602 C0.950256932,52.6608166 -0.000795894482,50.3633327 6.40592308e-14,47.968 L6.40592308e-14,37.937 C-0.000795996193,35.5417592 0.950288722,33.2443781 2.64388604,31.5505932 C4.33748335,29.8568084 6.63475915,28.9054692 9.03,28.906 Z M9.03,33.324 L9.03,39.249 L9.03,33.324 Z"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3.32,6.831 C3.14831256,6.98483848 3.05020698,7.20447266 3.05020698,7.435 C3.05020698,7.66552734 3.14831256,7.88516152 3.32,8.039 C3.68406722,8.36585836 4.23593278,8.36585836 4.6,8.039 L8.12,3.911 L8.12,20.132 C8.12625234,20.3637552 8.22485258,20.5834036 8.39387095,20.7420931 C8.56288932,20.9007825 8.78831108,20.9853548 9.02,20.977 C9.25421446,20.9875649 9.48297971,20.9043372 9.65565153,20.7457419 C9.82832335,20.5871466 9.9306578,20.3662664 9.94,20.132 L9.94,3.911 L13.45,8.039 C13.8178679,8.36590545 14.3721321,8.36590545 14.74,8.039 C14.9116874,7.88516152 15.009793,7.66552734 15.009793,7.435 C15.009793,7.20447266 14.9116874,6.98483848 14.74,6.831 L9.67,1.253 C9.31414683,0.914966841 8.75585317,0.914966841 8.4,1.253 L3.32,6.831 Z"
                      fill="#FFFFFF"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="scroll-hint">
              <div>используйте скролл</div>
              <div>чтобы приблизить</div>
            </div>
          </div>
        </div>
      )}
    </div>
    <style jsx>{`
      .zoom {
        z-index: 900;
        user-select: none;
        position: absolute;
      }
      .zoom-btn {
        width: 44px;
        height: 44px;
        cursor: pointer;
        position: relative;
        background-color: var(--color1);
      }
      .zoom-in {
        border-top-right-radius: 22px;
        border-top-left-radius: 22px;
      }
      .zoom-out {
        margin-top: 2px;
        border-bottom-right-radius: 22px;
        border-bottom-left-radius: 22px;
      }
      .zoom-in,
      .zoom-out {
        &:active:not(.disabled) {
          filter: brightness(110%);
        }
        &:hover:not(.disabled) {
          filter: brightness(110%);
        }
        &.disabled {
          cursor: default;
          opacity: 0.5;
        }
      }
      .label {
        top: 50%;
        left: 50%;
        color: #44455c;
        position: absolute;
        transform: translate(-50%, -50%);
      }
      .zoom-out .label {
        top: 35%;
      }
      .scroll-hint {
        color: white;
        line-height: 1;
        padding-left: 8px;
        font-weight: bold;
        padding-bottom: 10px;
        text-transform: uppercase;
      }
      .scroll-help {
        padding-left: 45px;
      }
    `}</style>
  </div>
)

ZoomControl.defaultProps = {
  onZoomIn() {},
  onZoomOut() {},
  position: [0, 0]
}

export default ZoomControl
