(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78693354"],{1915:function(e,t,r){"use strict";function c(){window.pageYOffset>100&&window.scrollTo({top:0,behavior:"smooth"})}r.d(t,"a",(function(){return c}))},2532:function(e,t,r){"use strict";var c=r("23e7"),a=r("e330"),o=r("5a34"),n=r("1d80"),i=r("577e"),s=r("ab13"),l=a("".indexOf);c({target:"String",proto:!0,forced:!s("includes")},{includes:function(e){return!!~l(i(n(this)),i(o(e)),arguments.length>1?arguments[1]:void 0)}})},"2fbc":function(e,t,r){"use strict";var c=r("7a23"),a={class:"breadcrumb"},o={class:"container"},n={class:"breadcrumb-list"},i=Object(c["createElementVNode"])("li",null,[Object(c["createElementVNode"])("a",{href:""},"首頁")],-1),s={key:0},l=Object(c["createElementVNode"])("a",{href:"",class:"active"},"基金搜尋",-1),d=[l],u={key:1},m=Object(c["createElementVNode"])("a",{href:"",class:"active"},"基金比較表",-1),f=[m],b={key:2},p=Object(c["createElementVNode"])("a",{href:"",class:"active"},"基金觀察清單",-1),v=[p],h={key:3},O=Object(c["createElementVNode"])("a",{href:"",class:"active"},"基金觀察清單",-1),j=[O];function g(e,t,r,l,m,p){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",a,[Object(c["createElementVNode"])("div",o,[Object(c["createElementVNode"])("ul",n,[i,"search"===r.currentPage?(Object(c["openBlock"])(),Object(c["createElementBlock"])("li",s,d)):Object(c["createCommentVNode"])("",!0),"compare"===r.currentPage?(Object(c["openBlock"])(),Object(c["createElementBlock"])("li",u,f)):Object(c["createCommentVNode"])("",!0),"favorite"===r.currentPage?(Object(c["openBlock"])(),Object(c["createElementBlock"])("li",b,v)):Object(c["createCommentVNode"])("",!0),"memberFavorite"===r.currentPage?(Object(c["openBlock"])(),Object(c["createElementBlock"])("li",h,j)):Object(c["createCommentVNode"])("",!0)])])])}var N={data:function(){return{}},props:{currentPage:{required:!0}}},y=r("6b0d"),V=r.n(y);const k=V()(N,[["render",g]]);t["a"]=k},"37ca":function(e,t,r){"use strict";var c=function(e){return{all:e=e||new Map,on:function(t,r){var c=e.get(t);c?c.push(r):e.set(t,[r])},off:function(t,r){var c=e.get(t);c&&(r?c.splice(c.indexOf(r)>>>0,1):e.set(t,[]))},emit:function(t,r){var c=e.get(t);c&&c.slice().map((function(e){e(r)})),(c=e.get("*"))&&c.slice().map((function(e){e(t,r)}))}}},a=c();t["a"]=a},"5a34":function(e,t,r){var c=r("da84"),a=r("44e7"),o=c.TypeError;e.exports=function(e){if(a(e))throw o("The method doesn't accept regular expressions");return e}},"793b":function(e,t,r){"use strict";r("e9c4");t["a"]={methods:{saveApply:function(e){var t=JSON.stringify(e);localStorage.setItem("fundApply",t)},getApply:function(){return JSON.parse(localStorage.getItem("fundApply"))},updateApply:function(e){this.saveApply(e),this.$router.push("/note")},sweetAlert:function(e){this.$swal(e)}}}},"7ad8":function(e,t,r){"use strict";r.r(t);r("caad"),r("2532");var c=r("7a23"),a={key:0,class:"section section-favorite",id:"section-favorite"},o={class:"container"},n=Object(c["createElementVNode"])("div",{class:"block-main-title"},[Object(c["createElementVNode"])("i",{class:"fa-solid fa-heart"}),Object(c["createElementVNode"])("h2",{class:"main-title"},"基金觀察名單")],-1),i={key:0,class:"block-btn-more"},s=Object(c["createTextVNode"])("加入更多基金觀察"),l={key:1,class:"block-empty-favorite"},d={class:"empty-remark"},u=Object(c["createElementVNode"])("i",{class:"fa-solid fa-magnifying-glass-plus icon-search"},null,-1),m={class:"content"},f=Object(c["createElementVNode"])("p",{class:"txt"},"您目前無觀察中的基金",-1),b={class:"tip"},p=Object(c["createTextVNode"])("請至"),v=Object(c["createTextVNode"])("基金搜尋"),h=Object(c["createTextVNode"])(" 點選「"),O=Object(c["createElementVNode"])("button",{class:"btn-heart"},[Object(c["createElementVNode"])("i",{class:"fas fa-heart"}),Object(c["createTextVNode"])("觀察")],-1),j=Object(c["createTextVNode"])("」 加入想觀察的基金。"),g={key:2,class:"block-favorite"},N={class:"favorite-table"},y=Object(c["createStaticVNode"])('<div class="favorite-tr"><div class="favorite-th btns-th"></div><div class="favorite-th name-th">基金名稱</div><div class="favorite-th">幣別</div><div class="favorite-th">三個月報酬率</div><div class="favorite-th">一年報酬率</div><div class="favorite-th">三年報酬率</div><div class="favorite-th">風險屬性</div><div class="favorite-th"></div></div>',1),V={class:"favorite-td btns-td"},k=["onClick"],E=Object(c["createElementVNode"])("i",{class:"fas fa-plus"},null,-1),w=Object(c["createTextVNode"])("比較 "),C=[E,w],F=["onClick"],x=Object(c["createElementVNode"])("i",{class:"fas fa-heart"},null,-1),B=Object(c["createTextVNode"])("刪除 "),S=[x,B],G={class:"favorite-td name-td"},A={class:"favorite-td"},P={class:"favorite-td"},T={class:"favorite-td"},D=["onClick"],_={class:"favorite-td btns-td"},J=["onClick"],L=Object(c["createElementVNode"])("i",{class:"fas fa-plus"},null,-1),$=Object(c["createTextVNode"])("比較 "),U=[L,$],I=["onClick"],M=Object(c["createElementVNode"])("i",{class:"fas fa-heart"},null,-1),z=Object(c["createTextVNode"])("刪除 "),W=[M,z],q={class:"favorite-td name-td"},Y={class:"favorite-td"},X={class:"favorite-td"},H={class:"favorite-td"},K=["onClick"];function Q(e,t,r,E,w,x){var B=Object(c["resolveComponent"])("Navbar"),L=Object(c["resolveComponent"])("Breadcrumb"),$=Object(c["resolveComponent"])("router-link");return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[Object(c["createVNode"])(B,{currentPage:w.currentPage},null,8,["currentPage"]),Object(c["createVNode"])(L,{currentPage:w.currentPage},null,8,["currentPage"]),w.loginData?(Object(c["openBlock"])(),Object(c["createElementBlock"])("section",a,[Object(c["createElementVNode"])("div",o,[n,w.myFavoriteGroup.length>0?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",i,[Object(c["createVNode"])($,{to:"/search",class:"btn-more-fund"},{default:Object(c["withCtx"])((function(){return[s]})),_:1})])):Object(c["createCommentVNode"])("",!0),0===w.myFavoriteGroup.length?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",l,[Object(c["createElementVNode"])("div",d,[u,Object(c["createElementVNode"])("div",m,[f,Object(c["createElementVNode"])("p",b,[p,Object(c["createVNode"])($,{to:"/search",class:"link-search"},{default:Object(c["withCtx"])((function(){return[v]})),_:1}),h,O,j])])])])):Object(c["createCommentVNode"])("",!0),w.myFavoriteGroup.length>0?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",g,[Object(c["createElementVNode"])("div",N,[y,w.myFavoriteGroup.length<=2?(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],{key:0},Object(c["renderList"])(w.myFavoriteGroup,(function(t){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:"favorite-tr",key:t},[Object(c["createElementVNode"])("div",V,[t?(Object(c["openBlock"])(),Object(c["createElementBlock"])("button",{key:0,class:Object(c["normalizeClass"])(["btn-compare",{active:w.compareGroup.includes(t)||e.ActiveCompareGroup.includes(t)}]),id:"btn-compare",onClick:function(r){return e.confirmEqual(t)}},C,10,k)):Object(c["createCommentVNode"])("",!0),Object(c["createElementVNode"])("button",{class:"btn-heart",id:"btn-heart",onClick:function(r){return e.deleteFavorite(t)}},S,8,F)]),Object(c["createElementVNode"])("div",G,Object(c["toDisplayString"])(t.fund),1),Object(c["createElementVNode"])("div",A,Object(c["toDisplayString"])(t.currency),1),Object(c["createElementVNode"])("div",{class:Object(c["normalizeClass"])(["favorite-td",{mark:t.performance.three_month_year<0}])},Object(c["toDisplayString"])(e.$filters.toPercent(t.performance.three_month_year)),3),Object(c["createElementVNode"])("div",{class:Object(c["normalizeClass"])(["favorite-td",{mark:t.performance.one_year<0}])},Object(c["toDisplayString"])(e.$filters.toPercent(t.performance.one_year)),3),Object(c["createElementVNode"])("div",{class:Object(c["normalizeClass"])(["favorite-td",{mark:t.performance.three_year<0}])},Object(c["toDisplayString"])(e.$filters.toPercent(t.performance.three_year)),3),Object(c["createElementVNode"])("div",P,Object(c["toDisplayString"])(t.risk),1),Object(c["createElementVNode"])("div",T,[Object(c["createElementVNode"])("a",{href:"",class:"btn-buy",onClick:Object(c["withModifiers"])((function(r){return e.updateApply(t)}),["prevent"])},"申購",8,D)])])})),128)):Object(c["createCommentVNode"])("",!0),w.myFavoriteGroup.length>2?(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],{key:1},Object(c["renderList"])(w.myFavoriteGroup,(function(t){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:"favorite-tr",key:t},[Object(c["createElementVNode"])("div",_,[t?(Object(c["openBlock"])(),Object(c["createElementBlock"])("button",{key:0,class:Object(c["normalizeClass"])(["btn-compare",{active:w.compareGroup.includes(t)||e.ActiveCompareGroup.includes(t)}]),id:"btn-compare",onClick:function(r){return e.confirmEqual(t)}},U,10,J)):Object(c["createCommentVNode"])("",!0),Object(c["createElementVNode"])("button",{class:"btn-heart",id:"btn-heart",onClick:function(r){return e.deleteFavorite(t)}},W,8,I)]),Object(c["createElementVNode"])("div",q,Object(c["toDisplayString"])(t.fund),1),Object(c["createElementVNode"])("div",Y,Object(c["toDisplayString"])(t.currency),1),Object(c["createElementVNode"])("div",{class:Object(c["normalizeClass"])(["favorite-td",{mark:t.performance.three_month_year<0}])},Object(c["toDisplayString"])(e.$filters.toPercent(t.performance.three_month_year)),3),Object(c["createElementVNode"])("div",{class:Object(c["normalizeClass"])(["favorite-td",{mark:t.performance.one_year<0}])},Object(c["toDisplayString"])(e.$filters.toPercent(t.performance.one_year)),3),Object(c["createElementVNode"])("div",{class:Object(c["normalizeClass"])(["favorite-td",{mark:t.performance.three_year<0}])},Object(c["toDisplayString"])(e.$filters.toPercent(t.performance.three_year)),3),Object(c["createElementVNode"])("div",X,Object(c["toDisplayString"])(t.risk),1),Object(c["createElementVNode"])("div",H,[Object(c["createElementVNode"])("a",{href:"",class:"btn-buy",onClick:Object(c["withModifiers"])((function(r){return e.updateApply(t)}),["prevent"])},"申購",8,K)])])})),128)):Object(c["createCommentVNode"])("",!0)])])):Object(c["createCommentVNode"])("",!0)])])):Object(c["createCommentVNode"])("",!0)],64)}r("b0c0"),r("d3b7"),r("159b"),r("e9c4");var R=r("fc60"),Z=r("86ff"),ee=r("1915"),te=r("d178"),re=r("2fbc"),ce=r("793b"),ae={data:function(){return{currentPage:this.$route.name,loginData:"",myFavoriteGroup:this.getFavorite()||[],compareGroup:this.getCompare()||[]}},components:{Navbar:te["a"],Breadcrumb:re["a"]},mixins:[R["a"],Z["a"],ce["a"]],mounted:function(){this.loginData=this.getUser(),Object(ee["a"])(),this.isCompareBtnActive()},methods:{getUser:function(){return JSON.parse(localStorage.getItem("loginUser"))},isCompareBtnActive:function(){var e=this;this.compareGroup.forEach((function(t){e.myFavoriteGroup.forEach((function(r){JSON.stringify(t)===JSON.stringify(r)&&e.ActiveCompareGroup.push(r)}))}))}}},oe=r("6b0d"),ne=r.n(oe);const ie=ne()(ae,[["render",Q]]);t["default"]=ie},"86ff":function(e,t,r){"use strict";r("e9c4"),r("caad"),r("2532"),r("a434"),r("d3b7"),r("159b");var c=r("37ca");t["a"]={data:function(){return{ActiveCompareGroup:[]}},methods:{saveCompare:function(e){var t=JSON.stringify(e);localStorage.setItem("fundCompare",t)},getCompare:function(){return JSON.parse(localStorage.getItem("fundCompare"))||[]},isShowWindow:function(){var e=window.matchMedia("(max-width: 575px)");e.matches&&(this.showUpperBody="")},updateCompare:function(e,t){if(this.showWindowFooter=!0,this.showUpperBody="compare",this.isShowWindow(),this.compareGroup.includes(e)){if(this.compareGroup.splice(this.compareGroup.indexOf(e),1),"search"!==t){var r={title:"商品已從比較清單中移除",icon:"success"};this.sweetAlert(r)}}else{if(this.compareGroup.length>2){var c={title:"最多僅能比較3檔基金",icon:"info"};return void this.sweetAlert(c)}if(this.compareGroup.push(e),"search"!==t){var a={title:"加入我的比較清單",icon:"success"};this.sweetAlert(a)}}this.saveCompare(this.compareGroup)},sweetAlert:function(e){this.$swal(e)},confirmEqual:function(e){var t=this,r=!0;if(this.compareGroup.forEach((function(c){if(JSON.stringify(c)===JSON.stringify(e)){r=!1,t.compareGroup.splice(t.compareGroup.indexOf(c),1);var a={title:"商品已從比較清單中移除",icon:"success"};t.sweetAlert(a)}})),r){if(this.compareGroup.length>2){var c={title:"最多僅能比較3檔基金",icon:"info"};return void this.sweetAlert(c)}this.compareGroup.push(e);var a={title:"加入我的比較清單",icon:"success"};this.sweetAlert(a)}}},watch:{compareGroup:{handler:function(){this.saveCompare(this.compareGroup),c["a"].emit("updateComareGroup")},deep:!0}}}},a434:function(e,t,r){"use strict";var c=r("23e7"),a=r("da84"),o=r("23cb"),n=r("5926"),i=r("07fa"),s=r("7b0b"),l=r("65f0"),d=r("8418"),u=r("1dde"),m=u("splice"),f=a.TypeError,b=Math.max,p=Math.min,v=9007199254740991,h="Maximum allowed length exceeded";c({target:"Array",proto:!0,forced:!m},{splice:function(e,t){var r,c,a,u,m,O,j=s(this),g=i(j),N=o(e,g),y=arguments.length;if(0===y?r=c=0:1===y?(r=0,c=g-N):(r=y-2,c=p(b(n(t),0),g-N)),g+r-c>v)throw f(h);for(a=l(j,c),u=0;u<c;u++)m=N+u,m in j&&d(a,u,j[m]);if(a.length=c,r<c){for(u=N;u<g-c;u++)m=u+c,O=u+r,m in j?j[O]=j[m]:delete j[O];for(u=g;u>g-c+r;u--)delete j[u-1]}else if(r>c)for(u=g-c;u>N;u--)m=u+c-1,O=u+r-1,m in j?j[O]=j[m]:delete j[O];for(u=0;u<r;u++)j[u+N]=arguments[u+2];return j.length=g-c+r,a}})},ab13:function(e,t,r){var c=r("b622"),a=c("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(r){try{return t[a]=!1,"/./"[e](t)}catch(c){}}return!1}},b0c0:function(e,t,r){var c=r("83ab"),a=r("5e77").EXISTS,o=r("e330"),n=r("9bf2").f,i=Function.prototype,s=o(i.toString),l=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,d=o(l.exec),u="name";c&&!a&&n(i,u,{configurable:!0,get:function(){try{return d(l,s(this))[1]}catch(e){return""}}})},caad:function(e,t,r){"use strict";var c=r("23e7"),a=r("4d64").includes,o=r("44d2");c({target:"Array",proto:!0},{includes:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),o("includes")},d178:function(e,t,r){"use strict";var c=r("7a23"),a={class:"header"},o={class:"container"},n=Object(c["createElementVNode"])("a",{href:"",class:"logo fa-solid fa-filter-circle-dollar"},[Object(c["createTextVNode"])(" Fund "),Object(c["createElementVNode"])("h1",{class:"sr-only"},"playfund")],-1),i={class:"container"},s=Object(c["createElementVNode"])("i",{class:"fas fa-search"},null,-1),l=Object(c["createTextVNode"])(" 基金搜尋"),d=Object(c["createElementVNode"])("i",{class:"fa-solid fa-arrow-up-wide-short"},null,-1),u=Object(c["createTextVNode"])(" 基金比較表"),m=Object(c["createTextVNode"])(" > "),f=Object(c["createElementVNode"])("i",{class:"fas fa-heart"},null,-1),b=Object(c["createTextVNode"])(" 基金觀察清單"),p=Object(c["createTextVNode"])("登入網銀"),v={key:0,class:"assistant"},h=Object(c["createElementVNode"])("div",{class:"remark"}," 安心基金智能客服，有問題可以隨時找我 ",-1),O=Object(c["createElementVNode"])("i",{class:"btn-assistant fa-solid fa-person-dots-from-line"},"?",-1),j=[h,O];function g(e,t,r,h,O,g){var N=Object(c["resolveComponent"])("router-link");return Object(c["openBlock"])(),Object(c["createElementBlock"])("header",a,[Object(c["createElementVNode"])("div",o,[n,"favorite"===r.currentPage||"compare"===r.currentPage||"/"===r.currentPage||"login"===r.currentPage||"search"===r.currentPage||"memberFavorite"===r.currentPage?(Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],{key:0},[Object(c["createElementVNode"])("nav",{class:Object(c["normalizeClass"])(["navbar",{active:O.isFixTop,activeList:O.isActiveList}]),ref:"refNav"},[Object(c["createElementVNode"])("div",i,[Object(c["createVNode"])(N,{to:"/search"},{default:Object(c["withCtx"])((function(){return[s,l]})),_:1}),Object(c["createVNode"])(N,{to:"/compare"},{default:Object(c["withCtx"])((function(){return[d,u]})),_:1}),m,Object(c["createVNode"])(N,{to:"/favorite"},{default:Object(c["withCtx"])((function(){return[f,b]})),_:1})])],2),Object(c["createElementVNode"])("div",{class:"fas fa-bars btn-hamburger",onClick:t[0]||(t[0]=function(){return g.switchList&&g.switchList.apply(g,arguments)})})],64)):Object(c["createCommentVNode"])("",!0),"favorite"===r.currentPage?(Object(c["openBlock"])(),Object(c["createBlock"])(N,{key:1,to:"/login",class:"btn-login btn"},{default:Object(c["withCtx"])((function(){return[p]})),_:1})):Object(c["createCommentVNode"])("",!0),"memberFavorite"===r.currentPage?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{key:2,class:"btn-login btn",onClick:t[1]||(t[1]=function(){return g.logout&&g.logout.apply(g,arguments)})},"登出")):Object(c["createCommentVNode"])("",!0)]),"/"!==r.currentPage?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",v,j)):Object(c["createCommentVNode"])("",!0)])}r("e9c4");var N={data:function(){return{isFixTop:!1,isActiveList:!1,loginData:this.getUser()}},props:{currentPage:{required:!0}},methods:{switchList:function(){this.isActiveList?this.isActiveList=!1:this.isActiveList=!0},isShowNav:function(){var e=window.matchMedia("(max-width: 575px)");e.matches&&(this.isActiveList=!1)},scrollActive:function(){this.isShowNav(),this.fixTop()},fixTop:function(){window.scrollY>100?this.isFixTop=!0:this.isFixTop=!1,this.notFix()},notFix:function(){var e=window.matchMedia("(max-width: 575px)");e.matches&&(this.isFixTop=!1)},sweetAlert:function(e){this.$swal(e)},logout:function(){this.loginData="",this.saveLogin(this.loginData);var e={title:"登出成功",icon:"success"};this.sweetAlert(e),this.$router.push("/favorite")},saveLogin:function(e){var t=JSON.stringify(e);localStorage.setItem("loginUser",t)},getUser:function(){this.loginData=JSON.parse(localStorage.getItem("loginUser"))}},mounted:function(){window.addEventListener("scroll",this.scrollActive)}},y=r("6b0d"),V=r.n(y);const k=V()(N,[["render",g]]);t["a"]=k},e9c4:function(e,t,r){var c=r("23e7"),a=r("da84"),o=r("d066"),n=r("2ba4"),i=r("e330"),s=r("d039"),l=a.Array,d=o("JSON","stringify"),u=i(/./.exec),m=i("".charAt),f=i("".charCodeAt),b=i("".replace),p=i(1..toString),v=/[\uD800-\uDFFF]/g,h=/^[\uD800-\uDBFF]$/,O=/^[\uDC00-\uDFFF]$/,j=function(e,t,r){var c=m(r,t-1),a=m(r,t+1);return u(h,e)&&!u(O,a)||u(O,e)&&!u(h,c)?"\\u"+p(f(e,0),16):e},g=s((function(){return'"\\udf06\\ud834"'!==d("\udf06\ud834")||'"\\udead"'!==d("\udead")}));d&&c({target:"JSON",stat:!0,forced:g},{stringify:function(e,t,r){for(var c=0,a=arguments.length,o=l(a);c<a;c++)o[c]=arguments[c];var i=n(d,null,o);return"string"==typeof i?b(i,v,j):i}})},fc60:function(e,t,r){"use strict";r("e9c4"),r("caad"),r("2532"),r("a434");t["a"]={methods:{saveFavorite:function(e){var t=JSON.stringify(e);localStorage.setItem("fundFavorite",t)},getFavorite:function(){return JSON.parse(localStorage.getItem("fundFavorite"))},isShowWindow:function(){var e=window.matchMedia("(max-width: 575px)");e.matches&&(this.showUpperBody="")},updateFavorite:function(e,t){if(this.showWindowFooter=!0,this.showUpperBody="favorite",this.isShowWindow(),this.myFavoriteGroup.includes(e)){if(this.myFavoriteGroup.splice(this.myFavoriteGroup.indexOf(e),1),"search"!==t){var r={title:"商品已從收藏清單中移除",icon:"success"};this.sweetAlert(r)}}else{if(this.myFavoriteGroup.length>1){var c={title:"觀察超過2檔基金請登入網銀",icon:"info"};this.sweetAlert(c)}if(this.myFavoriteGroup.length>3){var a={title:"觀察超過2檔基金請登入網銀",icon:"info"};return void this.sweetAlert(a)}this.myFavoriteGroup.push(e)}this.saveFavorite(this.myFavoriteGroup)},deleteFavorite:function(e){this.myFavoriteGroup.splice(this.myFavoriteGroup.indexOf(e),1);var t={title:"商品已從收藏清單中移除",icon:"success"};this.sweetAlert(t),this.saveFavorite(this.myFavoriteGroup)},sweetAlert:function(e){this.$swal(e)}},watch:{myFavoriteGroup:{handler:function(){this.saveFavorite(this.myFavoriteGroup)},deep:!0}}}}}]);
//# sourceMappingURL=chunk-78693354.d247d424.js.map