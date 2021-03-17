export default ({ onClick, mode, inverse = false }) => {
  const color = inverse ? 'white' : '#646464'
  return (
    <div onClick={onClick} className="burger-wrap">
      {'close' === mode ? (
        // prettier-ignore
        <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="24.1064" width="33" height="3" rx="1.5" transform="rotate(-45 0 24.1064)" fill={color}/>
          <rect x="2.12109" y="0.772217" width="33" height="3" rx="1.5" transform="rotate(45 2.12109 0.772217)" fill={color}/>
        </svg>
      ) : (
        // prettier-ignore
        <svg width="33" height="22" viewBox="0 0 33 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="0.405518" width="33" height="3" rx="1.5" fill={color}/>
          <rect y="9.40552" width="33" height="3" rx="1.5" fill={color}/>
          <rect y="18.4055" width="33" height="3" rx="1.5" fill={color}/>
        </svg>
      )}
      <style jsx>{`
        .burger-wrap {
          width: 33px;
          height: 32px;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          svg {
            display: block;
          }
        }
      `}</style>
    </div>
  )
}
