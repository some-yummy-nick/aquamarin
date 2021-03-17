const Share = ({ onClick, disabled = false }) => {
  return (
    <div onClick={onClick} className="button inline-flex items-center">
      <div className="icon flex-none">
        {/* prettier-ignore */}
        <svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.0609 0.976914V4.78591C9.94089 4.94991 6.37889 5.80791 4.12589 8.10291C1.77189 10.4989 0.609893 13.7329 0.0168933 17.0099C-0.148107 17.9209 0.932893 18.5069 1.63289 17.9019C4.79589 15.1669 8.91289 13.0849 13.0209 13.3979L13.0449 16.6469C13.0509 17.4769 14.0259 17.9199 14.6559 17.3789L23.7699 9.54091C24.2219 9.15191 24.2219 8.45191 23.7699 8.06291L14.6709 0.237914C14.0399 -0.306086 13.0609 0.142914 13.0609 0.976914ZM14.6539 13.3849L14.6429 11.8919C12.7069 11.7459 10.8479 11.6869 8.93889 12.1659C6.41489 12.7979 4.07689 14.0619 1.99089 15.5969C2.89889 12.0399 4.78489 8.69591 8.36689 7.36491C10.4149 6.60391 12.5379 6.43791 14.6949 6.32391C14.6949 5.01691 14.6949 3.71091 14.6949 2.40391L22.1339 8.80091L14.6689 15.2209L14.6539 13.3849Z" fill="currentColor"/>
        </svg>
      </div>
      <div className="name flex-none">
        <span>поделиться</span>
      </div>
      <style jsx>{`
        .button {
          cursor: pointer;
          white-space: nowrap;
          color: #646464;
          &:hover {
            color: var(--color9);
          }
        }
        svg {
          display: block;
          margin-right: 10px;
        }
        .name {
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
        }
        .icon {
          width: 40px;
        }
      `}</style>
    </div>
  )
}

export default Share
