const getUndefinedProps = body => {
  let undefinedProps = [];

  Object.keys(body).forEach(prop => {
    if (body[prop] === undefined) undefinedProps.push(prop);
  });

  return undefinedProps.length ? undefinedProps : false;
};

module.exports = { getUndefinedProps };
