const Round = ({ selected, onClick }) => {
  return (
    <div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        onClick={onClick}
      >
        <circle cx="12" cy="12" r="11" stroke="#FF9012" strokeWidth="2" />
        {selected && (
          <path
            fill="#FF9012"
            d="M19.6439 6.75351L19.2108 6.34086C18.7355 5.88638 17.9566 5.88638 17.4797 6.34086L10.1279 15.3558L6.51913 11.8679C6.04376 11.4139 5.26442 11.4139 4.78905 11.8684L4.35653 12.2806C3.88116 12.7346 3.88116 13.4776 4.35653 13.9316L9.26031 18.6599C9.73619 19.1134 10.515 19.1134 10.9909 18.6599L19.6439 8.40457C20.1187 7.95056 20.1187 7.20751 19.6439 6.75351Z"
          />
        )}
      </svg>
      <style jsx>{`
        svg {
          display: block;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default Round
