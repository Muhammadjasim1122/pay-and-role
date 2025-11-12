const mongoose = require('mongoose');

const leaveTypeSchema = new mongoose.Schema(
  {
    leaveTypeName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    maxLeavesAllowed: {
      type: Number,
    },
    applicableAfter: {
      type: Number, // Working days
      default: 0,
    },
    maxContinuousDays: {
      type: Number,
    },
    minWorkingDaysSinceJoining: {
      type: Number,
      default: 0,
    },
    isCarryForward: {
      type: Boolean,
      default: false,
    },
    maxCarryForwardedLeaves: {
      type: Number,
      default: 0,
    },
    carryForwardExpiry: {
      type: Boolean,
      default: false,
    },
    expireCarryForwardedDays: {
      type: Number,
      default: 0,
    },
    encashment: {
      type: Boolean,
      default: false,
    },
    encashmentThreshold: {
      type: Number,
      default: 0,
    },
    earningComponent: {
      type: String,
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    fractionOfDailyRate: {
      type: Number,
      default: 1.0,
    },
    includeHoliday: {
      type: Boolean,
      default: false,
    },
    isCompensatory: {
      type: Boolean,
      default: false,
    },
    isOptional: {
      type: Boolean,
      default: false,
    },
    allowNegative: {
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

// Index for faster queries (leaveTypeName already has unique index from schema)

const LeaveType = mongoose.model('LeaveType', leaveTypeSchema);

module.exports = LeaveType;

