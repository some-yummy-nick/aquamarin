import classnames from 'classnames'

export default props => {
  const {
    children,
    vSpace = 0,
    hSpace = 0,
    tSpace = 0,
    bSpace = 0,
    rSpace = 0,
    lSpace = 0,
    inline
  } = props
  return (
    <div
      className={classnames('spacer', { inline })}
      style={{
        marginTop: vSpace || tSpace,
        marginRight: hSpace || rSpace,
        marginBottom: vSpace || bSpace,
        marginLeft: hSpace || lSpace
      }}
    >
      {children}
      <style jsx>{`
        .inline {
          display: inline-block;
        }
      `}</style>
    </div>
  )
}
