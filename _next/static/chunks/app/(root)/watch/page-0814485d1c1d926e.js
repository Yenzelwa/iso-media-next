(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[163],{2040:function(e,i,t){"use strict";var s,n;e.exports=(null==(s=t.g.process)?void 0:s.env)&&"object"==typeof(null==(n=t.g.process)?void 0:n.env)?t.g.process:t(6003)},8623:function(e,i,t){Promise.resolve().then(t.bind(t,993))},9234:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"default",{enumerable:!0,get:function(){return o}});let s=t(6927);t(6006);let n=s._(t(6403));function a(e){return{default:(null==e?void 0:e.default)||e}}function o(e,i){let t=n.default,s={loading:e=>{let{error:i,isLoading:t,pastDelay:s}=e;return null}};"function"==typeof e&&(s.loader=e),Object.assign(s,i);let o=s.loader,l=()=>null!=o?o().then(a):Promise.resolve(a(()=>null));return t({...s,loader:l})}("function"==typeof i.default||"object"==typeof i.default&&null!==i.default)&&void 0===i.default.__esModule&&(Object.defineProperty(i.default,"__esModule",{value:!0}),Object.assign(i.default,i),e.exports=i.default)},2666:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),function(e,i){for(var t in i)Object.defineProperty(e,t,{enumerable:!0,get:i[t]})}(i,{suspense:function(){return n},NoSSR:function(){return a}}),t(6927),t(6006);let s=t(8131);function n(){let e=Error(s.NEXT_DYNAMIC_NO_SSR_CODE);throw e.digest=s.NEXT_DYNAMIC_NO_SSR_CODE,e}function a(e){let{children:i}=e;return i}},6403:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),Object.defineProperty(i,"default",{enumerable:!0,get:function(){return o}});let s=t(6927),n=s._(t(6006)),a=t(2666),o=function(e){let i=Object.assign({loader:null,loading:null,ssr:!0},e);function t(e){let t=i.loading,s=n.default.createElement(t,{isLoading:!0,pastDelay:!0,error:null}),o=i.ssr?n.default.Fragment:a.NoSSR,l=i.lazy;return n.default.createElement(n.default.Suspense,{fallback:s},n.default.createElement(o,null,n.default.createElement(l,e)))}return i.lazy=n.default.lazy(i.loader),t.displayName="LoadableComponent",t}},993:function(e,i,t){"use strict";t.r(i),t.d(i,{default:function(){return p}});var s=t(9268),n=t(6006),a=t(447);let o=e=>{var i;let{seasons:t,onSelectSeason:a}=e,[o,l]=(0,n.useState)(t[0]),u=e=>{l(e),a(e)};return(0,s.jsx)("section",{className:"relative p-4 flex items-center",children:(0,s.jsx)("select",{name:"seasons",className:"bg-dark text-white rounded p-2 border border-white","aria-hidden":"true",onChange:e=>u(null!==(i=t[parseInt(e.target.value)-1])&&void 0!==i?i:null),children:t.map((e,i)=>(0,s.jsx)("option",{value:i+1,children:"Season 0".concat(e.seasonNumber)},e.id))})})},l=e=>{let{seasons:i}=e,[t,a]=(0,n.useState)(i[0]),l=e=>{a(e)};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o,{seasons:i,onSelectSeason:l}),(0,s.jsx)("section",{className:"show-movie w-full flex space-x-4",children:t&&t.episodes.map((e,i)=>(0,s.jsxs)("div",{className:"w-60 p-4",children:[(0,s.jsxs)("div",{className:"block-image relative",children:[(0,s.jsx)("a",{href:"show-details.html",children:(0,s.jsx)("img",{src:e.image_path,className:"img-fluid img-zoom",alt:"",loading:"lazy"})}),(0,s.jsx)("div",{className:"episode-number p-4 absolute top-4 left-4 bg-primary text-white",children:e.episode_short_detail}),(0,s.jsx)("div",{className:"episode-play-info",children:(0,s.jsx)("div",{className:"episode-play",children:(0,s.jsx)("a",{href:"show-details.html",children:(0,s.jsx)("i",{className:"ri-play-fill"})})})})]}),(0,s.jsxs)("div",{className:"epi-desc p-4",children:[(0,s.jsx)("div",{className:"d-flex align-items-center justify-content-between mb-3",children:(0,s.jsx)("span",{className:"text-white rel-date",children:"October 8, 2020"})}),(0,s.jsx)("a",{href:"show-detail.html",children:(0,s.jsx)("h3",{className:"epi-name text-white mb-0",children:e.title})})]})]},i))})]})},u=e=>{let{video_id:i}=e,[t,a]=(0,n.useState)([]),[o,l]=(0,n.useState)(""),[u,r]=(0,n.useState)(),[d,c]=(0,n.useState)(!1),[m,p]=(0,n.useState)(!1),[g,f]=(0,n.useState)(""),[h,v]=(0,n.useState)({}),[_,x]=(0,n.useState)({});function b(e){let i=new Date,t=new Date(e),s=i.getTime()-t.getTime(),n=Math.floor(Math.floor(s/1e3)/60),a=Math.floor(n/60),o=Math.floor(a/24);return o>0?"".concat(o," day").concat(1!==o?"s":""):a>0?"".concat(a," hour").concat(1!==a?"s":""):n>0?"".concat(n," minute").concat(1!==n?"s":""):"Just now"}(0,n.useEffect)(()=>{let e=async()=>{try{let e=[{iso_comment:{id:1,comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",customer_id:1},post_date:new Date("2024-01-23"),customer:{id:2556,name:"John Smith"},reply:[{id:1,reply:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",posted_date:new Date("2024/02/10"),customer:{id:2556,name:"Nokukhanya Dumakude"}},{id:2,reply:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",posted_date:new Date("2024/01/05"),customer:{id:2556,name:"Nicholas Jili"}},{id:3,reply:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",posted_date:new Date("2024/02/12"),customer:{id:2556,name:"Umi Jili"}}]},{iso_comment:{id:2,comment:"In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",customer_id:2},post_date:new Date("2024-02-13"),customer:{id:2556,name:"Tim Cook"},reply:[{id:1,reply:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",posted_date:new Date("2024/02/11"),customer:{id:2556,name:"New Guy"}},{id:2,reply:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",posted_date:new Date("2024/03/09"),customer:{id:2556,name:"Nicholas Jili"}},{id:3,reply:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",posted_date:new Date("2024/02/01"),customer:{id:2556,name:"Umi Jili"}}]}];a(e)}catch(e){console.error("Error fetching comments:",e)}};e()},[i]),(0,n.useEffect)(()=>{u&&a(e=>{let i={iso_comment:{id:u.id,comment:u.comment,customer_id:u.customer_id},post_date:new Date("2024-02-15"),customer:{id:2556,name:"Umi Jili"},reply:null};return[...e,i]})},[u]);let j=e=>{v(i=>({...i,[e]:!i[e]}))},q=e=>{x(i=>({...i,[e]:!i[e]}))},y=(e,i)=>{var s,n;let a={id:t.length+1,reply:g,posted_date:new Date,customer:{id:2556,name:"John Doe"}};e.preventDefault();let o=t?[...t]:[];o&&o[2]&&(null===(s=o[2])||void 0===s?void 0:s.reply)!==null?null===(n=o[2])||void 0===n||n.reply.push(a):o[2].reply=[a],console.log("Reply submitted:",g),f(""),p(!1),w(o),j(i)},w=e=>{a(e)};return(0,s.jsx)("section",{children:(0,s.jsxs)("div",{className:"p",children:[(0,s.jsxs)("div",{className:"flex items-center mt-3",children:[(0,s.jsx)("textarea",{rows:1,className:"w-80 p-2 rounded-md border border-gray placeholder-gray text-black",placeholder:"Share your thoughts",name:"s",value:o,onChange:e=>(function(e){let i=e.target;i.style.height="auto",i.style.height=i.scrollHeight+"px",l(i.value)})(e)}),(0,s.jsx)("button",{type:"submit",className:"bg-red text-white px-4 py-2 hover:bg-red-600 rounded-md ml-2",onClick:function(){r({id:Math.floor(1e3*Math.random()),comment:o,customer_id:1}),l("")},children:"Comment"})]}),t.map(e=>(0,s.jsx)("div",{className:"p-4",children:(0,s.jsx)("ul",{className:"list-inside space-y-4",children:(0,s.jsxs)("li",{className:"list-inside-item",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,s.jsx)("span",{className:"text-gray hover:underline font-bold",children:e.customer.name}),(0,s.jsx)("span",{className:"text-gray hover:text-gray-700",children:b(e.post_date.toString())})]}),(0,s.jsxs)("div",{children:[(0,s.jsxs)("p",{className:"pb-2 trending-dec w-100 mb-0",children:[e.iso_comment.comment,(0,s.jsx)("button",{className:"p-2 text-red",onClick:()=>{j(e.iso_comment.id)},children:"Reply"})]}),h[e.iso_comment.id]&&(0,s.jsxs)("form",{onSubmit:i=>y(i,e.iso_comment.id),children:[(0,s.jsx)("textarea",{rows:1,className:"w-80 p-2 rounded-md border border-gray placeholder-gray text-black",placeholder:"Write your reply...",onChange:e=>(function(e){let i=e.target;i.style.height="auto",i.style.height=i.scrollHeight+"px",f(i.value)})(e)}),(0,s.jsx)("button",{type:"button",onClick:()=>j(e.iso_comment.id),className:"p-2 text-gray",children:"Cancel"}),(0,s.jsx)("button",{type:"submit",className:"p-2 text-red",children:"Submit"})]}),(0,s.jsx)("p",{className:"pb-2 trending-dec w-100 mb-0",children:(0,s.jsx)("button",{className:"p-2 text-red",onClick:()=>{c(!d),q(e.iso_comment.id)},children:e&&e.reply&&e.reply.length>0?d?"Hide Replies (".concat(e.reply.length,")"):"View Replies (".concat(e.reply.length,")"):""})}),_[e.iso_comment.id]&&d&&e.reply&&e.reply.map((e,i)=>(0,s.jsx)("div",{className:"ml-4",children:(0,s.jsx)("ul",{className:"list-inside space-y-4",children:(0,s.jsxs)("li",{className:"list-inside-item",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,s.jsx)("span",{className:"text-gray hover:underline font-bold",children:e.customer.name}),(0,s.jsx)("span",{className:"text-gray hover:text-gray-700",children:b(e.posted_date.toString())})]}),(0,s.jsx)("p",{className:"pb-2 trending-dec w-100 mb-0",children:e.reply}),(0,s.jsx)("div",{})]},e.id)})},i))]})]},e.iso_comment.id)})},e.iso_comment.id))]})})};var r=t(9234),d=t.n(r);let c=d()(()=>t.e(677).then(t.bind(t,5677)),{loadableGenerated:{webpack:()=>[5677]},ssr:!1}),m=()=>{var e,i,t,o;let[r,d]=(0,n.useState)(),[m,p]=(0,n.useState)();(0,n.useEffect)(()=>{let e={episode_detail:"23 October 2023 - Season 2 - Episode 01",next_episode_id:254,episode_number:1,episode_short_detail:"S01E01",series_id:1,season_id:1,id:253,video_id:125,title:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit",description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean\n          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus\n          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam\n          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla\n          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet\n          nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,\n          venenatis vitae, justo.",image_path:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",video_path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",likes:2551,dislikes:5,ratings:4.2,release_date:new Date("2023-05-25"),user:{id:1,like:!0,dislike:!1,rating:4.9}};d(e);let i={id:1,title:"Family Unit",description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",realese_date:new Date("2024/02/12"),image_path:"",seasons:[{id:1,seasonNumber:1,episodes:[{episode_details:"23 October 2023 - Season 2 - Episode 01",next_episode_id:254,episode_number:1,episode_short_detail:"S01E01",series_id:1,season_id:1,id:253,video_id:125,title:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit",description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean\n                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus\n                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam\n                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla\n                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet\n                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,\n                  venenatis vitae, justo.",image_path:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",video_path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",likes:2551,dislikes:5,ratings:4.2,release_date:new Date("2023-05-25"),user:{id:1,like:!0,dislike:!1,rating:4.9}}]},{id:2,seasonNumber:2,episodes:[{episode_details:"23 October 2023 - Season 2 - Episode 01",next_episode_id:254,episode_number:1,episode_short_detail:"S02E01",series_id:1,season_id:1,id:253,video_id:125,title:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit",description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean\n                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus\n                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam\n                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla\n                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet\n                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,\n                  venenatis vitae, justo.",image_path:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",video_path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",likes:2551,dislikes:5,ratings:4.2,release_date:new Date("2023-05-25"),user:{id:1,like:!0,dislike:!1,rating:4.9}},{episode_details:"24 October 2023 - Season 2 - Episode 02",next_episode_id:256,episode_number:1,episode_short_detail:"S02E02",series_id:1,season_id:1,id:254,video_id:126,title:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit",description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean\n                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus\n                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam\n                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla\n                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet\n                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,\n                  venenatis vitae, justo.",image_path:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",video_path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",likes:255158,dislikes:5,ratings:3.2,release_date:new Date("2024-05-25"),user:{id:1,like:!0,dislike:!1,rating:3.9}}]},{id:3,seasonNumber:3,episodes:[{episode_details:"23 October 2023 - Season 2 - Episode 01",next_episode_id:254,episode_number:1,episode_short_detail:"S03E01",series_id:1,season_id:1,id:253,video_id:125,title:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit",description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean\n                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus\n                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam\n                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla\n                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet\n                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,\n                  venenatis vitae, justo.",image_path:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",video_path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",likes:2551,dislikes:5,ratings:4.2,release_date:new Date("2023-05-25"),user:{id:1,like:!0,dislike:!1,rating:4.9}},{episode_details:"24 October 2023 - Season 2 - Episode 02",next_episode_id:256,episode_number:1,episode_short_detail:"S03E03",series_id:1,season_id:1,id:254,video_id:126,title:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit",description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean\n                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus\n                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam\n                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla\n                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet\n                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,\n                  venenatis vitae, justo.",image_path:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",video_path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",likes:255158,dislikes:5,ratings:3.2,release_date:new Date("2024-05-25"),user:{id:1,like:!0,dislike:!1,rating:3.9}},{episode_details:"25 October 2023 - Season 2 - Episode 03",next_episode_id:255,episode_number:1,episode_short_detail:"S02E03",series_id:1,season_id:1,id:256,video_id:127,title:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit",description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean\n                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus\n                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam\n                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla\n                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet\n                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,\n                  venenatis vitae, justo.",image_path:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",video_path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",likes:85551,dislikes:558,ratings:1.2,release_date:new Date("2026-05-25"),user:{id:1,like:!0,dislike:!1,rating:4.9}}]},{id:4,seasonNumber:4,episodes:[{episode_details:"23 October 2023 - Season 2 - Episode 01",next_episode_id:254,episode_number:1,episode_short_detail:"S04E01",series_id:1,season_id:1,id:253,video_id:125,title:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit",description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean\n                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus\n                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam\n                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla\n                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet\n                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,\n                  venenatis vitae, justo.",image_path:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",video_path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",likes:2551,dislikes:5,ratings:4.2,release_date:new Date("2023-05-25"),user:{id:1,like:!0,dislike:!1,rating:4.9}},{episode_details:"24 October 2023 - Season 2 - Episode 02",next_episode_id:256,episode_number:1,episode_short_detail:"S04E02",series_id:1,season_id:1,id:254,video_id:126,title:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit",description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean\n                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus\n                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam\n                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla\n                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet\n                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,\n                  venenatis vitae, justo.",image_path:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",video_path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",likes:255158,dislikes:5,ratings:3.2,release_date:new Date("2024-05-25"),user:{id:1,like:!0,dislike:!1,rating:3.9}},{episode_details:"25 October 2023 - Season 2 - Episode 03",next_episode_id:255,episode_number:1,episode_short_detail:"S04E03",series_id:1,season_id:1,id:256,video_id:127,title:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit",description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean\n                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus\n                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam\n                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla\n                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet\n                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,\n                  venenatis vitae, justo.",image_path:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",video_path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",likes:85551,dislikes:558,ratings:1.2,release_date:new Date("2026-05-25"),user:{id:1,like:!0,dislike:!1,rating:4.9}},{episode_details:"26 October 2023 - Season 2 - Episode 04",next_episode_id:254,episode_number:1,episode_short_detail:"S04E04",series_id:1,season_id:1,id:253,video_id:125,title:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit",description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean\n                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus\n                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam\n                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla\n                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet\n                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,\n                  venenatis vitae, justo.",image_path:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",video_path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",likes:2551,dislikes:5,ratings:4.2,release_date:new Date("2023-05-25"),user:{id:1,like:!0,dislike:!1,rating:4.9}}]}]};p(i)},[]);let g=async()=>{let e={series_id:1,season_id:1,episode_number:2,episode_short_detail:"S01E02",episode_detail:"24 October 2023 - Season 2 - Episode 02",next_episode_id:0,id:254,video_id:5255,title:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit Next Episdose",description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean\n          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus\n          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam\n          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla\n          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet\n          nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,\n          venenatis vitae, justo.",image_path:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",release_date:new Date("2023-10-24"),video_path:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",likes:1225234,dislikes:6436,ratings:4.8,user:{id:1,like:!1,dislike:!1,rating:4.6}};d(e)};async function f(e){try{let i={userId:1,video_id:null==r?void 0:r.video_id,like:e},t=await a.Z.post("likes",i,{headers:{Authorization:"Bearer ".concat(""),"Content-Type":"application/json"}});t.data&&r&&r.user&&(!r.user.like&&e&&(r.user.like=e,r.likes=r.likes+1),r.user.like&&!e&&(r.user.like=e,r.likes=r.likes-1),d({...r}))}catch(e){console.log("Error occured updating likes - ".concat(e))}}function h(e){return e<1e3?e:e<1e6?(e/1e3).toFixed(1)+"k":(e/1e6).toFixed(1)+"M"}async function v(e){try{let i={userId:1,video_id:null==r?void 0:r.video_id,dislike:e},t=await a.Z.post("dislikes",i,{headers:{Authorization:"Bearer ".concat(""),"Content-Type":"application/json"}});t.data&&r&&r.user&&(!r.user.dislike&&e&&(r.user.dislike=e,r.dislikes=r.dislikes+1),r.user.dislike&&!e&&(r.user.dislike=e,r.dislikes=r.dislikes-1),d({...r}))}catch(e){console.log("Error occured updating likes - ".concat(e))}}return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)(c,{video_path:null==r?void 0:r.video_path},null==r?void 0:r.id),(0,s.jsxs)("section",{className:"p-4",children:[(0,s.jsx)("div",{className:"pb-2 flex items-center space-x-4 movie-content",children:(0,s.jsx)("p",{className:"text-gray text-md",children:null==r?void 0:r.episode_detail})}),(0,s.jsx)("h4",{className:"text-3xl font-bold text-uppercase mt-0",children:null==r?void 0:r.title}),(0,s.jsxs)("div",{className:"flex items-center space-x-4 pt-4",children:[(null==r?void 0:r.next_episode_id)!=void 0&&(null==r?void 0:r.next_episode_id)>0?(0,s.jsx)("button",{onClick:()=>g(),className:"bg-red hover:bg-red text-white font-bold py-2 px-4 rounded",children:"Next Episode"}):null,(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsxs)("button",{onClick:()=>f(!(null==r?void 0:r.user.like)),className:" left-0 bg-gray rounded-full text-white px-4 py-2 z-10",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"".concat((null==r?void 0:r.user.like)?"font-bold text-red":""," bi bi-hand-thumbs-up"),viewBox:"0 0 16 16",children:(0,s.jsx)("path",{d:"M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"})}),(0,s.jsx)("span",{className:"text-gray-600",children:h(null!==(e=null==r?void 0:r.likes)&&void 0!==e?e:0)})]}),(0,s.jsxs)("button",{onClick:()=>v(!(null==r?void 0:r.user.dislike)),className:" right-0 bg-gray rounded-full text-white px-4 py-2 z-10",children:[(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"".concat((null==r?void 0:r.user.dislike)?"font-bold text-red":""," bi bi-hand-thumbs-down"),viewBox:"0 0 16 16",children:(0,s.jsx)("path",{d:"M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1"})}),(0,s.jsx)("span",{className:"text-gray-600",children:h(null!==(i=null==r?void 0:r.dislikes)&&void 0!==i?i:0)})]})]})]}),(0,s.jsx)("p",{className:"pt-4 mt-4 mb-0 text-gray-700",children:null==r?void 0:r.description})]}),(0,s.jsx)(l,{seasons:null!==(t=null==m?void 0:m.seasons)&&void 0!==t?t:[]}),(0,s.jsx)(u,{video_id:null!==(o=null==r?void 0:r.video_id)&&void 0!==o?o:0})]})})};var p=m},6003:function(e){!function(){var i={229:function(e){var i,t,s,n=e.exports={};function a(){throw Error("setTimeout has not been defined")}function o(){throw Error("clearTimeout has not been defined")}function l(e){if(i===setTimeout)return setTimeout(e,0);if((i===a||!i)&&setTimeout)return i=setTimeout,setTimeout(e,0);try{return i(e,0)}catch(t){try{return i.call(null,e,0)}catch(t){return i.call(this,e,0)}}}!function(){try{i="function"==typeof setTimeout?setTimeout:a}catch(e){i=a}try{t="function"==typeof clearTimeout?clearTimeout:o}catch(e){t=o}}();var u=[],r=!1,d=-1;function c(){r&&s&&(r=!1,s.length?u=s.concat(u):d=-1,u.length&&m())}function m(){if(!r){var e=l(c);r=!0;for(var i=u.length;i;){for(s=u,u=[];++d<i;)s&&s[d].run();d=-1,i=u.length}s=null,r=!1,function(e){if(t===clearTimeout)return clearTimeout(e);if((t===o||!t)&&clearTimeout)return t=clearTimeout,clearTimeout(e);try{t(e)}catch(i){try{return t.call(null,e)}catch(i){return t.call(this,e)}}}(e)}}function p(e,i){this.fun=e,this.array=i}function g(){}n.nextTick=function(e){var i=Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)i[t-1]=arguments[t];u.push(new p(e,i)),1!==u.length||r||l(m)},p.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=g,n.addListener=g,n.once=g,n.off=g,n.removeListener=g,n.removeAllListeners=g,n.emit=g,n.prependListener=g,n.prependOnceListener=g,n.listeners=function(e){return[]},n.binding=function(e){throw Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(e){throw Error("process.chdir is not supported")},n.umask=function(){return 0}}},t={};function s(e){var n=t[e];if(void 0!==n)return n.exports;var a=t[e]={exports:{}},o=!0;try{i[e](a,a.exports,s),o=!1}finally{o&&delete t[e]}return a.exports}s.ab="//";var n=s(229);e.exports=n}()},3177:function(e,i,t){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var s=t(6006),n=Symbol.for("react.element"),a=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,l=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u={key:!0,ref:!0,__self:!0,__source:!0};function r(e,i,t){var s,a={},r=null,d=null;for(s in void 0!==t&&(r=""+t),void 0!==i.key&&(r=""+i.key),void 0!==i.ref&&(d=i.ref),i)o.call(i,s)&&!u.hasOwnProperty(s)&&(a[s]=i[s]);if(e&&e.defaultProps)for(s in i=e.defaultProps)void 0===a[s]&&(a[s]=i[s]);return{$$typeof:n,type:e,key:r,ref:d,props:a,_owner:l.current}}i.Fragment=a,i.jsx=r,i.jsxs=r},9268:function(e,i,t){"use strict";e.exports=t(3177)}},function(e){e.O(0,[447,667,139,744],function(){return e(e.s=8623)}),_N_E=e.O()}]);