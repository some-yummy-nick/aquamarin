import { memo } from 'react'

const Caption = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          font-weight: 500;
          font-size: 14px;
          color: black;
          background: #fafafa;
          text-align: center;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          & :global(span) {
            color: var(--color9);
          }
        }
      `}</style>
    </div>
  )
}

export default memo(Caption)
