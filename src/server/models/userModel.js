const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    lowercase: true,
    required: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    required: true,
  },
  username: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  clusters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cluster',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
