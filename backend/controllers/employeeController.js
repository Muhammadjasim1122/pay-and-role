const Employee = require('../models/Employee');
const asyncHandler = require('../middleware/errorMiddleware').asyncHandler;

// @desc    Create new employee
// @route   POST /api/hr/employees
// @access  Private
const createEmployee = asyncHandler(async (req, res) => {
  const employeeData = req.body;

  // Generate employee ID if not provided
  if (!employeeData.employeeId) {
    const count = await Employee.countDocuments();
    employeeData.employeeId = `HR-EMP-${String(count + 1).padStart(4, '0')}`;
  }

  const employee = await Employee.create(employeeData);

  res.status(201).json({
    success: true,
    data: employee,
  });
});

// @desc    Get all employees
// @route   GET /api/hr/employees
// @access  Private
const getEmployees = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 20 } = req.query;

  // Build query
  const query = {};
  if (status) {
    query.status = status;
  }
  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { employeeId: { $regex: search, $options: 'i' } },
      { companyEmail: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const employees = await Employee.find(query)
    .populate('holidayList', 'holidayListName')
    .populate('applicableHolidayList', 'holidayListName')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Employee.countDocuments(query);

  res.status(200).json({
    success: true,
    count: employees.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    data: employees,
  });
});

// @desc    Get single employee
// @route   GET /api/hr/employees/:id
// @access  Private
const getEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id)
    .populate('holidayList', 'holidayListName')
    .populate('applicableHolidayList', 'holidayListName');

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
    });
  }

  res.status(200).json({
    success: true,
    data: employee,
  });
});

// @desc    Update employee
// @route   PUT /api/hr/employees/:id
// @access  Private
const updateEmployee = asyncHandler(async (req, res) => {
  let employee = await Employee.findById(req.params.id);

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
    });
  }

  employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: employee,
  });
});

// @desc    Delete employee
// @route   DELETE /api/hr/employees/:id
// @access  Private
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: 'Employee not found',
    });
  }

  await employee.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Employee deleted successfully',
  });
});

module.exports = {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};

