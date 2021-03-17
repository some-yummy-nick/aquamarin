export default props => (
  <div className="counter">
    <span className="pref">{props.current}</span>
    <span className="suff spacer">/</span>
    <span className="suff">{props.total}</span>
    <style jsx>{`
      .pref {
        font-size: 28px;
        color: var(--color1);
        font-weight: bold;
      }
      .suff {
        color: var(--color6);
      }
      .spacer {
        padding: 0 0.25rem;
      }
    `}</style>
  </div>
)
