function deepClone(object) {
  if (typeof object !== 'object') {
    return object;
  }

  if (typeof object === 'object' && object.constructor === Array) {
    const arr = [];
    object.forEach(item => arr.push(deepClone(item)));
    return arr;
  }

  const obj = {};
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      obj[key] = deepClone(object[key]);
    }
  }
  return obj;
}

const data = {
  m: 1,
  t: 'dd',
  d: { t: 1 },
  arr: [1, 1, 3],
};

const result = deepClone(data);
console.log('result', result);
