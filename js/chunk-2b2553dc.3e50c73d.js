(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2b2553dc"],{1915:function(e,t,c){"use strict";function r(){window.pageYOffset>100&&window.scrollTo({top:0,behavior:"smooth"})}c.d(t,"a",(function(){return r}))},2532:function(e,t,c){"use strict";var r=c("23e7"),a=c("e330"),o=c("5a34"),n=c("1d80"),i=c("577e"),s=c("ab13"),l=a("".indexOf);r({target:"String",proto:!0,forced:!s("includes")},{includes:function(e){return!!~l(i(n(this)),i(o(e)),arguments.length>1?arguments[1]:void 0)}})},"2fbc":function(e,t,c){"use strict";var r=c("7a23"),a={class:"breadcrumb"},o={class:"container"},n={class:"breadcrumb-list"},i=Object(r["createElementVNode"])("li",null,[Object(r["createElementVNode"])("a",{href:""},"首頁")],-1),s={key:0},l=Object(r["createElementVNode"])("a",{href:"",class:"active"},"基金搜尋",-1),d=[l],u={key:1},m=Object(r["createElementVNode"])("a",{href:"",class:"active"},"基金比較表",-1),b=[m],f={key:2},p=Object(r["createElementVNode"])("a",{href:"",class:"active"},"基金觀察清單",-1),v=[p],O={key:3},h=Object(r["createElementVNode"])("a",{href:"",class:"active"},"基金觀察清單",-1),j=[h];function g(e,t,c,l,m,p){return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",a,[Object(r["createElementVNode"])("div",o,[Object(r["createElementVNode"])("ul",n,[i,"search"===c.currentPage?(Object(r["openBlock"])(),Object(r["createElementBlock"])("li",s,d)):Object(r["createCommentVNode"])("",!0),"compare"===c.currentPage?(Object(r["openBlock"])(),Object(r["createElementBlock"])("li",u,b)):Object(r["createCommentVNode"])("",!0),"favorite"===c.currentPage?(Object(r["openBlock"])(),Object(r["createElementBlock"])("li",f,v)):Object(r["createCommentVNode"])("",!0),"memberFavorite"===c.currentPage?(Object(r["openBlock"])(),Object(r["createElementBlock"])("li",O,j)):Object(r["createCommentVNode"])("",!0)])])])}var N={data:function(){return{}},props:{currentPage:{required:!0}}},y=c("6b0d"),V=c.n(y);const k=V()(N,[["render",g]]);t["a"]=k},"37ca":function(e,t,c){"use strict";var r=function(e){return{all:e=e||new Map,on:function(t,c){var r=e.get(t);r?r.push(c):e.set(t,[c])},off:function(t,c){var r=e.get(t);r&&(c?r.splice(r.indexOf(c)>>>0,1):e.set(t,[]))},emit:function(t,c){var r=e.get(t);r&&r.slice().map((function(e){e(c)})),(r=e.get("*"))&&r.slice().map((function(e){e(t,c)}))}}},a=r();t["a"]=a},"5a34":function(e,t,c){var r=c("da84"),a=c("44e7"),o=r.TypeError;e.exports=function(e){if(a(e))throw o("The method doesn't accept regular expressions");return e}},"793b":function(e,t,c){"use strict";c("e9c4");t["a"]={methods:{saveApply:function(e){var t=JSON.stringify(e);localStorage.setItem("fundApply",t)},getApply:function(){return JSON.parse(localStorage.getItem("fundApply"))},updateApply:function(e){this.saveApply(e),this.$router.push("/note")},sweetAlert:function(e){this.$swal(e)}}}},"86ff":function(e,t,c){"use strict";c("e9c4"),c("caad"),c("2532"),c("a434"),c("d3b7"),c("159b");var r=c("37ca");t["a"]={data:function(){return{ActiveCompareGroup:[]}},methods:{saveCompare:function(e){var t=JSON.stringify(e);localStorage.setItem("fundCompare",t)},getCompare:function(){return JSON.parse(localStorage.getItem("fundCompare"))||[]},isShowWindow:function(){var e=window.matchMedia("(max-width: 575px)");e.matches&&(this.showUpperBody="")},updateCompare:function(e,t){if(this.showWindowFooter=!0,this.showUpperBody="compare",this.isShowWindow(),this.compareGroup.includes(e)){if(this.compareGroup.splice(this.compareGroup.indexOf(e),1),"search"!==t){var c={title:"商品已從比較清單中移除",icon:"success"};this.sweetAlert(c)}}else{if(this.compareGroup.length>2){var r={title:"最多僅能比較3檔基金",icon:"info"};return void this.sweetAlert(r)}if(this.compareGroup.push(e),"search"!==t){var a={title:"加入我的比較清單",icon:"success"};this.sweetAlert(a)}}this.saveCompare(this.compareGroup)},sweetAlert:function(e){this.$swal(e)},confirmEqual:function(e){var t=this,c=!0;if(this.compareGroup.forEach((function(r){if(JSON.stringify(r)===JSON.stringify(e)){c=!1,t.compareGroup.splice(t.compareGroup.indexOf(r),1);var a={title:"商品已從比較清單中移除",icon:"success"};t.sweetAlert(a)}})),c){if(this.compareGroup.length>2){var r={title:"最多僅能比較3檔基金",icon:"info"};return void this.sweetAlert(r)}this.compareGroup.push(e);var a={title:"加入我的比較清單",icon:"success"};this.sweetAlert(a)}}},watch:{compareGroup:{handler:function(){this.saveCompare(this.compareGroup),r["a"].emit("updateComareGroup")},deep:!0}}}},a434:function(e,t,c){"use strict";var r=c("23e7"),a=c("da84"),o=c("23cb"),n=c("5926"),i=c("07fa"),s=c("7b0b"),l=c("65f0"),d=c("8418"),u=c("1dde"),m=u("splice"),b=a.TypeError,f=Math.max,p=Math.min,v=9007199254740991,O="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!m},{splice:function(e,t){var c,r,a,u,m,h,j=s(this),g=i(j),N=o(e,g),y=arguments.length;if(0===y?c=r=0:1===y?(c=0,r=g-N):(c=y-2,r=p(f(n(t),0),g-N)),g+c-r>v)throw b(O);for(a=l(j,r),u=0;u<r;u++)m=N+u,m in j&&d(a,u,j[m]);if(a.length=r,c<r){for(u=N;u<g-r;u++)m=u+r,h=u+c,m in j?j[h]=j[m]:delete j[h];for(u=g;u>g-r+c;u--)delete j[u-1]}else if(c>r)for(u=g-r;u>N;u--)m=u+r-1,h=u+c-1,m in j?j[h]=j[m]:delete j[h];for(u=0;u<c;u++)j[u+N]=arguments[u+2];return j.length=g-r+c,a}})},ab13:function(e,t,c){var r=c("b622"),a=r("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(c){try{return t[a]=!1,"/./"[e](t)}catch(r){}}return!1}},b0c0:function(e,t,c){var r=c("83ab"),a=c("5e77").EXISTS,o=c("e330"),n=c("9bf2").f,i=Function.prototype,s=o(i.toString),l=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,d=o(l.exec),u="name";r&&!a&&n(i,u,{configurable:!0,get:function(){try{return d(l,s(this))[1]}catch(e){return""}}})},b6d4:function(e,t,c){"use strict";c.r(t);c("caad"),c("2532");var r=c("7a23"),a={class:"section section-favorite",id:"section-favorite"},o={class:"container"},n=Object(r["createElementVNode"])("div",{class:"block-main-title"},[Object(r["createElementVNode"])("i",{class:"fa-solid fa-heart"}),Object(r["createElementVNode"])("h2",{class:"main-title"},"基金觀察名單")],-1),i={key:0},s={key:1,class:"block-btn-more"},l=Object(r["createTextVNode"])("加入更多基金觀察"),d=Object(r["createTextVNode"])("前往網銀"),u={key:2,class:"block-empty-favorite"},m={class:"empty-remark"},b=Object(r["createElementVNode"])("i",{class:"fa-solid fa-magnifying-glass-plus icon-search"},null,-1),f={class:"content"},p=Object(r["createElementVNode"])("p",{class:"txt"},"您目前無觀察中的基金",-1),v={class:"tip"},O=Object(r["createTextVNode"])("請至"),h=Object(r["createTextVNode"])("基金搜尋"),j=Object(r["createTextVNode"])(" 點選「"),g=Object(r["createElementVNode"])("button",{class:"btn-heart"},[Object(r["createElementVNode"])("i",{class:"fas fa-heart"}),Object(r["createTextVNode"])("觀察")],-1),N=Object(r["createTextVNode"])("」 加入想觀察的基金。"),y={key:3,class:"block-favorite"},V={class:"favorite-table"},k=Object(r["createStaticVNode"])('<div class="favorite-tr"><div class="favorite-th btns-th"></div><div class="favorite-th name-th">基金名稱</div><div class="favorite-th">幣別</div><div class="favorite-th">三個月報酬率</div><div class="favorite-th">一年報酬率</div><div class="favorite-th">三年報酬率</div><div class="favorite-th">風險屬性</div><div class="favorite-th"></div></div>',1),E={class:"favorite-td btns-td"},w=["onClick"],C=Object(r["createElementVNode"])("i",{class:"fas fa-plus"},null,-1),F=Object(r["createTextVNode"])("比較 "),x=[C,F],B=["onClick"],S=Object(r["createElementVNode"])("i",{class:"fas fa-heart"},null,-1),G=Object(r["createTextVNode"])("刪除 "),A=[S,G],_={class:"favorite-td name-td"},T={class:"favorite-td"},P={class:"favorite-td"},D={class:"favorite-td"},L=["onClick"],$={class:"favorite-td btns-td"},J=["onClick"],z=Object(r["createElementVNode"])("i",{class:"fas fa-plus"},null,-1),M=Object(r["createTextVNode"])("比較 "),I=[z,M],U=["onClick"],q=Object(r["createElementVNode"])("i",{class:"fas fa-heart"},null,-1),W=Object(r["createTextVNode"])("刪除 "),Y=[q,W],X={class:"favorite-td name-td"},H={class:"favorite-td"},K={class:"favorite-td"},Q={class:"favorite-td"},R=["onClick"],Z={class:"btn-goLogin-dark three_favorite"},ee=Object(r["createElementVNode"])("p",null,"若未登入，最多僅觀察2筆，無法管理名單，且該清單無法與網路銀行同步。",-1),te=Object(r["createTextVNode"])("前往網銀"),ce={class:"favorite-td btns-td"},re=["onClick"],ae=Object(r["createElementVNode"])("i",{class:"fas fa-plus"},null,-1),oe=Object(r["createTextVNode"])("比較 "),ne=[ae,oe],ie=["onClick"],se=Object(r["createElementVNode"])("i",{class:"fas fa-heart"},null,-1),le=Object(r["createTextVNode"])("刪除 "),de=[se,le],ue={class:"favorite-td name-td"},me={class:"favorite-td"},be={class:"favorite-td"},fe={class:"favorite-td"},pe=["onClick"],ve={class:"btn-goLogin-dark four_favorite"},Oe=Object(r["createElementVNode"])("p",null,"若未登入，最多僅觀察2筆，無法管理名單，且該清單無法與網路銀行同步。",-1),he=Object(r["createTextVNode"])("前往網銀");function je(e,t,c,C,F,S){var G=Object(r["resolveComponent"])("Navbar"),z=Object(r["resolveComponent"])("Breadcrumb"),M=Object(r["resolveComponent"])("router-link");return Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],null,[Object(r["createVNode"])(G,{currentPage:F.currentPage},null,8,["currentPage"]),Object(r["createVNode"])(z,{currentPage:F.currentPage},null,8,["currentPage"]),Object(r["createElementVNode"])("section",a,[Object(r["createElementVNode"])("div",o,[n,F.myFavoriteGroup.length>0?(Object(r["openBlock"])(),Object(r["createElementBlock"])("p",i,"建議您登入網路銀行，即可永久儲存觀察清單。 若未登入，最多僅能觀察2筆。")):Object(r["createCommentVNode"])("",!0),F.myFavoriteGroup.length>0?(Object(r["openBlock"])(),Object(r["createElementBlock"])("div",s,[Object(r["createVNode"])(M,{to:"/search",class:"btn-more-fund"},{default:Object(r["withCtx"])((function(){return[l]})),_:1}),Object(r["createVNode"])(M,{to:"/login",class:"btn-goLogin"},{default:Object(r["withCtx"])((function(){return[d]})),_:1})])):Object(r["createCommentVNode"])("",!0),0===F.myFavoriteGroup.length?(Object(r["openBlock"])(),Object(r["createElementBlock"])("div",u,[Object(r["createElementVNode"])("div",m,[b,Object(r["createElementVNode"])("div",f,[p,Object(r["createElementVNode"])("p",v,[O,Object(r["createVNode"])(M,{to:"/search",class:"link-search"},{default:Object(r["withCtx"])((function(){return[h]})),_:1}),j,g,N])])])])):Object(r["createCommentVNode"])("",!0),0!==F.myFavoriteGroup.length?(Object(r["openBlock"])(),Object(r["createElementBlock"])("div",y,[Object(r["createElementVNode"])("div",V,[k,F.myFavoriteGroup.length<=2?(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],{key:0},Object(r["renderList"])(F.myFavoriteGroup,(function(t){return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",{class:"favorite-tr",key:t},[Object(r["createElementVNode"])("div",E,[Object(r["createElementVNode"])("button",{class:Object(r["normalizeClass"])(["btn-compare",{active:F.compareGroup.includes(t)}||e.isActiveCompareBtn]),id:"btn-compare",onClick:function(c){return e.confirmEqual(t)}},x,10,w),Object(r["createElementVNode"])("button",{class:Object(r["normalizeClass"])(["btn-heart",{active:F.myFavoriteGroup.includes(t)}]),id:"btn-heart",onClick:function(c){return e.deleteFavorite(t)}},A,10,B)]),Object(r["createElementVNode"])("div",_,Object(r["toDisplayString"])(t.fund),1),Object(r["createElementVNode"])("div",T,Object(r["toDisplayString"])(t.currency),1),Object(r["createElementVNode"])("div",{class:Object(r["normalizeClass"])(["favorite-td",{mark:t.performance.three_month_year<0}])},Object(r["toDisplayString"])(e.$filters.toPercent(t.performance.three_month_year)),3),Object(r["createElementVNode"])("div",{class:Object(r["normalizeClass"])(["favorite-td",{mark:t.performance.one_year<0}])},Object(r["toDisplayString"])(e.$filters.toPercent(t.performance.one_year)),3),Object(r["createElementVNode"])("div",{class:Object(r["normalizeClass"])(["favorite-td",{mark:t.performance.three_year<0}])},Object(r["toDisplayString"])(e.$filters.toPercent(t.performance.three_year)),3),Object(r["createElementVNode"])("div",P,Object(r["toDisplayString"])(t.risk),1),Object(r["createElementVNode"])("div",D,[Object(r["createElementVNode"])("a",{href:"",class:"btn-buy",onClick:Object(r["withModifiers"])((function(c){return e.updateApply(t)}),["prevent"])},"申購",8,L)])])})),128)):Object(r["createCommentVNode"])("",!0),3===F.myFavoriteGroup.length?(Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],{key:1},[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(F.myFavoriteGroup,(function(t){return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",{class:"favorite-tr dark",key:t},[Object(r["createElementVNode"])("div",$,[t?(Object(r["openBlock"])(),Object(r["createElementBlock"])("button",{key:0,class:Object(r["normalizeClass"])(["btn-compare",{active:F.compareGroup.includes(t)||e.ActiveCompareGroup.includes(t)}]),id:"btn-compare",onClick:function(c){return e.confirmEqual(t)}},I,10,J)):Object(r["createCommentVNode"])("",!0),Object(r["createElementVNode"])("button",{class:"btn-heart disabled",id:"btn-heart",onClick:function(c){return e.deleteFavorite(t)}},Y,8,U)]),Object(r["createElementVNode"])("div",X,Object(r["toDisplayString"])(t.fund),1),Object(r["createElementVNode"])("div",H,Object(r["toDisplayString"])(t.currency),1),Object(r["createElementVNode"])("div",{class:Object(r["normalizeClass"])(["favorite-td",{mark:t.performance.three_month_year<0}])},Object(r["toDisplayString"])(e.$filters.toPercent(t.performance.three_month_year)),3),Object(r["createElementVNode"])("div",{class:Object(r["normalizeClass"])(["favorite-td",{mark:t.performance.one_year<0}])},Object(r["toDisplayString"])(e.$filters.toPercent(t.performance.one_year)),3),Object(r["createElementVNode"])("div",{class:Object(r["normalizeClass"])(["favorite-td",{mark:t.performance.three_year<0}])},Object(r["toDisplayString"])(e.$filters.toPercent(t.performance.three_year)),3),Object(r["createElementVNode"])("div",K,Object(r["toDisplayString"])(t.risk),1),Object(r["createElementVNode"])("div",Q,[Object(r["createElementVNode"])("a",{href:"",class:"btn-buy",onClick:Object(r["withModifiers"])((function(c){return e.updateApply(t)}),["prevent"])},"申購",8,R)])])})),128)),Object(r["createElementVNode"])("div",Z,[ee,Object(r["createVNode"])(M,{to:"/login",class:"btn-goLogin"},{default:Object(r["withCtx"])((function(){return[te]})),_:1})])],64)):Object(r["createCommentVNode"])("",!0),F.myFavoriteGroup.length>3?(Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],{key:2},[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(F.myFavoriteGroup,(function(t){return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",{class:"favorite-tr dark",key:t},[Object(r["createElementVNode"])("div",ce,[t?(Object(r["openBlock"])(),Object(r["createElementBlock"])("button",{key:0,class:Object(r["normalizeClass"])(["btn-compare",{active:F.compareGroup.includes(t)||e.ActiveCompareGroup.includes(t)}]),id:"btn-compare",onClick:function(c){return e.confirmEqual(t)}},ne,10,re)):Object(r["createCommentVNode"])("",!0),Object(r["createElementVNode"])("button",{class:"btn-heart disabled",id:"btn-heart",onClick:function(c){return e.deleteFavorite(t)}},de,8,ie)]),Object(r["createElementVNode"])("div",ue,Object(r["toDisplayString"])(t.fund),1),Object(r["createElementVNode"])("div",me,Object(r["toDisplayString"])(t.currency),1),Object(r["createElementVNode"])("div",{class:Object(r["normalizeClass"])(["favorite-td",{mark:t.performance.three_month_year<0}])},Object(r["toDisplayString"])(e.$filters.toPercent(t.performance.three_month_year)),3),Object(r["createElementVNode"])("div",{class:Object(r["normalizeClass"])(["favorite-td",{mark:t.performance.one_year<0}])},Object(r["toDisplayString"])(e.$filters.toPercent(t.performance.one_year)),3),Object(r["createElementVNode"])("div",{class:Object(r["normalizeClass"])(["favorite-td",{mark:t.performance.three_year<0}])},Object(r["toDisplayString"])(e.$filters.toPercent(t.performance.three_year)),3),Object(r["createElementVNode"])("div",be,Object(r["toDisplayString"])(t.risk),1),Object(r["createElementVNode"])("div",fe,[Object(r["createElementVNode"])("a",{href:"",class:"btn-buy",onClick:Object(r["withModifiers"])((function(c){return e.updateApply(t)}),["prevent"])},"申購",8,pe)])])})),128)),Object(r["createElementVNode"])("div",ve,[Oe,Object(r["createVNode"])(M,{to:"/login",class:"btn-goLogin"},{default:Object(r["withCtx"])((function(){return[he]})),_:1})])],64)):Object(r["createCommentVNode"])("",!0)])])):Object(r["createCommentVNode"])("",!0)])])],64)}c("b0c0"),c("d3b7"),c("159b"),c("e9c4");var ge=c("fc60"),Ne=c("86ff"),ye=c("2fbc"),Ve=c("1915"),ke=c("d178"),Ee=c("793b"),we={data:function(){return{currentPage:this.$route.name,myFavoriteGroup:this.getFavorite()||[],compareGroup:this.getCompare()||[]}},components:{Navbar:ke["a"],Breadcrumb:ye["a"]},mixins:[ge["a"],Ne["a"],Ee["a"]],mounted:function(){Object(Ve["a"])(),this.isCompareBtnActive()},methods:{isCompareBtnActive:function(){var e=this;this.compareGroup.forEach((function(t){e.myFavoriteGroup.forEach((function(c){JSON.stringify(t)===JSON.stringify(c)&&e.ActiveCompareGroup.push(c)}))}))}}},Ce=c("6b0d"),Fe=c.n(Ce);const xe=Fe()(we,[["render",je]]);t["default"]=xe},caad:function(e,t,c){"use strict";var r=c("23e7"),a=c("4d64").includes,o=c("44d2");r({target:"Array",proto:!0},{includes:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),o("includes")},d178:function(e,t,c){"use strict";var r=c("7a23"),a={class:"header"},o={class:"container"},n=Object(r["createElementVNode"])("a",{href:"",class:"logo fa-solid fa-filter-circle-dollar"},[Object(r["createTextVNode"])(" Fund "),Object(r["createElementVNode"])("h1",{class:"sr-only"},"playfund")],-1),i={class:"container"},s=Object(r["createElementVNode"])("i",{class:"fas fa-search"},null,-1),l=Object(r["createTextVNode"])(" 基金搜尋"),d=Object(r["createElementVNode"])("i",{class:"fa-solid fa-arrow-up-wide-short"},null,-1),u=Object(r["createTextVNode"])(" 基金比較表"),m=Object(r["createTextVNode"])(" > "),b=Object(r["createElementVNode"])("i",{class:"fas fa-heart"},null,-1),f=Object(r["createTextVNode"])(" 基金觀察清單"),p=Object(r["createTextVNode"])("登入網銀"),v={key:0,class:"assistant"},O=Object(r["createElementVNode"])("div",{class:"remark"}," 安心基金智能客服，有問題可以隨時找我 ",-1),h=Object(r["createElementVNode"])("i",{class:"btn-assistant fa-solid fa-person-dots-from-line"},"?",-1),j=[O,h];function g(e,t,c,O,h,g){var N=Object(r["resolveComponent"])("router-link");return Object(r["openBlock"])(),Object(r["createElementBlock"])("header",a,[Object(r["createElementVNode"])("div",o,[n,"favorite"===c.currentPage||"compare"===c.currentPage||"/"===c.currentPage||"login"===c.currentPage||"search"===c.currentPage||"memberFavorite"===c.currentPage?(Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],{key:0},[Object(r["createElementVNode"])("nav",{class:Object(r["normalizeClass"])(["navbar",{active:h.isFixTop,activeList:h.isActiveList}]),ref:"refNav"},[Object(r["createElementVNode"])("div",i,[Object(r["createVNode"])(N,{to:"/search"},{default:Object(r["withCtx"])((function(){return[s,l]})),_:1}),Object(r["createVNode"])(N,{to:"/compare"},{default:Object(r["withCtx"])((function(){return[d,u]})),_:1}),m,Object(r["createVNode"])(N,{to:"/favorite"},{default:Object(r["withCtx"])((function(){return[b,f]})),_:1})])],2),Object(r["createElementVNode"])("div",{class:"fas fa-bars btn-hamburger",onClick:t[0]||(t[0]=function(){return g.switchList&&g.switchList.apply(g,arguments)})})],64)):Object(r["createCommentVNode"])("",!0),"favorite"===c.currentPage?(Object(r["openBlock"])(),Object(r["createBlock"])(N,{key:1,to:"/login",class:"btn-login btn"},{default:Object(r["withCtx"])((function(){return[p]})),_:1})):Object(r["createCommentVNode"])("",!0),"memberFavorite"===c.currentPage?(Object(r["openBlock"])(),Object(r["createElementBlock"])("div",{key:2,class:"btn-login btn",onClick:t[1]||(t[1]=function(){return g.logout&&g.logout.apply(g,arguments)})},"登出")):Object(r["createCommentVNode"])("",!0)]),"/"!==c.currentPage?(Object(r["openBlock"])(),Object(r["createElementBlock"])("div",v,j)):Object(r["createCommentVNode"])("",!0)])}c("e9c4");var N={data:function(){return{isFixTop:!1,isActiveList:!1,loginData:this.getUser()}},props:{currentPage:{required:!0}},methods:{switchList:function(){this.isActiveList?this.isActiveList=!1:this.isActiveList=!0},isShowNav:function(){var e=window.matchMedia("(max-width: 575px)");e.matches&&(this.isActiveList=!1)},scrollActive:function(){this.isShowNav(),this.fixTop()},fixTop:function(){window.scrollY>100?this.isFixTop=!0:this.isFixTop=!1,this.notFix()},notFix:function(){var e=window.matchMedia("(max-width: 575px)");e.matches&&(this.isFixTop=!1)},sweetAlert:function(e){this.$swal(e)},logout:function(){this.loginData="",this.saveLogin(this.loginData);var e={title:"登出成功",icon:"success"};this.sweetAlert(e),this.$router.push("/favorite")},saveLogin:function(e){var t=JSON.stringify(e);localStorage.setItem("loginUser",t)},getUser:function(){this.loginData=JSON.parse(localStorage.getItem("loginUser"))}},mounted:function(){window.addEventListener("scroll",this.scrollActive)}},y=c("6b0d"),V=c.n(y);const k=V()(N,[["render",g]]);t["a"]=k},e9c4:function(e,t,c){var r=c("23e7"),a=c("da84"),o=c("d066"),n=c("2ba4"),i=c("e330"),s=c("d039"),l=a.Array,d=o("JSON","stringify"),u=i(/./.exec),m=i("".charAt),b=i("".charCodeAt),f=i("".replace),p=i(1..toString),v=/[\uD800-\uDFFF]/g,O=/^[\uD800-\uDBFF]$/,h=/^[\uDC00-\uDFFF]$/,j=function(e,t,c){var r=m(c,t-1),a=m(c,t+1);return u(O,e)&&!u(h,a)||u(h,e)&&!u(O,r)?"\\u"+p(b(e,0),16):e},g=s((function(){return'"\\udf06\\ud834"'!==d("\udf06\ud834")||'"\\udead"'!==d("\udead")}));d&&r({target:"JSON",stat:!0,forced:g},{stringify:function(e,t,c){for(var r=0,a=arguments.length,o=l(a);r<a;r++)o[r]=arguments[r];var i=n(d,null,o);return"string"==typeof i?f(i,v,j):i}})},fc60:function(e,t,c){"use strict";c("e9c4"),c("caad"),c("2532"),c("a434");t["a"]={methods:{saveFavorite:function(e){var t=JSON.stringify(e);localStorage.setItem("fundFavorite",t)},getFavorite:function(){return JSON.parse(localStorage.getItem("fundFavorite"))},isShowWindow:function(){var e=window.matchMedia("(max-width: 575px)");e.matches&&(this.showUpperBody="")},updateFavorite:function(e,t){if(this.showWindowFooter=!0,this.showUpperBody="favorite",this.isShowWindow(),this.myFavoriteGroup.includes(e)){if(this.myFavoriteGroup.splice(this.myFavoriteGroup.indexOf(e),1),"search"!==t){var c={title:"商品已從收藏清單中移除",icon:"success"};this.sweetAlert(c)}}else{if(this.myFavoriteGroup.length>1){var r={title:"觀察超過2檔基金請登入網銀",icon:"info"};this.sweetAlert(r)}if(this.myFavoriteGroup.length>3){var a={title:"觀察超過2檔基金請登入網銀",icon:"info"};return void this.sweetAlert(a)}this.myFavoriteGroup.push(e)}this.saveFavorite(this.myFavoriteGroup)},deleteFavorite:function(e){this.myFavoriteGroup.splice(this.myFavoriteGroup.indexOf(e),1);var t={title:"商品已從收藏清單中移除",icon:"success"};this.sweetAlert(t),this.saveFavorite(this.myFavoriteGroup)},sweetAlert:function(e){this.$swal(e)}},watch:{myFavoriteGroup:{handler:function(){this.saveFavorite(this.myFavoriteGroup)},deep:!0}}}}}]);
//# sourceMappingURL=chunk-2b2553dc.3e50c73d.js.map