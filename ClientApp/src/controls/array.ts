export function toArray(values: string | string[]): string[] {
  let result = [];


  if (values instanceof (Array)) {
    values.forEach(v => result.push(v));
  } else {
    result.push(values);
  }

  return result;
}


export function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export function sum<T = number>(array: T[], func: (v: T) => number) {
  let sum = 0;
  for(const i of array){
    sum += func(i);
  }
  return sum;
}
