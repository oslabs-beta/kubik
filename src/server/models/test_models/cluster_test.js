const mongoose = require('mongoose');

const clusterSchema = mongoose.Schema({
  clusterName: {
    type: String,
    lowercase: true,
    required: true,
  },
  clusterUrl: {
    type: String,
    lowercase: true,
    required: true,
  },
});

const Cluster = mongoose.model('Cluster', clusterSchema);

module.exports = Cluster;
