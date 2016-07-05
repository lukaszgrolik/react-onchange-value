export const getValue = e => {
  return e.target.value;
};

export const getCheckboxValue = e => {
  return e.target.checked;
};

export const getMultiSelectValue = e => {
  var options = e.target.options;
  var value = [];

  for (let i = 0, l = options.length; i < l; i++) {
    if (options[i].selected) {
      value.push(options[i].value);
    }
  }

  return value;
};

export const getCheckboxGroupValue = (e, values, opts = {}) => {
  if (values instanceof Object === false) {
    throw new Error(`Either object or array required, ${values} given`);
  }

  if (values instanceof Array) {
    if (values.includes(e.target.value) === false) {
      values.push(e.target.value);
    } else {
      const index = values.indexOf(e.target.value);

      values.splice(index, 1);
    }
  } else if (values instanceof Object) {
    if (!values[e.target.value]) {
      values[e.target.value] = true;
    } else {
      if (opts.deleteFalsy) {
        delete values[e.target.value];
      } else {
        values[e.target.value] = false;
      }
    }
  }

  return values;
};