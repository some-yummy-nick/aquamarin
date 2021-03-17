import classnames from 'classnames'

const Toggle = ({ on = false, onToggle, onOn, onOff, onText, offText }) => {
  return (
    <div className={classnames('switch flex items-center', { on })}>
      <div className={classnames('label', { on: !on })} onClick={onOn}>
        {onText}
      </div>
      <div>
        <div onClick={onToggle} className={classnames('toggler', { on })}>
          <div className="thumb" />
        </div>
      </div>
      <div className={classnames('label', { on })} onClick={onOff}>
        {offText}
      </div>
      <style jsx>{`
        .toggler {
          width: 28px;
          height: 16px;
          margin: 0 10px;
          cursor: pointer;
          position: relative;
          border-radius: 16px;
          border: solid 1px #646464;
          &.on {
            .thumb {
              left: 14px;
            }
          }
        }
        .thumb {
          top: 2px;
          height: 12px;
          width: 12px;
          left: 2px;
          border-radius: 50%;
          position: absolute;
          transition: all 0.25s;
          background: var(--color9);
        }
        .label {
          cursor: pointer;
          font-weight: 400;
          font-size: 10px;
          line-height: 1;
          text-transform: uppercase;
          color: #646464;
          padding-top: 0px;
          &.on {
            color: #646464;
          }
        }
        .label.on {
          color: #646464;
        }
      `}</style>
    </div>
  )
}

export default Toggle
