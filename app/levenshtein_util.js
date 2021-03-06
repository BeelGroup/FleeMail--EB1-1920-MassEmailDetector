// This file was copied from Christoph Schulz's edit-distance library
// <https://github.com/schulzch/edit-distance-js>, where it is included
// as util.js.
//
// The library is licenced under the Apache 2.0 License
// SPDX-License-Identifier: Apache-2.0

var Mapping,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports.Mapping = Mapping = (function() {
  function Mapping(a1, b1, distance, track, backtrackFn) {
    this.a = a1;
    this.b = b1;
    this.distance = distance;
    this.track = track;
    this.backtrackFn = backtrackFn;
    this.alignment = bind(this.alignment, this);
    this.pairs = bind(this.pairs, this);
    this.pairCache = null;
  }

  Mapping.prototype.pairs = function() {
    if (this.pairCache == null) {
      this.pairCache = this.backtrackFn(this.a, this.b, this.track);
    }
    return this.pairCache;
  };

  Mapping.prototype.alignment = function() {
    var alignmentA, alignmentB, k, len, pair, pairs, ref;
    pairs = this.pairs();
    alignmentA = [];
    alignmentB = [];
    ref = pairs.reverse();
    for (k = 0, len = ref.length; k < len; k++) {
      pair = ref[k];
      alignmentA.push(pair[0]);
      alignmentB.push(pair[1]);
    }
    return {
      alignmentA: alignmentA,
      alignmentB: alignmentB
    };
  };

  return Mapping;

})();

module.exports.zero = function(width, height) {
  var i, j, k, l, ref, ref1, x, y;
  x = new Array(width);
  for (i = k = 0, ref = width; k < ref; i = k += 1) {
    y = x[i] = new Array(height);
    for (j = l = 0, ref1 = height; l < ref1; j = l += 1) {
      y[j] = 0;
    }
  }
  return x;
};

module.exports.trackedMin = function(a, b, c) {
  var min;
  min = {
    value: a,
    index: 0 | 0
  };
  if (b < min.value) {
    min.value = b;
    min.index = 1 | 0;
  }
  if (c < min.value) {
    min.value = c;
    min.index = 2 | 0;
  }
  return min;
};
