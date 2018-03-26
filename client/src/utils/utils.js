
// array containing names of months
const months = ['January','February','March','April','May','June','July','August','September','October',
'November', 'December'];

//array containing names of days in a week
const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

/**
 * Gets the current local date
 * @returns {Date} 
 */
const getCurrentDate = () => new Date();

/**
 * Returns current date in a beautified format
 * @returns {String} Monday, 21 September 2018
 */
const getCurrentBeautifiedDate = () => beautifyDate(getCurrentDate());

/**
 * Beautifies the date param passed
 * @param {String|Date|Number} Date representation in String, Date or Number
 * 
 * @returns {String} Monday, 21 September 2018
 */
const beautifyDate = date => {
  const d = new Date(date);
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export {
  getCurrentDate,
  getCurrentBeautifiedDate,
  beautifyDate
};
