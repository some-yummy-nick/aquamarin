import NumberFormat from 'react-number-format'
export default ({ price }) => (
  <div className="price">
    <NumberFormat value={price} displayType={'text'} thousandSeparator={' '} />
    <style jsx>{`
      .price {
        color: var(--color9);
        font-size: 36px;
        font-weight: 500;
        position: relative;
        white-space: nowrap;
        :global(.is-mobile) {
        }
      }
    `}</style>
  </div>
)
