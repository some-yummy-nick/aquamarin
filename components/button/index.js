import classnames from 'classnames'
import Curved from '@/components/icons/curved'

const Button = props => {
  const classname = classnames('btn flex items-center', {
    link: props.link,
    block: props.block,
    outline: props.outline,
    primary: props.primary,
    square: props.square,
    underline: props.underline,
    doubleline: props.doubleline,
    large: props.large,
    small: props.small,
    curved: props.curved,
    transparent: props.transparent,
    secondary: props.secondary,
    active: props.active,
    default: props.default,
    circle: props.circle,
    selected: props.selected,
    inline: props.inline,
    'small-text': props.smallText,
    'has-left-icon': props.leftIcon,
    'has-right-icon': props.rightIcon
  })
  return (
    <div
      className={classname}
      onClick={props.onClick}
      style={{
        margin: `0 ${props.spacing}px`
      }}
    >
      {props.leftIcon && (
        <div className="left-icon flex-none">{props.leftIcon}</div>
      )}
      <div className="text flex-auto">{props.children}</div>
      {props.rightIcon && (
        <div className="right-icon flex-none">{props.rightIcon}</div>
      )}
      {props.curved && (
        <div className="curved-wrap">
          <Curved />
        </div>
      )}
      <style jsx>{`
        @import 'mixins/r';
        .btn {
          cursor: pointer;
          background: white;
          text-align: center;
          font-weight: 500;
          line-height: 1;
          user-select: none;
          display: inline-flex;
          color: var(--color4);
          text-transform: uppercase;
          white-space: nowrap;
          box-sizing: border-box;
          font-size: 16px;
          height: 48px;
          padding: 0 30px;
          vertical-align: top;
          border-radius: 0px;
          &.transparent {
            background: none;
          }
          &.block {
            width: 100%;
            display: flex;
            text-align: center;
            justify-content: center;
            align-items: center;
            .text {
              flex: 0 0 auto;
            }
          }
          &.small {
            height: 40px;
            padding: 0 10px;
            font-size: 12px;
          }
          &.small-text {
            font-size: 12px;
          }
        }
        .text {
          .block & {
            // text-align: left;
          }
        }
        .outline.secondary {
          background: none;
          color: var(--color2);
          border: solid 1px var(--color2);
          &:hover {
            color: black;
            background: var(--color2);
            border: solid 1px var(--color2);
          }
        }
        .primary {
          border: 0;
          height: 44px;
          border-radius: 44px;
          color: white;
          background: var(--color1);
          &:hover {
            background: var(--color9);
          }
          &.doubleline {
            border-top-color: var(--color2);
            border-bottom-color: var(--color2);
            &:hover {
              color: white;
              background: var(--color2);
            }
            :global(.is-mobile) &:hover {
              color: var(--color2);
              background: transparent;
            }
          }
          &.active {
            border-color: var(--color2);
            background: var(--color2);
            color: white;
          }
        }
        .secondary {
          border: 0;
          color: black;
          height: 40px;
          border-radius: 40px;
          background: #ffff00;
          &:hover {
            background: #ffff00;
          }
          &.doubleline {
            border-top-color: var(--color5);
            border-bottom-color: var(--color5);
            &:hover {
              color: white;
              background: var(--color5);
            }
          }
        }
        .link {
          padding: 0;
          height: auto;
          background: none;
          color: #979797;
          border-color: transparent;
          font-size: 10px;
          font-weight: 500;
          &:hover {
            background: none;
            color: var(--color1);
          }
          &.large {
            font-size: 14px;
          }
          &.secondary {
            color: var(--color1-dark);
            &:hover {
              color: var(--color1-dark);
            }
          }
        }
        .link.has-right-icon .text {
          padding-right: 10px;
        }
        .link.has-left-icon .text {
          padding-left: 10px;
        }
        .underline {
          text-decoration: underline;
        }
        .doubleline {
          border-top: solid 1px;
          border-bottom: solid 1px;
        }
        .large {
        }
        .has-right-icon .text {
          padding-right: 10px;
          text-align: left;
        }
        .has-left-icon .text {
          padding-left: 10px;
          text-align: left;
        }
        .left-icon :global(img),
        .right-icon :global(img),
        .left-icon :global(svg),
        .right-icon :global(svg) {
          display: block;
        }
        .left-icon :global(svg),
        .right-icon :global(svg) {
          display: block;
        }
        .curved {
          border-color: transparent;
          background: transparent;
          width: 71px;
          height: 69px;
          position: relative;
          padding-top: 7px;
          .text {
            z-index: 1;
            position: relative;
          }
          &:hover {
            color: var(--color2);
          }
          &.primary {
            color: white;
            & :global(svg path) {
              stroke: var(--color2);
              fill: var(--color2);
            }
          }
        }
        .curved-wrap {
          top: 0;
          left: 0;
          padding: 0;
          width: 71px;
          height: 69px;
          position: absolute;
        }
        .curved-wrap :global(svg) {
          top: 0;
          left: 0;
          position: absolute;
        }
        .default {
          &:hover {
            background: #edeff2;
          }
        }
        .circle {
          padding: 0;
          width: 43px;
          height: 43px;
          color: black;
          font-size: 18px;
          border-radius: 43px;
          border: solid 1px black;
          &:hover {
            color: var(--color9);
            border: solid 1px var(--color9);
          }
          &.selected {
            color: white;
            background: var(--color9);
            border: solid 1px var(--color9);
          }
        }
        .inline {
          padding: 0;
          color: var(--color9);
          &:hover {
            color: var(--color1);
          }
        }
        .square {
          width: 40px;
          height: 40px;
          padding: 0;
          display: inline-flex;
          border: 0;
          align-items: center;
          justify-content: center;
          color: #000;
          border: solid 2px black;
          border-radius: 4px;
          box-sizing: border-box;
          &:hover {
            color: var(--color1-dark);
            border-color: var(--color1-dark);
          }
          &.selected {
            color: white;
            background: var(--color1-dark);
            border-color: var(--color1-dark);
          }
        }
        .outline.primary {
          height: 43px;
          color: var(--color1-dark);
          border-radius: 43px;
          background: none;
          border: solid 1px var(--color1-dark);
          &:hover {
            color: white;
            background: var(--color1-dark);
          }
        }
      `}</style>
    </div>
  )
}

Button.defaultProps = {
  margin: 0,
  spacing: 0
}

export default Button
