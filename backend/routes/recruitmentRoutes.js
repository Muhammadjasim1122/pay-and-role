const express = require('express');
const router = express.Router();

const {
  createJobOpening,
  getJobOpenings,
  getJobOpeningById,
  updateJobOpening,
  deleteJobOpening,
} = require('../controllers/jobOpeningController');

const {
  createJobApplicant,
  getJobApplicants,
  getJobApplicantById,
  updateJobApplicant,
  deleteJobApplicant,
} = require('../controllers/jobApplicantController');

const {
  createJobOffer,
  getJobOffers,
  getJobOfferById,
  updateJobOffer,
  deleteJobOffer,
} = require('../controllers/jobOfferController');

// Job openings
router.route('/job-openings').get(getJobOpenings).post(createJobOpening);
router
  .route('/job-openings/:id')
  .get(getJobOpeningById)
  .put(updateJobOpening)
  .delete(deleteJobOpening);

// Job applicants
router.route('/job-applicants').get(getJobApplicants).post(createJobApplicant);
router
  .route('/job-applicants/:id')
  .get(getJobApplicantById)
  .put(updateJobApplicant)
  .delete(deleteJobApplicant);

// Job offers
router.route('/job-offers').get(getJobOffers).post(createJobOffer);
router
  .route('/job-offers/:id')
  .get(getJobOfferById)
  .put(updateJobOffer)
  .delete(deleteJobOffer);

module.exports = router;

