const Cluster = require('../models/clusterModel');
const User = require('../models/userModel');

const clusterController = {
  // Middleware for getting a cluster
  getCluster: async (req, res, next) => {
    try {
      if (!req.session.userId) {
        return res.status(401).send('User not logged in');
      }

      const userId = req.session.userId;
      const clusterId = req.params.clusterId;

      const queryOptions = clusterId
        ? {
            path: 'clusters',
            match: { _id: clusterId },
          }
        : 'clusters';

      const user = await User.findById(userId).populate(queryOptions).exec();
      res.locals.clusters = user.clusters;

      if (clusterId) {
        res.locals.clusterUrl = user.clusters[0]?.clusterUrl;
      }

      return next();
    } catch (error) {
      return next(error);
    }
  },

  // Middleware for adding clusters
  addCluster: async (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).send('User not logged in');
    }

    const { clusterName, clusterUrl } = req.body;

    try {
      const newCluster = await Cluster.create({ clusterName, clusterUrl });
      await User.findByIdAndUpdate(
        req.session.userId,
        { $push: { clusters: newCluster._id } },
        { new: true, useFindAndModify: false }
      );

      res.locals.clusterUrl = req.body.clusterUrl;
      return next();
    } catch (error) {
      return next(error);
    }
  },

  // Middleware for deleting clusters
  deleteCluster: async (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).send('User not logged in');
    }

    const clusterId = req.params.clusterId;

    try {
      const user = await User.findById(req.session.userId);
      if (!user || !user.clusters.includes(clusterId)) {
        return res.status(401).send('User does not own this cluster');
      }

      await Cluster.findByIdAndDelete(clusterId);
      const updatedUser = await User.findByIdAndUpdate(
        req.session.userId,
        { $pull: { clusters: clusterId } },
        { new: true, useFindAndModify: false }
      );

      res.locals.updatedClusters = updatedUser.clusters;
      return next();
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = clusterController;
