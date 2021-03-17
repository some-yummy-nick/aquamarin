import Title from '@/components/typo/title'
import classnames from 'classnames'
import { Tween } from 'react-gsap'
import { useState, useRef, useEffect, createRef } from 'react'

const DesktopSwitch = ({ onClick, controls, color, bottomBorder = true }) => {
  const parent = useRef(null)
  const cells = useRef([...Array(3)].map(() => createRef()))
  const [{ width, left }, setDimensions] = useState({ width: 0, left: 0 })

  useEffect(() => {
    setSelected(controls.findIndex(control => control.selected))
  }, [controls.find(control => control.selected)])

  function setSelected(index) {
    setDimensions({
      width: cells.current[index].current.clientWidth,
      left: Math.abs(
        parent.current.getBoundingClientRect().left -
          cells.current[index].current.getBoundingClientRect().left
      )
    })
  }

  return (
    <div
      className={classnames('switch flex', {
        [color]: true,
        'bottom-border': bottomBorder
      })}
      ref={parent}
    >
      {controls.map((control, index) => (
        <div
          key={index}
          ref={cells.current[index]}
          onClick={() => {
            setSelected(index, control)
            onClick(control)
          }}
          className={classnames('item flex-auto', {
            selected: control.selected
          })}
        >
          <span className="label">
            <Title color={color} marginless>
              {control.name}
            </Title>
          </span>
        </div>
      ))}
      <Tween to={{ x: left, width }} duration={0.7}>
        <div className="palochka" />
      </Tween>
      <style jsx>{`
        .switch {
          user-select: none;
          position: relative;
          &.bottom-border {
            border-bottom: solid 1px #d3d3d3;
          }
        }
        .item {
          cursor: pointer;
          position: relative;
          text-align: center;
          color: #aac800;
          text-transform: uppercase;
          padding: 5px 25px;
          &:hover:not(.selected) :global(*) {
            color: var(--color1);
          }
          &:not(.selected) :global(*) {
            color: #646464;
          }
        }
        .item.selected:after {
          background: currentColor;
        }
        .selected :global(h1) {
          color: #aac800;
        }
        .palochka {
          content: '';
          position: absolute;
          left: 0;
          height: 0px;
          bottom: 0;
          transform: translateZ(0);
          border-bottom: solid 4px #aac800;
          .bottom-border & {
            bottom: -1px;
          }
        }
      `}</style>
    </div>
  )
}

DesktopSwitch.defaultProps = {
  color: 'color4'
}

export default DesktopSwitch
