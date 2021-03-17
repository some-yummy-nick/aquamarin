import Scroller from '@/components/scroller'
import classnames from 'classnames'

const Sidebar = ({
  children,
  width = 310,
  transparent,
  showLeftBorder,
  showRightBorder
}) => (
  <div
    className={classnames('sidebar', {
      transparent,
      'show-left-border': showLeftBorder,
      'show-right-border': showRightBorder
    })}
    style={{ width }}
  >
    <div className="scroll-wrap">
      <Scroller>{children}</Scroller>
    </div>
    <style jsx>{`
      .sidebar {
        width: 310px;
        flex: 1;
        display: flex;
        position: relative;
        &.transparent {
          background: white;
        }
      }
      .scroll-wrap {
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
      }
      .show-left-border {
        border-left: solid 1px var(--color5);
      }
      .show-right-border {
        border-right: solid 1px var(--color5);
      }
    `}</style>
  </div>
)

export default Sidebar
