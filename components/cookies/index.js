import ButtonClose from '@/components/button/close'
const Cookies = ({ onRequestClose, ...props }) => {
  return (
    <div className="cookies">
      <div className="text">
        Наш сайт использует файлы cookie и похожие технологии, предоставляя
        персональную информацию. При использовании данного сайта, вы
        подтверждаете свое согласие на использование cookie файлов и обработку
        персональных общедоступных данных согласно Политике конфиденциальности.
      </div>
      <div className="close-wrap">
        <ButtonClose color2 onClick={onRequestClose} />
      </div>
      <style jsx>{`
        .cookies {
          right: 0;
          bottom: 0;
          width: 335px;
          color: white;
          z-index: 1600;
          position: fixed;
          padding: 50px 50px 30px 30px;
          background: rgba(#000, 0.7);
          :global(.is-mobile) & {
            width: auto;
            left: 0;
          }
        }
        .close-wrap {
          top: 20px;
          right: 20px;
          position: absolute;
          :global(svg) {
            transform: scale(0.7);
            transform-origin: 100% 0;
          }
        }
        .text {
          font-size: 12px;
          line-height: 130%;
          color: #ffffff;
        }
      `}</style>
    </div>
  )
}

export default Cookies
