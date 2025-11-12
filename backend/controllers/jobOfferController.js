const JobOffer = require('../models/JobOffer');
const { asyncHandler } = require('../middleware/errorMiddleware');
const getNextSequence = require('../utils/getNextSequence');

// @desc    Create job offer
// @route   POST /api/recruitment/job-offers
// @access  Private
const createJobOffer = asyncHandler(async (req, res) => {
  const offerData = req.body;
  if (!offerData.sequence) {
    offerData.sequence = await getNextSequence('jobOffer');
  }
  if (!offerData.offerDate) {
    offerData.offerDate = new Date();
  }

  const jobOffer = await JobOffer.create(offerData);

  res.status(201).json({
    success: true,
    data: jobOffer,
  });
});

// @desc    Get job offers
// @route   GET /api/recruitment/job-offers
// @access  Private
const getJobOffers = asyncHandler(async (req, res) => {
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
      { candidate: { $regex: search, $options: 'i' } },
      { position: { $regex: search, $options: 'i' } },
      { department: { $regex: search, $options: 'i' } },
    ];
  }

  const jobOffers = await JobOffer.find(query)
    .populate('jobApplicant', 'name email position')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: jobOffers.length,
    data: jobOffers,
  });
});

// @desc    Get job offer by ID
// @route   GET /api/recruitment/job-offers/:id
// @access  Private
const getJobOfferById = asyncHandler(async (req, res) => {
  const jobOffer = await JobOffer.findById(req.params.id).populate('jobApplicant', 'name email position');

  if (!jobOffer) {
    return res.status(404).json({
      success: false,
      message: 'Job offer not found',
    });
  }

  res.status(200).json({
    success: true,
    data: jobOffer,
  });
});

// @desc    Update job offer
// @route   PUT /api/recruitment/job-offers/:id
// @access  Private
const updateJobOffer = asyncHandler(async (req, res) => {
  let jobOffer = await JobOffer.findById(req.params.id);

  if (!jobOffer) {
    return res.status(404).json({
      success: false,
      message: 'Job offer not found',
    });
  }

  jobOffer = await JobOffer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: jobOffer,
  });
});

// @desc    Delete job offer
// @route   DELETE /api/recruitment/job-offers/:id
// @access  Private
const deleteJobOffer = asyncHandler(async (req, res) => {
  const jobOffer = await JobOffer.findById(req.params.id);

  if (!jobOffer) {
    return res.status(404).json({
      success: false,
      message: 'Job offer not found',
    });
  }

  await jobOffer.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Job offer deleted successfully',
  });
});

module.exports = {
  createJobOffer,
  getJobOffers,
  getJobOfferById,
  updateJobOffer,
  deleteJobOffer,
};

