(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[937],{4406:function(e,s,a){Promise.resolve().then(a.bind(a,1896))},1896:function(e,s,a){"use strict";a.r(s);var r=a(9268);a(6597),a(6297);var t=a(5846),l=a.n(t),i=a(9700),n=a(4751),d=a(6008),o=a(6006),c=a(9239),u=a(5181),m=a(8914);s.default=function(){var e,s;let a=(0,i.cI)(),{register:t,handleSubmit:f,setError:h,formState:{errors:p}}=(0,i.cI)(),[x,v]=(0,o.useState)(""),[b,j]=(0,o.useState)(!0),w=(0,d.useRouter)(),[g,N]=(0,o.useState)(x),[y,k]=(0,o.useState)(!1);return(0,o.useEffect)(()=>{if(x){N(x);let e=setTimeout(()=>{N("")},2e3);return()=>clearTimeout(e)}},[x]),(0,o.useEffect)(()=>{let e=a.formState.isValid;j(!e)},[a.formState.isValid]),(0,r.jsx)("div",{className:"flex flex-col items-center justify-center",children:(0,r.jsxs)("div",{className:"bg-dark p-12 rounded-lg shadow-md max-w-md",children:[(0,r.jsx)("h2",{className:"text-3xl font-bold mb-4",children:"Login"}),(0,r.jsx)(i.RV,{...a,children:(0,r.jsxs)("form",{onSubmit:a.handleSubmit(async e=>{let{email:s,password:a}=e;k(!0);let r=await (0,n.signIn)("credentials",{redirect:!1,email:s,password:a});k(!1),r&&(null==r?void 0:r.ok)?w.push("/"):v(r&&(null==r?void 0:r.error)?"Invalid credentials. ":"Error has occurred")}),children:[(0,r.jsx)("p",{className:"text-red ".concat(g?"opacity-100":"opacity-0"),children:g}),(0,r.jsx)("br",{}),(0,r.jsxs)("div",{className:"mb-4",children:[(0,r.jsx)(c.I,{...u.Fu}),(0,r.jsx)("p",{className:"text-red",children:null===(e=p.email)||void 0===e?void 0:e.message})]}),(0,r.jsxs)("div",{className:"mb-4",children:[(0,r.jsx)(c.I,{...u.lT}),(0,r.jsx)("p",{className:"text-red",children:null===(s=p.password)||void 0===s?void 0:s.message})]}),y?(0,r.jsx)(m.Z,{}):(0,r.jsx)("button",{type:"submit",className:"w-full py-2 rounded-md text-white  ".concat(y?"bg-gray cursor-not-allowed":"bg-red hover:bg-red"),style:{backgroundColor:b?"#E5E7EB":"#EF4444",cursor:b?"not-allowed":"pointer"},disabled:y,children:(0,r.jsx)("span",{className:"items-center justify-center",children:"Login"})})]})}),(0,r.jsx)("div",{className:"mt-4",children:(0,r.jsx)(l(),{href:"/forgot-password",className:"text-blue-500 hover:underline",children:"Forgot Password?"})}),(0,r.jsx)("div",{className:"mt-4",children:(0,r.jsxs)("p",{className:"text-left text-sm",children:["Dont have an account?"," ",(0,r.jsx)(l(),{className:"text-red hover:underline",href:"/account",children:"Sign Up"})]})})]})})}},9239:function(e,s,a){"use strict";a.d(s,{I:function(){return l}});var r=a(9268),t=a(9700);let l=e=>{let{label:s,type:a,id:l,placeholder:i,name:n,validation:d}=e,{register:o,trigger:c,formState:{errors:u}}=(0,t.Gc)(),m=u[n];return(0,r.jsxs)("div",{className:"flex flex-col w-full gap-2",children:[(0,r.jsx)("div",{className:"flex justify-between",children:(0,r.jsx)("label",{htmlFor:l,className:"text-left",children:s})}),m&&(0,r.jsxs)("pre",{className:"text-red",style:{marginTop:"-27px"},children:[" ",m.message]}),(0,r.jsx)("input",{id:l,type:a,className:"".concat("checkbox"===a?"mr-2":"w-full p-3 font-medium border text-black rounded-md border-slate-300 placeholder-opacity-60"),placeholder:i,...o(l,d),onKeyUp:()=>c(l)})]})}},8914:function(e,s,a){"use strict";var r=a(9268);let t=()=>(0,r.jsx)("div",{className:"flex justify-center items-center",children:(0,r.jsxs)("div",{className:"w-12 h-6 relative animate-pulse",children:[(0,r.jsx)("div",{className:"absolute top-0 left-0 w-3 h-6 bg-lightred  animate-loader-bar delay-150"}),(0,r.jsx)("div",{className:"absolute top-0 left-4 w-3 h-6 bg-orange  animate-loader-bar delay-200"}),(0,r.jsx)("div",{className:"absolute top-0 left-8 w-3 h-6 bg-yellow  animate-loader-bar delay-250"}),(0,r.jsx)("div",{className:"absolute top-0 left-12 w-3 h-6 bg-green  animate-loader-bar delay-300"})]})});s.Z=t},5181:function(e,s,a){"use strict";a.d(s,{Fu:function(){return i},ds:function(){return l},jR:function(){return n},lT:function(){return t},no:function(){return r}});let r={name:"first_name",label:"first_name",type:"text",id:"first_name",placeholder:"first name",validation:{required:{value:!0,message:"name is required"}}},t={name:"password",label:"Password",type:"password",id:"password",placeholder:"password",validation:{required:{value:!0,message:"password is required."}}},l={name:"password",label:"Password",type:"password",id:"password",placeholder:"password",validation:{required:{value:!0,message:"password is required."},minLength:{value:6,message:"minimun of 6 characters is required."}}},i={name:"email",label:"Email Address",type:"email",id:"email",placeholder:"email address",validation:{required:{value:!0,message:"email is required."},pattern:{value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,message:"email address is not valid"}}},n={name:"",label:"",type:"checkbox",placeholder:"",id:"t&cs",validation:{required:{value:!0,message:"check is required."}}}},6297:function(){},6597:function(){},6008:function(e,s,a){e.exports=a(167)}},function(e){e.O(0,[414,751,436,443,667,139,744],function(){return e(e.s=4406)}),_N_E=e.O()}]);