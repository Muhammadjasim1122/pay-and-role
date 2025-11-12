const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

const holidayListSchema = new mongoose.Schema(
  {
    holidayListName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    totalHolidays: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: '#3B82F6',
    },
    holidays: [holidaySchema],
  },
  {
    timestamps: true,
  }
);

// Calculate total holidays before saving
holidayListSchema.pre('save', function (next) {
  if (this.holidays && Array.isArray(this.holidays)) {
    this.totalHolidays = this.holidays.length;
  }
  next();
});

// Index for faster queries (holidayListName already has unique index from schema)
holidayListSchema.index({ fromDate: 1, toDate: 1 });

const HolidayList = mongoose.model('HolidayList', holidayListSchema);

module.exports = HolidayList;

