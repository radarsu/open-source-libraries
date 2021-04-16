"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var r=function(){function r(){this.dictionary={}}return r.prototype.addWords=function(r){var i=this;Object.entries(r).forEach((function(r){var t=
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
function(r,i){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var o,n,e=t.call(r),a=[];try{for(;(void 0===i||i-- >0)&&!(o=e.next()).done;)a.push(o.value)}catch(r){n={error:r}}finally{try{o&&!o.done&&(t=e.return)&&t.call(e)}finally{if(n)throw n.error}}return a}(r,2),o=t[0],n=t[1];i.dictionary[o]=n}))},r.prototype.getWord=function(r,i,t){void 0===i&&(i=1),void 0===t&&(t="nominative"),i=Math.abs(i);var o=this.dictionary[r];if(!o)throw new Error("Word "+r+" is not defined in dictionary.");var n=o[t];if(!n)throw new Error("Case "+t+" is not defined for word "+r+".");if(1===i)return n.singular;if(i%1!=0){if(!o.genitive)throw new Error('Genitive form of word "'+n.singular+'" is required to support floats.');return i<2?o.genitive.singular:n.plural}if("vocative"===t&&(n=o.nominative),"dual"in n){var e=i%10;if(e>=2&&e<=4&&(i<12||i>14))return n.dual}return n.plural},r}(),i=new r;exports.WordVariationsDictionary=r,exports.wordVariations=i;
