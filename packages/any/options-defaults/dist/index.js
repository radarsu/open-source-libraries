"use strict";
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
function r(r,t){var e="function"==typeof Symbol&&r[Symbol.iterator];if(!e)return r;var o,n,c=e.call(r),l=[];try{for(;(void 0===t||t-- >0)&&!(o=c.next()).done;)l.push(o.value)}catch(r){n={error:r}}finally{try{o&&!o.done&&(e=c.return)&&e.call(c)}finally{if(n)throw n.error}}return l}function t(r,t){for(var e=0,o=t.length,n=r.length;e<o;e++,n++)r[n]=t[e];return r}Object.defineProperty(exports,"__esModule",{value:!0});var e=["__proto__","constructor","prototype"],o=function(t){for(var n=[],c=1;c<arguments.length;c++)n[c-1]=arguments[c];return n.forEach((function(n){n&&"object"==typeof n&&Object.entries(n).forEach((function(n){var c=r(n,2),l=c[0],u=c[1];if(!e.includes(l)){var a="object"==typeof u,f=a&&"Object"!==(null==u?void 0:u.constructor.name);null===u||!a||Array.isArray(u)||f?t[l]=u:(t[l]||(t[l]={}),o(t[l],u))}}))})),t};exports.defaults=function(e,n,c,l,u,a,f){for(var i=[],y=7;y<arguments.length;y++)i[y-7]=arguments[y];return o.apply(void 0,t([{},e,n,c,l,u,a,f],r(i)))},exports.merge=o;
