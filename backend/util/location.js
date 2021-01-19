const axios = require('axios');

const HttpError = require('../models/http-error');

const { GOOGLE_API_KEY } = process.env;

async function getCoordsForAddress(address) {
  console.log(GOOGLE_API_KEY);
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${GOOGLE_API_KEY}`
  );

  console.log(response);

  const data = response.data;

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;
