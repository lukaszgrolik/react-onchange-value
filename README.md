# react-onchange-value

Helpers for retrieving form fields' values in React

## #getValue(e)

Helper function for retrieving `e.target.value`.

```js
import {getValue} from 'react-onchange-value';

// text input

<input value={...} onChange={e => {
  getValue(e);
  // => *some string*
}} />

// radio group

const handleChange = e => {
  getValue(e);
  // => "a" or "b"
};

<input type="radio" name="foo" value="a" onChange={handleChange} />
<input type="radio" name="foo" value="b" onChange={handleChange} />

// select (single)

<select onChange={e => {
  getValue(e);
  // => "a", "b" or "c"
}}>
  <option value="a">A</option>
  <option value="b">B</option>
  <option value="c">C</option>
</select>
```

## #getCheckboxValue(e)

Helper function for retrieving `e.target.checked`.


```js
import {getCheckboxValue} from 'react-onchange-value';

<input type="checkbox" checked={...} onChange={e => {
  getCheckboxValue(e);
  // => true or false
}} />
```

## #getMultiSelectValue(e)

Retrieves array of selected options' values.

```js
import {getMultiSelectValue} from 'react-onchange-value';

const multiSelectValue = ['a'];

<select multiple="true" value={multiSelectValue} onChange={e => {
  getMultiSelectValue(e);
  // value examples:
  // => []
  // => ['a', 'b']
}}>
  <option value="a">A</option>
  <option value="b">B</option>
  <option value="c">C</option>
</select>
```

## #getCheckboxGroupValue(e, values, options)

Retrieves either array or object with checkboxes' values. Requires either array or object containing values checked currently:
- if array given, it adds value if checkbox is checked and removes value if checkbox is unchecked
- if object given, it adds `{[key]: true}` pair where key has the name of checked checkbox' value; if checkbox is unchecked, it either sets the value to false (default) or removes key-value pair (`deleteFalsy` option set to `true`)

```js
import {getCheckboxGroupValue} from 'react-onchange-value';

const checkboxGroupValue = ['b'] // or {b: true};
const handleChange = e => {
  getCheckboxGroupValue(e, checkboxGroupValue);
  // value examples if array given:
  // => ['a', 'b']
  // => []
  // value examples if object given:
  // => {b: true, a: true}
  // => {} (if deleteFalsy=true)
  // => {b: false}
  // => {c: true} (if deleteFalsy=true)
};

<input type="checkbox" name="foo" value="a" onChange={handleChange}>
<input type="checkbox" name="foo" value="b" onChange={handleChange} checked="true">
<input type="checkbox" name="foo" value="c" onChange={handleChange}>
```