import Page from '@/components/page'

const Map = () => (
    <Page footer={true}>
        <div className="page">
            <div className="map-page">
                <img className="map-page__image" src="static/branding/boy.jpg" alt="a boy"/>
                <svg className="map-page__wave" width="100%" viewBox="0 0 1366 120" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M1012.41 78.8808C996.425 78.8808 973.344 82.7606 942.174 94.6632L940.91 95.1463C940.131 95.4439 939.348 95.7435 938.561 96.0445C925.42 101.07 911.183 106.516 897.741 110.73C883.4 115.227 866.691 119.424 850.401 119.424C808.243 119.424 779.477 106.869 756.233 96.7245C755.646 96.468 755.062 96.2131 754.481 95.9599C732.092 86.1997 714.364 78.8239 685.973 78.8239C656.872 78.8239 634.522 86.6672 610.43 96.374C608.236 97.2579 605.969 98.1882 603.631 99.1475L603.619 99.1523C581.945 108.045 554.212 119.424 522.83 119.424C478.99 119.424 450.33 105.998 427.805 95.4462C426.824 94.9868 425.855 94.5327 424.897 94.0855C403.852 84.2642 387.594 77.2947 359.074 78.7732L358.096 78.8239H357.117C329.354 78.8239 310.933 86.2743 291.147 95.5384C289.279 96.4131 287.333 97.3448 285.308 98.3139L285.297 98.3191C266.587 107.274 241.2 119.424 209.389 119.424C168.401 119.424 136.687 108.816 108.868 99.5104L108.867 99.5101C106.534 98.73 104.229 97.959 101.949 97.2042C72.721 87.5315 43.4933 78.8239 0 78.8239L6.49007e-06 0.243518C55.4204 0.243523 93.6339 11.8358 125.746 22.463C127.626 23.0852 129.47 23.698 131.284 24.3004L131.292 24.303C160.195 33.9041 181.085 40.8434 209.389 40.8434C223.363 40.8434 233.514 36.0792 254.881 26.051C256.203 25.4305 257.568 24.7898 258.98 24.1289C282.375 13.1747 312.493 0.433663 356.138 0.245657C402.845 -1.97196 432.589 11.2534 456.977 22.635L458.48 23.337C480.322 33.5364 495.969 40.8434 522.83 40.8434C538.634 40.8434 552.582 35.2115 577.491 25.1539C578.988 24.5496 580.524 23.9293 582.102 23.2933C608.395 12.7002 641.853 0.243537 685.973 0.243578C730.804 0.243582 760.606 13.1678 784.783 23.7074C807.8 33.7411 824.257 40.8434 850.401 40.8434C854.953 40.8434 862.796 39.4743 875.085 35.6215C886.179 32.1431 898.248 27.5307 911.958 22.2907C913.009 21.8891 914.069 21.4839 915.139 21.0753L916.46 20.5707C943.472 10.2526 980.11 0.30044 1012.41 0.300443V0.310554C1067.83 0.33141 1106.06 11.8991 1138.19 22.5045C1140.01 23.1055 1141.8 23.6975 1143.55 24.2799L1143.74 24.3423C1172.69 33.9323 1193.61 40.8638 1221.95 40.8638C1235.95 40.8638 1246.11 36.1054 1267.51 26.0894L1267.51 26.0884L1267.57 26.0608C1268.88 25.4496 1270.23 24.8188 1271.62 24.1683C1294.52 13.472 1323.86 1.07011 1366 0.344004L1366.24 0.340063L1366.2 78.8451L1366 78.8503C1340.34 79.5115 1322.71 86.682 1303.83 95.496C1301.96 96.3684 1300.02 97.2975 1297.99 98.264L1297.97 98.2734C1279.24 107.218 1253.81 119.354 1221.95 119.354C1180.91 119.354 1149.15 108.758 1121.29 99.4634L1121.27 99.4575C1118.94 98.6802 1116.64 97.9119 1114.36 97.1598C1085.12 87.5093 1055.88 78.8205 1012.41 78.8006V78.8808Z"
                          fill="#00A9A4" fillOpacity="0.4"/>
                </svg>
                <div className="map-page__info">
                    <div className="map-page__item">
                        <div className="map-page__prop"><span className="map-page__number">5</span> мин.</div>
                        <div className="map-page__value">до набережной <br/>озера Кабан</div>
                    </div>
                    <div className="map-page__item">
                        <div className="map-page__prop"><span className="map-page__number">10</span> мин.</div>
                        <div className="map-page__value">до центра города</div>
                    </div>
                    <div className="map-page__item">
                        <div className="map-page__prop"><span className="map-page__number">15</span> мин.</div>
                        <div className="map-page__value">до Казанского Кремля</div>
                    </div>
                    <div className="map-page__item">
                        <a href="" className="map-page__link">
                                <span className="map-page__arrow">
                                        <svg width="29" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M28.707 8.707a1 1 0 000-1.414L22.343.929a1 1 0 10-1.414 1.414L26.586 8l-5.657 5.657a1 1 0 001.414 1.414l6.364-6.364zM0 9h28V7H0v2z"/>
                                </svg>
                                </span>
                            смотреть <br/>на карте
                        </a>
                    </div>
                </div>
                <div className="map-page__map">
                    <div className="map-page__baloon"/>
                </div>
            </div>
            <style jsx>{`
                .map-page__image{
                     width:100%;
                }
                
                .map-page__wave{
                     margin-top:-60px;
                }
                
                .map-page__info{
                    position: absolute;
                    width: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    max-width:1000px;
                    margin-left:auto;
                    margin-right:auto;
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                }
                
                .map-page__prop{
                    font-size:24px;
                    font-weight:700;
                    color:rgba(#00A9A4,0.4);
                }
                
                .map-page__number{
                  font-size:100px;
                  font-weight:700;
                  line-height: 1;
                }
                
                .map-page__value{
                   font-size:18px;
                }
                
                 .map-page__arrow{
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    width:60px;
                    height:60px;
                    border-radius:50%;
                    border:2px solid var(--color1-dark);
                    margin-right:10px;
                   transition:border-color 0.3s;
                 }
                 
                 .map-page__link{
                     text-decoration:none;
                     text-transform:uppercase;
                     display:flex;
                     align-items:center;
                     font-size:14px;
                     transition:color 0.3s;
                     
                     svg{
                        fill:var(--color1-dark);
                        transition:fill 0.3s;
                     }
                     
                     &:hover{
                        color:var(--color9);
                        
                        .map-page__arrow{
                          border-color: var(--color9);
                        }

                      svg{
                         fill:var(--color9);
                         }
                     }
                 }
                   .map-page__map,
                   .map-page__baloon{
                        background-repeat: no-repeat;
                        background-size: cover;
                       background-position: center;
                   }
                   
                .map-page__map{
                   position: relative;
                   z-index: -1;
                   height:570px;
                   margin-top: 50px;
                   background-image:url(static/branding/map.png);
                }
                
                .map-page__baloon{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width:100%;
                    height:100%;
                    background-image:url(static/branding/map-empty.png);
                }
        `}</style>
        </div>
    </Page>
)

export default Map
