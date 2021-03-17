import classnames from 'classnames'
const Label = props => (
  <div>
    <div
      className={classnames('label', { even: props.even })}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      style={props.style}
    >
      {props.children}
    </div>
    <style jsx>{`
      .label {
        height: 45px;
        line-height: 1;
        font-size: 16px;
        font-weight: 400;
        padding: 0 50px;
        display: flex;
        align-items: center;
        color: #646464;
        border-bottom: solid 1px #e7e7e7;
        &.even {
          //background: #fafafa;
        }
      }
    `}</style>
  </div>
)

Label.defaultProps = {
  onMouseEnter() {},
  onMouseLeave() {}
}

export default Label
