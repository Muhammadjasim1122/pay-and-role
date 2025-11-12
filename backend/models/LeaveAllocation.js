const mongoose = require('mongoose');

const leaveAllocationSchema = new mongoose.Schema(
  {
    series: {
      type: String,
      default: 'HR-LAL-',
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
    newLeavesAllocated: {
      type: Number,
      required: true,
      default: 0,
    },
    addUnusedLeaves: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
leaveAllocationSchema.index({ employee: 1, leaveType: 1 });
leaveAllocationSchema.index({ fromDate: 1, toDate: 1 });

const LeaveAllocation = mongoose.model('LeaveAllocation', leaveAllocationSchema);

module.exports = LeaveAllocation;

