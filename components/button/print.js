const Print = ({ onClick }) => {
  return (
    <div className="button inline-flex items-center" onClick={onClick}>
      <div className="icon flex-none">
        {/* prettier-ignore */}
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0.769V20.343C0 20.768 0.344 21.112 0.769 21.112H16.745C17.17 21.112 17.514 20.768 17.514 20.343V0.769C17.513 0.344 17.169 0 16.744 0H0.769C0.344 0 0 0.344 0 0.769ZM15.976 19.574H1.538V1.538H15.976V19.574Z" fill="currentColor"/>
          <path d="M12.3321 5.508H5.34908C4.92408 5.508 4.58008 5.852 4.58008 6.277C4.58008 6.702 4.92408 7.046 5.34908 7.046H12.3321C12.7571 7.046 13.1011 6.702 13.1011 6.277C13.1011 5.852 12.7561 5.508 12.3321 5.508Z" fill="currentColor"/>
          <path d="M12.3321 9.78699H5.34908C4.92408 9.78699 4.58008 10.131 4.58008 10.556C4.58008 10.981 4.92408 11.325 5.34908 11.325H12.3321C12.7571 11.325 13.1011 10.981 13.1011 10.556C13.1011 10.131 12.7561 9.78699 12.3321 9.78699Z" fill="currentColor"/>
          <path d="M12.3321 14.067H5.34908C4.92408 14.067 4.58008 14.411 4.58008 14.836C4.58008 15.261 4.92408 15.605 5.34908 15.605H12.3321C12.7571 15.605 13.1011 15.261 13.1011 14.836C13.1011 14.411 12.7561 14.067 12.3321 14.067Z" fill="currentColor"/>
        </svg>
      </div>
      <div className="name flex-none">распечатать</div>
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

export default Print
