const joiDetailstoObject = (details) => {
  const obj = {};
  details.forEach((detail) => {
    const { message, ...messageLessDetail } = detail;
    const path = typeof detail.path === 'string' ? detail.path.split('.') : detail.path;
    if (path.length === 1) {
      obj[path[0]] = { messages: [message], ...messageLessDetail };
    }
    else {
      path.reduce((reduced, pathFrang, i, arr) => {
        if (!reduced[pathFrang]) {
          reduced[pathFrang] = {};
        }
        if (i === arr.length - 1) {
          reduced[pathFrang] = { messages: [message], ...messageLessDetail };
        }
        return reduced[pathFrang];
      }, obj);
    }
  });
  return obj;
};


export default joiDetailstoObject;
