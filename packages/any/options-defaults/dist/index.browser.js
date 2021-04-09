var defaults=function(r){"use strict";
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
    ***************************************************************************** */function t(r,t){var e="function"==typeof Symbol&&r[Symbol.iterator];if(!e)return r;var n,o,u=e.call(r),a=[];try{for(;(void 0===t||t-- >0)&&!(n=u.next()).done;)a.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(e=u.return)&&e.call(u)}finally{if(o)throw o.error}}return a}function e(r,t){for(var e=0,n=t.length,o=r.length;e<n;e++,o++)r[o]=t[e];return r}var n=["__proto__","constructor","prototype"],o=function(r){for(var e=[],u=1;u<arguments.length;u++)e[u-1]=arguments[u];return e.forEach((function(e){e&&"object"==typeof e&&Object.entries(e).forEach((function(e){var u=t(e,2),a=u[0],c=u[1];if(!n.includes(a)){var f="object"==typeof c,l=f&&"Object"!==(null==c?void 0:c.constructor.name);null===c||!f||Array.isArray(c)||l?r[a]=c:(r[a]||(r[a]={}),o(r[a],c))}}))})),r};return r.defaults=function(r,n,u,a,c,f,l){for(var i=[],v=7;v<arguments.length;v++)i[v-7]=arguments[v];return o.apply(void 0,e([{},r,n,u,a,c,f,l],t(i)))},r.merge=o,Object.defineProperty(r,"__esModule",{value:!0}),r}({});
