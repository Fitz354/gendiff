import render from '../src/render';
import Unchanged from '../src/diff/Unchanged';
import Changed from '../src/diff/Changed';
import Deleted from '../src/diff/Deleted';
import Added from '../src/diff/Added';
import Diff from '../src/diff/Diff';


test('check render', () => {
  const expected = new Diff('', [
    new Changed('host', 'hexlet.io', 'hexlet'),
    new Unchanged('timeout', 50),
    new Unchanged('group1', [
      new Unchanged('val1', 10),
      new Deleted('val3', false),
      new Added('val2', true),
      new Added('group2', { val3: 'value' }),
    ]),
    new Changed('group5', { a: 10 }, 20),
  ]);

  const before = {
    host: 'hexlet.io',
    timeout: 50,
    group1: {
      val1: 10,
      val3: false,
    },
    group5: {
      a: 10,
    },
  };

  const after = {
    host: 'hexlet',
    timeout: 50,
    group1: {
      val1: 10,
      val2: true,
      group2: {
        val3: 'value',
      },
    },
    group5: 20,
  };

  expect(render(before, after)).toEqual(expected);
});
