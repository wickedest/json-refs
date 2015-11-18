!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.JsonRefs=e()}}(function(){var e;return function n(e,t,r){function i(f,s){if(!t[f]){if(!e[f]){var u="function"==typeof require&&require;if(!s&&u)return u(f,!0);if(o)return o(f,!0);var c=new Error("Cannot find module '"+f+"'");throw c.code="MODULE_NOT_FOUND",c}var a=t[f]={exports:{}};e[f][0].call(a.exports,function(n){var t=e[f][1][n];return i(t?t:n)},a,a.exports,n,e,t,r)}return t[f].exports}for(var o="function"==typeof require&&require,f=0;f<r.length;f++)i(r[f]);return i}({1:[function(e,n,t){(function(t){"use strict";function r(e,n){var t=d[e],r=Promise.resolve(),i=-1===e.indexOf(":")?void 0:e.split(":")[0];return u.isUndefined(t)?-1!==l.indexOf(i)||u.isUndefined(i)?(r=c.load(e,n),r=r.then(n.processContent?function(t){return n.processContent(t,e)}:JSON.parse),r=r.then(function(n){return d[e]=n,n})):r=r.then(function(){return Promise.reject(new Error("Unsupported remote reference scheme: "+i))}):r=r.then(function(){return t}),r=r.then(function(e){return u.cloneDeep(e)})}function i(e,n){var t=g(e);return w(n)&&(n=-1===n.indexOf("#")?"#":n.substring(n.indexOf("#"))),h(t.concat(g(n))).replace(/\/\$ref/g,"")}function o(e,n){function t(e){".."===e?i.pop():"."!==e&&i.push(e)}var r="#"!==n.charAt(0)&&-1===n.indexOf(":"),i=[],o=(n.indexOf("#")>-1?n.split("#")[0]:n).split("/");return e&&(e.indexOf("#")>-1&&(e=e.substring(0,e.indexOf("#"))),e.length>1&&"/"===e[e.length-1]&&(e=e.substring(0,e.length-1)),e.split("#")[0].split("/").forEach(t)),r?o.forEach(t):i=o,i.join("/")}function f(e,n,t){function r(e){var n=e.slice(0,e.lastIndexOf("allOf")),i=t[h(n)];return u.isUndefined(i)?n.indexOf("allOf")>-1?r(n):void 0:h(n)}function o(e){var n=[],i=e.map(function(){var e,i=h(this.path),o=t[i];this.circular&&(n.push(i),u.isUndefined(o)&&(e=r(this.path),o=t[e]),u.isUndefined(o)||(o.circular=!0),this.update(0===s?{}:a(this.node).map(function(){this.circular&&this.parent.update({})})))});return u.each(n,function(e){var n,t=[],r=g(e),o=a(i).get(r);for(n=0;s>n;n++)t.push.apply(t,r),a(i).set(t,u.cloneDeep(o))}),i}function f(e,n){var r=i(n,"#"),o=e=-1===e.indexOf("#")?"#":e.substring(e.indexOf("#")),f=g(o),s=!c.has(f),u=c.get(f),a=g(n),d=a.slice(0,a.length-1),l=t[r]||{ref:e};s?l.missing=!0:0===d.length?(c.value===u&&(u={},l.circular=!0),c.value=u):(c.get(d)===u&&(u={},l.circular=!0),c.set(d,u)),t[r]=l}var s=u.isUndefined(n.depth)?1:n.depth,c=a(e);return(u.isUndefined(n.resolveLocalRefs)||n.resolveLocalRefs)&&u.each(v(e),function(e,n){w(e)||f(e,n)}),u.isUndefined(n.location)||u.each(t,function(e){var t=e.ref;0===t.indexOf(n.location)&&(t=t.substring(n.location.length),"/"===t.charAt(0)&&(t=t.substring(1))),e.ref=t}),{metadata:t,resolved:o(c)}}function s(e,n,t,c,d){function l(e,n,r,o,f){var s,l=r+("#"===o?"":o),p=i(t,e),h=d[p]||{},v=g(e);u.isUndefined(f)?(h.circular=!0,s=c[r].ref):(s=a(f).get(g(o)),u.isUndefined(s)?h.missing=!0:s.$ref?s=s.$ref:v.pop()),0===v.length?m.value=s:m.set(v,s),h.ref=l,d[p]=h}function p(){return{metadata:d,resolved:m.value}}var h=Promise.resolve(),m=a(e);return u.each(v(e),function(e,f){var a=y(e),p=w(e);(a&&(u.isUndefined(n.resolveFileRefs)||n.resolveFileRefs)||!a&&p&&(u.isUndefined(n.resolveRemoteRefs)||n.resolveRemoteRefs))&&(h=h.then(function(){var a=o(n.location,e),p=e.split("#"),h="#"+(p[1]||"");return u.isUndefined(c[a])?r(a,n).then(function(e){return e},function(e){return e}).then(function(r){var v=p[0],w=u.cloneDeep(n),y=i(t,f);return v=v.substring(0,v.lastIndexOf("/")+1),w.location=o(n.location,v),u.isError(r)?void(d[y]={err:r,missing:!0,ref:e}):(c[a]={ref:t},s(r,w,y,c,d).then(function(n){return delete c[a],l(f,e,a,h,n.resolved),n}))}):void l(f,e,a,h)}))}),h=h.then(function(){f(m.value,n,d)}).then(p,p)}"undefined"==typeof Promise&&e("native-promise-only");var u=e("./lib/utils"),c="undefined"!=typeof window?window.PathLoader:"undefined"!=typeof t?t.PathLoader:null,a="undefined"!=typeof window?window.traverse:"undefined"!=typeof t?t.traverse:null,d={},l=["file","http","https"];n.exports.clearCache=function(){d={}};var p=n.exports.isJsonReference=function(e){return u.isPlainObject(e)&&u.isString(e.$ref)},h=n.exports.pathToPointer=function(e){if(u.isUndefined(e))throw new Error("path is required");if(!u.isArray(e))throw new Error("path must be an array");var n="#";return e.length>0&&(n+="/"+e.map(function(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}).join("/")),n},v=n.exports.findRefs=function(e){if(u.isUndefined(e))throw new Error("json is required");if(!u.isArray(e)&&!u.isPlainObject(e))throw new Error("json must be an array or an object");return a(e).reduce(function(e){var n=this.node;return"$ref"===this.key&&p(this.parent.node)&&(e[h(this.path)]=n),e},{})},w=n.exports.isRemotePointer=function(e){if(u.isUndefined(e))throw new Error("ptr is required");if(!u.isString(e))throw new Error("ptr must be a string");return""!==e&&"#"!==e.charAt(0)},y=n.exports.isFilePointer=function(e){return w(e)&&!/^[a-zA-Z]+:\/\//.test(e)},g=n.exports.pathFromPointer=function(e){if(u.isUndefined(e))throw new Error("ptr is required");if(!u.isString(e))throw new Error("ptr must be a string");var n=[],t=["","#","#/"];return w(e)?n=e:-1===t.indexOf(e)&&"#"===e.charAt(0)&&(n=e.substring(e.indexOf("/")).split("/").reduce(function(e,n){return""!==n&&e.push(n.replace(/~0/g,"~").replace(/~1/g,"/")),e},[])),n};n.exports.resolveRefs=function(e,n,t){var r=Promise.resolve();return 2===arguments.length&&u.isFunction(n)&&(t=n,n={}),u.isUndefined(n)&&(n={}),r=r.then(function(){if(u.isUndefined(e))throw new Error("json is required");if(!u.isArray(e)&&!u.isPlainObject(e))throw new Error("json must be an array or an object");if(!u.isPlainObject(n))throw new Error("options must be an object");if(!u.isUndefined(t)&&!u.isFunction(t))throw new Error("done must be a function");if(!u.isUndefined(n.processContent)&&!u.isFunction(n.processContent))throw new Error("options.processContent must be a function");if(!u.isUndefined(n.prepareRequest)&&!u.isFunction(n.prepareRequest))throw new Error("options.prepareRequest must be a function");if(!u.isUndefined(n.location)&&!u.isString(n.location))throw new Error("options.location must be a string");if(!u.isUndefined(n.depth)&&!u.isNumber(n.depth))throw new Error("options.depth must be a number");if(!u.isUndefined(n.depth)&&n.depth<0)throw new Error("options.depth must be greater or equal to zero");if(!u.isUndefined(n.resolveLocalRefs)&&!u.isBoolean(n.resolveLocalRefs))throw new Error("options.resolveLocalRefs must be a boolean");if(!u.isUndefined(n.resolveRemoteRefs)&&!u.isBoolean(n.resolveRemoteRefs))throw new Error("options.resolveRemoteRefs must be a boolean");if(!u.isUndefined(n.resolveFileRefs)&&!u.isBoolean(n.resolveFileRefs))throw new Error("options.resolveFileRefs must be a boolean")}),e=a(e).clone(),n=a(n).clone(),r=r.then(function(){return s(e,n,"#",{},{})}).then(function(e){return f(e.resolved,n,e.metadata)}),!u.isUndefined(t)&&u.isFunction(t)&&(r=r.then(function(e){t(void 0,e.resolved,e.metadata)},function(e){t(e)})),r}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./lib/utils":2,"native-promise-only":3}],2:[function(e,n,t){(function(e){"use strict";function t(e,n){return Object.prototype.toString.call(e)==="[object "+n+"]"}var r="undefined"!=typeof window?window.traverse:"undefined"!=typeof e?e.traverse:null;n.exports.cloneDeep=function(e){return r(e).clone()};var i=n.exports.isArray=function(e){return t(e,"Array")};n.exports.isBoolean=function(e){return t(e,"Boolean")},n.exports.isError=function(e){return t(e,"Error")},n.exports.isFunction=function(e){return t(e,"Function")},n.exports.isNumber=function(e){return t(e,"Number")};var o=n.exports.isPlainObject=function(e){return t(e,"Object")};n.exports.isString=function(e){return t(e,"String")},n.exports.isUndefined=function(e){return"undefined"==typeof e},n.exports.each=function(e,n){i(e)?e.forEach(n):o(e)&&Object.keys(e).forEach(function(t){n(e[t],t)})}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],3:[function(n,t,r){(function(n){!function(n,r,i){r[n]=r[n]||i(),"undefined"!=typeof t&&t.exports?t.exports=r[n]:"function"==typeof e&&e.amd&&e(function(){return r[n]})}("Promise","undefined"!=typeof n?n:this,function(){"use strict";function e(e,n){l.add(e,n),d||(d=h(l.drain))}function n(e){var n,t=typeof e;return null==e||"object"!=t&&"function"!=t||(n=e.then),"function"==typeof n?n:!1}function t(){for(var e=0;e<this.chain.length;e++)r(this,1===this.state?this.chain[e].success:this.chain[e].failure,this.chain[e]);this.chain.length=0}function r(e,t,r){var i,o;try{t===!1?r.reject(e.msg):(i=t===!0?e.msg:t.call(void 0,e.msg),i===r.promise?r.reject(TypeError("Promise-chain cycle")):(o=n(i))?o.call(i,r.resolve,r.reject):r.resolve(i))}catch(f){r.reject(f)}}function i(r){var f,u=this;if(!u.triggered){u.triggered=!0,u.def&&(u=u.def);try{(f=n(r))?e(function(){var e=new s(u);try{f.call(r,function(){i.apply(e,arguments)},function(){o.apply(e,arguments)})}catch(n){o.call(e,n)}}):(u.msg=r,u.state=1,u.chain.length>0&&e(t,u))}catch(c){o.call(new s(u),c)}}}function o(n){var r=this;r.triggered||(r.triggered=!0,r.def&&(r=r.def),r.msg=n,r.state=2,r.chain.length>0&&e(t,r))}function f(e,n,t,r){for(var i=0;i<n.length;i++)!function(i){e.resolve(n[i]).then(function(e){t(i,e)},r)}(i)}function s(e){this.def=e,this.triggered=!1}function u(e){this.promise=e,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function c(n){if("function"!=typeof n)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var r=new u(this);this.then=function(n,i){var o={success:"function"==typeof n?n:!0,failure:"function"==typeof i?i:!1};return o.promise=new this.constructor(function(e,n){if("function"!=typeof e||"function"!=typeof n)throw TypeError("Not a function");o.resolve=e,o.reject=n}),r.chain.push(o),0!==r.state&&e(t,r),o.promise},this["catch"]=function(e){return this.then(void 0,e)};try{n.call(void 0,function(e){i.call(r,e)},function(e){o.call(r,e)})}catch(f){o.call(r,f)}}var a,d,l,p=Object.prototype.toString,h="undefined"!=typeof setImmediate?function(e){return setImmediate(e)}:setTimeout;try{Object.defineProperty({},"x",{}),a=function(e,n,t,r){return Object.defineProperty(e,n,{value:t,writable:!0,configurable:r!==!1})}}catch(v){a=function(e,n,t){return e[n]=t,e}}l=function(){function e(e,n){this.fn=e,this.self=n,this.next=void 0}var n,t,r;return{add:function(i,o){r=new e(i,o),t?t.next=r:n=r,t=r,r=void 0},drain:function(){var e=n;for(n=t=d=void 0;e;)e.fn.call(e.self),e=e.next}}}();var w=a({},"constructor",c,!1);return c.prototype=w,a(w,"__NPO__",0,!1),a(c,"resolve",function(e){var n=this;return e&&"object"==typeof e&&1===e.__NPO__?e:new n(function(n,t){if("function"!=typeof n||"function"!=typeof t)throw TypeError("Not a function");n(e)})}),a(c,"reject",function(e){return new this(function(n,t){if("function"!=typeof n||"function"!=typeof t)throw TypeError("Not a function");t(e)})}),a(c,"all",function(e){var n=this;return"[object Array]"!=p.call(e)?n.reject(TypeError("Not an array")):0===e.length?n.resolve([]):new n(function(t,r){if("function"!=typeof t||"function"!=typeof r)throw TypeError("Not a function");var i=e.length,o=Array(i),s=0;f(n,e,function(e,n){o[e]=n,++s===i&&t(o)},r)})}),a(c,"race",function(e){var n=this;return"[object Array]"!=p.call(e)?n.reject(TypeError("Not an array")):new n(function(t,r){if("function"!=typeof t||"function"!=typeof r)throw TypeError("Not a function");f(n,e,function(e,n){t(n)},r)})}),c})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)});