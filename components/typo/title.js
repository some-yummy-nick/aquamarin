import classnames from 'classnames'
import withColors from '@/components/hocs/with-colors'

const Title = props => (
  <div
    className={classnames('title', {
      marginless: props.marginless,
      small: props.small,
      center: props.center,
      'extra-small': props.extraSmall
    })}
  >
    <h1 style={{ fontSize: props.size }}>
      <div className="name">{props.children}</div>
    </h1>
    <style jsx>{`
      @import 'mixins/r';
      .title {
        margin-bottom: 25px;
      }
      h1 {
        color: #646464;
        font-family: var(--heading-font);
        text-transform: uppercase;
        display: inline-block;
        font-size: 30px;
        font-weight: bold;
        margin: 0;
      }
      :global(.is-mobile) h1 {
        font-size: 26px;
      }
      .marginless {
        margin: 0;
      }
      .small h1 {
        font-size: 24px;
        font-weight: normal;
        font-family: var(--text-font);
      }
      .extra-small h1 {
        font-size: 18px;
        font-weight: normal;
        font-family: var(--text-font);
      }
      .center {
        text-align: center;
      }
    `}</style>
  </div>
)

export default withColors(Title)
