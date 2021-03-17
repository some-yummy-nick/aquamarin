import classnames from "classnames"

export default props => (
  <span
    className={classnames("sort-toggle", {
      [props.dir]: true,
      hidden: !props.visible
    })}
  >
    {/* prettier-ignore */}
    <svg width="13" height="9" viewBox="0 0 13 9" fill="none">
      <rect x="7.59595" y="1.59863" width="9.19566" height="1.54679" transform="rotate(135 7.59595 1.59863)" fill="#ff8200"/>
      <rect x="6.4978" y="0.509399" width="9.19566" height="1.54679" transform="rotate(45 6.4978 0.509399)" fill="#ff8200"/>
    </svg>
    <style jsx>{`
      .sort-toggle {
        margin-left: 8px;
      }
      .hidden {
        visibility: hidden;
      }
      svg {
        transform: rotate(-180deg);
      }
      .desc svg {
        transform: rotate(360deg);
      }
    `}</style>
  </span>
)
