class W{constructor(e){this.properties=e??[]}get(e){const t=this.properties.filter(r=>r.name===e).map(r=>r.value);if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(t.length!==0)return t[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,t){const r=this.get(e);if(r!==void 0){if(t!=="json"&&typeof r!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return r}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,t){const r=this.get(e);if(r===void 0)throw new Error('Property "'+e+'" is missing');if(t!=="json"&&typeof r!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return r}getType(e){const t=this.properties.filter(r=>r.name===e).map(r=>r.type);if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(t.length!==0)return t[0]}}const J="https://unpkg.com/@workadventure/scripting-api-extra@1.8.1/dist";class se{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new W(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function U(n){const e=n?"#"+n.join():"";WA.nav.openCoWebSite(J+"/configuration.html"+e,!0)}async function ae(n,e){const t=await WA.room.getTiledMap(),r=new Map;return Q(t.layers,r,n,e),r}function Q(n,e,t,r){for(const o of n)if(o.type==="objectgroup"){for(const s of o.objects)if(s.type==="variable"||s.class==="variable"){if(t&&o.name!==t||r&&!r.includes(s.name))continue;e.set(s.name,new se(s))}}else o.type==="group"&&Q(o.layers,e,t,r)}let x;async function E(){return x===void 0&&(x=ie()),x}async function ie(){return le(await WA.room.getTiledMap())}function le(n){const e=new Map;return F(n.layers,"",e),e}function F(n,e,t){for(const r of n)r.type==="group"?F(r.layers,e+r.name+"/",t):(r.name=e+r.name,t.set(r.name,r))}async function Z(){const n=await E(),e=[];for(const t of n.values())if(t.type==="objectgroup")for(const r of t.objects)(r.type==="area"||r.class==="area")&&e.push(r);return e}function ce(n){let e=1/0,t=1/0,r=0,o=0;const s=n.data;if(typeof s=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let a=0;a<n.height;a++)for(let i=0;i<n.width;i++)s[i+a*n.width]!==0&&(e=Math.min(e,i),o=Math.max(o,i),t=Math.min(t,a),r=Math.max(r,a));return{top:t,left:e,right:o+1,bottom:r+1}}function ee(n){let e=1/0,t=1/0,r=0,o=0;for(const s of n){const a=ce(s);a.left<e&&(e=a.left),a.top<t&&(t=a.top),a.right>o&&(o=a.right),a.bottom>r&&(r=a.bottom)}return{top:t,left:e,right:o,bottom:r}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var ue=Object.prototype.toString,C=Array.isArray||function(e){return ue.call(e)==="[object Array]"};function _(n){return typeof n=="function"}function pe(n){return C(n)?"array":typeof n}function j(n){return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function D(n,e){return n!=null&&typeof n=="object"&&e in n}function fe(n,e){return n!=null&&typeof n!="object"&&n.hasOwnProperty&&n.hasOwnProperty(e)}var ge=RegExp.prototype.test;function he(n,e){return ge.call(n,e)}var de=/\S/;function ye(n){return!he(de,n)}var me={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function ve(n){return String(n).replace(/[&<>"'`=\/]/g,function(t){return me[t]})}var be=/\s*/,Ae=/\s+/,N=/\s*=/,we=/\s*\}/,We=/#|\^|\/|>|\{|&|=|!/;function Se(n,e){if(!n)return[];var t=!1,r=[],o=[],s=[],a=!1,i=!1,l="",u=0;function f(){if(a&&!i)for(;s.length;)delete o[s.pop()];else s=[];a=!1,i=!1}var d,m,L;function M(b){if(typeof b=="string"&&(b=b.split(Ae,2)),!C(b)||b.length!==2)throw new Error("Invalid tags: "+b);d=new RegExp(j(b[0])+"\\s*"),m=new RegExp("\\s*"+j(b[1])),L=new RegExp("\\s*"+j("}"+b[1]))}M(e||h.tags);for(var p=new k(n),v,c,y,P,R,A;!p.eos();){if(v=p.pos,y=p.scanUntil(d),y)for(var B=0,oe=y.length;B<oe;++B)P=y.charAt(B),ye(P)?(s.push(o.length),l+=P):(i=!0,t=!0,l+=" "),o.push(["text",P,v,v+1]),v+=1,P===`
`&&(f(),l="",u=0,t=!1);if(!p.scan(d))break;if(a=!0,c=p.scan(We)||"name",p.scan(be),c==="="?(y=p.scanUntil(N),p.scan(N),p.scanUntil(m)):c==="{"?(y=p.scanUntil(L),p.scan(we),p.scanUntil(m),c="&"):y=p.scanUntil(m),!p.scan(m))throw new Error("Unclosed tag at "+p.pos);if(c==">"?R=[c,y,v,p.pos,l,u,t]:R=[c,y,v,p.pos],u++,o.push(R),c==="#"||c==="^")r.push(R);else if(c==="/"){if(A=r.pop(),!A)throw new Error('Unopened section "'+y+'" at '+v);if(A[1]!==y)throw new Error('Unclosed section "'+A[1]+'" at '+v)}else c==="name"||c==="{"||c==="&"?i=!0:c==="="&&M(y)}if(f(),A=r.pop(),A)throw new Error('Unclosed section "'+A[1]+'" at '+p.pos);return Me(Ce(o))}function Ce(n){for(var e=[],t,r,o=0,s=n.length;o<s;++o)t=n[o],t&&(t[0]==="text"&&r&&r[0]==="text"?(r[1]+=t[1],r[3]=t[3]):(e.push(t),r=t));return e}function Me(n){for(var e=[],t=e,r=[],o,s,a=0,i=n.length;a<i;++a)switch(o=n[a],o[0]){case"#":case"^":t.push(o),r.push(o),t=o[4]=[];break;case"/":s=r.pop(),s[5]=o[2],t=r.length>0?r[r.length-1][4]:e;break;default:t.push(o)}return e}function k(n){this.string=n,this.tail=n,this.pos=0}k.prototype.eos=function(){return this.tail===""};k.prototype.scan=function(e){var t=this.tail.match(e);if(!t||t.index!==0)return"";var r=t[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};k.prototype.scanUntil=function(e){var t=this.tail.search(e),r;switch(t){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=r.length,r};function S(n,e){this.view=n,this.cache={".":this.view},this.parent=e}S.prototype.push=function(e){return new S(e,this)};S.prototype.lookup=function(e){var t=this.cache,r;if(t.hasOwnProperty(e))r=t[e];else{for(var o=this,s,a,i,l=!1;o;){if(e.indexOf(".")>0)for(s=o.view,a=e.split("."),i=0;s!=null&&i<a.length;)i===a.length-1&&(l=D(s,a[i])||fe(s,a[i])),s=s[a[i++]];else s=o.view[e],l=D(o.view,e);if(l){r=s;break}o=o.parent}t[e]=r}return _(r)&&(r=r.call(this.view)),r};function g(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}g.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};g.prototype.parse=function(e,t){var r=this.templateCache,o=e+":"+(t||h.tags).join(":"),s=typeof r<"u",a=s?r.get(o):void 0;return a==null&&(a=Se(e,t),s&&r.set(o,a)),a};g.prototype.render=function(e,t,r,o){var s=this.getConfigTags(o),a=this.parse(e,s),i=t instanceof S?t:new S(t,void 0);return this.renderTokens(a,i,r,e,o)};g.prototype.renderTokens=function(e,t,r,o,s){for(var a="",i,l,u,f=0,d=e.length;f<d;++f)u=void 0,i=e[f],l=i[0],l==="#"?u=this.renderSection(i,t,r,o,s):l==="^"?u=this.renderInverted(i,t,r,o,s):l===">"?u=this.renderPartial(i,t,r,s):l==="&"?u=this.unescapedValue(i,t):l==="name"?u=this.escapedValue(i,t,s):l==="text"&&(u=this.rawValue(i)),u!==void 0&&(a+=u);return a};g.prototype.renderSection=function(e,t,r,o,s){var a=this,i="",l=t.lookup(e[1]);function u(m){return a.render(m,t,r,s)}if(l){if(C(l))for(var f=0,d=l.length;f<d;++f)i+=this.renderTokens(e[4],t.push(l[f]),r,o,s);else if(typeof l=="object"||typeof l=="string"||typeof l=="number")i+=this.renderTokens(e[4],t.push(l),r,o,s);else if(_(l)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(t.view,o.slice(e[3],e[5]),u),l!=null&&(i+=l)}else i+=this.renderTokens(e[4],t,r,o,s);return i}};g.prototype.renderInverted=function(e,t,r,o,s){var a=t.lookup(e[1]);if(!a||C(a)&&a.length===0)return this.renderTokens(e[4],t,r,o,s)};g.prototype.indentPartial=function(e,t,r){for(var o=t.replace(/[^ \t]/g,""),s=e.split(`
`),a=0;a<s.length;a++)s[a].length&&(a>0||!r)&&(s[a]=o+s[a]);return s.join(`
`)};g.prototype.renderPartial=function(e,t,r,o){if(r){var s=this.getConfigTags(o),a=_(r)?r(e[1]):r[e[1]];if(a!=null){var i=e[6],l=e[5],u=e[4],f=a;l==0&&u&&(f=this.indentPartial(a,u,i));var d=this.parse(f,s);return this.renderTokens(d,t,r,f,o)}}};g.prototype.unescapedValue=function(e,t){var r=t.lookup(e[1]);if(r!=null)return r};g.prototype.escapedValue=function(e,t,r){var o=this.getConfigEscape(r)||h.escape,s=t.lookup(e[1]);if(s!=null)return typeof s=="number"&&o===h.escape?String(s):o(s)};g.prototype.rawValue=function(e){return e[1]};g.prototype.getConfigTags=function(e){return C(e)?e:e&&typeof e=="object"?e.tags:void 0};g.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!C(e))return e.escape};var h={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(n){T.templateCache=n},get templateCache(){return T.templateCache}},T=new g;h.clearCache=function(){return T.clearCache()};h.parse=function(e,t){return T.parse(e,t)};h.render=function(e,t,r,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+pe(e)+'" was given as the first argument for mustache#render(template, view, partials)');return T.render(e,t,r,o)};h.escape=ve;h.Scanner=k;h.Context=S;h.Writer=g;class te{constructor(e,t){this.template=e,this.state=t,this.ast=h.parse(e)}getValue(){return this.value===void 0&&(this.value=h.render(this.template,this.state)),this.value}onChange(e){const t=[];for(const r of this.getUsedVariables().values())t.push(this.state.onVariableChange(r).subscribe(()=>{const o=h.render(this.template,this.state);o!==this.value&&(this.value=o,e(this.value))}));return{unsubscribe:()=>{for(const r of t)r.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,t){for(const r of e){const o=r[0],s=r[1],a=r[4];["name","&","#","^"].includes(o)&&t.add(s),a!==void 0&&typeof a!="string"&&this.recursiveGetUsedVariables(a,t)}}}async function Pe(){var n;const e=await Z();for(const t of e){const r=(n=t.properties)!==null&&n!==void 0?n:[];for(const o of r){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const s=new te(o.value,WA.state);if(s.isPureString())continue;const a=s.getValue();await $(t.name,o.name,a),s.onChange(async i=>{await $(t.name,o.name,i)})}}}async function Te(){var n;const e=await E();for(const[t,r]of e.entries())if(r.type!=="objectgroup"){const o=(n=r.properties)!==null&&n!==void 0?n:[];for(const s of o){if(s.type==="int"||s.type==="bool"||s.type==="object"||typeof s.value!="string")continue;const a=new te(s.value,WA.state);if(a.isPureString())continue;const i=a.getValue();q(t,s.name,i),a.onChange(l=>{q(t,s.name,l)})}}}async function $(n,e,t){console.log(n),(await WA.room.area.get(n)).setProperty(e,t)}function q(n,e,t){WA.room.setProperty(n,e,t),e==="visible"&&(t?WA.room.showLayer(n):WA.room.hideLayer(n))}const Ee="https://admin.workadventu.re/html";let I,z=0,O=0;function Y(n){if(WA.state[n.name]){let e=n.properties.mustGetString("openLayer");for(const t of e.split(`
`))WA.room.showLayer(t);e=n.properties.mustGetString("closeLayer");for(const t of e.split(`
`))WA.room.hideLayer(t)}else{let e=n.properties.mustGetString("openLayer");for(const t of e.split(`
`))WA.room.hideLayer(t);e=n.properties.mustGetString("closeLayer");for(const t of e.split(`
`))WA.room.showLayer(t)}}function ke(n){const e=n.properties.getString("openSound"),t=n.properties.getNumber("soundRadius");let r=1;if(t){const o=re(n.properties.mustGetString("openLayer").split(`
`));if(o>t)return;r=1-o/t}e&&WA.sound.loadSound(e).play({volume:r})}function Le(n){const e=n.properties.getString("closeSound"),t=n.properties.getNumber("soundRadius");let r=1;if(t){const o=re(n.properties.mustGetString("closeLayer").split(`
`));if(o>t)return;r=1-o/t}e&&WA.sound.loadSound(e).play({volume:r})}function ne(n){return n.map(e=>I.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function re(n){const e=ne(n),t=ee(e),r=((t.right-t.left)/2+t.left)*32,o=((t.bottom-t.top)/2+t.top)*32;return Math.sqrt(Math.pow(z-r,2)+Math.pow(O-o,2))}function Re(n){WA.state.onVariableChange(n.name).subscribe(()=>{WA.state[n.name]?ke(n):Le(n),Y(n)}),Y(n)}function K(n,e,t,r){const o=n.name;let s,a,i=!1;const l=t.getString("tag");let u=!0;l&&!WA.player.tags.includes(l)&&(u=!1);const f=!!l;function d(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=t.getString("closeTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,m()}})}function m(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=t.getString("openTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,d()}})}function L(){let c;if(n.type==="tilelayer")c=ee(ne(e.properties.mustGetString("closeLayer").split(`
`)));else{if(n.x===void 0||n.y===void 0||n.width===void 0||n.height===void 0)throw new Error(`Doorstep zone "${n.name}" is missing x, y, width or height`);c={top:n.y,left:n.x,right:n.x+n.width,bottom:n.y+n.height}}a=WA.room.website.create({name:"doorKeypad"+o,url:r+"/keypad.html#"+encodeURIComponent(o),position:{x:c.right*32,y:c.top*32,width:32*3,height:32*4},allowApi:!0})}function M(){a&&(WA.room.website.delete(a.name),a=void 0)}function p(){if(i=!0,t.getBoolean("autoOpen")&&u){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(f&&!u||!f)&&(t.getString("code")||t.getString("codeVariable"))){L();return}u&&(WA.state[e.name]?d():m())}function v(){i=!1,t.getBoolean("autoClose")&&(WA.state[e.name]=!1),s&&s.remove(),M()}n.type==="tilelayer"?(WA.room.onEnterLayer(o).subscribe(p),WA.room.onLeaveLayer(o).subscribe(v)):(WA.room.area.onEnter(o).subscribe(p),WA.room.area.onLeave(o).subscribe(v)),WA.state.onVariableChange(e.name).subscribe(()=>{i&&(!t.getBoolean("autoClose")&&WA.state[e.name]===!0&&d(),a&&WA.state[e.name]===!0&&M(),!t.getBoolean("autoOpen")&&WA.state[e.name]===!1&&m())})}function Ve(n){const e=n.properties.mustGetString("bellSound"),t=n.properties.getNumber("soundRadius");let r=1;if(t){const o=Math.sqrt(Math.pow(n.x-z,2)+Math.pow(n.y-O,2));if(o>t)return;r=1-o/t}WA.sound.loadSound(e).play({volume:r})}function Be(n){WA.state[n.name]===void 0&&(WA.state[n.name]=0),WA.state.onVariableChange(n.name).subscribe(()=>{WA.state[n.name]&&Ve(n)})}function X(n,e,t){let r;const o=e.getString("bellPopup");if(t.type==="tilelayer"){const s=t.name;WA.room.onEnterLayer(s).subscribe(()=>{var a;o?r=WA.ui.openPopup(o,"",[{label:(a=e.getString("bellButtonText"))!==null&&a!==void 0?a:"Ring",callback:()=>{WA.state[n]=WA.state[n]+1}}]):WA.state[n]=WA.state[n]+1}),WA.room.onLeaveLayer(s).subscribe(()=>{r&&(r.close(),r=void 0)})}else{const s=t.name;WA.room.area.onEnter(s).subscribe(()=>{var a;o?r=WA.ui.openPopup(o,"",[{label:(a=e.getString("bellButtonText"))!==null&&a!==void 0?a:"Ring",callback:()=>{WA.state[n]=WA.state[n]+1}}]):WA.state[n]=WA.state[n]+1}),WA.room.area.onLeave(s).subscribe(()=>{r&&(r.close(),r=void 0)})}}async function xe(n){n=n??Ee;const e=await ae();I=await E();for(const t of e.values())t.properties.get("door")&&Re(t),t.properties.get("bell")&&Be(t);for(const t of I.values()){const r=new W(t.properties),o=r.getString("doorVariable");if(o&&t.type==="tilelayer"){const a=e.get(o);if(a===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of layer "'+t.name+'"');K(t,a,r,n)}const s=r.getString("bellVariable");s&&t.type==="tilelayer"&&X(s,r,t)}for(const t of await Z()){const r=new W(t.properties),o=r.getString("doorVariable");if(o){const a=e.get(o);if(a===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of object "'+t.name+'"');K(t,a,r,n)}const s=r.getString("bellVariable");s&&X(s,r,t)}WA.player.onPlayerMove(t=>{z=t.x,O=t.y})}function je(n,e){const t=n.getString("bindVariable");if(t){const r=n.get("enterValue"),o=n.get("leaveValue"),s=n.getString("triggerMessage"),a=n.getString("tag");Ge(t,e,r,o,s,a)}}function Ge(n,e,t,r,o,s){s&&!WA.player.tags.includes(s)||(t!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{o||(WA.state[n]=t)}),r!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[n]=r}))}async function Ie(){const n=await E();for(const e of n.values()){const t=new W(e.properties);je(t,e.name)}}let H;async function _e(n){const e=await WA.room.getTiledMap();n=n??J,H=await E();const t=e.layers.find(r=>r.name==="configuration");if(t){const o=new W(t.properties).getString("tag");(!o||WA.player.tags.includes(o))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(n+"/configuration.html",!0)});for(const s of H.values()){const a=new W(s.properties),i=a.getString("openConfig");i&&s.type==="tilelayer"&&ze(i.split(","),s.name,a)}}}function ze(n,e,t){let r;const o=t.getString("openConfigAdminTag");let s=!0;o&&!WA.player.tags.includes(o)&&(s=!1);function a(){var l;r&&r.remove(),r=WA.ui.displayActionMessage({message:(l=t.getString("openConfigTriggerMessage"))!==null&&l!==void 0?l:"Press SPACE or touch here to configure",callback:()=>U(n)})}function i(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const l=t.getString("openConfigTrigger");s&&(l&&l==="onaction"?a():U(n))}),WA.room.onLeaveLayer(e).subscribe(()=>{r&&r.remove(),i()})}function Oe(){return WA.onInit().then(()=>{xe().catch(n=>console.error(n)),Ie().catch(n=>console.error(n)),_e().catch(n=>console.error(n)),Te().catch(n=>console.error(n)),Pe().catch(n=>console.error(n))}).catch(n=>console.error(n))}console.log("Script started successfully");let w={x:0,y:0},V="down",G;WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("CA MARCHE");let n;WA.state.onVariableChange("Cgu").subscribe(t=>{t&&(n.close(),WA.state.saveVariable("Cgu",!1))}),G=WA.ui.website.open({url:"./src/cgu/index.html",position:{vertical:"top",horizontal:"middle"},size:{height:"30vh",width:"50vw"},margin:{top:"10vh"},allowApi:!0}).then(t=>{console.log("Calendrier ouvert avec succès"),n=t}),window.addEventListener("message",t=>{t.data.action==="closeCGU"&&G&&(G.close(),console.log("CGU window closed"))}),WA.player.onPlayerMove(t=>{w={x:t.x,y:t.y},V=t.direction}),WA.room.area.onEnter("jitsiMeetingRoom").subscribe(async()=>{console.log(`The player ${WA.player.name} has entered the zone.`);const t=WA.player.tags;if(console.log("Player tags:",t),!t.includes("administrateur")&&!t.includes("VIP_neurologie")){console.log('Access denied to the jitsiMeetingRoom. You do not have the "admin" role.');let r=w.x,o=w.y;switch(V){case"down":o-=1;break;case"up":o+=1;break;case"left":r+=1;break;case"right":r-=1;break}await WA.player.teleport(r,o),WA.ui.displayActionMessage({message:"Vous n'avez pas le role nécéssaire pour accéder à la zone neurologie, si le problème persiste veuillez contacter un administrateur",callback:()=>console.log("The player has confirmed the message."),type:"warning"})}else console.log("Welcome to the jitsiMeetingRoom!")}),WA.room.area.onEnter("book").subscribe(async()=>{console.log(`The player ${WA.player.name} has entered the zone.`);const t=WA.player.tags;console.log("Player tags:",t),WA.ui.modal.openModal({title:"Bibliothèque virtuelle",src:"http://154.56.57.33/",allow:"fullscreen",position:"right",allowApi:!0})}),WA.room.area.onEnter("jitsiChillZone").subscribe(async()=>{console.log(`The player ${WA.player.name} has entered the zone.`);const t=WA.player.tags;if(console.log("Player tags:",t),!t.includes("administrateur")&&!t.includes("VIP_neurologie")){console.log('Access denied to the jitsiMeetingRoom. You do not have the "admin" role.');let r=w.x,o=w.y;switch(V){case"down":o-=1;break;case"up":o+=1;break;case"left":r+=1;break;case"right":r-=1;break}await WA.player.teleport(r,o),WA.ui.displayActionMessage({message:"Vous n'avez pas le role nécéssaire pour accéder à la zone neurologie, si le problème persiste veuillez contacter un administrateur",callback:()=>console.log("The player has confirmed the message."),type:"warning"})}else console.log("Welcome to the jitsiMeetingRoom!")}),WA.room.area.onEnter("from-conference").subscribe(async()=>{console.log(`The player ${WA.player.name} has entered the zone.`);const t=WA.player.tags;if(console.log("Player tags:",t),!t.includes("administrateur")&&!t.includes("VIP_neurologie")){console.log('Access denied to the jitsiMeetingRoom. You do not have the "admin" role.');let r=w.x,o=w.y;switch(V){case"down":o-=1;break;case"up":o+=1;break;case"left":r+=1;break;case"right":r-=1;break}await WA.player.teleport(r,o),WA.ui.displayActionMessage({message:"Vous n'avez pas le role nécéssaire pour accéder à la zone neurologie, si le problème persiste veuillez contacter un administrateur",callback:()=>console.log("The player has confirmed the message."),type:"warning"})}else console.log("Welcome to the jitsiMeetingRoom!")}),WA.ui.actionBar.addButton({id:"register-btn",type:"action",imageSrc:"http://localhost:5173/tilesets/iconsheesh.png",toolTip:"Register",callback:t=>{console.log("Button clicked",t),WA.ui.modal.openModal({title:"ash",src:"http://localhost:5173/src/introduction.html",allow:"fullscreen",position:"center",allowApi:!0})}});const e=WA.player.tags;e.includes("VIP_oncologie")?WA.player.setOutlineColor(150,131,236):e.includes("VIP_cardiologie")?WA.player.setOutlineColor(180,8,8):e.includes("VIP_neurologie")&&WA.player.setOutlineColor(28,6,162),Oe().then(()=>{console.log("Scripting API Extra ready")}).catch(t=>console.error(t))}).catch(n=>console.error(n));
//# sourceMappingURL=main-dba6ca14.js.map
