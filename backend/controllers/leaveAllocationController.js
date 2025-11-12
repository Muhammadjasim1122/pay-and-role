const LeaveAllocation = require('../models/LeaveAllocation');
const asyncHandler = require('../middleware/errorMiddleware').asyncHandler;

// @desc    Create new leave allocation
// @route   POST /api/hr/leave-allocations
// @access  Private
const createLeaveAllocation = asyncHandler(async (req, res) => {
  const leaveAllocation = await LeaveAllocation.create(req.body);

  res.status(201).json({
    success: true,
    data: leaveAllocation,
  });
});

// @desc    Get all leave allocations
// @route   GET /api/hr/leave-allocations
// @access  Private
const getLeaveAllocations = asyncHandler(async (req, res) => {
  const { employee, leaveType, page = 1, limit = 20 } = req.query;

  const query = {};
  if (employee) {
    query.employee = employee;
  }
  if (leaveType) {
    query.leaveType = leaveType;
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const leaveAllocations = await LeaveAllocation.find(query)
    .populate('employee', 'firstName lastName employeeId')
    .populate('leaveType', 'leaveTypeName')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await LeaveAllocation.countDocuments(query);

  res.status(200).json({
    success: true,
    count: leaveAllocations.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    data: leaveAllocations,
  });
});

// @desc    Get single leave allocation
// @route   GET /api/hr/leave-allocations/:id
// @access  Private
const getLeaveAllocation = asyncHandler(async (req, res) => {
  const leaveAllocation = await LeaveAllocation.findById(req.params.id)
    .populate('employee', 'firstName lastName employeeId')
    .populate('leaveType', 'leaveTypeName');

  if (!leaveAllocation) {
    return res.status(404).json({
      success: false,
      message: 'Leave allocation not found',
    });
  }

  res.status(200).json({
    success: true,
    data: leaveAllocation,
  });
});

// @desc    Update leave allocation
// @route   PUT /api/hr/leave-allocations/:id
// @access  Private
const updateLeaveAllocation = asyncHandler(async (req, res) => {
  let leaveAllocation = await LeaveAllocation.findById(req.params.id);

  if (!leaveAllocation) {
    return res.status(404).json({
      success: false,
      message: 'Leave allocation not found',
    });
  }

  leaveAllocation = await LeaveAllocation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: leaveAllocation,
  });
});

// @desc    Delete leave allocation
// @route   DELETE /api/hr/leave-allocations/:id
// @access  Private
const deleteLeaveAllocation = asyncHandler(async (req, res) => {
  const leaveAllocation = await LeaveAllocation.findById(req.params.id);

  if (!leaveAllocation) {
    return res.status(404).json({
      success: false,
      message: 'Leave allocation not found',
    });
  }

  await leaveAllocation.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Leave allocation deleted successfully',
  });
});

module.exports = {
  createLeaveAllocation,
  getLeaveAllocations,
  getLeaveAllocation,
  updateLeaveAllocation,
  deleteLeaveAllocation,
};

