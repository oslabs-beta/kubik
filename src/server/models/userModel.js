const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  googleId: {
    type: String,
    required: false,
  },
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
    required: function () {
      return !this.googleId;
    },
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
