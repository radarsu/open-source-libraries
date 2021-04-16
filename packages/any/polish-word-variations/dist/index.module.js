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
var r=function(){function r(){this.dictionary={}}return r.prototype.addWords=function(r){var n=this;Object.entries(r).forEach((function(r){var t=function(r,n){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var i,o,e=t.call(r),a=[];try{for(;(void 0===n||n-- >0)&&!(i=e.next()).done;)a.push(i.value)}catch(r){o={error:r}}finally{try{i&&!i.done&&(t=e.return)&&t.call(e)}finally{if(o)throw o.error}}return a}(r,2),i=t[0],o=t[1];n.dictionary[i]=o}))},r.prototype.getWord=function(r,n,t){void 0===n&&(n=1),void 0===t&&(t="nominative"),n=Math.abs(n);var i=this.dictionary[r];if(!i)throw new Error("Word "+r+" is not defined in dictionary.");var o=i[t];if(!o)throw new Error("Case "+t+" is not defined for word "+r+".");if(1===n||n%1!=0)return o.singular;if("vocative"===t&&(o=i.nominative),"dual"in o){var e=n%10;if(e>=2&&e<=4&&(n<12||n>14))return o.dual}return o.plural},r}(),n=new r;export{r as WordVariationsDictionary,n as wordVariations};
