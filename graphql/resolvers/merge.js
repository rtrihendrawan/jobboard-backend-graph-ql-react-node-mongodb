const DataLoader = require('dataloader');

const Job = require('../../models/job');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const jobLoader = new DataLoader((jobIds) => {
  return jobs(jobIds);
});

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

const jobs = async (jobIds) => {
  try {
    const jobs = await Job.find({ _id: { $in: jobIds } });
    jobs.sort((a, b) => {
      return (
        jobIds.indexOf(a._id.toString()) - jobIds.indexOf(b._id.toString())
      );
    });
    return jobs.map((job) => {
      return transformJob(job);
    });
  } catch (err) {
    throw err;
  }
};

const singleJob = async (jobId) => {
  try {
    const job = await jobLoader.load(jobId.toString());
    return job;
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      _id: user.id,
      createdJobs: () => jobLoader.loadMany(user._doc.createdJobs),
    };
  } catch (err) {
    throw err;
  }
};

const transformJob = (job) => {
  return {
    ...job._doc,
    _id: job.id,
    date: dateToString(job._doc.date),
    creator: user.bind(this, job.creator),
  };
};

const transformSaved = (saved) => {
  return {
    ...saved._doc,
    _id: saved.id,
    user: user.bind(this, saved._doc.user),
    job: singleJob.bind(this, saved._doc.job),
    createdAt: dateToString(saved._doc.createdAt),
    updatedAt: dateToString(saved._doc.updatedAt),
  };
};

exports.transformJob = transformJob;
exports.transformSaved = transformSaved;

// exports.user = user;
// exports.jobs = jobs;
// exports.singleJob = singleJob;
