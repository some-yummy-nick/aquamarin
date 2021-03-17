import { useEffect, useState, useRef, memo } from 'react'
import Caption from '@/components/search/matrix/caption'

const Section = props => {
  const { children, section } = props

  const sectionRef = useRef()
  const [height, setHeight] = useState('auto')
  const [width, setWidth] = useState('auto')

  useEffect(() => {
    setHeight(sectionRef.current.clientHeight)
    setWidth(sectionRef.current.clientWidth)
  }, [])

  return (
    <div
      {...props}
      className="flex-none section-wrap"
      data-section={section}
      ref={sectionRef}
      style={{ minHeight: height, minWidth: width }}
    >
      <Caption>
        Подъезд&nbsp;<span>№{section}</span>
      </Caption>
      <div className="section-inner">{children}</div>
      <style jsx>{`
        .section-wrap {
          position: relative;
          background: #fafafa;
          border: solid 1px var(--color4);
        }
        .section-inner {
          padding: 6px;
          padding-top: 0;
        }
      `}</style>
    </div>
  )
}

export default memo(Section)
