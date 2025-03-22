/**
 * Обрабатывает данные компании и возвращает результат.
 * @param {Object} item
 * @param {string} photoUrl
 * @return {Object}
 */
function parseOne(item, photoUrl) {
    if (!item) return null;
    
    const company = item.toObject ? item.toObject() : item;
    
    return {
      ...company,
      photos: (company.photos || []).map((photo) => ({
        ...photo,
        name: `${photoUrl}static/${photo.name}`,
        thumbpath: `${photoUrl}static/${photo.thumbpath}`,
      })),
    };
  }
  
  /**
   * Processes a list of companies and returns the result.
   * @param {Array} items
   * @param {string} photoUrl
   * @return {Array}
   */
  function parseMany(items, photoUrl) {
    return items.map(item => parseOne(item, photoUrl));
  }
  
  module.exports = { parseOne, parseMany };