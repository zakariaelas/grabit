const { Client } = require('@googlemaps/google-maps-services-js');
const maps_client = new Client({});
const config = require('../config');
require('lodash.permutations');
const _ = require('lodash');

const geocode = async (address, place_id) => {
  const response = await maps_client.geocode({
    params: {
      address,
      componentRestrictions: { country: 'ma' },
      key: config.google.secret,
    },
  });
  const location = response.data.results[0].geometry.location;
  return location;
};

const getDistanceBetweenTwoLocations = async (start, destination) => {
  const response = await maps_client.distancematrix({
    params: {
      origins: [start],
      destinations: [destination],
      travelMode: 'DRIVING',
      key: config.google.secret,
    },
  });
  const { duration, distance } = response.data.rows[0].elements[0];
  return { duration, distance };
};

const getDistanceMatrix = async (vertices) => {
  let distanceMatrix = await Promise.all(
    vertices.map((vertex) =>
      Promise.all(
        vertices.map((destination) =>
          getDistanceBetweenTwoLocations(vertex, destination),
        ),
      ),
    ),
  );
  distanceMatrix = distanceMatrix.map((row) =>
    row.map((point) => point.distance.value),
  );
  return distanceMatrix;
};

const tspSolver = (graph, start) => {
  const vertices = [...Array(graph.length).keys()].slice(1);
  let min_path = Number.POSITIVE_INFINITY;
  let best_permutation = [];
  let permutations = _.permutations(vertices, vertices.length);
  for (let i = 0; i < permutations.length; i++) {
    let curr_permutation = permutations[i];
    let curr_path_sum = 0;
    let k = start;
    for (let j = 0; j < curr_permutation.length; j++) {
      curr_path_sum += graph[k][curr_permutation[j]];
      k = curr_permutation[j];
    }
    if (min_path > curr_path_sum) {
      min_path = curr_path_sum;
      best_permutation = curr_permutation;
    }
    min_path = Math.min(min_path, curr_path_sum);
  }
  return best_permutation;
};

const getOptimizedPath = async (points, start) => {
  const distanceMatrix = await getDistanceMatrix(points);
  return tspSolver(distanceMatrix, start);
};

module.exports = {
  geocode,
  getDistanceBetweenTwoLocations,
  getDistanceMatrix,
  tspSolver,
  getOptimizedPath,
};
