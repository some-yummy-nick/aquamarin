import { memo } from 'react'
import classnames from 'classnames'
import statuses from '@/enums/statuses'

const Flat = ({ rooms_count, sold_status, ...props }) => {
  return (
    <div
      {...props}
      className={classnames({
        sale: sold_status === statuses.sale,
        sold: sold_status === statuses.sold,
        reserved: sold_status === statuses.reserved
      })}
    >
      {rooms_count}
      <style jsx>{`
        div {
          font-weight: 500;
          font-size: 12px;
          color: #333;
          height: 20px;
          width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          border: solid 1px #e2e2e2;
          background: white;
          cursor: pointer;
          &:hover {
            backgrund: white;
            border-color: var(--color9);
          }
        }
        .sale {
        }
        .sold {
          color: white;
          background: #e2e2e2;
        }
        .reserved {
          background: var(--color2);
        }
      `}</style>
    </div>
  )
}

export default memo(Flat)
