import classnames from 'classnames'
import { useState } from 'react'

export default ({ children, height = 45, isOpened }) => {
  const [opened, setOpened] = useState(isOpened)
  return (
    <div>
      <div className={classnames('desc', { opened })}>
        {children}
        <div className="fader" />
      </div>
      <div className="more" onClick={() => setOpened(!opened)}>
        {opened ? 'Скрыть' : 'Подробнее'}
      </div>
      <style jsx>{`
        .desc {
          height: ${height}px;
          overflow: hidden;
          position: relative;
          &.opened {
            height: auto;
          }
        }
        .fader {
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          position: absolute;
          background: linear-gradient(rgba(255, 255, 255, 0), white);
          .opened & {
            display: none;
          }
        }
        .more {
          margin-top: 6px;
          font-size: 12px;
          line-height: 140%;
          font-weight: 400;
          color: #717271;
          cursor: pointer;
          display: inline-block;
          border-bottom: solid 1px #717271;
        }
      `}</style>
    </div>
  )
}
