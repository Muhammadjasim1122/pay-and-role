const mongoose = require('mongoose');

const leaveApplicationSchema = new mongoose.Schema(
  {
    series: {
      type: String,
      default: 'HR-LAP-',
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    leaveType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LeaveType',
      required: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    halfDay: {
      type: Boolean,
      default: false,
    },
    reason: {
      type: String,
    },
    leaveApprover: {
      type: String,
      required: true,
    },
    postingDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Open', 'Approved', 'Rejected', 'Cancelled'],
      default: 'Open',
    },
    followViaEmail: {
      type: Boolean,
      default: true,
    },
    salarySlip: {
      type: String,
    },
    letterHead: {
      type: String,
    },
    color: {
      type: String,
      default: '#3B82F6',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
leaveApplicationSchema.index({ employee: 1 });
leaveApplicationSchema.index({ status: 1 });
leaveApplicationSchema.index({ fromDate: 1, toDate: 1 });
leaveApplicationSchema.index({ createdAt: -1 });

const LeaveApplication = mongoose.model('LeaveApplication', leaveApplicationSchema);

module.exports = LeaveApplication;

