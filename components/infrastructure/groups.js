import classnames from 'classnames'
import { UserAgent } from '@quentin-sommer/react-useragent'

export default ({ groups, onClick }) => (
  <UserAgent>
    {agent => (
      <div
        className={classnames('list', {
          mobile: agent.mobile
        })}
      >
        {groups.map(group => (
          <div
            key={group.name}
            onClick={() => onClick(group)}
            className={classnames('group', {
              disabled: !group.visible
            })}
          >
            <img width="42" height="42" src={group.icon_url} />
            <div className="name flex-auto">{group.name}</div>
          </div>
        ))}
        <style jsx>{`
          @import 'mixins/r';
          .group {
            cursor: pointer;
            margin: 20px 0;
            user-select: none;
            display: flex;
            align-items: center;
            &:hover:not(.disabled) .name {
              color: var(--color9);
            }
          }
          .name {
            font-weight: 500;
            font-size: 10px;
            text-transform: uppercase;
            color: black;
            margin-left: 10px;
          }
          .disabled {
            img {
              opacity: 0.4;
            }
          }
          img {
            width: 40px;
            height: 40px;
          }
          .mobile {
            img {
              width: 33px;
              height: 33px;
            }
            .name {
              display: none;
            }
          }
        `}</style>
      </div>
    )}
  </UserAgent>
)
