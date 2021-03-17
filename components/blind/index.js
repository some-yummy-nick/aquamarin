import { useState, useEffect, useRef } from "react"
import posed from "react-pose"
import classnames from "classnames"
import { timeline, easing } from "popmotion"

const blindSize = 50
const Trigger = posed.div({
  draggable: "x",
  dragBounds: props => ({
    left: props.offset * -1,
    right: props.offset
  })
})

const Blind = (
  { height = 500, image1, image2, Label1 = () => null, Label2 = () => null },
  ...props
) => {
  const parentRef = useRef()
  const [state, setState] = useState({
    offset: 0,
    viewportWidth: 0,
    containerWidth: 0,
    initialLeft: 0,
    dragging: false,
    ready: false
  })

  useEffect(() => {
    const fullWidth = parentRef.current.clientWidth
    setState({
      viewportWidth: fullWidth,
      containerWidth: 0,
      offset: 0,
      initialLeft: 0,
      ready: false
    })

    if (!state.ready) {
      setTimeout(() => {
        timeline([
          {
            track: "a",
            from: 0,
            to: fullWidth / 2,
            duration: 1250,
            ease: easing.backOut
          }
        ]).start({
          update({ a }) {
            setState(state => ({
              ...state,
              initialLeft: a,
              containerWidth: a,
              offset: a - blindSize / 2,
              ready: true
            }))
          }
        })
      }, 500)
    }
  }, [height])

  const onValueChange = value => {
    setState(state => {
      if (state.containerWidth >= 0) {
        return {
          ...state,
          containerWidth: value + state.offset + blindSize / 2
        }
      } else {
        return { ...state }
      }
    })
  }

  return (
    <div
      style={{ height }}
      ref={parentRef}
      className={classnames("blind", {
        dragging: state.dragging
      })}
    >
      <div className="container1" style={{ width: state.containerWidth }}>
        <img src={image1} style={{ width: state.viewportWidth }} />
        <div className="label">{Label1}</div>
      </div>
      <div
        className="container2"
        style={{ width: state.viewportWidth - state.containerWidth }}
      >
        <img
          src={image2}
          style={{ width: state.viewportWidth, left: -state.containerWidth }}
        />
        <div className="label">{Label2}</div>
      </div>
      <Trigger
        className="trigger"
        offset={state.offset + blindSize / 2}
        onValueChange={{ x: onValueChange }}
        onDragStart={() => setState(state => ({ ...state, dragging: true }))}
        onDragEnd={() => setState(state => ({ ...state, dragging: false }))}
        style={{
          left: state.initialLeft,
          bottom: "20%"
        }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <rect
            y="24.7485"
            width="35"
            height="35"
            transform="rotate(-45 0 24.7485)"
            fill="white"
          />
          <path
            d="M40.7122 25.1436L34.6777 30.7332C34.2938 31.0889 33.6715 31.0889 33.2878 30.7332C32.9041 30.3778 32.9041 29.8013 33.2878 29.4459L38.6274 24.4999L33.2879 19.5541C32.9042 19.1985 32.9042 18.6221 33.2879 18.2667C33.6716 17.9111 34.294 17.9111 34.6779 18.2667L40.7123 23.8564C40.9042 24.0342 41 24.267 41 24.4999C41 24.7329 40.904 24.9658 40.7122 25.1436Z"
            fill="c"
          />
          <path
            d="M9.28783 25.1436L15.3223 30.7332C15.7062 31.0889 16.3285 31.0889 16.7122 30.7332C17.0959 30.3778 17.0959 29.8013 16.7122 29.4459L11.3726 24.4999L16.7121 19.5541C17.0958 19.1985 17.0958 18.6221 16.7121 18.2667C16.3284 17.9111 15.706 17.9111 15.3221 18.2667L9.28767 23.8564C9.09582 24.0342 9 24.267 9 24.4999C9 24.7329 9.09601 24.9658 9.28783 25.1436Z"
            fill="#78859C"
          />
        </svg>
      </Trigger>
      <style jsx>{`
        .blind {
          user-select: none;
          position: relative;
          user-select: none;
        }
        .blind :global(.trigger) {
          width: ${blindSize}px;
          height: ${blindSize}px;
          position: absolute;
          z-index: 10;
          margin-left: -${blindSize / 2 + 1}px;
        }
        .container1,
        .container2 {
          top: 0;
          left: 0;
          bottom: 0;
          position: absolute;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            object-position: bottom;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
        .container2 {
          left: auto;
          right: 0;
        }
        .container1 {
          z-index: 10;
          &:after {
            content: "";
            width: 3px;
            height: 100%;
            position: absolute;
            background: white;
            right: 0;
            top: 0;
          }
        }
        .container2 {
          width: 100%;
        }
        .dragging,
        .dragging * {
          cursor: grab;
        }
        svg {
          cursor: grab;
        }
        .container1 .label {
          top: 20px;
          left: 20px;
          color: white;
          z-index: 50;
          position: absolute;
          white-space: nowrap;
        }
        .container2 .label {
          top: 20px;
          right: 20px;
          color: white;
          z-index: 50;
          position: absolute;
          white-space: nowrap;
        }
      `}</style>
    </div>
  )
}

export default Blind
