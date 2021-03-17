import 'flexboxes/main.css'
import '@/static/fonts/cera-pro/css.css'

export default () => (
  <style global jsx>{`
    @import 'mixins/r';

    :root {
      /* Colors */
      --color1:       /**/ #ff8200;
      --color1-dark:  /**/ #ff4646;

      --color2:       /**/ #f2a890;
      --color3:       /**/ #4abb62;
      --color4:       /**/ #b4b4b4;
      --color5:       /**/ #19d2fa;
      --color6:       /**/ #41dcbe;
      --color7:       /**/ #ffffff;
      --color8:       /**/ #eeeeee;
      --color9:       /**/ #aac800;
      --color10:      /**/ #009aa4;

      --color11:      /**/ #ffff00;
      --color11-dark: /**/ #ffff00;

      /* Fonts */
      --text-font: cera, sans-serif;
      --heading-font: cera, sans-serif;
    }
    html {
      font-size: 16px;
      @include r(1400) {
      }
      @include r(1600) {
      }
      @include r(1800) {
      }
      -webkit-font-smoothing: antialiased;
    }
    * {
      text-decoration-skip: objects;
    }
    body {
      margin: 0;
      font-size: 16px;
      overflow-y: scroll;
      font-family: var(--text-font);
      min-width: 1280px;
      color: #000;
      overscroll-behavior: none;
      .is-mobile &,
      .is-tablet & {
        min-width: 100%;
      }
    }
    html,
    body {
      overscroll-behavior: none;
    }
    /* Globals */
    a {
      color: var(--color1-dark);
      text-decoration-skip-ink: none;
    }
    /* Loading progressbar */
    #nprogress {
      position: fixed;
      z-index: 1000000;
    }
    #nprogress .spinner-icon {
      display: none;
      border-top-color: var(--color1-dark);
      border-left-color: var(--color1-dark);
    }
    #nprogress .bar {
      background: var(--color1-dark);
      height: 4px;
    }
    #nprogress .peg {
      box-shadow: 0 0 10px var(--color2), 0 0 5px var(--color2);
      :global(.is-mobile) & {
        display: none;
      }
    }
    #nprogress .spinner {
      left: 15px;
      right: auto;
      :global(.is-mobile) & {
        display: none;
      }
    }
    /* Forms */
    .form {
      .is-mobile & {
        padding: 20px;
        box-sizing: border-box;
        width: 100vw !important;
      }
    }
    .form-row {
      margin: 0.5rem 0;
      position: relative;
    }
    .form-body {
      margin: 0 0 40px 0;
      position: relative;
      .is-mobile & {
        margin-top: 0;
      }
    }
    .form-submit {
      margin-top: 50px;
    }
    .form-error {
      height: 14px;
      color: #ea3035;
      font-size: 10px;
      margin-top: 10px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .form-error:before {
    }
    .form-input {
      border: 0;
      width: 100%;
      display: block;
      outline: none;
      font-family: var(--text-font);
      font-weight: 400;
      font-size: 18px;
      color: white;
      padding: 20px;
      position: relative;
      height: 50px;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 0px;
      // border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      .is-mobile & {
        font-size: 16px;
        font-weight: 500;
      }
    }
    .form-textarea {
      border: 0;
      width: 100%;
      display: block;
      outline: none;
      background: none;
      font-family: var(--text-font);
      font-weight: 400;
      font-size: 24px;
      color: white;
      padding: 20px 0;
      position: relative;
      height: 120px;
      box-sizing: border-box;
      border-bottom: 1px solid #555759;
      resize: none;
      .is-mobile & {
        font-size: 16px;
        font-weight: 500;
      }
    }
    .form-textarea + .form-label {
      bottom: 100px;
    }
    .form ::placeholder,
    .form-label {
      color: white;
    }
    .form-label {
      left: 0;
      bottom: 40px;
      font-size: 16px;
      font-weight: 500;
      position: absolute;
      pointer-events: none;
      transition: all 0.2s;
    }
    .form-input:focus + label,
    .form-input:valid + label {
      color: #8b95a9;
      font-size: 12px;
      transform: translateY(-26px);
      letter-spacing: 0.04em;
    }
    .form-textarea:focus + label,
    .form-textarea:valid + label {
      color: #8b95a9;
      font-size: 12px;
      letter-spacing: 0.04em;
    }
    .form-input:focus ~ .form-laser {
      width: 100%;
    }
    .form-laser {
      left: 50%;
      position: absolute;
      height: 1px;
      width: 0px;
      bottom: 24px;
      background: white;
      transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      transform: translateX(-50%);
    }
    .form-textarea::placeholder,
    .form-input::placeholder {
      color: white;
    }
    /* Colors */
    .color1 {
      color: var(--color1);
    }
    .color2 {
      color: var(--color2);
    }
    .color3 {
      color: var(--color3);
    }
    .color4 {
      color: var(--color4);
    }
    .color5 {
      color: var(--color5);
    }
    .color6 {
      color: var(--color6);
    }
    .color7 {
      color: var(--color7);
    }
    /* ID Swiper */
    .swiper-slide {
      overflow: hidden;
      flex-shrink: 0 !important;
    }
    /* Leaflet */
    .leaflet-container {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      background: white;
      font-family: inherit;
    }
    .leaflet-editing-icon {
      top: 4px !important;
      left: 4px !important;
      width: 10px !important;
      height: 10px !important;
      border-radius: 50%;
    }
    /* Tooltips */
    .__react_component_tooltip {
      opacity: 0;
    }
    /* Utilittes */
    .h100 {
      height: 100%;
    }
    .wrapless {
      white-space: nowrap;
    }
    .block {
      display: block;
    }
    .relative {
      position: relative;
    }
    .stop-scrolling body {
      overflow-y: hidden;
    }
    /* BM menu */
    .bm-morph-shape {
      fill: transparent;
    }
    /* Router transition */
    .page-transition-enter {
      opacity: 0;
    }
    .page-transition-enter-active {
      opacity: 1;
      transition: opacity 300ms;
    }
    .page-transition-exit {
      opacity: 1;
    }
    .page-transition-exit-active {
      opacity: 0;
      transition: opacity 300ms;
    }
    /* Yandex map */
    ymaps[class*='map-bg'] {
      background: none !important;
    }
  `}</style>
)
