import PropTypes from 'prop-types'
import classnames from 'classnames'

const ActionSheet = ({
  opened = false,
  options = [],
  onSelect = () => {},
  render = () => {},
  onClose = () => {}
}) => {
  return (
    <div className={classnames('action-sheet', { opened })}>
      <div className="wrap-all">
        <div className="options">
          {options.map((option, index) => (
            <div
              key={index}
              className="option"
              onClick={() => onSelect(option, index)}
            >
              {render(option, index)}
            </div>
          ))}
        </div>
      </div>
      <div className="mask" onClick={onClose} />
      <style jsx>{`
        .wrap-all {
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10;
          max-height: 340px;
          position: fixed;
          background: white;
          overflow: auto;
          transition: 0.5s;
          transform: translateY(100%);
          z-index: 501;
          .opened & {
            transform: translateY(0);
          }
        }
        .options {
          padding: 20px 0 20px 20px;
        }
        .option {
          padding: 15px 0;
        }
        .option + .option {
          border-top: solid 1px #eee;
        }
        .mask {
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: fixed;
          background: white;
          opacity: 0;
          z-index: 500;
          // transform: translateY(100%);
          backdrop-filter: brightness(150%);
          transition: 0.5s;
          pointer-events: none;
          .opened & {
            opacity: 0.75;
            pointer-events: all;
            // transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

ActionSheet.Title = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          font-size: 18px;
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}

ActionSheet.Subtitle = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  )
}

ActionSheet.propTypes = {
  opened: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ActionSheet
