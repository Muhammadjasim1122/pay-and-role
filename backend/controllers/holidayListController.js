const HolidayList = require('../models/HolidayList');
const asyncHandler = require('../middleware/errorMiddleware').asyncHandler;

// @desc    Create new holiday list
// @route   POST /api/hr/holiday-lists
// @access  Private
const createHolidayList = asyncHandler(async (req, res) => {
  const holidayList = await HolidayList.create(req.body);

  res.status(201).json({
    success: true,
    data: holidayList,
  });
});

// @desc    Get all holiday lists
// @route   GET /api/hr/holiday-lists
// @access  Private
const getHolidayLists = asyncHandler(async (req, res) => {
  const { search, page = 1, limit = 20 } = req.query;

  const query = {};
  if (search) {
    query.holidayListName = { $regex: search, $options: 'i' };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const holidayLists = await HolidayList.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await HolidayList.countDocuments(query);

  res.status(200).json({
    success: true,
    count: holidayLists.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    data: holidayLists,
  });
});

// @desc    Get single holiday list
// @route   GET /api/hr/holiday-lists/:id
// @access  Private
const getHolidayList = asyncHandler(async (req, res) => {
  const holidayList = await HolidayList.findById(req.params.id);

  if (!holidayList) {
    return res.status(404).json({
      success: false,
      message: 'Holiday list not found',
    });
  }

  res.status(200).json({
    success: true,
    data: holidayList,
  });
});

// @desc    Update holiday list
// @route   PUT /api/hr/holiday-lists/:id
// @access  Private
const updateHolidayList = asyncHandler(async (req, res) => {
  let holidayList = await HolidayList.findById(req.params.id);

  if (!holidayList) {
    return res.status(404).json({
      success: false,
      message: 'Holiday list not found',
    });
  }

  holidayList = await HolidayList.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: holidayList,
  });
});

// @desc    Delete holiday list
// @route   DELETE /api/hr/holiday-lists/:id
// @access  Private
const deleteHolidayList = asyncHandler(async (req, res) => {
  const holidayList = await HolidayList.findById(req.params.id);

  if (!holidayList) {
    return res.status(404).json({
      success: false,
      message: 'Holiday list not found',
    });
  }

  await holidayList.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Holiday list deleted successfully',
  });
});

// @desc    Add holiday to holiday list
// @route   POST /api/hr/holiday-lists/:id/holidays
// @access  Private
const addHoliday = asyncHandler(async (req, res) => {
  const holidayList = await HolidayList.findById(req.params.id);

  if (!holidayList) {
    return res.status(404).json({
      success: false,
      message: 'Holiday list not found',
    });
  }

  holidayList.holidays.push(req.body);
  await holidayList.save();

  res.status(200).json({
    success: true,
    data: holidayList,
  });
});

// @desc    Update holiday in holiday list
// @route   PUT /api/hr/holiday-lists/:id/holidays/:holidayId
// @access  Private
const updateHoliday = asyncHandler(async (req, res) => {
  const holidayList = await HolidayList.findById(req.params.id);

  if (!holidayList) {
    return res.status(404).json({
      success: false,
      message: 'Holiday list not found',
    });
  }

  const holiday = holidayList.holidays.id(req.params.holidayId);
  if (!holiday) {
    return res.status(404).json({
      success: false,
      message: 'Holiday not found',
    });
  }

  Object.assign(holiday, req.body);
  await holidayList.save();

  res.status(200).json({
    success: true,
    data: holidayList,
  });
});

// @desc    Delete holiday from holiday list
// @route   DELETE /api/hr/holiday-lists/:id/holidays/:holidayId
// @access  Private
const deleteHoliday = asyncHandler(async (req, res) => {
  const holidayList = await HolidayList.findById(req.params.id);

  if (!holidayList) {
    return res.status(404).json({
      success: false,
      message: 'Holiday list not found',
    });
  }

  holidayList.holidays.id(req.params.holidayId).deleteOne();
  await holidayList.save();

  res.status(200).json({
    success: true,
    data: holidayList,
  });
});

module.exports = {
  createHolidayList,
  getHolidayLists,
  getHolidayList,
  updateHolidayList,
  deleteHolidayList,
  addHoliday,
  updateHoliday,
  deleteHoliday,
};

