export default () => <div>null</div>
// import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
// import pose from 'react-pose'
//
// class AlbumsPicker extends Component {
//   state = {
//     opened: false,
//     position: {
//       bottom: 0
//     }
//   }
//
//   toggleOpened = () => {
//     this.setState({ opened: !this.state.opened })
//   }
//
//   close = () => {
//     this.setState({ opened: false })
//   }
//
//   componentDidMount() {
//     const height = ReactDOM.findDOMNode(this).clientHeight
//     this.setState({ position: { bottom: height } })
//   }
//
//   render() {
//     const { position, opened } = this.state
//     const { current, albums, changeAlbumClick } = this.props
//     return (
//       <div className="picker flex items-center">
//         <div className="wrap" onClick={this.toggleOpened}>
//           <div className="current">
//             {current.name}
//             <svg width="12px" height="14px" viewBox="0 0 13 15">
//               <path
//                 fillRule="evenodd"
//                 fill="rgb(228, 17, 112)"
//                 d="M0.398,0.784 L12.425,7.595 L0.509,14.601 L0.398,0.784 Z"
//               />
//             </svg>
//           </div>
//         </div>
//         <List
//           pose={opened ? 'opened' : 'closed'}
//           style={{
//             right: 0,
//             bottom: 0,
//             left: 0,
//             opacity: 0,
//             position: 'absolute',
//             pointerEvents: opened ? 'all' : 'none'
//           }}
//         >
//           <div className="list" style={{ bottom: position.bottom }}>
//             {albums
//               .filter(a => a.name !== current.name)
//               .map(album => (
//                 <div
//                   key={album.id}
//                   className="item"
//                   onClick={() => {
//                     changeAlbumClick(album)
//                     this.close()
//                   }}
//                 >
//                   {album.name}
//                 </div>
//               ))}
//           </div>
//         </List>
//         <style jsx>{`
//           .picker {
//             z-index: 100;
//             position: relative;
//           }
//           .wrap {
//           }
//           .current {
//             cursor: pointer;
//             font-weight: 500;
//             color: var(--color2);
//             text-transform: uppercase;
//             padding-left: 2rem;
//           }
//           .current svg {
//             top: 50%;
//             left: 0.8rem;
//             position: absolute;
//             transform: translateY(-50%);
//           }
//           .list {
//             left: 0;
//             bottom: 0;
//             padding: 1rem 0;
//             background: white;
//             position: absolute;
//             border-top-right-radius: 5px;
//             border-top-left-radius: 5px;
//           }
//           .item {
//             opacity: 0.7;
//             cursor: pointer;
//             font-size: 18px;
//             font-weight: 500;
//             white-space: nowrap;
//             color: var(--color6);
//             padding: 0.5rem 2rem;
//             text-transform: uppercase;
//           }
//           .item:hover {
//             opacity: 1;
//           }
//         `}</style>
//       </div>
//     )
//   }
// }
//
// const List = pose.div({
//   opened: { opacity: 1 },
//   closed: { opacity: 0 }
// })
//
// export default AlbumsPicker
