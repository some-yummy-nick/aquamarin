const Close = ({ color = "white", hoverColor = "#CF775C", onClick }) => {
  return (
    <div onClick={onClick}>
      {/* prettier-ignore */}
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect y="23.3345" width="33" height="3" transform="rotate(-45 0 23.3345)" fill="currentColor"/>
        <rect x="2.12109" y="0.000244141" width="33" height="3" transform="rotate(45 2.12109 0.000244141)" fill="currentColor"/>
      </svg>
      <style jsx>{`
        svg {
          cursor: pointer;
          z-index: 100000;
          color: ${color};
          &:hover {
            color: ${hoverColor};
          }
        }
      `}</style>
    </div>
  )
}

export default Close
