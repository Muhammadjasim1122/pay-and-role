const LeaveApplication = require('../models/LeaveApplication');
const asyncHandler = require('../middleware/errorMiddleware').asyncHandler;

// @desc    Create new leave application
// @route   POST /api/hr/leave-applications
// @access  Private
const createLeaveApplication = asyncHandler(async (req, res) => {
  const applicationData = req.body;

  // Validate required fields
  if (!applicationData.employee) {
    return res.status(400).json({
      success: false,
      message: 'Employee is required',
    });
  }

  if (!applicationData.leaveType) {
    return res.status(400).json({
      success: false,
      message: 'Leave Type is required',
    });
  }

  if (!applicationData.fromDate) {
    return res.status(400).json({
      success: false,
      message: 'From Date is required',
    });
  }

  if (!applicationData.toDate) {
    return res.status(400).json({
      success: false,
      message: 'To Date is required',
    });
  }

  // Convert string IDs to ObjectIds if they're not already
  const mongoose = require('mongoose');
  
  if (applicationData.employee && !mongoose.Types.ObjectId.isValid(applicationData.employee)) {
    // If employee is not a valid ObjectId, try to find employee by name or ID
    const Employee = require('../models/Employee');
    const foundEmployee = await Employee.findOne({
      $or: [
        { employeeId: applicationData.employee },
        { firstName: { $regex: applicationData.employee, $options: 'i' } }
      ]
    });
    
    if (!foundEmployee) {
      return res.status(400).json({
        success: false,
        message: `Employee not found: ${applicationData.employee}`,
      });
    }
    applicationData.employee = foundEmployee._id;
  }

  if (applicationData.leaveType && !mongoose.Types.ObjectId.isValid(applicationData.leaveType)) {
    // If leaveType is not a valid ObjectId, try to find leave type by name
    const LeaveType = require('../models/LeaveType');
    const foundLeaveType = await LeaveType.findOne({
      leaveTypeName: { $regex: applicationData.leaveType, $options: 'i' }
    });
    
    if (!foundLeaveType) {
      return res.status(400).json({
        success: false,
        message: `Leave Type not found: ${applicationData.leaveType}`,
      });
    }
    applicationData.leaveType = foundLeaveType._id;
  }

  const leaveApplication = await LeaveApplication.create(applicationData);

  // Populate the created document before returning
  await leaveApplication.populate('employee', 'firstName lastName employeeId');
  await leaveApplication.populate('leaveType', 'leaveTypeName');

  res.status(201).json({
    success: true,
    data: leaveApplication,
  });
});

// @desc    Get all leave applications
// @route   GET /api/hr/leave-applications
// @access  Private
const getLeaveApplications = asyncHandler(async (req, res) => {
  const { employee, status, leaveType, page = 1, limit = 20 } = req.query;

  const query = {};
  if (employee) {
    query.employee = employee;
  }
  if (status) {
    query.status = status;
  }
  if (leaveType) {
    query.leaveType = leaveType;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const leaveApplications = await LeaveApplication.find(query)
    .populate('employee', 'firstName lastName employeeId')
    .populate('leaveType', 'leaveTypeName')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await LeaveApplication.countDocuments(query);

  res.status(200).json({
    success: true,
    count: leaveApplications.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    data: leaveApplications,
  });
});

// @desc    Get single leave application
// @route   GET /api/hr/leave-applications/:id
// @access  Private
const getLeaveApplication = asyncHandler(async (req, res) => {
  const leaveApplication = await LeaveApplication.findById(req.params.id)
    .populate('employee', 'firstName lastName employeeId')
    .populate('leaveType', 'leaveTypeName');

  if (!leaveApplication) {
    return res.status(404).json({
      success: false,
      message: 'Leave application not found',
    });
  }

  res.status(200).json({
    success: true,
    data: leaveApplication,
  });
});

// @desc    Update leave application
// @route   PUT /api/hr/leave-applications/:id
// @access  Private
const updateLeaveApplication = asyncHandler(async (req, res) => {
  let leaveApplication = await LeaveApplication.findById(req.params.id);

  if (!leaveApplication) {
    return res.status(404).json({
      success: false,
      message: 'Leave application not found',
    });
  }

  leaveApplication = await LeaveApplication.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: leaveApplication,
  });
});

// @desc    Delete leave application
// @route   DELETE /api/hr/leave-applications/:id
// @access  Private
const deleteLeaveApplication = asyncHandler(async (req, res) => {
  const leaveApplication = await LeaveApplication.findById(req.params.id);

  if (!leaveApplication) {
    return res.status(404).json({
      success: false,
      message: 'Leave application not found',
    });
  }

  await leaveApplication.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Leave application deleted successfully',
  });
});

// @desc    Approve leave application
// @route   PUT /api/hr/leave-applications/:id/approve
// @access  Private
const approveLeaveApplication = asyncHandler(async (req, res) => {
  const leaveApplication = await LeaveApplication.findById(req.params.id);

  if (!leaveApplication) {
    return res.status(404).json({
      success: false,
      message: 'Leave application not found',
    });
  }

  leaveApplication.status = 'Approved';
  await leaveApplication.save();

  res.status(200).json({
    success: true,
    data: leaveApplication,
  });
});

// @desc    Reject leave application
// @route   PUT /api/hr/leave-applications/:id/reject
// @access  Private
const rejectLeaveApplication = asyncHandler(async (req, res) => {
  const leaveApplication = await LeaveApplication.findById(req.params.id);

  if (!leaveApplication) {
    return res.status(404).json({
      success: false,
      message: 'Leave application not found',
    });
  }

  leaveApplication.status = 'Rejected';
  await leaveApplication.save();

  res.status(200).json({
    success: true,
    data: leaveApplication,
  });
});

module.exports = {
  createLeaveApplication,
  getLeaveApplications,
  getLeaveApplication,
  updateLeaveApplication,
  deleteLeaveApplication,
  approveLeaveApplication,
  rejectLeaveApplication,
};

