const formater = (obj) => {
  const { status, key, oldValue, newValue, spaces } = obj;
  let sign = '';
  if (status === 'updated') return `${' '.repeat(spaces)}- ${key}: ${oldValue}
${' '.repeat(spaces)}+ ${key}: ${newValue}`;
  else if (status === 'same') sign = ' ';
  else if (status === 'rejected') sign = '-';
  else if (status === 'added') sign = '+';
  return `${' '.repeat(spaces)}${sign} ${key}: ${typeof(oldValue) === 'object' ? JSON.stringify(oldValue, ' ', 5) : oldValue
  }`;
};

export default formater;