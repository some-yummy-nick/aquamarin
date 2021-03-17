import RightArrow from '@/components/icons/right-arrow-icon'

export default props => (
  <div onClick={props.onClick} className="btn">
    <RightArrow />
    <style jsx>{`
      .btn {
        width: 190px;
        height: 70px;
        color: var(--color2);
        background: var(--color7);
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
        cursor: pointer;
        user-select: none;
        padding-right: 16px;
        box-sizing: border-box;
        :global(.is-mobile) & {
          width: 50%;
        }
      }
      .btn:hover:not(:global(.ismobile)),
      .btn:active:not(:global(.ismobile)) {
        color: var(--color7);
        background: var(--color2);
      }
      img {
        display: block;
      }
    `}</style>
  </div>
)
