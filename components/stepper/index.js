import classnames from 'classnames'
const Stepper = ({ values, selected, onClick }) => {
  return (
    <div className="stepper flex">
      {Object.keys(values).map(key => {
        return (
          <div
            key={key}
            onClick={() => onClick(key)}
            className={classnames('item flex-auto', {
              selected: key === selected
            })}
          >
            <div className="name">{key}</div>
            <div className="desc">{values[key]}</div>
            <div className="bord" />
          </div>
        )
      })}
      <style jsx>{`
        .stepper {
          margin-top: 2px;
          border-bottom: solid 1px var(--color4);
        }
        .name {
          margin-top: 2px;
          font-weight: 500;
          font-size: 12px;
          line-height: 19px;
          text-transform: uppercase;
          color: var(--color4);
          padding: 0 12px;
        }
        .desc {
          font-weight: 400;
          font-size: 10px;
          line-height: 140%;
          color: #b5b5b5;
          margin-top: 1px;
          margin-bottom: 3px;
          transition: 0.25s;
          padding: 0 12px;
        }
        .item {
          cursor: pointer;
          text-align: center;
          position: relative;
        }
        .selected {
          .bord {
            opacity: 1;
          }
          .desc,
          .name {
            color: var(--color2);
          }
        }
        .bord {
          height: 2px;
          width: 100%;
          bottom: -1px;
          position: absolute;
          background: var(--color2);
          opacity: 0;
          transition: 0.25s;
        }
      `}</style>
    </div>
  )
}

export default Stepper
