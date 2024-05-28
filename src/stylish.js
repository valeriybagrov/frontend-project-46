const formater = (obj) => {
  const { status, key, value, newValue, spaces } = obj;
  let sign = '';
  if (status === 'updated') return `${' '.repeat(spaces)}- ${key}: ${value}
${' '.repeat(spaces)}+ ${key}: ${newValue}`;
  else if (status === 'same') sign = ' ';
  else if (status === 'rejected') sign = '-';
  else if (status === 'added') sign = '+';
  return `${' '.repeat(spaces)}${sign} ${key}: ${typeof(value) === 'object' ? JSON.stringify(value, ' ', 5) : value
  }`;
};

export default formater;