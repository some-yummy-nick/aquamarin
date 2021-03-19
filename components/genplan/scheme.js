import keymirror from 'keymirror'
import classnames from 'classnames'
import Tooltip from '@/components/tooltip'
import withFetch from '@/components/hocs/with-fetch'
import Toggle from '@/components/toggle'
import Spacer from '@/components/typo/spacer'
import NoSSR from 'react-no-ssr'
import { AppContext } from '@/components/context/app'
import { Tween } from 'react-gsap'
import { useContext, useEffect, useState, useRef } from 'react'

const SCHEME_MODES = keymirror({ Houses: null, Sections: null })

const MyTooltip = ({ args }) => {
  return (
    <div className="tooltip">
      <div className="inner">
        <div>
          <span>{args[0]}</span> дом
        </div>
        <div>
          <span>{args[1]}</span> Подъезд
          {args[2] == 1 && <span> (сквозной)</span>}
        </div>
      </div>
      <div className="triangle" />
      <style jsx>{`
        .tooltip {
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          background: white;
          border: solid 1px #b4b4b4;
          border-radius: 6px;
          color: black;
        }
        span {
          color: #aac800;
        }
        .triangle {
          width: 9px;
          height: 9px;
          border-top: solid 1px #b4b4b4;
          border-left: solid 1px #b4b4b4;
          top: 50%;
          left: -6px;
          transform: translate(0, -50%) rotate(-45deg);
          background: white;
          position: absolute;
        }
        .inner {
          padding: 10px 20px;
        }
      `}</style>
    </div>
  )
}

