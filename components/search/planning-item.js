import ButtonSimilarFlats from '@/components/button/similar-flats'
import ResponsiveImage from '@/components/image/responsive'
import FlatsTable from '@/components/search/flats-table'
import Plashka from '@/components/search/plashka'

const PlanningItem = props => (
  <div className="row flex">
    <div className="photo">
      <div className="photo-wrap">
        <ResponsiveImage
          ratio={1 / 1}
          src={props.plan.plan_view}
          onError={img => {
            img.src = '/static/images/0.png'
          }}
        />
      </div>
    </div>
    <div className="spacer" />
    <div className="flex flex-none justify-center flex-column">
      <div className="plashka-wrap">
        <Plashka rooms={props.plan.rooms} square={props.plan.square} />
      </div>
      <div className="button-wrap">
        <ButtonSimilarFlats
          onClick={() => props.onSimilarClick(props.plan.id)}
        />
      </div>
    </div>
    <div className="spacer" />
    <div className="flex flex-auto flex-column">
      <div className="flex-auto">
        <FlatsTable
          rows={props.plan.placements}
          onRowClick={props.onFlatClick}
          onRequestClick={props.onRequestClick}
          costShown={props.costShown}
        />
      </div>
    </div>
    <style jsx>{`
      @import 'mixins/r';
      .photo {
        width: 290px;
        cursor: pointer;
        @include r(1400) {
          width: 340px;
        }
      }
      .flat-photo {
        width: 100%;
      }
      .photo-wrap {
        padding: 1rem;
      }
      .row + .row {
        margin-top: 3rem;
        padding-top: 3rem;
        // border-top: solid 1px #a1a1a1;
      }
      .row:first-child {
        border-top: 0;
      }
      .spacer {
        width: 30px;
      }
      .button-wrap {
        margin-top: 40px;
      }
      .plashka-wrap {
        & :global(.highlight) {
          font-size: 20px;
          font-weight: 500;
          text-align: left;
        }
        & :global(.desc) {
          font-size: 16px;
          font-weight: 400;
          text-align: left;
        }
      }
    `}</style>
  </div>
)

PlanningItem.defaultProps = {
  onFlatClick() {},
  onRequestClick() {},
  onSimilarClick() {}
}

export default PlanningItem
