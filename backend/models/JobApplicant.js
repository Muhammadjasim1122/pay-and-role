const mongoose = require('mongoose');

const jobApplicantSchema = new mongoose.Schema(
  {
    sequence: {
      type: Number,
      unique: true,
      sparse: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
    resume: {
      type: String,
    },
    coverLetter: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Applied', 'Screening', 'Interview', 'Hired', 'Rejected'],
      default: 'Applied',
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    jobOpening: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobOpening',
    },
  },
  {
    timestamps: true,
  }
);

const JobApplicant = mongoose.model('JobApplicant', jobApplicantSchema);

module.exports = JobApplicant;

