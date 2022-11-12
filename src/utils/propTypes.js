import PropTypes from 'prop-types';

export const itemPropTypes = PropTypes.shape({
  "_id": PropTypes.string.isRequired,
  "name": PropTypes.string.isRequired,
  "type": PropTypes.string.isRequired,
  "price": PropTypes.number.isRequired,
  "image": PropTypes.string.isRequired,
});
