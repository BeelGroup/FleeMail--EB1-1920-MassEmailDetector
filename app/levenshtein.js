// This is a slightly modified version of the Levenshtein Distance
// module from Christoph Schulz's edit-distance library
// <https://github.com/schulzch/edit-distance-js>.
//
// The library is licenced under the Apache 2.0 License
// SPDX-License-Identifier: Apache-2.0
//
// Adjustments were made to enable the calculation of edit distances
// over lists as well as strings.

var Mapping, levenshtein, levenshteinBt, ref, trackedMin, zero;

ref = require('./levenshtein_util'), Mapping = ref.Mapping, zero = ref.zero, trackedMin = ref.trackedMin;

levenshtein = function(stringA, stringB, insertCb, removeCb, updateCb) {
  var a, aC, b, bC, dist, distance, i, j, k, l, m, min, n, ref1, ref2, ref3, ref4, track;
  a = stringA;
  b = stringB;
  track = zero(a.length + 1, b.length + 1);
  dist = zero(a.length + 1, b.length + 1);
  for (i = k = 1, ref1 = a.length; k <= ref1; i = k += 1) {
    dist[i][0] = i;
  }
  for (j = l = 1, ref2 = b.length; l <= ref2; j = l += 1) {
    dist[0][j] = j;
  }
  for (i = m = 1, ref3 = a.length; m <= ref3; i = m += 1) {
    for (j = n = 1, ref4 = b.length; n <= ref4; j = n += 1) {
      aC = a[i - 1];
      bC = b[j - 1];
      min = trackedMin(dist[i - 1][j] + removeCb(aC), dist[i][j - 1] + insertCb(bC), dist[i - 1][j - 1] + updateCb(aC, bC));
      track[i][j] = min.index;
      dist[i][j] = min.value;
    }
  }
  distance = dist[a.length][b.length];
  return new Mapping(a, b, distance, track, levenshteinBt);
};

levenshteinBt = function(a, b, track) {
  var i, j, mapping;
  i = a.length;
  j = b.length;
  mapping = [];
  while (i > 0 && j > 0) {
    switch (track[i][j]) {
      case 0:
        mapping.push([a[i - 1], null]);
        --i;
        break;
      case 1:
        mapping.push([null, b[j - 1]]);
        --j;
        break;
      case 2:
        mapping.push([a[i - 1], b[j - 1]]);
        --i;
        --j;
        break;
      default:
        throw new Error("Invalid operation " + track[i][j] + " at (" + i + ", " + j + ")");
    }
  }
  if (i === 0 && j !== 0) {
    while (j > 0) {
      mapping.push([null, b[j - 1]]);
      --j;
    }
  }
  if (i !== 0 && j === 0) {
    while (i > 0) {
      mapping.push([a[i - 1], null]);
      --i;
    }
  }
  return mapping;
};

module.exports = levenshtein;
