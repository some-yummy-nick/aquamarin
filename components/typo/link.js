import { Link } from '@/routes'
import { Fragment } from 'react'
import classnames from 'classnames'
import omit from 'lodash/omit'

import withColors from '@/components/common/with-colors'

export default withColors(props => {
  return (
    <Fragment>
      <Link {...omit(props, 'disableUnderline', 'target')}>
        <a
          target={props.target}
          className={classnames({
            disableUnderline: props.disableUnderline
          })}
        >
          {props.children}
        </a>
      </Link>
      <style global jsx>{`
        a {
          color: currentColor;
        }
        a.disableUnderline {
          text-decoration: none;
        }
      `}</style>
    </Fragment>
  )
})
