const express = require('express');
const router = express.Router();

// Employee routes
const {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

// Holiday List routes
const {
  createHolidayList,
  getHolidayLists,
  getHolidayList,
  updateHolidayList,
  deleteHolidayList,
  addHoliday,
  updateHoliday,
  deleteHoliday,
} = require('../controllers/holidayListController');

// Leave Type routes
const {
  createLeaveType,
  getLeaveTypes,
  getLeaveType,
  updateLeaveType,
  deleteLeaveType,
} = require('../controllers/leaveTypeController');

// Leave Allocation routes
const {
  createLeaveAllocation,
  getLeaveAllocations,
  getLeaveAllocation,
  updateLeaveAllocation,
  deleteLeaveAllocation,
} = require('../controllers/leaveAllocationController');

// Leave Application routes
const {
  createLeaveApplication,
  getLeaveApplications,
  getLeaveApplication,
  updateLeaveApplication,
  deleteLeaveApplication,
  approveLeaveApplication,
  rejectLeaveApplication,
} = require('../controllers/leaveApplicationController');

// Employee Routes
router.route('/employees')
  .post(createEmployee)
  .get(getEmployees);

router.route('/employees/:id')
  .get(getEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

// Holiday List Routes
router.route('/holiday-lists')
  .post(createHolidayList)
  .get(getHolidayLists);

router.route('/holiday-lists/:id')
  .get(getHolidayList)
  .put(updateHolidayList)
  .delete(deleteHolidayList);

router.route('/holiday-lists/:id/holidays')
  .post(addHoliday);

router.route('/holiday-lists/:id/holidays/:holidayId')
  .put(updateHoliday)
  .delete(deleteHoliday);

// Leave Type Routes
router.route('/leave-types')
  .post(createLeaveType)
  .get(getLeaveTypes);

router.route('/leave-types/:id')
  .get(getLeaveType)
  .put(updateLeaveType)
  .delete(deleteLeaveType);

// Leave Allocation Routes
router.route('/leave-allocations')
  .post(createLeaveAllocation)
  .get(getLeaveAllocations);

router.route('/leave-allocations/:id')
  .get(getLeaveAllocation)
  .put(updateLeaveAllocation)
  .delete(deleteLeaveAllocation);

// Leave Application Routes
router.route('/leave-applications')
  .post(createLeaveApplication)
  .get(getLeaveApplications);

router.route('/leave-applications/:id')
  .get(getLeaveApplication)
  .put(updateLeaveApplication)
  .delete(deleteLeaveApplication);

router.route('/leave-applications/:id/approve')
  .put(approveLeaveApplication);

router.route('/leave-applications/:id/reject')
  .put(rejectLeaveApplication);

module.exports = router;

