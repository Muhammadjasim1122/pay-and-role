const JobApplicant = require('../models/JobApplicant');
const JobOpening = require('../models/JobOpening');
const { asyncHandler } = require('../middleware/errorMiddleware');
const getNextSequence = require('../utils/getNextSequence');

// @desc    Create job applicant
// @route   POST /api/recruitment/job-applicants
// @access  Private
const createJobApplicant = asyncHandler(async (req, res) => {
  const applicantData = req.body;
  if (!applicantData.sequence) {
    applicantData.sequence = await getNextSequence('jobApplicant');
  }
  if (!applicantData.appliedDate) {
    applicantData.appliedDate = new Date();
  }

  const applicant = await JobApplicant.create(applicantData);

  if (applicant.jobOpening) {
    await JobOpening.findByIdAndUpdate(applicant.jobOpening, {
      $inc: { applicantsCount: 1 },
    });
  }

  res.status(201).json({
    success: true,
    data: applicant,
  });
});

// @desc    Get job applicants
// @route   GET /api/recruitment/job-applicants
// @access  Private
const getJobApplicants = asyncHandler(async (req, res) => {
  const { status, search, position } = req.query;
  const query = {};

  if (status) {
    query.status = status;
  }

  if (position) {
    query.position = { $regex: position, $options: 'i' };
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { position: { $regex: search, $options: 'i' } },
    ];
  }

  const applicants = await JobApplicant.find(query)
    .populate('jobOpening', 'title department')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: applicants.length,
    data: applicants,
  });
});

// @desc    Get job applicant by ID
// @route   GET /api/recruitment/job-applicants/:id
// @access  Private
const getJobApplicantById = asyncHandler(async (req, res) => {
  const applicant = await JobApplicant.findById(req.params.id).populate('jobOpening', 'title department');

  if (!applicant) {
    return res.status(404).json({
      success: false,
      message: 'Job applicant not found',
    });
  }

  res.status(200).json({
    success: true,
    data: applicant,
  });
});

// @desc    Update job applicant
// @route   PUT /api/recruitment/job-applicants/:id
// @access  Private
const updateJobApplicant = asyncHandler(async (req, res) => {
  let applicant = await JobApplicant.findById(req.params.id);

  if (!applicant) {
    return res.status(404).json({
      success: false,
      message: 'Job applicant not found',
    });
  }

  const previousJobOpening = applicant.jobOpening?.toString();

  applicant = await JobApplicant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // Adjust applicant counts if the associated job opening changed
  if (req.body.jobOpening && req.body.jobOpening !== previousJobOpening) {
    if (previousJobOpening) {
      await JobOpening.findByIdAndUpdate(previousJobOpening, { $inc: { applicantsCount: -1 } });
    }
    await JobOpening.findByIdAndUpdate(req.body.jobOpening, { $inc: { applicantsCount: 1 } });
  }

  res.status(200).json({
    success: true,
    data: applicant,
  });
});

// @desc    Delete job applicant
// @route   DELETE /api/recruitment/job-applicants/:id
// @access  Private
const deleteJobApplicant = asyncHandler(async (req, res) => {
  const applicant = await JobApplicant.findById(req.params.id);

  if (!applicant) {
    return res.status(404).json({
      success: false,
      message: 'Job applicant not found',
    });
  }

  if (applicant.jobOpening) {
    await JobOpening.findByIdAndUpdate(applicant.jobOpening, { $inc: { applicantsCount: -1 } });
  }

  await applicant.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Job applicant deleted successfully',
  });
});

module.exports = {
  createJobApplicant,
  getJobApplicants,
  getJobApplicantById,
  updateJobApplicant,
  deleteJobApplicant,
};

