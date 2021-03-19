import chunk from 'lodash/chunk'
import classnames from 'classnames'

const ROW_HEIGHT = 30

const StagesList = ({ stages, currentStage, onStageClick }) => {
  const pickerRef = React.useRef(null)

  const [page, setPage] = React.useState(0)
  const [cstage, setCStage] = React.useState(+currentStage)
  const [visibleStagesCount, setVisibleStagesCount] = React.useState(0)

  const chunkedStages = chunk([...stages].reverse(), visibleStagesCount)
  const totalPages = chunkedStages.length - 1

  React.useEffect(() => {
    const pickerElement = pickerRef.current
    const { height } = pickerElement.getBoundingClientRect()
    const visibleStagesCount = Math.floor(height / ROW_HEIGHT)
    setVisibleStagesCount(visibleStagesCount)
  }, [])

  React.useEffect(() => {
    let selectedPage = 0

    chunkedStages.forEach((_, index) => {
      if (chunkedStages[index].map(s => s.floor).includes(cstage)) {
        selectedPage = index
      }
    })

    setPage(selectedPage)
  }, [visibleStagesCount])

  React.useEffect(() => {
    setCStage(+currentStage)
  }, [currentStage])

  let visibleStages = chunkedStages[page] || []

  if (cstage) {
    if (visibleStages.length < visibleStagesCount) {
      const diff = visibleStagesCount - visibleStages.length + 3
      const balanceStages = stages.slice(visibleStages.length, diff)
      visibleStages = visibleStages.concat(balanceStages).sort((a, b) => {
        return b.floor - a.floor
      })
    }
  }

  function pageUp() {
    if (page <= totalPages - 1) {
      setPage(page + 1)
      setCStage(0)
    }
  }

  function pageDown() {
    if (page > 0) {
      setPage(page - 1)
      setCStage(0)
    }
  }

  return (
    <div className="container">
      <div className="legend">Этаж</div>
      {/* <div className="next"> */}
      {/*   <div */}
      {/*     className={classnames('control-button', { */}
      {/*       disabled: page === 0 */}
      {/*     })} */}
      {/*     onClick={pageDown} */}
      {/*   > */}
      {/* prettier-ignore */}
      {/*     <svg width="14" height="8" viewBox="0 0 14 8" fill="none"> */}
      {/*       <path d="M8.03711 1.36914L2.77545 6.6308L0.699256 6.6308L6.99901 0.331043L8.03711 1.36914Z" fill="currentColor"/> */}
      {/*       <path d="M7.00391 0.331055L13.3008 6.62793L11.2246 6.62793L5.96581 1.36915L7.00391 0.331055Z" fill="currentColor"/> */}
      {/*     </svg> */}
      {/*   </div> */}
      {/* </div> */}
      <div className="picker">
        <div className="picker-inner" ref={pickerRef}>
          {visibleStages.map((stage, index) => (
            <div
              key={index}
              onClick={() => onStageClick(stage.floor)}
              className={classnames('stage-row flex items-center', {
                selected: stage.floor == cstage
              })}
            >
              <div className="stage-row">
                <div className="floor">{stage.floor}</div>
                <div className="flats">
                  {stage.available_flats}
                  <small
                    style={{
                      marginTop: 1,
                      visibility: stage.floor == cstage ? 'visible' : 'hidden'
                    }}
                  >
                  </small>
                </div>
                {stage.floor != cstage && (
                  <div className="hover-marker">
                    {/* prettier-ignore */}
                  </div>
                )}
                {stage.floor == cstage && (
                  <div className="current-marker">
                    {/* prettier-ignore */}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="prev"> */}
      {/*   <div */}
      {/*     onClick={pageUp} */}
      {/*     className={classnames('control-button', { */}
      {/*       disabled: page === totalPages */}
      {/*     })} */}
      {/*   > */}
      {/* prettier-ignore */}
      {/*     <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
      {/*       <path d="M8.03711 6.63084L2.77545 1.36919L0.699256 1.36919L6.99901 7.66894L8.03711 6.63084Z" fill="currentColor"/> */}
      {/*       <path d="M7.00391 7.66893L13.3008 1.37205L11.2246 1.37205L5.96581 6.63083L7.00391 7.66893Z" fill="currentColor"/> */}
      {/*     </svg> */}
      {/*   </div> */}
      {/* </div> */}
      <style jsx>{`
        .container {
          flex: 1;
          width: 87px;
          display: flex;
          flex-direction: column;
        }
        .picker {
          flex: 1;
          display: flex;
          position: relative;
          left: -14px;
        }
        .picker-inner {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          overflow: hidden;
          position: absolute;
          display: flex;
          flex-direction: column;
        }
        .stage-row {
          height: 39px;
          display: flex;
          cursor: pointer;
          align-items: center;
          position: relative;
          &:hover {
            .hover-marker {
                 border-color:var(--color1-dark);
                 box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

            }
          }
          &.selected {
            * {
              color: white;
            }
          }
        }
        .prev,
        .next {
          height: 30px;
          display: flex;
          align-items: center;
          color: var(--color1);
          padding-left: 7px;
        }
        .control-button {
          cursor: pointer;
          &.disabled {
            color: #a1a1a1;
          }
        }
        .legend {
          font-size: 14px;
          line-height: 30px;
          color: #979797;
          text-transform: lowercase;
          margin-bottom: 10px;
        }
        .flats,
        .floor {
          z-index: 1;
          position: relative;
        }
        .floor {
          width: 43px;
          height: 39px;
          font-size: 22px;
          font-weight: 500;
          color: #646464;
          line-height: 1px;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
        }
        .flats {
          width: 43px;
          height: 39px;
          font-size: 12px;
          line-height: 1px;
          display: flex;
          align-items: center;
          text-align: center;
          color: #b4b4b4;
          justify-content: center;
        }
        .hover-marker {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
          pointer-events: none;
         border:1px solid transparent;
         border-radius:4px;
        }
        .current-marker {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
          pointer-events: none;
          background-color: var(--color1-dark);
          border-radius:4px;
        }
      `}</style>
    </div>
  )
}

StagesList.defaultProps = {
  onStageClick() {},
  currentStage: 0,
  stages: []
}

export default StagesList
