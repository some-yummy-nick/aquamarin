import { memo } from 'react'

const EmptyFloor = ({ height }) => {
  return (
    <div style={{ height, width: height }}>
      <style jsx>{`
        div {
          height: 35px;
        }
      `}</style>
    </div>
  )
}

export default memo(EmptyFloor)
