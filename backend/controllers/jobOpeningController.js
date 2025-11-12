const JobOpening = require('../models/JobOpening');
const { asyncHandler } = require('../middleware/errorMiddleware');
const getNextSequence = require('../utils/getNextSequence');

// @desc    Create job opening
// @route   POST /api/recruitment/job-openings
// @access  Private
const createJobOpening = asyncHandler(async (req, res) => {
  const openingData = req.body;
  if (!openingData.sequence) {
    openingData.sequence = await getNextSequence('jobOpening');
  }
  if (!openingData.postedDate) {
    openingData.postedDate = new Date();
  }

  const jobOpening = await JobOpening.create(openingData);

  res.status(201).json({
    success: true,
    data: jobOpening,
  });
});

// @desc    Get job openings
// @route   GET /api/recruitment/job-openings
// @access  Private
const getJobOpenings = asyncHandler(async (req, res) => {
  const { status, search, department } = req.query;
  const query = {};

  if (status) {
    query.status = status;
  }

  if (department) {
    query.department = { $regex: department, $options: 'i' };
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { department: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
    ];
  }

  const jobOpenings = await JobOpening.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: jobOpenings.length,
    data: jobOpenings,
  });
});

// @desc    Get job opening by ID
// @route   GET /api/recruitment/job-openings/:id
// @access  Private
const getJobOpeningById = asyncHandler(async (req, res) => {
  const jobOpening = await JobOpening.findById(req.params.id);

  if (!jobOpening) {
    return res.status(404).json({
      success: false,
      message: 'Job opening not found',
    });
  }

  res.status(200).json({
    success: true,
    data: jobOpening,
  });
});

// @desc    Update job opening
// @route   PUT /api/recruitment/job-openings/:id
// @access  Private
const updateJobOpening = asyncHandler(async (req, res) => {
  let jobOpening = await JobOpening.findById(req.params.id);

  if (!jobOpening) {
    return res.status(404).json({
      success: false,
      message: 'Job opening not found',
    });
  }

  jobOpening = await JobOpening.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: jobOpening,
  });
});

// @desc    Delete job opening
// @route   DELETE /api/recruitment/job-openings/:id
// @access  Private
const deleteJobOpening = asyncHandler(async (req, res) => {
  const jobOpening = await JobOpening.findById(req.params.id);

  if (!jobOpening) {
    return res.status(404).json({
      success: false,
      message: 'Job opening not found',
    });
  }

  await jobOpening.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Job opening deleted successfully',
  });
});

module.exports = {
  createJobOpening,
  getJobOpenings,
  getJobOpeningById,
  updateJobOpening,
  deleteJobOpening,
};

