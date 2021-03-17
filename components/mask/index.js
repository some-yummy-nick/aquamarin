import classnames from 'classnames'
export default props => {
  return (
    <div
      className={classnames('mask', { reverse: props.reverse })}
      style={{ top: props.top, bottom: props.bottom }}
    >
      <style jsx>{`
        .mask {
          width: 100%;
          height: 241px;
          left: 0px;
          top: 0;
          z-index: 100;
          position: absolute;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(6, 21, 45, 0.64) 0%,
            rgba(34, 88, 169, 0) 100%
          );
          &.reverse {
            transform: rotate(180deg);
          }
        }
      `}</style>
    </div>
  )
}
