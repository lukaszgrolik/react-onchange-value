# getValue

Helper function for retrieving `e.target.value`.

```js
import {getValue} from 'react-onchange-value';

{/* text input */}
<input onChange={e => {
  const value = getValue(e);
}} />

{/* radio group */}
const onChange = e => {
  const value = getValue(e);
};

<input type="radio" name="foo" value="a" onChange={onChange} />
<input type="radio" name="foo" value="b" onChange={onChange} />

{/* select (single) */}
<select onChange={e => {
  const value = getValue(e);
}}>
  {/* ... */}
</select>
```

# getCheckboxValue

Helper function for retrieving `e.target.checked`.


```js
import {getCheckboxValue} from 'react-onchange-value';

{/* single checkbox */}
<input type="checkbox" onChange={e => {
  const value = getCheckboxValue(e);
}} />
```

# getMultiSelectValue

Retrieves array of selected options' values.

```js
import {getMultiSelectValue} from 'react-onchange-value';

{/* multi select */}
<select multiple="true" onChange={e => {
  const value = getMultiSelectValue(e);
}}>
  {/* ... */}
</select>
```

# getCheckboxGroupValue

Retrieves array of checked checkboxes' values. Requires array containing values checked currently.

```js
import {getCheckboxGroupValue} from 'react-onchange-value';

{/* checkbox group */}
const checkboxGroupValue = [];
const onChange = e => {
  const value = getCheckboxGroupValue(e, checkboxGroupValue);
};

<input type="checkbox" name="foo" value="a" onChange={onChange}>
<input type="checkbox" name="foo" value="b" onChange={onChange}>
<input type="checkbox" name="foo" value="c" onChange={onChange}>
```