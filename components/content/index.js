import classnames from 'classnames'

const Content = props => {
  const classNames = classnames('content', {
    paddingless: props.paddingless,
    flexible: props.flexible,
    relative: props.relative,
    column: props.column,
    flex: props.flex,
    auto: props.auto,
    dtp: props.dtp,
    dbp: props.dbp,
    drp: props.drp,
    wrap: props.width,
    colored: props.colored
  })

  return (
    <div className={classNames} style={{ maxWidth: props.width }}>
      {props.children}
      <style jsx>{`
        @import 'mixins/r';
        .content {
          padding-top: 30px;
          padding-right: 50px;
          padding-bottom: 50px;
          padding-left: 50px;
          flex: 1;
          &.auto {
            flex: 0 0 auto;
          }
          &.paddingless {
            padding: 0;
          }
          &.relative {
            position: relative;
          }
          &.dtp {
            padding-top: 0;
          }
          &.dbp {
            padding-bottom: 0;
          }
          &.drp {
            padding-right: 0;
          }
          &.flex {
            display: flex;
          }
          &.column {
            flex-direction: column;
          }
          &.flexible {
            display: flex;
          }
          &.wrap {
            margin: 0 auto;
          }
          &.colored {
            background: #f7f8fa;
          }
          :global(.is-mobile) & {
            padding-top: 20px;
            padding-right: 20px;
            padding-bottom: 20px;
            padding-left: 20px;
            &.paddingless {
              padding: 0;
            }
            &.dtp {
              padding-top: 0;
            }
            &.dbp {
              padding-bottom: 0;
            }
          }
        }
      `}</style>
    </div>
  )
}

export default Content
