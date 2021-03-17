import LeftArrowAlt from '@/components/icons/left-arrow-alt'

const Back = props => (
  <div className="flex items-center back" onClick={props.onClick}>
    <div className="icon flex-none">
      <div className="icon-inner">
        <LeftArrowAlt />
      </div>
    </div>
    <div className="flex-auto">{props.title}</div>
    <style jsx>{`
      @import 'mixins/r';
      .back {
        font-size: 20px;
        cursor: pointer;
        line-height: 1;
        font-weight: 500;
        display: inline-flex;
        color: var(--color1);
        text-transform: uppercase;
        :global(.is-mobile) & {
          font-size: 14px;
        }
      }
      .icon {
        display: block;
        padding-right: 15px;
        width: 29px;
        height: 20px;
        :global(.is-mobile) & {
          width: 14px;
          height: 10px;
          padding-right: 5px;
        }
      }
      .icon-inner {
        :global(.is-mobile) & {
          top: -2px;
          position: relative;
        }
      }
    `}</style>
  </div>
)

Back.defaultProps = {
  title: 'Назад'
}

export default Back
