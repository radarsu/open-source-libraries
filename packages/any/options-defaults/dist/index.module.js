/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function r(r,t){var o="function"==typeof Symbol&&r[Symbol.iterator];if(!o)return r;var n,e,c=o.call(r),a=[];try{for(;(void 0===t||t-- >0)&&!(n=c.next()).done;)a.push(n.value)}catch(r){e={error:r}}finally{try{n&&!n.done&&(o=c.return)&&o.call(c)}finally{if(e)throw e.error}}return a}function t(r,t){for(var o=0,n=t.length,e=r.length;o<n;o++,e++)r[e]=t[o];return r}var o=["__proto__","constructor","prototype"],n=function(t){for(var e=[],c=1;c<arguments.length;c++)e[c-1]=arguments[c];return e.forEach((function(e){e&&"object"==typeof e&&Object.entries(e).forEach((function(e){var c=r(e,2),a=c[0],f=c[1];if(!o.includes(a)){var l="object"==typeof f,u=l&&"Object"!==(null==f?void 0:f.constructor.name);null===f||!l||Array.isArray(f)||u?t[a]=f:(t[a]||(t[a]={}),n(t[a],f))}}))})),t},e=function(o,e,c,a,f,l,u){for(var i=[],y=7;y<arguments.length;y++)i[y-7]=arguments[y];return n.apply(void 0,t([{},o,e,c,a,f,l,u],r(i)))};export{e as defaults,n as merge};
