const bcrypt = require('bcrypt');

/**
 * Hash a given item with bcrypt
 * @param {String} item
 * @returns {String} hashed item
 */
const hashItem = async (item) => bcrypt.hash(item, parseInt(process.env.SALTROUNDS, 10));

/**
 * Compares a given pair of items and check
 * if those items are equal
 * @param {String} plain item
 * @param {String} hashed item
 * @returns {Boolean} items are equal?
 */
const validateItem = async (plainItem, hashedItem) => bcrypt.compare(plainItem, hashedItem);

module.exports = {
  hashItem,
  validateItem,
};
