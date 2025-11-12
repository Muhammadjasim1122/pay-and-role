const mongoose = require('mongoose');

const jobOfferSchema = new mongoose.Schema(
  {
    sequence: {
      type: Number,
      unique: true,
      sparse: true,
      index: true,
    },
    candidate: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    offerDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected', 'Withdrawn'],
      default: 'Pending',
    },
    salary: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
    jobApplicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobApplicant',
    },
  },
  {
    timestamps: true,
  }
);

const JobOffer = mongoose.model('JobOffer', jobOfferSchema);

module.exports = JobOffer;

