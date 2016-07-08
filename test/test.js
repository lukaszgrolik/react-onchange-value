const should = require('should');
const React = require('react');
const h = require('react-hyperscript');
const TestUtils = require('react-addons-test-utils');

const reactOnChangeValue = require('../dist/react-onchange-value' + (process.env.NODE_ENV === 'production' ? '.min' : ''));

const {getValue, getCheckboxValue, getCheckboxGroupValue, getMultiSelectValue} = reactOnChangeValue;

describe('getValue', () => {
  it('gets input value', () => {
    let val;
    const comp = h('input', {
      value: '',
      onChange: e => {
        val = getValue(e);
      },
    });
    const el = TestUtils.renderIntoDocument(comp);
    el.value = 123;

    TestUtils.Simulate.change(el)
    val.should.equal('123');
  });
});

describe('getCheckboxValue', () => {
  it('gets checkbox value', () => {
    let val;
    const comp = h('input', {
      type: 'checkbox',
      checked: false,
      onChange: e => {
        val = getCheckboxValue(e);
      },
    });
    const el = TestUtils.renderIntoDocument(comp);
    el.checked = true;

    TestUtils.Simulate.change(el)
    val.should.equal(true);
  });
});

describe('getMultiSelectValue', () => {
  it('gets multi select value', () => {
    let val = [];
    const opts = [
      {value: 'a', text: 'aaa'},
      {value: 'b', text: 'bbb'},
      {value: 'c', text: 'ccc'},
    ];
    const comp = h('select', {
      multiple: true,
      value: val,
      onChange: e => {
        val = getMultiSelectValue(e);
      },
    }, [
      opts.map((opt, i) => {
        return h('option', {
          key: opt.value,
          value: opt.value,
          className: `opt_${i + 1}`,
        }, opt.text);
      }),
    ]);
    const el = TestUtils.renderIntoDocument(comp);

    const opt1 = el.querySelector('.opt_1');
    const opt2 = el.querySelector('.opt_2');
    const opt3 = el.querySelector('.opt_3');

    opt1.selected = true;
    opt2.selected = true;
    TestUtils.Simulate.change(el);

    val.should.have.length(2);
    val.should.containDeepOrdered(['a', 'b']);

    // change event clears selected options
    opt2.selected = true;
    opt3.selected = true;
    TestUtils.Simulate.change(el);

    val.should.have.length(2);
    val.should.containDeepOrdered(['b', 'c']);
  });
});

describe('getCheckboxGroupValue', () => {
  it('gets checkbox group value as array', () => {
    let val = [];
    const comp = h('div', [
      h('input', {
        type: 'checkbox',
        name: 'foo',
        className: 'ch_a',
        value: 'a',
        onChange: e => {
          val = getCheckboxGroupValue(e, val);
        },
      }),
      h('input', {
        type: 'checkbox',
        name: 'foo',
        className: 'ch_b',
        value: 'b',
        onChange: e => {
          val = getCheckboxGroupValue(e, val);
        },
      }),
      h('input', {
        type: 'checkbox',
        name: 'foo',
        className: 'ch_c',
        value: 'c',
        onChange: e => {
          val = getCheckboxGroupValue(e, val);
        },
      }),
    ]);
    const el = TestUtils.renderIntoDocument(comp);

    const ch1 = el.querySelector('.ch_a');
    const ch2 = el.querySelector('.ch_b');
    const ch3 = el.querySelector('.ch_c');

    ch1.checked = true;
    TestUtils.Simulate.change(ch1);

    ch2.checked = true;
    TestUtils.Simulate.change(ch2);

    val.should.have.length(2);
    val.should.containDeepOrdered(['a', 'b']);

    ch1.checked = false;
    TestUtils.Simulate.change(ch1);

    ch3.checked = true;
    TestUtils.Simulate.change(ch3);

    val.should.have.length(2);
    val.should.containDeepOrdered(['b', 'c']);
  });

  it('gets checkbox group value as object', () => {
    let val = {};
    const comp = h('div', [
      h('input', {
        type: 'checkbox',
        name: 'foo',
        className: 'ch_a',
        value: 'a',
        onChange: e => {
          val = getCheckboxGroupValue(e, val);
        },
      }),
      h('input', {
        type: 'checkbox',
        name: 'foo',
        className: 'ch_b',
        value: 'b',
        onChange: e => {
          val = getCheckboxGroupValue(e, val);
        },
      }),
      h('input', {
        type: 'checkbox',
        name: 'foo',
        className: 'ch_c',
        value: 'c',
        onChange: e => {
          val = getCheckboxGroupValue(e, val);
        },
      }),
    ]);
    const el = TestUtils.renderIntoDocument(comp);

    const ch1 = el.querySelector('.ch_a');
    const ch2 = el.querySelector('.ch_b');
    const ch3 = el.querySelector('.ch_c');

    ch1.checked = true;
    TestUtils.Simulate.change(ch1);

    ch2.checked = true;
    TestUtils.Simulate.change(ch2);

    Object.keys(val).should.have.length(2);
    val.should.have.properties({a: true, b: true});

    ch1.checked = false;
    TestUtils.Simulate.change(ch1);

    ch3.checked = true;
    TestUtils.Simulate.change(ch3);

    Object.keys(val).should.have.length(3);
    val.should.have.properties({a: false, b: true, c: true});
  });

  it('gets checkbox group value as object without falsy values', () => {
    let val = {};
    const comp = h('div', [
      h('input', {
        type: 'checkbox',
        name: 'foo',
        className: 'ch_a',
        value: 'a',
        onChange: e => {
          val = getCheckboxGroupValue(e, val, {deleteFalsy: true});
        },
      }),
      h('input', {
        type: 'checkbox',
        name: 'foo',
        className: 'ch_b',
        value: 'b',
        onChange: e => {
          val = getCheckboxGroupValue(e, val, {deleteFalsy: true});
        },
      }),
      h('input', {
        type: 'checkbox',
        name: 'foo',
        className: 'ch_c',
        value: 'c',
        onChange: e => {
          val = getCheckboxGroupValue(e, val, {deleteFalsy: true});
        },
      }),
    ]);
    const el = TestUtils.renderIntoDocument(comp);

    const ch1 = el.querySelector('.ch_a');
    const ch2 = el.querySelector('.ch_b');
    const ch3 = el.querySelector('.ch_c');

    ch1.checked = true;
    TestUtils.Simulate.change(ch1);

    ch2.checked = true;
    TestUtils.Simulate.change(ch2);

    Object.keys(val).should.have.length(2);
    val.should.have.properties({a: true, b: true});

    ch1.checked = false;
    TestUtils.Simulate.change(ch1);

    ch3.checked = true;
    TestUtils.Simulate.change(ch3);

    Object.keys(val).should.have.length(2);
    val.should.have.properties({b: true, c: true});
  });
});