const mongoose = require('mongoose');

// Fixed for error
// ID cannot represent value: { _bsontype: "ObjectID", id: <Buffer
// import mongoose from 'mongoose';
// const { ObjectId } = mongoose.Types;
// ObjectId.prototype.valueOf = function () {
//   return this.toString();
// };

const Schema = mongoose.Schema;

const savedSchema = new Schema(
  {
    job: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Saved', savedSchema);
