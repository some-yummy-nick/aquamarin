import { useState, useRef, useEffect, createRef } from 'react'
import classnames from 'classnames'
import Title from '@/components/typo/title'

export default ({ onClick, controls }) => {
  const parent = useRef(null)
  const cells = useRef([...Array(3)].map(() => createRef()))
  const [{ width, left }, setDimensions] = useState({ width: 0, left: 0 })

  useEffect(() => {
    setSelected(controls.findIndex(control => control.selected))
  }, [controls.length])

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
    <div className="switch flex" ref={parent}>
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
            <Title marginless>{control.name}</Title>
          </span>
        </div>
      ))}
      <div className="palochka" style={{ left, width }} />
      <style jsx>{`
        .switch {
          user-select: none;
          position: relative;
          border-bottom: solid 2px var(--color4);
        }
        .item {
          cursor: pointer;
          position: relative;
          text-align: center;
          color: var(--color1);
          text-transform: uppercase;
        }
        .item:after {
        }
        .item.selected:after {
          background: var(--color2);
        }
        .selected :global(h1) {
          color: var(--color2);
        }
        .palochka {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          height: 4px;
          background: var(--color2);
          transition: 0.25s;
        }
      `}</style>
    </div>
  )
}
