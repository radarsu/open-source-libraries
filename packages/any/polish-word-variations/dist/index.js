"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var r=function(){function r(){this.dictionary={}}return r.prototype.addWords=function(r){var t=this;Object.entries(r).forEach((function(r){var o=
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
function(r,t){var o="function"==typeof Symbol&&r[Symbol.iterator];if(!o)return r;var i,n,e=o.call(r),a=[];try{for(;(void 0===t||t-- >0)&&!(i=e.next()).done;)a.push(i.value)}catch(r){n={error:r}}finally{try{i&&!i.done&&(o=e.return)&&o.call(e)}finally{if(n)throw n.error}}return a}(r,2),i=o[0],n=o[1];t.dictionary[i]=n}))},r.prototype.getWord=function(r,t,o){void 0===t&&(t=1),void 0===o&&(o="nominative"),t=Math.abs(t);var i=this.dictionary[r];if(!i)throw new Error("Word "+r+" is not defined in dictionary.");var n=i[o];if(!n)throw new Error("Case "+o+" is not defined for word "+r+".");if(1===t||t%1!=0)return n.singular;if("vocative"===o&&(n=i.nominative),"dual"in n){var e=t%10;if(e>=2&&e<=4)return n.dual}return n.plural},r}(),t=new r;exports.WordVariationsDictionary=r,exports.wordVariations=t;
