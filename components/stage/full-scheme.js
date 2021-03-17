import classnames from 'classnames'
import statuses from '@/enums/statuses'
import Tooltip from '@/components/tooltip'
import FlatTooltip from '@/components/flat/tooltip'
import { Tween } from 'react-gsap'
import { useEffect, useState, useRef } from 'react'

const StageScheme = ({
  showTooltips = true,
  showStatuses = true,
  ...props
}) => {
  const { autoScale, viewBox } = props

  const scheme = useRef(null)
  const [isEnter, setEnter] = useState(false)
  const [isLeave, setLeave] = useState(false)

  const [{ top, left }, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (props.autoScale) {
      const position = scheme.current.getBoundingClientRect()
      setPosition({ top: position.top, left: position.left })
    }
  }, [])

  return (
    <div className={classnames('wrap', { 'auto-scale': autoScale })}>
      <div className="all-wrap">
        <div
          ref={scheme}
          style={{ top, left }}
          onMouseEnter={() => {
            setEnter(true)
            setLeave(true)
          }}
          onMouseLeave={() => setEnter(false)}
          className={classnames('scheme-wrap', {
            active: isLeave
          })}
        >
          <Tween
            to={
              autoScale
                ? {
                    scale: isEnter ? 2.5 : 1,
                    onComplete() {
                      setLeave(isEnter)
                    },
                    transformOrigin: '0 100%'
                  }
                : {}
            }
            duration={0.1}
          >
            <div className="shadow-wrap">
              <div className="scheme">
                <svg
                  viewBox={viewBox ? viewBox : '0 0 720 540'}
                  width="100%"
                  height="100%"
                  x="0"
                  y="0"
                >
                  <image width="100%" height="100%" xlinkHref={props.scheme} />
                  {props.flats.map((flat, index) => (
                    <path
                      key={index}
                      strokeWidth="0"
                      data-place="top"
                      data-tip={index}
                      stroke="transparent"
                      data-status={flat.sold_status}
                      data-for={`flat-tooltip-${index}`}
                      fill={
                        showStatuses
                          ? statuses.getColor(flat.sold_status)
                          : 'transparent'
                      }
                      className={classnames('scheme-item', {
                        reserved:
                          showStatuses &&
                          statuses.reserved === flat.sold_status,
                        sold:
                          showStatuses && statuses.sold === flat.sold_status,
                        sale:
                          showStatuses && statuses.sale === flat.sold_status,
                        selected: props.selected === flat.apartment_ui
                      })}
                      d={`M${flat.path_placement}Z`}
                      onClick={() => props.onClick(flat)}
                    />
                  ))}
                </svg>
              </div>
            </div>
          </Tween>
        </div>
      </div>
      {showTooltips &&
        props.flats.map((_, index) => (
          <Tooltip
            key={index}
            styless={true}
            animated={true}
            clickable={!!props.onTooltipClick}
            paddingless={true}
            id={`flat-tooltip-${index}`}
            getContent={index => {
              return (
                <FlatTooltip
                  onTooltipClick={props.onTooltipClick}
                  flat={props.flats[index] || {}}
                />
              )
            }}
          />
        ))}
      <style jsx>{`
        .scheme {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          box-sizing: border-box;
        }
        svg {
          display: block;
        }
        .scheme-item {
          cursor: pointer;
          // opacity: 0.2;
        }
        .scheme-item:hover {
          opacity: 1;
          stroke: #e45e7f;
        }
        .scheme-item.selected {
          opacity: 1;
          stroke: var(--color1);
          fill: var(--color1);
          fill-opacity: 0.1;
        }
        .scheme-item.selected {
          opacity: 1;
          stroke: var(--color1);
          fill: var(--color1);
          fill-opacity: 1;
          &:hover {
            fill-opacity: 0;
          }
        }
        .scheme-item.sold {
          opacity: 0.3;
        }
        .scheme-item.reserved {
          opacity: 1;
          fill-opacity: 1;
          fill: rgba(#ff4646, 0.3);
        }
        .scheme-item.sale {
          opacity: 1;
          fill-opacity: 1;
          fill: transparent;
          &:hover {
            stroke: var(--color1);
            stroke-width: 3px;
          }
        }
        .scheme-item.sold:hover,
        .scheme-item.reserved:hover {
          opacity: 0;
        }
        .tooltip {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          position: absolute;
        }
        .auto-scale {
          .wrap {
            background: white;
            position: relative;
          }
          .all-wrap {
            width: 207px;
            height: 180px;
          }
          .scheme-wrap,
          .shadow-wrap {
            width: 207px;
            height: 180px;
          }
          .shadow-wrap {
            background: white;
          }
          .scheme-wrap {
            transform: translateZ(0);
          }
          .scheme-wrap svg {
            z-index: 10;
            display: block;
            position: absolute;
            width: 80%;
            height: 80%;
            margin: auto;
            left: 10%;
            top: 10%;
          }
          .active {
            z-index: 50;
            position: fixed;
          }
          .active .shadow-wrap {
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  )
}

export default StageScheme
