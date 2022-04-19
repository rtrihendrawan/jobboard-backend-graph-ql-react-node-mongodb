const Job = require('../../models/job');
const User = require('../../models/user');

const { transformJob } = require('./merge');

module.exports = {
  jobs: async () => {
    try {
      const jobs = await Job.find();
      return jobs.map((job) => {
        return transformJob(job);
      });
    } catch (err) {
      throw err;
    }
  },
  jobItem: async (args) => {
    try {
      const job = await Job.findOne({ _id: args.jobId }).populate('creator');
      return job;
    } catch (err) {
      throw err;
    }
  },
  createJob: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const job = new Job({
      title: args.jobInput.title,
      description: args.jobInput.description,
      wage: args.jobInput.wage,
      date: new Date(args.jobInput.date),
      creator: req.userId,
    });
    let createdJob;
    try {
      const result = await job.save();
      createdJob = transformJob(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdJobs.push(job);
      await creator.save();

      return createdJob;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
