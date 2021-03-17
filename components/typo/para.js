export default props => (
  <div className="para">
    <div>{props.children}</div>
    <style jsx>{`
      @import 'mixins/r';
      .para {
        margin: 1rem 0;
        font-size: rem(20px);
        line-height: rem(30px);
      }
    `}</style>
  </div>
)
