const LeaveType = require('../models/LeaveType');
const asyncHandler = require('../middleware/errorMiddleware').asyncHandler;

// @desc    Create new leave type
// @route   POST /api/hr/leave-types
// @access  Private
const createLeaveType = asyncHandler(async (req, res) => {
  const leaveType = await LeaveType.create(req.body);

  res.status(201).json({
    success: true,
    data: leaveType,
  });
});

// @desc    Get all leave types
// @route   GET /api/hr/leave-types
// @access  Private
const getLeaveTypes = asyncHandler(async (req, res) => {
  const { search, page = 1, limit = 20 } = req.query;

  const query = {};
  if (search) {
    query.leaveTypeName = { $regex: search, $options: 'i' };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const leaveTypes = await LeaveType.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await LeaveType.countDocuments(query);

  res.status(200).json({
    success: true,
    count: leaveTypes.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    data: leaveTypes,
  });
});

// @desc    Get single leave type
// @route   GET /api/hr/leave-types/:id
// @access  Private
const getLeaveType = asyncHandler(async (req, res) => {
  const leaveType = await LeaveType.findById(req.params.id);

  if (!leaveType) {
    return res.status(404).json({
      success: false,
      message: 'Leave type not found',
    });
  }

  res.status(200).json({
    success: true,
    data: leaveType,
  });
});

// @desc    Update leave type
// @route   PUT /api/hr/leave-types/:id
// @access  Private
const updateLeaveType = asyncHandler(async (req, res) => {
  let leaveType = await LeaveType.findById(req.params.id);

  if (!leaveType) {
    return res.status(404).json({
      success: false,
      message: 'Leave type not found',
    });
  }

  leaveType = await LeaveType.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: leaveType,
  });
});

// @desc    Delete leave type
// @route   DELETE /api/hr/leave-types/:id
// @access  Private
const deleteLeaveType = asyncHandler(async (req, res) => {
  const leaveType = await LeaveType.findById(req.params.id);

  if (!leaveType) {
    return res.status(404).json({
      success: false,
      message: 'Leave type not found',
    });
  }

  await leaveType.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Leave type deleted successfully',
  });
});

module.exports = {
  createLeaveType,
  getLeaveTypes,
  getLeaveType,
  updateLeaveType,
  deleteLeaveType,
};

