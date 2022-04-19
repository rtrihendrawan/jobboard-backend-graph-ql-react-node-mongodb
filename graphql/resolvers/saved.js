const Job = require('../../models/job');
const Saved = require('../../models/saved');
const { transformSaved, transformJob } = require('./merge');

module.exports = {
  saveds: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const saveds = await Saved.find({ user: req.userId });
      return saveds.map((saved) => {
        return transformSaved(saved);
      });
    } catch (err) {
      throw err;
    }
  },
  savedJob: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const fetchedJob = await Job.findOne({ _id: args.jobId });
    const saved = new Saved({
      user: req.userId,
      job: fetchedJob,
    });
    const result = await saved.save();
    return transformSaved(result);
  },
  cancelSaved: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const saved = await Saved.findById(args.savedId).populate('job');
      const job = transformJob(saved.job);
      await Saved.deleteOne({ _id: args.savedId });
      return job;
    } catch (err) {
      throw err;
    }
  },
};
