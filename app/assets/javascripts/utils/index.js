Number.prototype.between = function (start, finish) {
  return this >= start && this < finish
};

function b64DecodeUnicode(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

Number.prototype.times = function (callback) {
  let A;

  A = new Array(this);

  for (let i = 0; i < this; i++) {
    A[i] = callback.call(A,i);
  }

  return A;
};

String.prototype.humanize = function() {
  return this.toString().toLowerCase()
    .replace(/[_-]/g, ' ')
    .replace(/(?:^|\s)\S/g, a => a.toUpperCase());
};

Array.prototype.last = function () {
  return this[this.length - 1]
};

function changeValue(key, value) {
  const obj = new Object(this);
  const keywords = key.split('.');
  return keywords.reduce((obj,key, i) => {
    if (i+1 === keywords.length) { obj[key] = value; return obj }
    return obj[key]
  },obj);
}
