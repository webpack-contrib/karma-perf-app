import { OrderByPipe } from './order-by.pipe';

describe('Pipe: OrderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  const testArray = [
    {id: 1, name: 'Apple', amount: 245},
    {id: 2, name: 'Orange', amount: 113},
    {id: 3, name: 'Pear', amount: 6},
    {id: 4, name: 'Plum', amount: 33}
  ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it ('Should return dates in order asc', () => {
    const a = new Date();
    const b = new Date();
    expect(pipe.transform([a, b], '+')).toEqual([a, b]);
  });

  it ('Should return numbers in order asc', () => {
    const numbers = [0, -1, 345, 1234, 1337, -3];
    expect(pipe.transform(numbers, '+')).toEqual([-3, -1, 0, 345, 1234, 1337]);
  });

  it('Should not do anything in-case of not an array', () => {
    expect(pipe.transform('foo')).toEqual('foo');
    expect(pipe.transform(null)).toEqual(null);
    expect(pipe.transform(undefined)).toEqual(undefined);
    expect(pipe.transform(42)).toEqual(42);
    expect(pipe.transform({foo: 1, bar: 2})).toEqual({foo: 1, bar: 2});
  });

  it('Should create a new version of the array', () => {
    const arr = [3, 2, 1];
    expect(pipe.transform(arr)).toEqual([1, 2, 3]);
    expect(arr).toEqual([3, 2, 1]);
  });

  it('Should order by value if there is no config', () => {
    expect(pipe.transform([3, 2, 1])).toEqual([1, 2, 3]);
    expect(pipe.transform(['c', 'b', 'a'])).toEqual(['a', 'b', 'c']);
  });

  it('Should order by reverse value if there a stringy value of `-`', () => {
    expect(pipe.transform([3, 2, 1], '-')).toEqual([3, 2, 1]);
    expect(pipe.transform(['c', 'b', 'a'], '-')).toEqual(['c', 'b', 'a']);
    expect(pipe.transform([1, 2, 3], '-')).toEqual([3, 2, 1]);
    expect(pipe.transform(['a', 'b', 'c'], '-')).toEqual(['c', 'b', 'a']);
  });

  it('Should order by value if there a stringy value of `+`', () => {
    expect(pipe.transform([3, 2, 1], '+')).toEqual([1, 2, 3]);
    expect(pipe.transform(['c', 'b', 'a'], '+')).toEqual(['a', 'b', 'c']);
  });

  it('Should order by property with a single character name', () => {
    expect(pipe.transform([{a: 1}, {a: 3}, {a: 42}, {a: 2}], 'a'))
      .toEqual([{a: 1}, {a: 2}, {a: 3}, {a: 42}]);

    expect(pipe.transform([{a: 1}, {a: 3}, {a: 42}, {a: 2}], '+a'))
      .toEqual([{a: 1}, {a: 2}, {a: 3}, {a: 42}]);

    expect(pipe.transform([{a: 1}, {a: 3}, {a: 42}, {a: 2}], '-a'))
      .toEqual([{a: 42}, {a: 3}, {a: 2}, {a: 1}]);
  });

  it('Should order by property if there a stringy value of `+property` or `property`', () => {
    expect(pipe.transform(testArray, 'amount')).toEqual([
      {id: 3, name: 'Pear', amount: 6},
      {id: 4, name: 'Plum', amount: 33},
      {id: 2, name: 'Orange', amount: 113},
      {id: 1, name: 'Apple', amount: 245}
    ]);

    expect(pipe.transform(testArray, '+amount')).toEqual([
      {id: 3, name: 'Pear', amount: 6},
      {id: 4, name: 'Plum', amount: 33},
      {id: 2, name: 'Orange', amount: 113},
      {id: 1, name: 'Apple', amount: 245}
    ]);
  });

  it('Should order by a property of type boolean', () => {
    expect(pipe.transform([
      {id: 1, value: false},
      {id: 2, value: true},
      {id: 3, value: false},
      {id: 4, value: true},
    ], 'value')).toEqual([
      {id: 1, value: false},
      {id: 3, value: false},
      {id: 2, value: true},
      {id: 4, value: true},
    ]);
  });

  it('Should order by a property of type date', () => {
    const curr = new Date;
    expect(pipe.transform([
      {id: 1, value: new Date(curr.getTime() + 3)},
      {id: 2, value: new Date(curr.getTime() + 2)},
      {id: 3, value: new Date(curr.getTime() + 1)},
      {id: 4, value: new Date(curr.getTime() + 4)},
    ], 'value')).toEqual([
      {id: 3, value: new Date(curr.getTime() + 1)},
      {id: 2, value: new Date(curr.getTime() + 2)},
      {id: 1, value: new Date(curr.getTime() + 3)},
      {id: 4, value: new Date(curr.getTime() + 4)},
    ]);
  });

  it('Should order by property if there a stringy value of `+property` or `property`', () => {
    expect(pipe.transform(testArray, 'amount')).toEqual([
      {id: 3, name: 'Pear', amount: 6},
      {id: 4, name: 'Plum', amount: 33},
      {id: 2, name: 'Orange', amount: 113},
      {id: 1, name: 'Apple', amount: 245}
    ]);
  });

  it('Should reverse order by property if there a stringy value of `-property`', () => {
    expect(pipe.transform(testArray, '-amount')).toEqual([
      {id: 1, name: 'Apple', amount: 245},
      {id: 2, name: 'Orange', amount: 113},
      {id: 4, name: 'Plum', amount: 33},
      {id: 3, name: 'Pear', amount: 6}
    ]);
  });

  it('Should reverse order by multiple properties if there an array values', () => {
    expect(pipe.transform([
      {id: 4, name: 'Plum', amount: 33},
      {id: 2, name: 'Orange', amount: 33},
      {id: 3, name: 'Pear', amount: 6},
      {id: 1, name: 'Apple', amount: 6}
    ], ['amount', '+id'])).toEqual([
      {id: 1, name: 'Apple', amount: 6},
      {id: 3, name: 'Pear', amount: 6},
      {id: 2, name: 'Orange', amount: 33},
      {id: 4, name: 'Plum', amount: 33}
    ]);
  });


  it('Should reverse order by multiple properties if there an array values', () => {
    expect(pipe.transform([
      {id: 4, name: 'Plum', amount: 33},
      {id: 2, name: 'Orange', amount: 33},
      {id: 3, name: 'Pear', amount: 6},
      {id: 1, name: 'Apple', amount: 6}
    ], ['amount'])).toEqual([
      {id: 3, name: 'Pear', amount: 6},
      {id: 1, name: 'Apple', amount: 6},
      {id: 4, name: 'Plum', amount: 33},
      {id: 2, name: 'Orange', amount: 33}
    ]);
  });

  it('Should reverse order by multiple properties if there an array values', () => {
    expect(pipe.transform([
      {id: 2, name: 'b', amount: 33},
      {id: 2, name: 'a', amount: 33},
      {id: 1, name: 'd', amount: 6},
      {id: 1, name: 'c', amount: 6}
    ], ['amount', '+id', '-name'])).toEqual([
      {id: 1, name: 'd', amount: 6},
      {id: 1, name: 'c', amount: 6},
      {id: 2, name: 'b', amount: 33},
      {id: 2, name: 'a', amount: 33}
    ]);
  });

  it('Should order by deep property', () => {
    expect(pipe.transform([
      {id: 1, name: 'Apple', amount: 245, deep: {prop: 4}},
      {id: 2, name: 'Orange', amount: 113, deep: {prop: 2}},
      {id: 3, name: 'Pear', amount: 6, deep: {prop: 1}},
      {id: 4, name: 'Plum', amount: 33, deep: {prop: 3}}
    ], ['deep.prop'])).toEqual([
      {id: 3, name: 'Pear', amount: 6, deep: {prop: 1}},
      {id: 2, name: 'Orange', amount: 113, deep: {prop: 2}},
      {id: 4, name: 'Plum', amount: 33, deep: {prop: 3}},
      {id: 1, name: 'Apple', amount: 245, deep: {prop: 4}}
    ]);
  });

  it('Should order by deep property', () => {
    expect(pipe.transform([
      {id: 1, name: 'Apple', amount: 245, deep: {prop: 4}},
      {id: 2, name: 'Orange', amount: 113, deep: {prop: 2}},
      {id: 3, name: 'Pear', amount: 6, deep: {prop: 1}},
      {id: 4, name: 'Plum', amount: 33, deep: {prop: 3}}
    ], ['-deep.prop'])).toEqual([
      {id: 1, name: 'Apple', amount: 245, deep: {prop: 4}},
      {id: 4, name: 'Plum', amount: 33, deep: {prop: 3}},
      {id: 2, name: 'Orange', amount: 113, deep: {prop: 2}},
      {id: 3, name: 'Pear', amount: 6, deep: {prop: 1}}
    ]);
  });

  it('Should order by deep property even if missing', () => {
    expect(pipe.transform([
      {id: 1, name: 'Apple', amount: 245, deep: {prop: { val: 3}}},
      {id: 2, name: 'Orange', amount: 113, deep: {}},
      {id: 3, name: 'Pear', amount: 6, deep: {prop: {val: 2}}},
      {id: 4, name: 'Plum', amount: 33, deep: {}},
      {id: 5, name: 'Other', amount: 33, deep: {prop: { val: 4 }}},
      {id: 6, name: 'Other 2', amount: 33, deep: {}},
      {id: 7, name: 'Other 3', amount: 33, deep: {prop: {val: 1}}},
    ], ['deep.prop.val'])).toEqual([
      {id: 7, name: 'Other 3', amount: 33, deep: {prop: {val: 1}}},
      {id: 3, name: 'Pear', amount: 6, deep: {prop: {val: 2}}},
      {id: 1, name: 'Apple', amount: 245, deep: {prop: { val: 3}}},
      {id: 5, name: 'Other', amount: 33, deep: {prop: {val: 4}}},
      {id: 2, name: 'Orange', amount: 113, deep: {}},
      {id: 4, name: 'Plum', amount: 33, deep: {}},
      {id: 6, name: 'Other 2', amount: 33, deep: {}},
    ]);
  });

  it('Should order by deep property even if missing', () => {
    expect(pipe.transform([
      {id: 1, name: 'Apple', amount: 245, deep: {prop: { val: 3}}},
      {id: 2, name: 'Orange', amount: 113, deep: {}},
      {id: 3, name: 'Pear', amount: 6, deep: {prop: {val: 2}}},
      {id: 4, name: 'Plum', amount: 33, deep: {}},
      {id: 5, name: 'Other', amount: 33, deep: {prop: { val: 4 }}},
      {id: 6, name: 'Other 2', amount: 33, deep: {}},
      {id: 7, name: 'Other 3', amount: 33, deep: {prop: {val: 1}}},
    ], ['-deep.prop.val'])).toEqual([
      {id: 5, name: 'Other', amount: 33, deep: {prop: {val: 4}}},
      {id: 1, name: 'Apple', amount: 245, deep: {prop: { val: 3}}},
      {id: 3, name: 'Pear', amount: 6, deep: {prop: {val: 2}}},
      {id: 7, name: 'Other 3', amount: 33, deep: {prop: {val: 1}}},
      {id: 2, name: 'Orange', amount: 113, deep: {}},
      {id: 4, name: 'Plum', amount: 33, deep: {}},
      {id: 6, name: 'Other 2', amount: 33, deep: {}},
    ]);
  });

  it('Should order by deep string type property even if missing', () => {
    expect(pipe.transform([
      {id: 1, name: 'Apple', amount: 245, deep: {prop: { val: 'b'}}},
      {id: 2, name: 'Orange', amount: 113, deep: {}},
      {id: 3, name: 'Pear', amount: 6, deep: {prop: {val: ''}}},
      {id: 4, name: 'Plum', amount: 33, deep: {}},
      {id: 5, name: 'Other', amount: 33, deep: {prop: { val: 'c' }}},
      {id: 6, name: 'Other 2', amount: 33, deep: {}},
      {id: 7, name: 'Other 3', amount: 33, deep: {prop: {val: 'a'}}},
    ], ['-deep.prop.val'])).toEqual([
      {id: 5, name: 'Other', amount: 33, deep: {prop: { val: 'c' }}},
      {id: 1, name: 'Apple', amount: 245, deep: {prop : { val: 'b'}}},
      {id: 7, name: 'Other 3', amount: 33, deep: {prop: {val: 'a'}}},
      {id: 3, name: 'Pear', amount: 6, deep: {prop: {val: ''}}},
      {id: 2, name: 'Orange', amount: 113, deep: {}},
      {id: 4, name: 'Plum', amount: 33, deep: {}},
      {id: 6, name: 'Other 2', amount: 33, deep: {}},
    ]);

    expect(pipe.transform([
      {id: 1, name: 'Apple', amount: 245, deep: {prop: { val: 'b'}}},
      {id: 2, name: 'Orange', amount: 113, deep: {}},
      {id: 3, name: 'Pear', amount: 6, deep: {prop: {val: ''}}},
      {id: 4, name: 'Plum', amount: 33, deep: {}},
      {id: 5, name: 'Other', amount: 33, deep: {prop: { val: 'c' }}},
      {id: 6, name: 'Other 2', amount: 33, deep: {}},
      {id: 7, name: 'Other 3', amount: 33, deep: {prop: {val: 'a'}}},
    ], ['deep.prop.val'])).toEqual([
      {id: 7, name: 'Other 3', amount: 33, deep: {prop: {val: 'a'}}},
      {id: 1, name: 'Apple', amount: 245, deep: {prop : { val: 'b'}}},
      {id: 5, name: 'Other', amount: 33, deep: {prop: { val: 'c' }}},
      {id: 3, name: 'Pear', amount: 6, deep: {prop: {val: ''}}},
      {id: 2, name: 'Orange', amount: 113, deep: {}},
      {id: 4, name: 'Plum', amount: 33, deep: {}},
      {id: 6, name: 'Other 2', amount: 33, deep: {}},
    ]);
  });
});
