const e="haval-h3-dashboard-card",t="Haval H3 Dashboard",s="1.1.0";function i(e,t,s,i){var o,n=arguments.length,r=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,s,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,s,r):o(t,s))||r);return n>3&&r&&Object.defineProperty(t,s,r),r}"function"==typeof SuppressedError&&SuppressedError;const o=globalThis,n=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),a=new WeakMap;let l=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(n&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&a.set(t,e))}return e}toString(){return this.cssText}};const c=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1],e[0]);return new l(s,e,r)},d=n?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new l("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:h,defineProperty:p,getOwnPropertyDescriptor:u,getOwnPropertyNames:f,getOwnPropertySymbols:g,getPrototypeOf:_}=Object,v=globalThis,m=v.trustedTypes,b=m?m.emptyScript:"",y=v.reactiveElementPolyfillSupport,$=(e,t)=>e,w={toAttribute(e,t){switch(t){case Boolean:e=e?b:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},x=(e,t)=>!h(e,t),k={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let E=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=k){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);void 0!==i&&p(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:o}=u(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const n=i?.call(this);o?.call(this,t),this.requestUpdate(e,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??k}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const e=_(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const e=this.properties,t=[...f(e),...g(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(d(e))}else void 0!==e&&t.push(d(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(n)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const s of t){const t=document.createElement("style"),i=o.litNonce;void 0!==i&&t.setAttribute("nonce",i),t.textContent=s.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:w).toAttribute(t,s.type);this._$Em=e,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=s.getPropertyOptions(i),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:w;this._$Em=i;const n=o.fromAttribute(t,e.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(e,t,s,i=!1,o){if(void 0!==e){const n=this.constructor;if(!1===i&&(o=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??x)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==o||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,s,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[$("elementProperties")]=new Map,E[$("finalized")]=new Map,y?.({ReactiveElement:E}),(v.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,S=e=>e,C=A.trustedTypes,T=C?C.createPolicy("lit-html",{createHTML:e=>e}):void 0,N="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+P,U=`<${O}>`,M=document,R=()=>M.createComment(""),I=e=>null===e||"object"!=typeof e&&"function"!=typeof e,L=Array.isArray,H="[ \t\n\f\r]",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,D=/>/g,q=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,V=/"/g,G=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),W=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),K=new WeakMap,Y=M.createTreeWalker(M,129);function Q(e,t){if(!L(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==T?T.createHTML(t):t}const Z=(e,t)=>{const s=e.length-1,i=[];let o,n=2===t?"<svg>":3===t?"<math>":"",r=j;for(let t=0;t<s;t++){const s=e[t];let a,l,c=-1,d=0;for(;d<s.length&&(r.lastIndex=d,l=r.exec(s),null!==l);)d=r.lastIndex,r===j?"!--"===l[1]?r=z:void 0!==l[1]?r=D:void 0!==l[2]?(G.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=q):void 0!==l[3]&&(r=q):r===q?">"===l[0]?(r=o??j,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?q:'"'===l[3]?V:F):r===V||r===F?r=q:r===z||r===D?r=j:(r=q,o=void 0);const h=r===q&&e[t+1].startsWith("/>")?" ":"";n+=r===j?s+U:c>=0?(i.push(a),s.slice(0,c)+N+s.slice(c)+P+h):s+P+(-2===c?t:h)}return[Q(e,n+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class X{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let o=0,n=0;const r=e.length-1,a=this.parts,[l,c]=Z(e,t);if(this.el=X.createElement(l,s),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=Y.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(N)){const t=c[n++],s=i.getAttribute(e).split(P),r=/([.?@])?(.*)/.exec(t);a.push({type:1,index:o,name:r[2],strings:s,ctor:"."===r[1]?oe:"?"===r[1]?ne:"@"===r[1]?re:ie}),i.removeAttribute(e)}else e.startsWith(P)&&(a.push({type:6,index:o}),i.removeAttribute(e));if(G.test(i.tagName)){const e=i.textContent.split(P),t=e.length-1;if(t>0){i.textContent=C?C.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],R()),Y.nextNode(),a.push({type:2,index:++o});i.append(e[t],R())}}}else if(8===i.nodeType)if(i.data===O)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=i.data.indexOf(P,e+1));)a.push({type:7,index:o}),e+=P.length-1}o++}}static createElement(e,t){const s=M.createElement("template");return s.innerHTML=e,s}}function ee(e,t,s=e,i){if(t===W)return t;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const n=I(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(t=ee(e,o._$AS(e,t.values),o,i)),t}class te{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??M).importNode(t,!0);Y.currentNode=i;let o=Y.nextNode(),n=0,r=0,a=s[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new se(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new ae(o,this,e)),this._$AV.push(t),a=s[++r]}n!==a?.index&&(o=Y.nextNode(),n++)}return Y.currentNode=M,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class se{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ee(this,e,t),I(e)?e===J||null==e||""===e?(this._$AH!==J&&this._$AR(),this._$AH=J):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>L(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==J&&I(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=X.createElement(Q(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new te(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new X(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const o of e)i===t.length?t.push(s=new se(this.O(R()),this.O(R()),this,this.options)):s=t[i],s._$AI(o),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=S(e).nextSibling;S(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,o){this.type=1,this._$AH=J,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=J}_$AI(e,t=this,s,i){const o=this.strings;let n=!1;if(void 0===o)e=ee(this,e,t,0),n=!I(e)||e!==this._$AH&&e!==W,n&&(this._$AH=e);else{const i=e;let r,a;for(e=o[0],r=0;r<o.length-1;r++)a=ee(this,i[s+r],t,r),a===W&&(a=this._$AH[r]),n||=!I(a)||a!==this._$AH[r],a===J?e=J:e!==J&&(e+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!i&&this.j(e)}j(e){e===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class oe extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===J?void 0:e}}class ne extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==J)}}class re extends ie{constructor(e,t,s,i,o){super(e,t,s,i,o),this.type=5}_$AI(e,t=this){if((e=ee(this,e,t,0)??J)===W)return;const s=this._$AH,i=e===J&&s!==J||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==J&&(s===J||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){ee(this,e)}}const le=A.litHtmlPolyfillSupport;le?.(X,se),(A.litHtmlVersions??=[]).push("3.3.3");const ce=globalThis;class de extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const i=s?.renderBefore??t;let o=i._$litPart$;if(void 0===o){const e=s?.renderBefore??null;i._$litPart$=o=new se(t.insertBefore(R(),e),e,void 0,s??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}de._$litElement$=!0,de.finalized=!0,ce.litElementHydrateSupport?.({LitElement:de});const he=ce.litElementPolyfillSupport;he?.({LitElement:de}),(ce.litElementVersions??=[]).push("4.2.2");const pe={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:x},ue=(e=pe,t,s)=>{const{kind:i,metadata:o}=s;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),n.set(s.name,e),"accessor"===i){const{name:i}=s;return{set(s){const o=t.get.call(this);t.set.call(this,s),this.requestUpdate(i,o,e,!0,s)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];t.call(this,s),this.requestUpdate(i,o,e,!0,s)}}throw Error("Unsupported decorator location: "+i)};function fe(e){return(t,s)=>"object"==typeof s?ue(e,t,s):((e,t,s)=>{const i=t.hasOwnProperty(s);return t.constructor.createProperty(s,e),i?Object.getOwnPropertyDescriptor(t,s):void 0})(e,t,s)}const ge={front_left_wheel:{top:68,left:8},front_right_wheel:{top:68,left:52},rear_left_wheel:{top:72,left:3},rear_right_wheel:{top:72,left:57},front_left_wheel_secondary:{top:74,left:8},front_right_wheel_secondary:{top:74,left:52},rear_left_wheel_secondary:{top:78,left:3},rear_right_wheel_secondary:{top:78,left:57},hood:{top:20,left:28},engine:{top:28,left:22},roof:{top:2,left:30},windshield:{top:8,left:28},dashboard:{top:35,left:18},center_console:{top:42,left:42},fuel_area:{top:65,left:35},battery_area:{top:55,left:80},trunk:{top:80,left:42},front_center:{top:15,left:40},rear_center:{top:70,left:42},info_block:{top:50,left:78},door_front_left:{top:48,left:5},door_front_right:{top:48,left:55},door_back_left:{top:65,left:5},door_back_right:{top:65,left:55}},_e={front:ge,side_front_right:{front_left_wheel:{top:68,left:55},front_right_wheel:{top:66,left:72},rear_left_wheel:{top:72,left:18},rear_right_wheel:{top:70,left:35},front_left_wheel_secondary:{top:74,left:55},front_right_wheel_secondary:{top:72,left:72},rear_left_wheel_secondary:{top:78,left:18},rear_right_wheel_secondary:{top:76,left:35},hood:{top:20,left:72},engine:{top:28,left:68},roof:{top:2,left:42},windshield:{top:8,left:60},dashboard:{top:35,left:65},center_console:{top:42,left:45},fuel_area:{top:60,left:25},battery_area:{top:48,left:72},trunk:{top:76,left:8},front_center:{top:15,left:75},rear_center:{top:68,left:12},info_block:{top:50,left:75},door_front_left:{top:38,left:38},door_front_right:{top:38,left:58},door_back_left:{top:52,left:20},door_back_right:{top:52,left:38}}};const ve={show_icons:!0,show_labels:!0,show_units:!0,hide_unavailable:!0,hide_disabled:!0,status_color_rules:!0,theme_mode:"auto",unavailable_text:"—",show_entity_name_on_hover:!1,debug_positions:!1};function me(e){const t={...ve,...e.display||{}},s={};if(e.entities)for(const[t,i]of Object.entries(e.entities))i&&(s[t]=be(i));return{type:e.type||"custom:haval-h3-dashboard-card",title:e.title||"Haval H3",vehicle_image:e.vehicle_image||"/local/haval_h3_white_sunroof.png",vehicle:{name:e.vehicle?.name||"Haval H3",show_default_image:e.vehicle?.show_default_image??!0,image_layout:e.vehicle?.image_layout||"front"},layout:(o=e.layout,{left_width:o?.left_width??50,right_width:o?.right_width??50}),map:(i=e.map,{device_tracker:i?.device_tracker,latitude_entity:i?.latitude_entity,longitude_entity:i?.longitude_entity,speed_entity:i?.speed_entity,course_entity:i?.course_entity,updated_entity:i?.updated_entity,zoom:i?.zoom??15,show_accuracy:i?.show_accuracy??!1,dark_mode:i?.dark_mode}),entities:s,display:t};var i,o}function be(e){return{entity:e.entity,enabled:e.enabled??!0,label:e.label,icon:e.icon,unit:e.unit,position:e.position,custom_position:e.custom_position,precision:e.precision,hide_unavailable:e.hide_unavailable,color_rules:e.color_rules}}function ye(e,t,s){const i={config:t,state:null,value:null,isUnavailable:!0};if(!t.entity||!t.enabled)return i;if(!e||!e.states)return i;const o=e.states[t.entity];if(!o)return i;i.state=o;const n=o.state,r="unavailable"===n||"unknown"===n||null==n;return i.isUnavailable=r,r||(i.value=n),i}function $e(e,t){if(null===e)return!1;const s=(t.state,t.state),i=t.operator||"eq";if("string"==typeof s&&"string"==typeof e)switch(i){case"eq":return e===s;case"neq":return e!==s;default:return!1}const o=Number(e),n=Number(s);if(isNaN(o)||isNaN(n))return!1;switch(i){case"eq":return o===n;case"neq":return o!==n;case"gt":return o>n;case"gte":return o>=n;case"lt":return o<n;case"lte":return o<=n;default:return!1}}function we(e,t){return!!e.config.enabled&&(!!e.config.entity&&(!e.isUnavailable||!t.hide_unavailable))}function xe(e){if(e.custom_position)return{...e.custom_position};const t=(s=e.imageLayout)&&_e[s]?_e[s]:ge;var s;return e.position&&t[e.position]?{...t[e.position]}:null}function ke(e){return Math.max(0,Math.min(100,e))}class Ee extends de{render(){if(!we(this.entity,this.display))return B``;const e=xe({...this.entityConfig,imageLayout:this.cardConfig?.vehicle?.image_layout});if(!e)return B``;const t=function(e){const t=[];return void 0!==e.top&&t.push(`top: ${ke(e.top)}%`),void 0!==e.left&&t.push(`left: ${ke(e.left)}%`),void 0!==e.bottom&&t.push(`bottom: ${ke(e.bottom)}%`),void 0!==e.right&&t.push(`right: ${ke(e.right)}%`),t.join("; ")}(e),s=function(e,t,s){if(e.isUnavailable)return"var(--state-unavailable-color, #a0a0a0)";if(s.status_color_rules&&t.color_rules)for(const s of t.color_rules)if($e(e.value,s))return s.color;if(!e.state)return"var(--primary-text-color, #000)";const i=e.state,o=t.entity?.split(".")[0];if("binary_sensor"===o)return"on"===i.state||"open"===i.state?"var(--error-color, #f44336)":"var(--success-color, #4caf50)";return"var(--primary-text-color, #000)"}(this.entity,this.entityConfig,this.display),i=function(e,t){if(t.icon)return t.icon;if(!e.state)return"mdi:help-circle";const s=e.state,i=t.entity?.split(".")[0];if("binary_sensor"===i){const e="on"===s.state||"open"===s.state;switch(s.attributes?.device_class){case"door":return e?"mdi:door-open":"mdi:door-closed";case"opening":return e?"mdi:car-door":"mdi:car-door-lock";case"power":return e?"mdi:power-on":"mdi:power-off";case"connectivity":return e?"mdi:wifi":"mdi:wifi-off";default:return e?"mdi:check-circle":"mdi:close-circle"}}return s.attributes?.icon||"mdi:eye"}(this.entity,this.entityConfig),o=function(e,t,s){if(e.isUnavailable)return s.unavailable_text||"—";if(null===e.value||void 0===e.value)return s.unavailable_text||"—";const i=e.value;if("temperature"===e.state?.attributes?.device_class||"number"==typeof i||!isNaN(Number(i))){const e=Number(i);return void 0!==t.precision?e.toFixed(t.precision):String(e)}return String(i)}(this.entity,this.entityConfig,this.display),n="on"===this.entity.state?.state||"open"===this.entity.state?.state,r="var(--error-color, #f44336)",a=this.display.debug_positions;return B`
      <div style="${t}">
        ${a?B`<div class="debug-dot"></div>`:""}
        <div class="badge" style="${n?`border-color: ${r}; box-shadow: 0 0 12px ${r}40;`:""}${a?" opacity: 0.4;":""}">
          ${this.display.show_entity_name_on_hover?B`<div class="tooltip">${this.entityConfig.label||this.entityConfig.entity}</div>`:""}
          ${this.display.show_icons?B`<span class="icon" style="color: ${s}">${i}</span>`:""}
          ${this.display.show_labels&&this.entityConfig.label?B`<span class="label">${this.entityConfig.label}</span>`:""}
          <span class="value" style="color: ${s}">${o}</span>
          ${this.display.show_units&&this.entityConfig.unit?B`<span class="unit">${this.entityConfig.unit}</span>`:""}
        </div>
      </div>
    `}}Ee.styles=c`
    :host {
      position: absolute;
      pointer-events: auto;
      z-index: 10;
    }
    .badge {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: 12px;
      background: var(--overlay-badge-bg, rgba(0, 0, 0, 0.65));
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      font-size: 11px;
      line-height: 1.4;
      white-space: nowrap;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      border: 1px solid var(--overlay-badge-border, rgba(255, 255, 255, 0.1));
      transform: translate(-50%, -50%);
    }
    .badge:hover {
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
      z-index: 20;
    }
    .icon {
      display: flex;
      align-items: center;
      font-size: 14px;
      width: 16px;
      height: 16px;
    }
    .icon ha-icon {
      width: 14px;
      height: 14px;
    }
    .label {
      color: var(--overlay-badge-label, rgba(255, 255, 255, 0.7));
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .value {
      font-weight: 600;
      font-size: 12px;
    }
    .unit {
      font-size: 9px;
      opacity: 0.7;
    }
    .tooltip {
      display: none;
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      background: var(--overlay-tooltip-bg, rgba(0, 0, 0, 0.85));
      color: #fff;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 10px;
      white-space: nowrap;
      pointer-events: none;
    }
    :host(:hover) .tooltip {
      display: block;
    }
    .debug-dot {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #00ff00;
      border: 2px solid #fff;
      transform: translate(-50%, -50%);
      z-index: 5;
      box-shadow: 0 0 6px rgba(0, 255, 0, 0.8);
      pointer-events: none;
    }
  `,i([fe({attribute:!1})],Ee.prototype,"entity",void 0),i([fe({attribute:!1})],Ee.prototype,"entityConfig",void 0),i([fe({attribute:!1})],Ee.prototype,"display",void 0),i([fe({attribute:!1})],Ee.prototype,"cardConfig",void 0),customElements.define("overlay-badge",Ee);class Ae extends de{getResolvedEntities(){const e=me(this.config),t=e.entities,s=e.display;if(!t)return[];const i=[];for(const[e,o]of Object.entries(t)){const e=ye(this.hass,o);we(e,s)&&i.push(e)}return i}render(){const e=!1!==this.config.vehicle?.show_default_image,t=this.config.vehicle_image||"",s=e&&t,i=this.config.display?.debug_positions,o=[];if(i)for(let e=0;e<=10;e++){const t=10*e;o.push(B`<div class="debug-grid-line-h" style="top: ${t}%"></div>`,B`<div class="debug-grid-line-v" style="left: ${t}%"></div>`)}return B`
      ${this.config.vehicle?.name?B`<div class="vehicle-title">${this.config.vehicle.name}</div>`:""}
      <div class="image-container">
        ${s?B`
          <img class="vehicle-img" src="${t}" alt="${this.config.vehicle?.name||"Vehicle"}" 
               @error=${e=>{e.target.style.display="none"}} />
          <div class="overlay-container">
            ${i?B`<div class="debug-grid">${o}</div>`:""}
            ${this.getResolvedEntities().map(e=>B`
              <overlay-badge
                .entity=${e}
                .entityConfig=${e.config}
                .display=${this.config.display||{}}
                .cardConfig=${this.config}
              ></overlay-badge>
            `)}
          </div>
        `:B`
          <div class="no-image">
            <ha-icon icon="mdi:car-side"></ha-icon>
            <span>Vehicle image not configured.<br>Set <code>vehicle_image</code> in card config.</span>
          </div>
        `}
      </div>
    `}}Ae.styles=c`
    :host {
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      border-radius: 16px;
      background: var(--vehicle-panel-bg, transparent);
      min-height: 400px;
    }
    .image-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      border-radius: 12px;
    }
      .vehicle-img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      display: block;
      pointer-events: none;
      user-select: none;
      -webkit-user-drag: none;
    }
    .overlay-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .overlay-container > * {
      pointer-events: auto;
    }
    .debug-grid {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      opacity: 0.3;
    }
    .debug-grid-line-h,
    .debug-grid-line-v {
      position: absolute;
      background: rgba(255, 0, 0, 0.5);
    }
    .debug-grid-line-h {
      left: 0;
      right: 0;
      height: 1px;
    }
    .debug-grid-line-v {
      top: 0;
      bottom: 0;
      width: 1px;
    }
    .no-image {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: var(--secondary-text-color, #888);
      font-size: 14px;
      flex-direction: column;
      gap: 12px;
      padding: 20px;
      text-align: center;
    }
    .no-image ha-icon {
      width: 48px;
      height: 48px;
      --mdc-icon-size: 48px;
    }
    .vehicle-title {
      text-align: center;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text-color, #fff);
      background: var(--card-background-color, transparent);
      border-radius: 8px;
      margin-bottom: 4px;
    }
  `,i([fe({attribute:!1})],Ae.prototype,"config",void 0),i([fe({attribute:!1})],Ae.prototype,"hass",void 0),customElements.define("vehicle-panel",Ae);class Se extends de{constructor(){super(...arguments),this.title=""}getTrackerEntityId(){return this.mapConfig.device_tracker||null}getLatLon(){const e=this.getTrackerEntityId();if(e&&this.hass.states[e]){const t=this.hass.states[e],s=t.attributes?.latitude,i=t.attributes?.longitude;if(null!=s&&null!=i)return{lat:s,lon:i}}const t=this.mapConfig.latitude_entity,s=this.mapConfig.longitude_entity;if(t&&s){const e=this.hass.states[t],i=this.hass.states[s];if(e&&i){const t=parseFloat(e.state),s=parseFloat(i.state);if(!isNaN(t)&&!isNaN(s))return{lat:t,lon:s}}}return null}getSpeed(){if(this.mapConfig.speed_entity&&this.hass.states[this.mapConfig.speed_entity])return this.hass.states[this.mapConfig.speed_entity].state;const e=this.getTrackerEntityId();if(e&&this.hass.states[e]){const t=this.hass.states[e].attributes?.speed;if(null!=t)return String(t)}return null}getCourse(){if(this.mapConfig.course_entity&&this.hass.states[this.mapConfig.course_entity])return this.hass.states[this.mapConfig.course_entity].state;const e=this.getTrackerEntityId();if(e&&this.hass.states[e]){const t=this.hass.states[e].attributes?.course;if(null!=t)return String(t)}return null}getLastUpdate(){if(this.mapConfig.updated_entity&&this.hass.states[this.mapConfig.updated_entity]){const e=this.hass.states[this.mapConfig.updated_entity];if("timestamp"===e.attributes?.device_class){const t=new Date(e.state);return isNaN(t.getTime())?e.state:t.toLocaleTimeString()}return e.state}return null}hasMapData(){return!!this.getTrackerEntityId()||!(!this.mapConfig.latitude_entity||!this.mapConfig.longitude_entity)}render(){const e=this.hasMapData(),t=this.getLatLon(),s=this.getSpeed(),i=this.getCourse(),o=this.getLastUpdate(),n=[],r=this.getTrackerEntityId();return r&&n.push(r),this.mapConfig.latitude_entity&&this.mapConfig.longitude_entity&&n.push(this.mapConfig.latitude_entity,this.mapConfig.longitude_entity),B`
      ${this.title?B`<div class="map-title">${this.title}</div>`:""}
      <div class="map-wrapper">
        <div class="map-container">
          ${e&&t?B`
            <ha-map
              .entities=${n}
              .hass=${this.hass}
              ?auto-fit=${!1}
              zoom=${this.mapConfig.zoom||15}
            ></ha-map>
          `:B`
            <div class="placeholder">
              <ha-icon icon="mdi:map-marker-off"></ha-icon>
              <div>
                ${e?B`Location unknown.<br>Waiting for GPS data...`:B`No map data configured.<br>Configure <code>device_tracker</code> or <code>latitude_entity</code> + <code>longitude_entity</code>.`}
              </div>
            </div>
          `}
        </div>
        ${e?B`
          <div class="summary-panel">
            ${null!=s?B`
              <div class="summary-item">
                <ha-icon icon="mdi:speedometer"></ha-icon>
                <span class="summary-label">Speed</span>
                <span class="summary-value">${s} km/h</span>
              </div>
            `:""}
            ${null!=i?B`
              <div class="summary-item">
                <ha-icon icon="mdi:compass"></ha-icon>
                <span class="summary-label">Course</span>
                <span class="summary-value">${i}°</span>
              </div>
            `:""}
            ${null!=o?B`
              <div class="summary-item">
                <ha-icon icon="mdi:clock-outline"></ha-icon>
                <span class="summary-label">Updated</span>
                <span class="summary-value">${o}</span>
              </div>
            `:""}
            ${t?B`
              <div class="summary-item">
                <ha-icon icon="mdi:crosshairs-gps"></ha-icon>
                <span class="summary-label">GPS</span>
                <span class="summary-value">${t.lat.toFixed(4)}, ${t.lon.toFixed(4)}</span>
              </div>
            `:""}
          </div>
        `:""}
      </div>
    `}}Se.styles=c`
    :host {
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      border-radius: 16px;
      min-height: 400px;
    }
    .map-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      border-radius: 12px;
      overflow: hidden;
      background: var(--map-panel-bg, var(--card-background-color, #1a1a2e));
      position: relative;
    }
    .map-container {
      flex: 1;
      position: relative;
      min-height: 300px;
    }
    .map-container ha-map {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .summary-panel {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 8px 12px;
      background: var(--map-summary-bg, rgba(0, 0, 0, 0.3));
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-radius: 0 0 12px 12px;
    }
    .summary-item {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: var(--primary-text-color, #fff);
      padding: 4px 10px;
      border-radius: 8px;
      background: var(--summary-chip-bg, rgba(255, 255, 255, 0.08));
    }
    .summary-item ha-icon {
      width: 14px;
      height: 14px;
      --mdc-icon-size: 14px;
    }
    .summary-label {
      opacity: 0.6;
    }
    .summary-value {
      font-weight: 600;
    }
    .placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--secondary-text-color, #888);
      gap: 12px;
      padding: 40px;
      text-align: center;
    }
    .placeholder ha-icon {
      width: 48px;
      height: 48px;
      --mdc-icon-size: 48px;
    }
    .placeholder code {
      background: rgba(255, 255, 255, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
    }
    .map-title {
      text-align: center;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text-color, #fff);
      background: var(--card-background-color, transparent);
      border-radius: 8px;
      margin-bottom: 4px;
    }
  `,i([fe({attribute:!1})],Se.prototype,"mapConfig",void 0),i([fe({attribute:!1})],Se.prototype,"hass",void 0),i([fe({attribute:!1})],Se.prototype,"title",void 0),customElements.define("map-panel",Se);class Ce extends de{constructor(){super(...arguments),this.error=!1,this.errorMessage=""}static getConfigElement(){return"haval-h3-dashboard-editor"}static getStubConfig(){return{title:"Haval H3",vehicle_image:"/local/haval_h3_white_sunroof.png",layout:{left_width:50,right_width:50},map:{device_tracker:""},entities:{},display:{show_icons:!0,show_labels:!0,show_units:!0,hide_unavailable:!0,hide_disabled:!0,status_color_rules:!0,theme_mode:"auto"}}}setConfig(t){if(!t)throw new Error("Invalid configuration");try{this.config=me(t);const s=function(e){const t=[];return e.entities&&0!==Object.keys(e.entities).length||t.push("No entities configured — card will display as empty"),e.map?.device_tracker||e.map?.latitude_entity||t.push("No device_tracker or lat/lon entities configured — map will not show location"),t}(this.config);s.length>0&&Promise.resolve().then(function(){return rt}).then(()=>{console.warn(`[${e}] ${s.join("; ")}`)}),this.error=!1}catch(e){this.error=!0,this.errorMessage=e instanceof Error?e.message:"Unknown error"}}getCardSize(){return 5}render(){if(this.error)return B`<div class="error">Configuration error: ${this.errorMessage}</div>`;const e=this.config.layout?.left_width??50,t=this.config.layout?.right_width??50;return B`
      <div class="card-container">
        ${this.config.title?B`<div class="card-title">${this.config.title}</div>`:""}
        <div class="card-content">
          <div class="left-panel" style="flex: ${e}; max-width: ${e}%">
            <vehicle-panel
              .config=${this.config}
              .hass=${this.hass}
            ></vehicle-panel>
          </div>
          <div class="right-panel" style="flex: ${t}; max-width: ${t}%">
            <map-panel
              .mapConfig=${this.config.map||{}}
              .hass=${this.hass}
              .title=${"Location"}
            ></map-panel>
          </div>
        </div>
      </div>
    `}}Ce.styles=c`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    }
    .card-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 12px;
      box-sizing: border-box;
      gap: 12px;
    }
    .card-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--primary-text-color, #fff);
      padding: 0 4px;
      margin: 0;
      letter-spacing: -0.3px;
    }
    .card-content {
      display: flex;
      flex-direction: row;
      flex: 1;
      gap: 12px;
      min-height: 0;
      overflow: hidden;
    }
    .left-panel {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      display: flex;
    }
    .right-panel {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      display: flex;
    }
    .error {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 200px;
      color: var(--error-color, #f44336);
      background: rgba(244, 67, 54, 0.1);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      border: 1px solid rgba(244, 67, 54, 0.3);
    }

    @media (max-width: 768px) {
      .card-content {
        flex-direction: column;
      }
      .left-panel, .right-panel {
        flex: none;
        height: 50%;
      }
    }

    @media (max-height: 500px) {
      .card-container {
        padding: 4px;
        gap: 4px;
      }
    }
  `,i([fe({attribute:!1})],Ce.prototype,"hass",void 0),i([fe({attribute:!1})],Ce.prototype,"config",void 0),i([fe({type:Boolean})],Ce.prototype,"error",void 0),i([fe({type:String})],Ce.prototype,"errorMessage",void 0),customElements.define(e,Ce);class Te extends de{setConfig(e){this.config=e}_valueChanged(){const e=new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0});this.dispatchEvent(e)}_updateField(e,t){const s=e.split(".");let i=this.config;for(let e=0;e<s.length-1;e++)i[s[e]]||(i[s[e]]={}),i=i[s[e]];i[s[s.length-1]]=t,this._valueChanged()}render(){return this.config?B`
      <div class="editor-section">
        <h3>General</h3>
        <div class="field-row">
          <div class="field">
            <label class="field-label">Title</label>
            <input
              class="field-input"
              .value=${this.config.title||""}
              @input=${e=>this._updateField("title",e.target.value)}
              placeholder="Haval H3"
            />
          </div>
          <div class="field">
            <label class="field-label">Vehicle Image Path</label>
            <input
              class="field-input"
              .value=${this.config.vehicle_image||""}
              @input=${e=>this._updateField("vehicle_image",e.target.value)}
              placeholder="/local/haval_h3_white_sunroof.png"
            />
          </div>
        </div>
      </div>

      <div class="editor-section">
        <h3>Map</h3>
        <div class="field-row">
          <div class="field">
            <label class="field-label">Device Tracker Entity</label>
            <input
              class="field-input"
              .value=${this.config.map?.device_tracker||""}
              @input=${e=>this._updateField("map.device_tracker",e.target.value)}
              placeholder="device_tracker.cesar_smart_vehicle"
            />
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label class="field-label">Speed Entity</label>
            <input
              class="field-input"
              .value=${this.config.map?.speed_entity||""}
              @input=${e=>this._updateField("map.speed_entity",e.target.value)}
              placeholder="sensor.location_speed"
            />
          </div>
          <div class="field">
            <label class="field-label">Last Updated Entity</label>
            <input
              class="field-input"
              .value=${this.config.map?.updated_entity||""}
              @input=${e=>this._updateField("map.updated_entity",e.target.value)}
              placeholder="sensor.last_update"
            />
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label class="field-label">Latitude Entity (alt)</label>
            <input
              class="field-input"
              .value=${this.config.map?.latitude_entity||""}
              @input=${e=>this._updateField("map.latitude_entity",e.target.value)}
              placeholder="sensor.gwm_ru_latitude"
            />
          </div>
          <div class="field">
            <label class="field-label">Longitude Entity (alt)</label>
            <input
              class="field-input"
              .value=${this.config.map?.longitude_entity||""}
              @input=${e=>this._updateField("map.longitude_entity",e.target.value)}
              placeholder="sensor.gwm_ru_longitude"
            />
          </div>
        </div>
      </div>

      <div class="editor-section">
        <h3>Display</h3>
        <div class="checkbox-row">
          <input
            type="checkbox"
            ?checked=${!1!==this.config.display?.show_icons}
            @change=${e=>this._updateField("display.show_icons",e.target.checked)}
            id="show_icons"
          />
          <label for="show_icons">Show Icons</label>
        </div>
        <div class="checkbox-row">
          <input
            type="checkbox"
            ?checked=${!1!==this.config.display?.show_labels}
            @change=${e=>this._updateField("display.show_labels",e.target.checked)}
            id="show_labels"
          />
          <label for="show_labels">Show Labels</label>
        </div>
        <div class="checkbox-row">
          <input
            type="checkbox"
            ?checked=${!1!==this.config.display?.show_units}
            @change=${e=>this._updateField("display.show_units",e.target.checked)}
            id="show_units"
          />
          <label for="show_units">Show Units</label>
        </div>
        <div class="checkbox-row">
          <input
            type="checkbox"
            ?checked=${!1!==this.config.display?.hide_unavailable}
            @change=${e=>this._updateField("display.hide_unavailable",e.target.checked)}
            id="hide_unavailable"
          />
          <label for="hide_unavailable">Hide Unavailable Entities</label>
        </div>
        <div class="field-row">
          <div class="field">
            <label class="field-label">Theme Mode</label>
            <select
              class="field-input"
              @change=${e=>this._updateField("display.theme_mode",e.target.value)}
            >
              <option value="auto" ?selected=${"auto"===(this.config.display?.theme_mode||"auto")}>Auto</option>
              <option value="light" ?selected=${"light"===this.config.display?.theme_mode}>Light</option>
              <option value="dark" ?selected=${"dark"===this.config.display?.theme_mode}>Dark</option>
            </select>
          </div>
        </div>
        <div class="note">
          For full entity configuration (sensors, positions, labels), use the YAML editor.
        </div>
      </div>
    `:B`<div>Loading editor...</div>`}}Te.styles=c`
    :host {
      display: block;
      padding: 16px;
    }
    .editor-section {
      margin-bottom: 24px;
    }
    .editor-section h3 {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-color, #03a9f4);
      margin: 0 0 12px 0;
      padding-bottom: 6px;
      border-bottom: 1px solid var(--divider-color, rgba(255,255,255,0.1));
    }
    .field-row {
      display: flex;
      gap: 12px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .field {
      flex: 1;
      min-width: 200px;
    }
    .field-label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color, #888);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .field-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, rgba(255,255,255,0.2));
      border-radius: 8px;
      background: var(--input-bg, rgba(255,255,255,0.05));
      color: var(--primary-text-color, #fff);
      font-size: 13px;
      box-sizing: border-box;
    }
    .field-input:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .checkbox-row label {
      font-size: 13px;
      color: var(--primary-text-color, #fff);
    }
    .note {
      font-size: 11px;
      color: var(--secondary-text-color, #888);
      font-style: italic;
      margin-top: 4px;
    }
  `,i([fe({attribute:!1})],Te.prototype,"hass",void 0),i([fe({attribute:!1})],Te.prototype,"config",void 0),customElements.define("haval-h3-dashboard-editor",Te),console.info(`%c ${t} %c v${s} `,"color: #fff; background: #1a73e8; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;","color: #fff; background: #333; padding: 4px 8px; border-radius: 0 4px 4px 0;"),window.customElements.get(e)||window.customElements.define(e,Ce),window.customCards=window.customCards||[],window.customCards.push({type:e,name:t,description:"Full-screen dashboard card for Haval H3 with vehicle image overlays and GPS map",preview:!0,documentationURL:"https://github.com/roblencheg/HAVAL_H3_hacard"});function Ne(e){return{type:"unsubscribe_events",subscription:e}}const Pe=(e,t,s,i)=>{const[o,n,r]=e.split(".",3);return Number(o)>t||Number(o)===t&&(void 0===i?Number(n)>=s:Number(n)>s)||void 0!==i&&Number(o)===t&&Number(n)===s&&Number(r)>=i},Oe="auth_invalid",Ue="auth_ok";function Me(e){if(!e.auth)throw 4;const t=e.auth;let s=t.expired?t.refreshAccessToken().then(()=>{s=void 0},()=>{s=void 0}):void 0;const i=t.wsUrl;function o(e,n,r){const a=new WebSocket(i);let l=!1;const c=()=>{if(a.removeEventListener("close",c),l)return void r(2);if(0===e)return void r(1);const t=-1===e?-1:e-1;setTimeout(()=>o(t,n,r),1e3)},d=async e=>{try{t.expired&&await(s||t.refreshAccessToken()),a.send(JSON.stringify({type:"auth",access_token:t.accessToken}))}catch(e){l=2===e,a.close()}},h=async e=>{const t=JSON.parse(e.data);switch(t.type){case Oe:l=!0,a.close();break;case Ue:a.removeEventListener("open",d),a.removeEventListener("message",h),a.removeEventListener("close",c),a.removeEventListener("error",c),a.haVersion=t.ha_version,Pe(a.haVersion,2022,9)&&a.send(JSON.stringify({type:"supported_features",id:1,features:{coalesce_messages:1}})),n(a)}};a.addEventListener("open",d),a.addEventListener("message",h),a.addEventListener("close",c),a.addEventListener("error",c)}return new Promise((t,s)=>o(e.setupRetry,t,s))}class Re{constructor(e,t){this._handleMessage=e=>{let t=JSON.parse(e.data);Array.isArray(t)||(t=[t]),t.forEach(e=>{const t=this.commands.get(e.id);switch(e.type){case"event":t?t.callback(e.event):(console.warn(`Received event for unknown subscription ${e.id}. Unsubscribing.`),this.sendMessagePromise(Ne(e.id)).catch(e=>{}));break;case"result":t&&(e.success?(t.resolve(e.result),"subscribe"in t||this.commands.delete(e.id)):(t.reject(e.error),this.commands.delete(e.id)));break;case"pong":t?(t.resolve(),this.commands.delete(e.id)):console.warn(`Received unknown pong response ${e.id}`)}})},this._handleClose=async()=>{const e=this.commands;if(this.commandId=1,this.oldSubscriptions=this.commands,this.commands=new Map,this.socket=void 0,e.forEach(e=>{"subscribe"in e||e.reject({type:"result",success:!1,error:{code:3,message:"Connection lost"}})}),this.closeRequested)return;this.fireEvent("disconnected");const t=Object.assign(Object.assign({},this.options),{setupRetry:0}),s=e=>{setTimeout(async()=>{if(!this.closeRequested)try{const e=await t.createSocket(t);this._setSocket(e)}catch(t){if(this._queuedMessages){const e=this._queuedMessages;this._queuedMessages=void 0;for(const t of e)t.reject&&t.reject(3)}2===t?this.fireEvent("reconnect-error",t):s(e+1)}},1e3*Math.min(e,5))};this.suspendReconnectPromise&&(await this.suspendReconnectPromise,this.suspendReconnectPromise=void 0,this._queuedMessages=[]),s(0)},this.options=t,this.commandId=2,this.commands=new Map,this.eventListeners=new Map,this.closeRequested=!1,this._setSocket(e)}get connected(){return void 0!==this.socket&&this.socket.readyState==this.socket.OPEN}_setSocket(e){this.socket=e,this.haVersion=e.haVersion,e.addEventListener("message",this._handleMessage),e.addEventListener("close",this._handleClose);const t=this.oldSubscriptions;t&&(this.oldSubscriptions=void 0,t.forEach(e=>{"subscribe"in e&&e.subscribe&&e.subscribe().then(t=>{e.unsubscribe=t,e.resolve()})}));const s=this._queuedMessages;if(s){this._queuedMessages=void 0;for(const e of s)e.resolve()}this.fireEvent("ready")}addEventListener(e,t){let s=this.eventListeners.get(e);s||(s=[],this.eventListeners.set(e,s)),s.push(t)}removeEventListener(e,t){const s=this.eventListeners.get(e);if(!s)return;const i=s.indexOf(t);-1!==i&&s.splice(i,1)}fireEvent(e,t){(this.eventListeners.get(e)||[]).forEach(e=>e(this,t))}suspendReconnectUntil(e){this.suspendReconnectPromise=e}suspend(){if(!this.suspendReconnectPromise)throw new Error("Suspend promise not set");this.socket&&this.socket.close()}reconnect(e=!1){this.socket&&(e?(this.socket.removeEventListener("message",this._handleMessage),this.socket.removeEventListener("close",this._handleClose),this.socket.close(),this._handleClose()):this.socket.close())}close(){this.closeRequested=!0,this.socket&&this.socket.close()}async subscribeEvents(e,t){return this.subscribeMessage(e,function(e){const t={type:"subscribe_events"};return e&&(t.event_type=e),t}(t))}ping(){return this.sendMessagePromise({type:"ping"})}sendMessage(e,t){if(!this.connected)throw 3;if(this._queuedMessages){if(t)throw new Error("Cannot queue with commandId");this._queuedMessages.push({resolve:()=>this.sendMessage(e)})}else t||(t=this._genCmdId()),e.id=t,this.socket.send(JSON.stringify(e))}sendMessagePromise(e){return new Promise((t,s)=>{if(this._queuedMessages)return void this._queuedMessages.push({reject:s,resolve:async()=>{try{t(await this.sendMessagePromise(e))}catch(e){s(e)}}});const i=this._genCmdId();this.commands.set(i,{resolve:t,reject:s}),this.sendMessage(e,i)})}async subscribeMessage(e,t,s){if(this._queuedMessages&&await new Promise((e,t)=>{this._queuedMessages.push({resolve:e,reject:t})}),null==s?void 0:s.preCheck){if(!await s.preCheck())throw new Error("Pre-check failed")}let i;return await new Promise((o,n)=>{const r=this._genCmdId();i={resolve:o,reject:n,callback:e,subscribe:!1!==(null==s?void 0:s.resubscribe)?()=>this.subscribeMessage(e,t,s):void 0,unsubscribe:async()=>{this.connected&&await this.sendMessagePromise(Ne(r)),this.commands.delete(r)}},this.commands.set(r,i);try{this.sendMessage(t,r)}catch(e){}}),()=>i.unsubscribe()}_genCmdId(){return++this.commandId}}const Ie=()=>`${location.protocol}//${location.host}/`,Le=e=>1e3*e+Date.now();function He(e,t,s,i){s+=(s.includes("?")?"&":"?")+"auth_callback=1",document.location.href=function(e,t,s,i){let o=`${e}/auth/authorize?response_type=code&redirect_uri=${encodeURIComponent(s)}`;return null!==t&&(o+=`&client_id=${encodeURIComponent(t)}`),i&&(o+=`&state=${encodeURIComponent(i)}`),o}(e,t,s,i)}async function je(e,t,s){const i="undefined"!=typeof location&&location;if(i&&"https:"===i.protocol){const t=document.createElement("a");if(t.href=e,"http:"===t.protocol&&"localhost"!==t.hostname)throw 5}const o=new FormData;null!==t&&o.append("client_id",t),Object.keys(s).forEach(e=>{o.append(e,s[e])});const n=await fetch(`${e}/auth/token`,{method:"POST",credentials:"same-origin",body:o});if(!n.ok)throw 400===n.status||403===n.status?2:new Error("Unable to fetch tokens");const r=await n.json();return r.hassUrl=e,r.clientId=t,r.expires=Le(r.expires_in),r}function ze(e,t,s){return je(e,t,{code:s,grant_type:"authorization_code"})}class De{constructor(e,t){this.data=e,this._saveTokens=t}get wsUrl(){return`ws${this.data.hassUrl.substr(4)}/api/websocket`}get accessToken(){return this.data.access_token}get expired(){return Date.now()>this.data.expires}async refreshAccessToken(){if(!this.data.refresh_token)throw new Error("No refresh_token");const e=await je(this.data.hassUrl,this.data.clientId,{grant_type:"refresh_token",refresh_token:this.data.refresh_token});e.refresh_token=this.data.refresh_token,this.data=e,this._saveTokens&&this._saveTokens(e)}async revoke(){if(!this.data.refresh_token)throw new Error("No refresh_token to revoke");const e=new FormData;e.append("token",this.data.refresh_token),await fetch(`${this.data.hassUrl}/auth/revoke`,{method:"POST",credentials:"same-origin",body:e}),this._saveTokens&&this._saveTokens(null)}}const qe=e=>{let t=[];function s(s,i){e=i?s:Object.assign(Object.assign({},e),s);let o=t;for(let t=0;t<o.length;t++)o[t](e)}return{get state(){return e},action(t){function i(e){s(e,!1)}return function(){let s=[e];for(let e=0;e<arguments.length;e++)s.push(arguments[e]);let o=t.apply(this,s);if(null!=o)return o instanceof Promise?o.then(i):i(o)}},setState:s,clearState(){e=void 0},subscribe:e=>(t.push(e),()=>{!function(e){let s=[];for(let i=0;i<t.length;i++)t[i]===e?e=null:s.push(t[i]);t=s}(e)})}},Fe=(e,t,s,i,o={unsubGrace:!0})=>{if(e[t])return e[t];let n,r,a=0,l=qe();const c=()=>{if(!s)throw new Error("Collection does not support refresh");return s(e).then(e=>l.setState(e,!0))},d=()=>c().catch(t=>{if(e.connected)throw t}),h=()=>{r=void 0,n&&n.then(e=>{e()}),l.clearState(),e.removeEventListener("ready",c),e.removeEventListener("disconnected",p)},p=()=>{r&&(clearTimeout(r),h())};return e[t]={get state(){return l.state},refresh:c,subscribe(t){a++,1===a&&(()=>{if(void 0!==r)return clearTimeout(r),void(r=void 0);i&&(n=i(e,l)),s&&(e.addEventListener("ready",d),d()),e.addEventListener("disconnected",p)})();const c=l.subscribe(t);return void 0!==l.state&&setTimeout(()=>t(l.state),0),()=>{c(),a--,a||(o.unsubGrace?r=setTimeout(h,5e3):h())}}},e[t]},Ve=e=>e.sendMessagePromise({type:"get_states"}),Ge=e=>e.sendMessagePromise({type:"get_services"}),Be=e=>e.sendMessagePromise({type:"get_config"});function We(e,t){return void 0===e?null:{components:e.components.concat(t.data.component)}}const Je=e=>Be(e),Ke=(e,t)=>Promise.all([e.subscribeEvents(t.action(We),"component_loaded"),e.subscribeEvents(()=>Je(e).then(e=>t.setState(e,!0)),"core_config_updated")]).then(e=>()=>e.forEach(e=>e())),Ye=e=>Fe(e,"_cnf",Je,Ke);function Qe(e,t){if(void 0===e)return null;const{domain:s,service:i}=t.data,o=e[s];if(!o||!(i in o))return null;const n={};return Object.keys(o).forEach(e=>{e!==i&&(n[e]=o[e])}),{[s]:n}}const Ze=((e,t,s=!1)=>{let i;return function(...o){const n=this,r=s&&!i;clearTimeout(i),i=setTimeout(()=>{i=void 0,s||e.apply(n,o)},t),r&&e.apply(n,o)}})((e,t)=>Xe(e).then(e=>t.setState(e,!0)),5e3),Xe=e=>Ge(e),et=(e,t)=>Promise.all([e.subscribeEvents(s=>function(e,t,s){var i;const o=t.state;if(void 0===o)return;const{domain:n,service:r}=s.data;if(!(null===(i=o.domain)||void 0===i?void 0:i.service)){const e=Object.assign(Object.assign({},o[n]),{[r]:{description:"",fields:{}}});t.setState({[n]:e})}Ze(e,t)}(e,t,s),"service_registered"),e.subscribeEvents(t.action(Qe),"service_removed")]).then(e=>()=>e.forEach(e=>e())),tt=e=>Fe(e,"_srv",Xe,et);const st=(e,t)=>e.subscribeMessage(e=>function(e,t){const s=Object.assign({},e.state);if(t.a)for(const e in t.a){const i=t.a[e];let o=new Date(1e3*i.lc).toISOString();s[e]={entity_id:e,state:i.s,attributes:i.a,context:"string"==typeof i.c?{id:i.c,parent_id:null,user_id:null}:i.c,last_changed:o,last_updated:i.lu?new Date(1e3*i.lu).toISOString():o}}if(t.r)for(const e of t.r)delete s[e];if(t.c)for(const e in t.c){let i=s[e];if(!i){console.warn("Received state update for unknown entity",e);continue}i=Object.assign({},i);const{"+":o,"-":n}=t.c[e],r=(null==o?void 0:o.a)||(null==n?void 0:n.a),a=r?Object.assign({},i.attributes):i.attributes;if(o&&(void 0!==o.s&&(i.state=o.s),o.c&&("string"==typeof o.c?i.context=Object.assign(Object.assign({},i.context),{id:o.c}):i.context=Object.assign(Object.assign({},i.context),o.c)),o.lc?i.last_updated=i.last_changed=new Date(1e3*o.lc).toISOString():o.lu&&(i.last_updated=new Date(1e3*o.lu).toISOString()),o.a&&Object.assign(a,o.a)),null==n?void 0:n.a)for(const e of n.a)delete a[e];r&&(i.attributes=a),s[e]=i}e.setState(s,!0)}(t,e),{type:"subscribe_entities"});async function it(e){const t=await Ve(e),s={};for(let e=0;e<t.length;e++){const i=t[e];s[i.entity_id]=i}return s}const ot=(e,t)=>e.subscribeEvents(e=>function(e,t){const s=e.state;if(void 0===s)return;const{entity_id:i,new_state:o}=t.data;if(o)e.setState({[o.entity_id]:o});else{const t=Object.assign({},s);delete t[i],e.setState(t,!0)}}(t,e),"state_changed"),nt=e=>Pe(e.haVersion,2022,4,0)?Fe(e,"_ent",void 0,st):Fe(e,"_ent",it,ot);var rt=Object.freeze({__proto__:null,Auth:De,Connection:Re,ERR_CANNOT_CONNECT:1,ERR_CONNECTION_LOST:3,ERR_HASS_HOST_REQUIRED:4,ERR_INVALID_AUTH:2,ERR_INVALID_AUTH_CALLBACK:6,ERR_INVALID_HTTPS_TO_HTTP:5,MSG_TYPE_AUTH_INVALID:Oe,MSG_TYPE_AUTH_OK:Ue,MSG_TYPE_AUTH_REQUIRED:"auth_required",STATE_FINAL_WRITE:"FINAL_WRITE",STATE_NOT_RUNNING:"NOT_RUNNING",STATE_RUNNING:"RUNNING",STATE_STARTING:"STARTING",STATE_STOPPING:"STOPPING",callService:(e,t,s,i,o,n)=>e.sendMessagePromise(function(e,t,s,i,o){const n={type:"call_service",domain:e,service:t,target:i,return_response:o};return s&&(n.service_data=s),n}(t,s,i,o,n)),configColl:Ye,createCollection:(e,t,s,i,o)=>Fe(i,e,t,s).subscribe(o),createConnection:async function(e){const t=Object.assign({setupRetry:0,createSocket:Me},e),s=await t.createSocket(t);return new Re(s,t)},createLongLivedTokenAuth:function(e,t){return new De({hassUrl:e,clientId:null,expires:Date.now()+1e11,refresh_token:"",access_token:t,expires_in:1e11})},createSocket:Me,createStore:qe,entitiesColl:nt,genClientId:Ie,genExpires:Le,getAuth:async function(e={}){let t,s=e.hassUrl;s&&"/"===s[s.length-1]&&(s=s.substr(0,s.length-1));const i=void 0!==e.clientId?e.clientId:Ie(),o=!0===e.limitHassInstance;if(e.authCode&&s&&(t=await ze(s,i,e.authCode),e.saveTokens&&e.saveTokens(t)),!t){const r=function(e){const t={},s=e.split("&");for(let e=0;e<s.length;e++){const i=s[e].split("="),o=decodeURIComponent(i[0]),n=i.length>1?decodeURIComponent(i[1]):void 0;t[o]=n}return t}(location.search.substr(1));if("auth_callback"in r){const a=(n=r.state,JSON.parse(atob(n)));if(o&&(a.hassUrl!==s||a.clientId!==i))throw 6;t=await ze(a.hassUrl,a.clientId,r.code),e.saveTokens&&e.saveTokens(t)}}var n,r;if(!t&&e.loadTokens&&(t=await e.loadTokens()),t&&(void 0===s||t.hassUrl===s))return new De(t,e.saveTokens);if(void 0===s)throw 4;return He(s,i,e.redirectUrl||function(){const{protocol:e,host:t,pathname:s,search:i}=location;return`${e}//${t}${s}${i}`}(),(r={hassUrl:s,clientId:i},btoa(JSON.stringify(r)))),new Promise(()=>{})},getCollection:Fe,getConfig:Be,getServices:Ge,getStates:Ve,getUser:e=>e.sendMessagePromise({type:"auth/current_user"}),servicesColl:tt,subscribeConfig:(e,t)=>Ye(e).subscribe(t),subscribeEntities:(e,t)=>nt(e).subscribe(t),subscribeServices:(e,t)=>tt(e).subscribe(t)});export{e as CARD_NAME,t as CARD_TITLE,s as CARD_VERSION,Ce as HavalH3Card,Te as HavalH3Editor};
//# sourceMappingURL=haval-h3-dashboard-card.js.map
