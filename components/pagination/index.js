import Pagination from 'react-js-pagination'

const PaginationWapped = props => {
  return (
    <div className="pagination">
      <Pagination pageRangeDisplayed={10} {...props} />
      <style global jsx>{`
        .pagination {
          margin: 0;
          padding: 0;
          user-select: none;
        }
        .pagination li {
          display: inline-block;
        }
        .pagination a {
          width: 35px;
          height: 35px;
          font-size: 20px;
          margin: 0 0.25rem;
          text-decoration: none;
          display: inline-flex;
          text-align: center;
          border: solid 1.5px transparent;
          align-items: center;
          justify-content: center;
          line-height: 1;
          border-radius: 50%;
          color: #333333;
        }
        .pagination a:hover {
          color: var(--color2);
        }
        .pagination .active a {
          color: var(--color2);
          border-color: var(--color2);
        }
      `}</style>
    </div>
  )
}

PaginationWapped.defaultProps = {
  hideFirstLastPages: true
}

export default PaginationWapped
