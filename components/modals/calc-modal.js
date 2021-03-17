import Button from '@/components/common/button'
import CloseButton from '@/components/common/close-btn'
import Calc from '@/components/buy/calc'

const CalcModal = props => (
  <div className="calc" style={{ width: props.width }}>
    <div className="close">
      <CloseButton small onClick={props.requestClose} />
    </div>
    <Calc cost={props.flat.cost} onClaimClick={props.onClaimClick} />
    <style jsx>{`
      .calc {
        position: relative;
      }
      .close {
        top: 1.5rem;
        right: 1.5rem;
        position: absolute;
      }
    `}</style>
  </div>
)

CalcModal.defaultProps = {
  flat: {},
  onClaimClick() {}
}

export default CalcModal
