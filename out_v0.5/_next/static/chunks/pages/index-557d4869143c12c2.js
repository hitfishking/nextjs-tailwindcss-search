(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{4184:function(e,r){var n;!function(){"use strict";var t={}.hasOwnProperty;function s(){for(var e=[],r=0;r<arguments.length;r++){var n=arguments[r];if(n){var l=typeof n;if("string"===l||"number"===l)e.push(n);else if(Array.isArray(n)){if(n.length){var o=s.apply(null,n);o&&e.push(o)}}else if("object"===l)if(n.toString===Object.prototype.toString)for(var i in n)t.call(n,i)&&n[i]&&e.push(i);else e.push(n.toString())}}return e.join(" ")}e.exports?(s.default=s,e.exports=s):void 0===(n=function(){return s}.apply(r,[]))||(e.exports=n)}()},8312:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(2415)}])},2415:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return g}});var t=n(5893),s=n(7294),l=n(4184),o=n.n(l),i=n(4814),c=n(3434),a=n(4726);function d(){return(0,t.jsx)("div",{className:"w-full mt-3 h-[30px] flex justify-center items-center bg-green-900",children:(0,t.jsx)("img",{className:"",src:"/yiyikan_title.png"})})}var u=n(6756);function x(e){var r=e.cell,n=e.onClickFunc,s=e.style;console.log("---------In Card--------------");var l=(0,t.jsx)("div",{className:"md:w-[48px] md:h-[59px] mr-[0px] mb-[0px] cursor-pointer relative border border-solid border-green-200 hover:border-2 hover:border-red-400",onClick:function(){return n(r)},style:s,children:(0,t.jsx)("div",{className:o()("w-full h-full relative"),children:(0,t.jsx)("img",{className:"absolute block w-full h-full bg-blue-600",src:(0,u.gJ)(r.name),alt:"card"})})}),i=(0,t.jsx)("div",{className:"md:w-[48px] md:h-[59px] mr-[0px] mb-[0px] relative border border-solid border-green-200 hover:border-2 hover:border-red-400",onClick:function(){return n(r)},style:s,children:(0,t.jsx)("div",{className:o()("w-full h-full relative")})});return"Blank"!==r.name?l:i}function f(){var e=(0,c.t)("useGameModel",(function(e){return(0,i.ei)(e,"curBoard","selectCell","lastCell","chances")})),r=e.curBoard,n=e.selectCell,l=e.lastCell,o=e.chances,a=(0,s.useMemo)((function(){return console.log("--------CCCCC-------------"),r.map((function(e,r){return e.map((function(e,s){if(0!==r&&0!==s)return(0,t.jsx)(x,{cell:e,onClickFunc:n},e.id)}))}))}),[r,l]),d=(0,s.useState)(null),u=d[0],f=d[1];return(0,s.useEffect)((function(){return f(a)}),[l,o]),(0,t.jsxs)("div",{className:"my-[10px] w-full py-[10px] px-[5px] flex flex-wrap justify-center items-center",children:[u,console.log("-----BBBB------------")]})}var h=n(8540),m=n(3832);function p(){var e=(0,c.t)("useGameModel",(function(e){return(0,h.e)(e,"chances","showPanel","gameStatus")})),r=e.chances,n=e.showPanel,l=e.gameStatus,i=(0,s.useState)(!1),d=i[0],x=i[1],f=r?Array.from(r.chances_current.f2f_names):[],p=r?Array.from(r.chances_derived.f2f_names):[],v=function(){return(0,t.jsxs)("div",{className:"mt-2 ml-3 flex items-baseline",children:[r&&p.length>0?(0,t.jsx)("div",{className:"text-green-400 text-[15px] font-semibold",children:"\u6709\u673a\u4f1a\uff01"}):(0,t.jsx)("div",{className:o()("text-red-500, text-[20px], font-semibold",{"text-yellow-400":l===a.U.PASS}),children:l!==a.U.PASS?"\u6ca1\u673a\u4f1a\u4e86!":"\u6e05\u76d8\u4e86\uff01\u4f60\u592a\u68d2\u5566\uff01"}),(0,t.jsx)("button",{className:"mb-3 mt-1 ml-2 px-1 py-0 text-[2px] text-green-50 font-thin rounded border border-green-200 hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none ",onClick:function(){x(!d)},children:d?"\u8be6\u60c5-\u5173":"\u8be6\u60c5-\u5f00"})]})},b=function(){return(0,t.jsxs)("div",{className:"flex flex-wrap items-baseline",children:[(0,t.jsx)("div",{className:"ml-3 text-[7px] text-green-400",children:"\u5bf9\u8138\u673a\u4f1a\uff1a"}),(0,t.jsx)("div",{className:"text-center text-sm mt-1 text-yellow-300 flex-wrap",children:f.length>0&&f.map((function(e,r){return(0,t.jsxs)("span",{children:[(0,t.jsx)("span",{children:(0,u.K5)(e)}),r===f.length-1?"":", "]},(0,m.Vj)())}))})]})},g=function(){return(0,t.jsxs)("div",{className:"flex flex-wrap items-baseline",children:[(0,t.jsx)("div",{className:"ml-3 text-[7px] text-green-400",children:"\u79fb\u52a8\u673a\u4f1a\uff1a"}),(0,t.jsx)("div",{className:"text-center text-sm mt-1 text-yellow-300 flex-warp",children:p.length>0&&p.map((function(e,r){return(0,t.jsxs)("span",{children:[(0,t.jsx)("span",{children:(0,u.K5)(e)}),r===p.length-1?" ":", "]},(0,m.Vj)())}))})]})},j=function(){return d?(0,t.jsxs)("div",{children:[(0,t.jsx)(b,{}),(0,t.jsx)(g,{})]}):(0,t.jsx)("div",{})},w=function(){return(0,t.jsxs)("div",{className:o()("w-full, h-full",{invisible:!n}),children:[(0,t.jsx)(v,{}),C]})},y=function(){return(0,t.jsx)("div",{className:"w-full h-full flex justify-center items-center",children:(0,t.jsx)("div",{className:"text-green-500 font-bold text-6lx",children:"\u63d0\u793a\u9762\u677f\u5df2\u5173\u95ed."})})},N=(0,s.useState)(null),C=N[0],S=N[1];return(0,s.useEffect)((function(){return S(j)}),[r,n,d]),(0,t.jsx)("div",{className:"bg-green-800 md:w-[338px] mx-[24px] pb-[10px] border border-solid border-green-600",children:n?(0,t.jsx)(w,{}):(0,t.jsx)(y,{})})}function v(){var e=(0,c.t)("useGameModel",(function(e){return(0,h.e)(e,"reset","switchChancesPanel","showPanel","threeChoiceType","threeChoice1","threeChoice2","threeChoice3")})),r=e.reset,n=e.switchChancesPanel,s=e.showPanel,l=e.threeChoiceType,i=e.threeChoice1,a=e.threeChoice2,d=e.threeChoice3;return(0,t.jsxs)("div",{className:"bg-green-800 w-[350px] ml-[24px] border border-solid border-green-600",children:[(0,t.jsxs)("div",{className:"flex justify-center items-center my-4",children:[(0,t.jsx)("button",{className:"px-4 py-1 text-sm text-green-50 font-normal rounded border border-green-200 hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none w-[92px]",onClick:function(){r(),(0,h.S)("shuffle")},children:"\u91cd\u65b0\u5f00\u59cb"}),(0,t.jsx)("button",{className:"ml-6 px-2 py-1 text-sm text-green-400 font-normal rounded border border-green-200 hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none w-[160px] ",onClick:n,children:s?">> \u5173\u95ed\u63d0\u793a\u9762\u677f":">> \u663e\u793a\u63d0\u793a\u9762\u677f"})]}),(0,t.jsxs)("div",{className:"grid grid-cols-1 divide-y divide-green-600",children:[(0,t.jsx)("div",{}),(0,t.jsx)("div",{})]}),(0,t.jsxs)("div",{className:"flex justify-center items-center my-2",children:[(0,t.jsx)("button",{className:o()("m-2","px-2","py-0","text-sm","text-green-400","font-thin","rounded","border","border-green-200","hover:text-white","hover:bg-green-400","hover:border-transparent","focus:outline-none",{"text-yellow-400":1===l.typeId}),onClick:function(){i()},children:"\u96f7\u9706\u731b\u51fb("+l.left+")"}),(0,t.jsx)("button",{className:o()("m-2","px-2","py-0","text-sm","text-green-400","font-thin","rounded","border","border-green-200","hover:text-white","hover:bg-green-400","hover:border-transparent","focus:outline-none",{"text-yellow-400":2===l.typeId}),onClick:function(){a()},children:"\u6124\u7136\u524d\u884c("+l.left+")"}),(0,t.jsx)("button",{className:o()("m-2","px-2","py-0","text-sm","text-green-400","font-thin","rounded","border","border-green-200","hover:text-white","hover:bg-green-400","hover:border-transparent","focus:outline-none",{"text-yellow-400":3===l.typeId}),onClick:function(){d()},children:"\u5355\u67aa\u5339\u9a6c("+l.left+")"})]})]})}function b(){return(0,t.jsxs)("div",{className:"bg-green-900 flex",children:[(0,t.jsx)(v,{}),(0,t.jsx)(p,{})]})}function g(){var e=(0,c.t)("useGameModel",(function(e){return(0,i.ei)(e,"gameStatus")})).gameStatus;return(0,s.useEffect)((function(){(0,h.S)("shuffle")}),[]),(0,t.jsx)("div",{className:"w-full bg-green-900",children:(0,t.jsxs)("div",{className:"md:container mx-auto md:w-[750px] md:border-4 border-solid border-green-900 rounded flex flex-col md:p-2.5 bg-green-900",children:[(0,t.jsx)(d,{}),(0,t.jsxs)("div",{className:"",children:[(0,t.jsx)(f,{}),(0,t.jsx)("img",{src:"/end_message.png",className:o()({invisible:e!==a.U.PASS}),style:{position:"absolute",left:150,top:210}})]}),(0,t.jsx)(b,{})]})})}}},function(e){e.O(0,[774,888,179],(function(){return r=8312,e(e.s=r);var r}));var r=e.O();_N_E=r}]);