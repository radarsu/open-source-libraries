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
var r=function(){function r(){this.dictionary={}}return r.prototype.addWords=function(r){var i=this;Object.entries(r).forEach((function(r){var t=function(r,i){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,e=t.call(r),a=[];try{for(;(void 0===i||i-- >0)&&!(n=e.next()).done;)a.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=e.return)&&t.call(e)}finally{if(o)throw o.error}}return a}(r,2),n=t[0],o=t[1];i.dictionary[n]=o}))},r.prototype.getWord=function(r,i,t){void 0===i&&(i=1),void 0===t&&(t="nominative"),i=Math.abs(i);var n=this.dictionary[r];if(!n)throw new Error("Word "+r+" is not defined in dictionary.");var o=n[t];if(!o)throw new Error("Case "+t+" is not defined for word "+r+".");if(1===i)return o.singular;if(i%1!=0){if(!n.genitive)throw new Error('Genitive form of word "'+o.singular+'" is required to support floats.');return i<2?n.genitive.singular:o.plural}if("vocative"===t&&(o=n.nominative),"dual"in o){var e=i%10;if(e>=2&&e<=4&&(i<12||i>14))return o.dual}return o.plural},r}(),i=new r;export{r as WordVariationsDictionary,i as wordVariations};
