const StageTooltip = props => (
  <div className="tooltip" onClick={props.onClick}>
    <div>Перейти на</div>
    <span className="stage">{props.stage}</span> этаж
    <style jsx>{`
      .tooltip {
        cursor: pointer;
        color: white;
        font-size: 12px;
        position: relative;
        text-transform: uppercase;
        padding: 0.8rem;
        padding-bottom: 0.5rem;
      }
      .stage {
        top: -2px;
        font-size: 22px;
        font-weight: bold;
        position: relative;
        color: var(--color2);
        vertical-align: middle;
      }
    `}</style>
  </div>
)

StageTooltip.defaultProps = {
  onClick() {}
}

export default StageTooltip
