export default ({ hasFavourite }) => {
  // prettier-ignore
  return (
    <>
      {hasFavourite ? (
        <svg className="icon1" width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.779 20.559C11.281 20.559 10.8 20.383 10.425 20.065C9.536 19.31 8.681 18.602 7.926 17.978C5.684 16.124 3.748 14.523 2.368 12.907C0.752 11.014 0 9.199 0 7.197C0 5.241 0.696 3.432 1.959 2.102C3.246 0.746 5.01 0 6.925 0C8.367 0 9.688 0.442 10.85 1.314C11.178 1.561 11.489 1.838 11.78 2.145C12.071 1.839 12.382 1.561 12.709 1.315C13.87 0.442 15.19 0 16.634 0C18.549 0 20.313 0.746 21.6 2.102C22.864 3.433 23.559 5.243 23.559 7.197C23.559 9.199 22.807 11.013 21.191 12.906C19.817 14.515 17.89 16.11 15.66 17.955C15.649 17.965 15.639 17.974 15.629 17.981C14.875 18.604 14.022 19.311 13.135 20.063C12.759 20.383 12.277 20.559 11.779 20.559Z" fill="var(--color1)"/>
        </svg>
      ) : (
        <svg className="icon2" width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.779 20.559C11.281 20.559 10.8 20.383 10.425 20.065C9.536 19.31 8.681 18.602 7.926 17.978C5.684 16.124 3.748 14.523 2.368 12.907C0.752 11.014 0 9.199 0 7.197C0 5.241 0.696 3.432 1.959 2.102C3.246 0.746 5.01 0 6.925 0C8.367 0 9.688 0.442 10.85 1.314C11.178 1.561 11.489 1.838 11.78 2.145C12.071 1.839 12.382 1.561 12.709 1.315C13.87 0.442 15.19 0 16.634 0C18.549 0 20.313 0.746 21.6 2.102C22.864 3.433 23.559 5.243 23.559 7.197C23.559 9.199 22.807 11.013 21.191 12.906C19.817 14.515 17.89 16.11 15.66 17.955C15.649 17.965 15.639 17.974 15.629 17.981C14.875 18.604 14.022 19.311 13.135 20.063C12.759 20.383 12.277 20.559 11.779 20.559ZM6.925 1.559C5.442 1.559 4.08 2.133 3.09 3.176C2.103 4.216 1.559 5.644 1.559 7.198C1.559 8.808 2.193 10.301 3.554 11.895C4.846 13.408 6.734 14.969 8.92 16.777C9.68 17.405 10.541 18.117 11.434 18.877C11.623 19.035 11.936 19.036 12.125 18.876C13.007 18.128 13.855 17.425 14.608 16.804C14.618 16.794 14.628 16.785 14.637 16.778C16.824 14.969 18.712 13.408 20.004 11.896C21.366 10.3 22 8.807 22 7.197C22 5.643 21.456 4.215 20.469 3.175C19.48 2.133 18.117 1.558 16.634 1.558C15.536 1.558 14.53 1.895 13.645 2.56C13.19 2.902 12.772 3.326 12.405 3.819C12.111 4.214 11.449 4.214 11.155 3.819C10.788 3.326 10.37 2.902 9.914 2.56C9.028 1.896 8.022 1.559 6.925 1.559Z" fill="currentColor"/>
        </svg>
      )}
      <style jsx>{`
        .icon2 {
          color: #C0C0C0;
        }
        .icon2:hover {
          color: var(--color1);
        }
      `}</style>
    </>
  )
}
