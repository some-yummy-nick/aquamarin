import { useState } from 'react'
import classnames from 'classnames'

const DesktopDropDown = ({
  selected,
  items,
  itemOption,
  itemValue,
  onChange
}) => {
  const [opened, setOpened] = useState(false)

  return (
    <div className="dd">
      <div
        onClick={() => setOpened(!opened)}
        className={classnames('label', { opened })}
      >
        <svg
          width="16"
          height="9"
          viewBox="0 0 16 9"
          fill="none"
          className="icon"
        >
          <path
            d="M7.20792 8.67619L0.328385 1.88741C-0.109463 1.45556 -0.109463 0.755394 0.328385 0.323755C0.765842 -0.107919 1.47536 -0.107919 1.91278 0.323755L8.00011 6.33078L14.0872 0.32393C14.5249 -0.107744 15.2343 -0.107744 15.6718 0.32393C16.1094 0.755604 16.1094 1.45574 15.6718 1.88759L8.79214 8.67637C8.5733 8.8922 8.2868 9 8.00015 9C7.71336 9 7.42665 8.89199 7.20792 8.67619Z"
            fill="white"
          />
        </svg>

        {itemValue(selected)}
      </div>
      <div className={classnames('list', { opened })}>
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              onChange(item)
              setOpened(false)
            }}
            className="item"
          >
            {itemOption(item)}
          </div>
        ))}
      </div>
      <style jsx>{`
        .dd {
          color: white;
          font-size: 18px;
          font-weight: 600;
          text-transform: uppercase;
          position: relative;
          white-space: nowrap;
          user-select: none;
        }
        .list {
          position: absolute;
          left: 0;
          top: 25px;
          display: none;
          &.opened {
            display: block;
          }
        }
        .label {
          cursor: pointer;
          padding-left: 30px;
        }
        .item {
          margin-top: 15px;
          cursor: pointer;
          padding-left: 30px;
        }
        .icon {
          top: 50%;
          left: 0;
          display: block;
          position: absolute;
          transform: translateY(-50%) rotate(-90deg);
          .opened & {
            transform: translateY(-50%) rotate(0deg);
          }
        }
      `}</style>
    </div>
  )
}

DesktopDropDown.defaultProps = {
  items: [],
  itemOption(item) {
    return item.name
  },
  itemValue(item) {
    return item.name
  },
  onChange() {}
}

export default DesktopDropDown
