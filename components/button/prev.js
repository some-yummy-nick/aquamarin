import LeftArrow from '@/components/icons/left-arrow-icon'

export default props => (
  <div onClick={props.onClick} className="btn">
    <LeftArrow />
    <style jsx>{`
      .btn {
        width: 190px;
        height: 70px;
        color: var(--color2);
        background: var(--color7);
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
        padding-left: 16px;
        box-sizing: border-box;
        :global(.is-mobile) & {
          width: 50%;
        }
      }
      .btn:hover,
      .btn:active {
        color: var(--color7);
        background: var(--color2);
        :global(.is-mobile) &:hover,
        :global(.is-mobile) &:active {
          color: var(--color2);
          background: var(--color7);
        }
      }
      img {
        display: block;
      }
    `}</style>
  </div>
)
