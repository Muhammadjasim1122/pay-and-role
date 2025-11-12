const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    // Basic Information
    employeeId: {
      type: String,
      unique: true,
      sparse: true,
    },
    series: {
      type: String,
      default: 'HR-EMP-',
    },
    salutation: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Left', 'Suspended'],
      default: 'Active',
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
    
    // Joining Details
    jobApplicant: {
      type: String,
    },
    offerDate: {
      type: Date,
    },
    confirmationDate: {
      type: Date,
    },
    contractEndDate: {
      type: Date,
    },
    noticeDays: {
      type: Number,
    },
    dateOfRetirement: {
      type: Date,
    },
    
    // Address & Contacts
    mobile: {
      type: String,
    },
    personalEmail: {
      type: String,
    },
    preferredContactEmail: {
      type: String,
    },
    companyEmail: {
      type: String,
    },
    unsubscribed: {
      type: Boolean,
      default: false,
    },
    currentAddress: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    emergencyContactName: {
      type: String,
    },
    emergencyPhone: {
      type: String,
    },
    relation: {
      type: String,
    },
    
    // Attendance & Leaves
    attendanceDeviceId: {
      type: String,
    },
    holidayList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HolidayList',
    },
    applicableHolidayList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HolidayList',
    },
    defaultShift: {
      type: String,
    },
    expenseApprover: {
      type: String,
    },
    shiftRequestApprover: {
      type: String,
    },
    leaveApprover: {
      type: String,
    },
    
    // Salary
    costToCompany: {
      type: Number,
    },
    payrollCostCenter: {
      type: String,
    },
    salaryCurrency: {
      type: String,
      default: 'PKR',
    },
    salaryMode: {
      type: String,
    },
    
    // Personal Details
    maritalStatus: {
      type: String,
      enum: ['Single', 'Married', 'Divorced', 'Widowed'],
    },
    bloodGroup: {
      type: String,
    },
    familyBackground: {
      type: String,
    },
    healthDetails: {
      type: String,
    },
    healthInsuranceProvider: {
      type: String,
    },
    passportNumber: {
      type: String,
    },
    dateOfIssue: {
      type: Date,
    },
    validUpto: {
      type: Date,
    },
    placeOfIssue: {
      type: String,
    },
    
    // Profile
    bioCoverLetter: {
      type: String,
    },
    profilePhoto: {
      type: String,
    },
    
    // Employee Exit
    resignationLetterDate: {
      type: Date,
    },
    exitInterviewHeldOn: {
      type: Date,
    },
    leaveEncashed: {
      type: String,
    },
    relievingDate: {
      type: Date,
    },
    newWorkplace: {
      type: String,
    },
    reasonForLeaving: {
      type: String,
    },
    exitFeedback: {
      type: String,
    },
    
    designation: {
      type: String,
    },
    department: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries (employeeId already has unique index from schema)
employeeSchema.index({ status: 1 });
employeeSchema.index({ firstName: 1, lastName: 1 });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

