export default props => (
  <div className="total">
    <span className="label">найдено: &nbsp;</span>
    <span className="count">{props.total}</span>
    {props.suf && (
      <span>
        <span> </span>
        <div className="suf"> {props.suf}</div>
      </span>
    )}
    {props.all && props.all != props.total && (
      <span>
        <span> </span>
        <div className="all"> из {props.all}</div>
      </span>
    )}
    <style jsx>{`
      .total {
        color: #b4b4b4;
        text-transform: uppercase;
      }
      .label {
        font-size: 14px;
        font-weight: 500;
        display: inline-block;
      }
      .count,
      .suf {
        font-size: 20px;
        font-weight: 500;
        color: var(--color1);
        display: inline-block;
      }
      .suf {
        color: #b4b4b4;
        font-size: 14px;
        font-weight: 500;
        display: inline-block;
        text-transform: none;
      }
      .all {
        color: #262729;
        font-size: 14px;
        font-weight: 500;
        display: inline-block;
      }
      .suf,
      .all {
        text-transform: none;
      }
    `}</style>
  </div>
)