const Scheme = ({
  onClickSection,
  request,
  showSchemeModeControl = false,
  showTooltips,
  ...props
}) => {
  const scheme = useRef(null)
  const app = useContext(AppContext)
  const { autoScale } = props

  const [isEnter, setEnter] = useState(false)
  const [isLeave, setLeave] = useState(false)
  const [genplanScheme, setGenplanScheme] = useState([])
  const [{ top, left }, setPosition] = useState({ top: 0, left: 0 })
  const [schemeMode, setSchemeMode] = useState(
    app.userSettings('SchemeMode') == 'Sections' || props.currentSection
      ? SCHEME_MODES.Sections
      : SCHEME_MODES.Houses
  )

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const response = await request.get('/genplan/scheme')
        setGenplanScheme(response.body.data)
      } catch (e) {}
    }

    if (props.autoScale) {
      const position = scheme.current.getBoundingClientRect()
      setPosition({ top: position.top, left: position.left })
    }

    fetchScheme()
  }, [])

  function isSelected(houseNumber, sectionNumber) {
    if (props.currentHouse && props.currentSection) {
      return (
        props.currentHouse == houseNumber &&
        props.currentSection == sectionNumber
      )
    }

    if (void 0 === props.selected[houseNumber]) {
      return false
    }

    return props.selected[houseNumber].includes(sectionNumber)
  }

  return (
    <>
      {showSchemeModeControl && (
        <div className="scheme-toggle">
          {/* prettier-ignore */}
          <Spacer bSpace={10}>
            <NoSSR>
              <Toggle
                onText={'выбор домов'}
                offText={'подъездов'}
                on={schemeMode === SCHEME_MODES.Sections}
                onOn={() => setSchemeMode(SCHEME_MODES.Houses)}
                onOff={() => setSchemeMode(SCHEME_MODES.Sections)}
                onToggle={() => {
                  var newMode = schemeMode === SCHEME_MODES.Houses ? SCHEME_MODES.Sections : SCHEME_MODES.Houses;
                  setSchemeMode(newMode)
                  app.setUserSettings({param: 'SchemeMode',val: newMode})
                }}
              />
            </NoSSR>
        </Spacer>
        </div>
      )}
      <div className={classnames('wrap', { 'auto-scale': autoScale })}>
        <div className="all-wrap">
          <div
            ref={scheme}
            style={{ top, left }}
            onMouseEnter={() => {
              if (props.autoScale) {
                const position = scheme.current.getBoundingClientRect()
                setPosition({ top: position.top, left: position.left })
              }
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
                      transformOrigin: '0 0'
                    }
                  : {}
              }
              duration={0.1}
            >
              <div className="shadow-wrap">
                <svg width="194" height="194" viewBox="0 0 194 194" fill="none">
                  <image
                    xlinkHref="/static/genplan/scheme.svg"
                    x="0"
                    y="0"
                    height="100%"
                    width="100%"
                  />
                  {genplanScheme.length &&
                    genplanScheme.map(house => {
                      return house.sections.map(section => {
                        return (
                          <path
                            d={section.path_scheme}
                            key={`${house.building_number}-${section.id}`}
                            stroke="#FF8200"
                            strokeWidth="0.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            data-for="genplan-scheme"
                            data-place="right"
                            data-section
                            data-tip={[
                              house.building_number,
                              section.section_number,
                              section.is_through
                            ]}
                            data-delay-hide={300}
                            onClick={() => {
                              // TODO: что-то сделать с этим безобразием
                              const buildingId = house.id
                              const buildingNum = house.building_number
                              const sectionNum = section.section_number
                              const maxSectionFloor = section.max_floor
                              const minSectionFloor = section.min_floor || 1
                              const sections = house.sections.map(
                                s => s.section_number
                              )
                              //
                              const selectedSectionsNums =
                                schemeMode === SCHEME_MODES.Houses
                                  ? sections
                                  : sectionNum
                              onClickSection(
                                buildingNum,
                                selectedSectionsNums,
                                buildingId,
                                maxSectionFloor,
                                minSectionFloor
                              )
                            }}
                            className={classnames({
                              'is-selected': isSelected(
                                house.building_number,
                                section.section_number
                              )
                            })}
                          />
                        )
                      })
                    })}
                </svg>
              </div>
            </Tween>
          </div>
        </div>
        {props.showControls && (
          <div className="controls">
            {props.currentHouse && (
              <div className="control">
                Дом <span className="highlight">{props.currentHouse}</span>
              </div>
            )}
            {props.currentSection && (
              <div className="control">
                Подъезд{' '}
                <span className="highlight">
                  {props.currentSection}
                  {props.currentSectionIsThrough && (
                    <span className="comment"> (сквозной)</span>
                  )}
                </span>
              </div>
            )}
            {props.currentHouseFinishDate && (
              <div className="control small">
                Срок сдачи {props.currentHouseFinishDate}
              </div>
            )}
          </div>
        )}
        {genplanScheme.length > 0 && (
          <Tooltip
            id="genplan-scheme"
            styless={true}
            animated={true}
            clickable={false}
            paddingless={true}
            getContent={args => {
              if (null === args) return null
              if (!showTooltips) return null
              return <MyTooltip args={args.split(/,/)} />
            }}
          />
        )}
      </div>
      <style jsx>{`
        .wrap {
          position: relative;
        }
        .all-wrap {
          width: 220px;
          height: 220px;
          background: white;
        }
        .auto-scale .scheme-wrap,
        .auto-scale .shadow-wrap {
          width: 220px;
          height: 220px;
          background: white;
        }
        .shadow-wrap {
        }
        .scheme-wrap {
          transform: translateZ(0);
        }
        .scheme-wrap svg {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          display: block;
          position: absolute;
        }
        .auto-scale .active {
          z-index: 1000;
          position: fixed;
        }
        .auto-scale .active .shadow-wrap {
          overflow: hidden;
        }
        .controls {
          color: #646464;
          margin-top: 1rem;
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
        }
        .control.small {
          font-size: 10px;
          color: #b4b4b4;
          font-weight: 500;
        }
        .highlight {
          color: var(--color1-dark);
        }
        .highlight .comment {
        }
        .control {
        }
        svg {
          path {
            cursor: pointer;
            fill: transparent;
          }
          .is-selected {
            fill: var(--color1);
          }
        }
        .scheme-wrap,
        .shadow-wrap {
          width: 100%;
          height: 100%;
        }
        div:not(.auto-scale) svg {
          width: 100%;
          height: 100%;
          position: static;
        }
        div:not(.auto-scale) .all-wrap {
          width: 100%;
          height: 100%;
        }
        .scheme-toggle :global(.label) {
          font-size: 12px;
        }
      `}</style>
    </>
  )
}

Scheme.defaultProps = {
  selected: {},
  autoScale: true,
  showSections: false
}

export default withFetch(Scheme)
