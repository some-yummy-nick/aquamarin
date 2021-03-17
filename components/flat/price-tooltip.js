import RemontPrice from '@/components/flat/remont-price'
export default ({ prices }) => (
  <div className="tooltip">
    <div className="tooltip-inner">
      <RemontPrice prices={prices} borderless />
      <div className="triangle">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M17.7942 5.5L10 19L2.20577 5.5L17.7942 5.5Z"
            stroke="#B4B4B4"
            fill="white"
          />
          <rect x="1" y="5" width="18" height="1" fill="white" />
        </svg>
      </div>
    </div>
    <style jsx>{`
      .tooltip {
        opacity: 1;
        width: 300px;
        cursor: pointer;
        background: white;
        padding: 20px;
        padding-top: 10px;
        border-radius: 0px;
        z-index: 10000;
        border: solid 1px #b4b4b4;
        box-sizing: border-box;
      }
      .triangle {
        bottom: -17px;
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
      }
      .tooltip :global(td) {
        padding-top: 10px;
        padding-left: 0px;
        color: #a1a1a1;
        font-size: 10px;
        font-weight: 500;
      }
      .tooltip :global(.price) {
        font-weight: 500;
        font-size: 18px !important;
        color: #262729 !important;
      }
    `}</style>
  </div>
)
