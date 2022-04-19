const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdJobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
