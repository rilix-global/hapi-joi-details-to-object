const joiDetailstoObject = (details) => {
  const obj = {};
  details.forEach((detail) => {
    const { message, ...messageLessDetail } = detail;
    const path = detail.path.split('.');
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
