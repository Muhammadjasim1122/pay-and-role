const mongoose = require('mongoose');

const jobOpeningSchema = new mongoose.Schema(
  {
    sequence: {
      type: Number,
      unique: true,
      sparse: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Temporary', 'Other'],
      default: 'Full-time',
    },
    experience: {
      type: String,
      trim: true,
    },
    salary: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Closed', 'Draft'],
      default: 'Active',
    },
    applicantsCount: {
      type: Number,
      default: 0,
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const JobOpening = mongoose.model('JobOpening', jobOpeningSchema);

module.exports = JobOpening;

