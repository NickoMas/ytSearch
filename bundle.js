!function(e){function t(n){if(a[n])return a[n].exports;var s=a[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var a={};t.m=e,t.c=a,t.i=function(e){return e},t.d=function(e,a,n){t.o(e,a)||Object.defineProperty(e,a,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.handlePrev=t.handleNext=t.handleSearch=t.displayOnWidth=t.paginationValues=t.renderPagination=t.renderInitBlocks=void 0;var n=(a(5),a(4)),s=(a(3),a(2)),i=a(1),d=function(){var e=new s.DomNode("div");e.addClassList("list-cache"),e.nestInto(document.body)},o=function(){var e=new s.DomNode("div");e.addClassList("buttonsWrapper inactive"),e.nestInto(document.body);var t=new s.DomNode("a"),a=new s.DomNode("a"),n=new s.DomNode("a");[t,a,n].forEach(function(e){e.setAttributes({href:"#"})});var i=new s.DomNode("input");i.setAttributes({type:"button",value:" ",class:"btn btnPrevPage inactive"});var d=new s.DomNode("input");d.setAttributes({type:"button",value:" ",class:"btn btnCurPage"});var o=new s.DomNode("input");o.setAttributes({type:"button",value:" ",class:"btn btnNextPage"}),_.zipWith([t,a,n],[i,d,o],function(e,t){return e.element.appendChild(t.element),e}).forEach(function(t){e.element.appendChild(t.element)})},r=function(){var e=n.state.displayedItemsStartIndex/n.state.displayedItemsNum;document.querySelector(".btnPrevPage").value=n.state.displayedItemsStartIndex/n.state.displayedItemsNum,document.querySelector(".btnCurPage").value=n.state.displayedItemsStartIndex/n.state.displayedItemsNum+i.CUR_OFFSET,document.querySelector(".btnNextPage").value=n.state.displayedItemsStartIndex/n.state.displayedItemsNum+i.NEXT_OFFSET,e?document.querySelector(".btnPrevPage").classList.remove("inactive"):document.querySelector(".btnPrevPage").classList.add("inactive")},c=function(e){var t=document.querySelector(".list-cache"),a=new s.DomNode("div");a.addClassList("video"),a.nestInto(t),n.state.displayedItems.includes(e)&&a.addClassList("displayed");var i=new s.DomNode("div"),d=new s.DomNode("a");d.setAttributes({href:"https://youtube.com/watch?v="+e.id.videoId}),d.element.innerHTML=""+e.snippet.title,i.nestInto(a.element),d.nestInto(i.element);var o=new s.DomNode("img");if(o.nestInto(a.element),o.setAttributes({src:e.snippet.thumbnails.medium.url,class:"preview"}),e.statistics){new s.DomNode("div").nestInto(a.element);var r=new s.DomNode("div"),c=new s.DomNode("i"),l=new s.DomNode("p");c.nestInto(r.element),l.nestInto(r.element),r.addClassList("views videoInfo"),c.setAttributes({class:"fa fa-eye","aria-hidden":"true"}),l.element.innerHTML+=""+e.statistics.viewCount;var u=new s.DomNode("div"),m=new s.DomNode("i"),h=new s.DomNode("p");m.nestInto(u.element),h.nestInto(u.element),u.addClassList("author videoInfo"),m.setAttributes({class:"fa fa-smile-o","aria-hidden":"true"}),h.element.innerHTML=""+e.snippet.channelTitle;var p=new s.DomNode("div"),f=new s.DomNode("i"),v=new s.DomNode("p");f.nestInto(p.element),v.nestInto(p.element),p.addClassList("date videoInfo"),f.setAttributes({class:"fa fa-calendar","aria-hidden":"true"}),v.element.innerHTML=""+e.snippet.publishedAt.slice(0,10);var g=new s.DomNode("div"),I=new s.DomNode("p");I.nestInto(g.element),g.addClassList("description videoInfo"),I.element.innerHTML=""+e.snippet.description,[r,u,p,g].forEach(function(e){e.nestInto(a.element)})}},l=function(){n.state.displayedItems=[],n.state.cachedPages.forEach(function(e){e.items.forEach(function(e){e.searchResultIndex<n.state.displayedItemsStartIndex||e.searchResultIndex>=n.state.displayedItemsStartIndex+n.state.displayedItemsNum||n.state.displayedItems.push(e)})}),document.querySelector(".list-cache").innerHTML="",n.state.cachedPages.forEach(function(e){e.items.forEach(function(e){return c(e)})})},u=function(e,t){n.state.displayedItemsNum=e,n.state.cachedPageSize=t,I(l)},m=function(){switch(!0){case window.innerWidth>=i.SCREEN_LARGE:u(5,11);break;case window.innerWidth<i.SCREEN_LARGE&&window.innerWidth>=i.SCREEN_MEDIUM:u(3,5);break;case window.innerWidth<=i.SCREEN_SMALL:u(1,2);break;default:u(5,11)}},h=function(){n.state.searchTerm=document.querySelector(".searchBar").value,n.state.cachedPages=[],m(),document.querySelector(".buttonsWrapper").classList.remove("inactive")},p=function(){n.state.displayedItemsStartIndex+=n.state.displayedItemsNum,I(l)},f=function(){n.state.displayedItemsStartIndex-=n.state.displayedItemsNum,I(l)},v=function(e,t,a){var s="https://www.googleapis.com/youtube/v3/search\n\t?key="+n.state.googleApiKey+(a?"&pageToken="+a:"")+"\n\t&type=video\n\t&part=snippet\n\t&maxResults="+n.state.cachedPageSize+"\n\t&q="+encodeURIComponent(t),i=new XMLHttpRequest;i.open("get",s,!0),i.onload=function(){var t=JSON.parse(this.response);e&&e(null,t)},i.onerror=function(){e&&e(new Error(":("))},i.send()},g=function(e,t){var a=[],s=!0,i=!1,d=void 0;try{for(var o,r=t[Symbol.iterator]();!(s=(o=r.next()).done);s=!0){var c=o.value;a.push(c.id.videoId)}}catch(e){i=!0,d=e}finally{try{!s&&r.return&&r.return()}finally{if(i)throw d}}var l="https://www.googleapis.com/youtube/v3/videos\n\t?key="+n.state.googleApiKey+"\n\t&id="+a.join()+"\n\t&part=statistics",u=new XMLHttpRequest;u.open("get",l,!0),u.onload=function(){JSON.parse(this.response).items.forEach(function(e){var a=t.find(function(t){return t.id.videoId===e.id});a&&(a.statistics=e.statistics)}),e&&e(null,t)},u.onerror=function(){e&&e(new Error(":("))},u.send()},I=function e(t){return n.state.displayedItemsStartIndex<0&&(n.state.displayedItemsStartIndex=0),t&&t(),0===n.state.cachedPages.length?void function(){n.state.isGettingPage||(n.state.displayedItemsStartIndex=0,n.state.isGettingPage=!0,v(function(a,s){if(n.state.isGettingPage=!1,a)return void console.log(a);g(t,s.items);for(var i=0;i<s.items.length;i++)s.items[i].searchResultIndex=i;n.state.cachedPages.push(s),e(t)},n.state.searchTerm))}():(n.state.firstPage=n.state.cachedPages[0],n.state.lastPage=n.state.cachedPages[n.state.cachedPages.length-i.LOWER_CACHELIMIT],n.state.cachedFirst=n.state.firstPage.items[0].searchResultIndex,n.state.cachedLast=n.state.lastPage.items[n.state.lastPage.items.length-i.LOWER_CACHELIMIT].searchResultIndex,n.state.neededBefore=Math.max(0,Math.floor((n.state.cachedItemsNum-n.state.displayedItemsNum)/2)),n.state.neededAfter=Math.max(0,Math.ceil((n.state.cachedItemsNum-n.state.displayedItemsNum)/2)),n.state.neededFirst=Math.max(0,n.state.displayedItemsStartIndex-n.state.neededBefore),n.state.neededLast=n.state.displayedItemsStartIndex+n.state.displayedItemsNum-i.LOWER_CACHELIMIT+n.state.neededAfter,n.state.neededFirst<n.state.cachedFirst?function(){if(n.state.cachedPages[0].prevPageToken&&!n.state.isGettingPage)for(n.state.isGettingPage=!0,v(function(a,s){if(n.state.isGettingPage=!1,a)return void console.log(a);g(t,s.items);for(var i=0;i<s.items.length;i++)s.items[i].searchResultIndex=i+n.state.cachedFirst-s.items.length;n.state.cachedPages.unshift(s),e(t)},n.state.searchTerm,n.state.firstPage.prevPageToken);n.state.cachedLast>n.state.neededLast+n.state.cachedHysteresis&&!(n.state.cachedPages.length<=i.LOWER_CACHELIMIT);)n.state.cachedPages.pop(),n.state.lastPage=n.state.cachedPages[n.state.cachedPages.length-i.LOWER_CACHELIMIT],n.state.cachedLast=n.state.lastPage.items[n.state.lastPage.items.length-i.LOWER_CACHELIMIT].searchResultIndex}():n.state.neededLast>n.state.cachedLast?function(){if(n.state.lastPage.nextPageToken&&!n.state.isGettingPage)for(n.state.isGettingPage=!0,v(function(a,s){if(n.state.isGettingPage=!1,a)return void console.log(a);g(t,s.items);for(var d=0;d<s.items.length;d++)s.items[d].searchResultIndex=d+n.state.cachedLast+i.LOWER_CACHELIMIT;n.state.cachedPages.push(s),e(t)},n.state.searchTerm,n.state.lastPage.nextPageToken);n.state.cachedFirst<n.state.neededFirst-n.state.cachedHysteresis&&!(n.state.cachedPages.length<=i.LOWER_CACHELIMIT);)n.state.cachedPages.shift(),n.state.firstPage=n.state.cachedPages[0],n.state.cachedFirst=n.state.cachedPages[0].items[0].searchResultIndex}():void 0)};t.renderInitBlocks=d,t.renderPagination=o,t.paginationValues=r,t.displayOnWidth=m,t.handleSearch=h,t.handleNext=p,t.handlePrev=f},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.X_LIMIT=80,t.Y_LIMIT=30,t.CUR_OFFSET=1,t.NEXT_OFFSET=2,t.SCREEN_LARGE=1200,t.SCREEN_MEDIUM=1e3,t.SCREEN_SMALL=620,t.LOWER_CACHELIMIT=1},function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),i=function(){function e(t){n(this,e),this.element=document.createElement(t)}return s(e,[{key:"addClassList",value:function(e){this.element.classList.value+=this.element.classList.length?" "+e:""+e}},{key:"setAttributes",value:function(e){for(var t in e)this.element.setAttribute(t,e[t])}},{key:"nestInto",value:function(e){e.appendChild(this.element)}}]),e}();t.DomNode=i},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.listenLoad=void 0;var n=a(0),s=function(){addEventListener("load",function(){(0,n.renderInitBlocks)(),(0,n.renderPagination)();var e=null;document.querySelector(".buttonsWrapper").addEventListener("mousedown",function(t){"button"===t.target.type&&(t.target.classList.add("tooltipNum"),e&&e!==t.target&&(t.target.classList.add("tooltipNum"),e.classList.remove("tooltipNum")),e=t.target,(0,n.paginationValues)())},!0),document.querySelector(".btnSearch").addEventListener("click",n.handleSearch),document.querySelector(".btnNextPage").addEventListener("click",n.handleNext),document.querySelector(".btnPrevPage").addEventListener("click",n.handlePrev)}),addEventListener("resize",function(){(0,n.displayOnWidth)()})}();t.listenLoad=s},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=[],s=[],i={googleApiKey:"AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y",searchTerm:"",displayedItemsNum:3,displayedItems:n,displayedItemsStartIndex:0,cachedPageSize:5,cachedPages:s,cachedItemsNum:9,cachedHysteresis:5,isGettingPage:!1};t.state=i},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.handleGesture=void 0;var n=a(0),s=a(1),i=0,d=0,o=0,r=0,c=function(){if(r!==d||o!==i){if(Array.from(document.querySelector(".buttonsWrapper").children).forEach(function(e){e.firstElementChild.classList.remove("tooltipNum")}),Math.abs(o-i)>s.X_LIMIT&&Math.abs(r-d)<s.Y_LIMIT){var e=new Event("click");i<o?document.querySelector(".btnPrevPage").dispatchEvent(e):document.querySelector(".btnNextPage").dispatchEvent(e)}(0,n.paginationValues)()}};document.documentElement.addEventListener("mousedown",function(e){i=e.screenX,d=e.screenY},!1),document.documentElement.addEventListener("mouseup",function(e){o=e.screenX,r=e.screenY,c()},!1),t.handleGesture=c}]);