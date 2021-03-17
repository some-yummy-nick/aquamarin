import { memo } from 'react'
import classnames from 'classnames'

const Floor = ({ children, selected, height, ...props }) => {
  return (
    <div
      {...props}
      style={{ height, width: height }}
      className={classnames({ selected })}
    >
      {children}
      <style jsx>{`
        div {
          font-weight: 500;
          font-size: 10px;
          color: #adadad;
          height: 20px;
          width: 20px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 5px;
          padding-bottom: 15px;
          box-sizing: border-box;
          &.selected {
            color: var(--color9);
          }
        }
      `}</style>
    </div>
  )
}

export default memo(Floor)
