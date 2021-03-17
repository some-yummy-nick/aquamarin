import classnames from 'classnames'
export default props => (
  <div>
    <div className={classnames('placeholder', { center: props.center })}>
      <div>{props.children}</div>
    </div>
    <style jsx>{`
      .placeholder {
        height: 200px;
        padding: 1rem 2rem;
        position: relative;
        box-sizing: border-box;
      }
      .center {
        padding: 0;
        display: flex;
        align-items: center;
      }
    `}</style>
  </div>
)
