'use client';

import React, { useState, useCallback } from 'react';
import { leaveTypeAPI } from '../../../../lib/api';

export default function LeaveType() {
  const [leaveTypeName, setLeaveTypeName] = useState('');
  const [maxLeavesAllowed, setMaxLeavesAllowed] = useState('');
  const [applicableAfter, setApplicableAfter] = useState('');
  const [maxContinuousDays, setMaxContinuousDays] = useState('');
  const [minWorkingDaysSinceJoining, setMinWorkingDaysSinceJoining] = useState('');
  const [isCarryForward, setIsCarryForward] = useState(false);
  const [maxCarryForwardedLeaves, setMaxCarryForwardedLeaves] = useState('');
  const [carryForwardExpiryEnabled, setCarryForwardExpiryEnabled] = useState(false);
  const [expireCarryForwardedDays, setExpireCarryForwardedDays] = useState('');
  const [allowEncashment, setAllowEncashment] = useState(false);
  const [encashmentThreshold, setEncashmentThreshold] = useState('');
  const [earningComponent, setEarningComponent] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [fractionOfDailyRate, setFractionOfDailyRate] = useState('');
  const [includeHoliday, setIncludeHoliday] = useState(false);
  const [isCompensatory, setIsCompensatory] = useState(false);
  const [isOptional, setIsOptional] = useState(false);
  const [allowNegative, setAllowNegative] = useState(false);
  const [description, setDescription] = useState('');
  const [isLeaveWithoutPay, setIsLeaveWithoutPay] = useState(false);
  const [isPartiallyPaidLeave, setIsPartiallyPaidLeave] = useState(false);
  const [allowOverAllocation, setAllowOverAllocation] = useState(false);
  const [isEarnedLeave, setIsEarnedLeave] = useState(false);

  const [encashmentSectionOpen, setEncashmentSectionOpen] = useState(false);
  const [carryForwardSectionOpen, setCarryForwardSectionOpen] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const numberOrUndefined = (value) => {
    if (value === '' || value === null || value === undefined) return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
  };

  const resetForm = () => {
    setLeaveTypeName('');
    setMaxLeavesAllowed('');
    setApplicableAfter('');
    setMaxContinuousDays('');
    setMinWorkingDaysSinceJoining('');
    setIsCarryForward(false);
    setMaxCarryForwardedLeaves('');
    setCarryForwardExpiryEnabled(false);
    setExpireCarryForwardedDays('');
    setAllowEncashment(false);
    setEncashmentThreshold('');
    setEarningComponent('');
    setIsPaid(false);
    setFractionOfDailyRate('');
    setIncludeHoliday(false);
    setIsCompensatory(false);
    setIsOptional(false);
    setAllowNegative(false);
    setDescription('');
    setIsLeaveWithoutPay(false);
    setIsPartiallyPaidLeave(false);
    setAllowOverAllocation(false);
    setIsEarnedLeave(false);
    setEncashmentSectionOpen(false);
    setCarryForwardSectionOpen(false);
  };

  const handleSave = useCallback(async () => {
    if (isSaving) return;

    const trimmedName = leaveTypeName.trim();
    if (!trimmedName) {
      setAlertType('error');
      setAlertMessage('Leave Type Name is required.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 4000);
      return;
    }

    const payload = {
      leaveTypeName: trimmedName,
      maxLeavesAllowed: numberOrUndefined(maxLeavesAllowed),
      applicableAfter: numberOrUndefined(applicableAfter),
      maxContinuousDays: numberOrUndefined(maxContinuousDays),
      minWorkingDaysSinceJoining: numberOrUndefined(minWorkingDaysSinceJoining),
      isCarryForward,
      maxCarryForwardedLeaves: numberOrUndefined(maxCarryForwardedLeaves),
      carryForwardExpiry: carryForwardExpiryEnabled,
      expireCarryForwardedDays: numberOrUndefined(expireCarryForwardedDays),
      encashment: allowEncashment,
      encashmentThreshold: numberOrUndefined(encashmentThreshold),
      earningComponent: earningComponent.trim() || undefined,
      isPaid,
      fractionOfDailyRate: numberOrUndefined(fractionOfDailyRate),
      includeHoliday,
      isCompensatory,
      isOptional,
      allowNegative,
      description: description.trim() || undefined,
      isLeaveWithoutPay,
      isPartiallyPaidLeave,
      allowOverAllocation,
      isEarnedLeave,
    };

    const cleanedPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value !== undefined)
    );

    try {
      setIsSaving(true);
      await leaveTypeAPI.create(cleanedPayload);
      setAlertType('success');
      setAlertMessage('Leave type saved successfully.');
      setShowAlert(true);
      resetForm();
    } catch (error) {
      setAlertType('error');
      setAlertMessage(error.message || 'Failed to save leave type.');
      setShowAlert(true);
    } finally {
      setIsSaving(false);
      setTimeout(() => setShowAlert(false), 4000);
    }
  }, [
    allowEncashment,
    allowNegative,
    allowOverAllocation,
    applicableAfter,
    carryForwardExpiryEnabled,
    description,
    earningComponent,
    expireCarryForwardedDays,
    fractionOfDailyRate,
    includeHoliday,
    isCarryForward,
    isCompensatory,
    isEarnedLeave,
    isLeaveWithoutPay,
    isOptional,
    isPaid,
    isPartiallyPaidLeave,
    isSaving,
    leaveTypeName,
    maxCarryForwardedLeaves,
    maxContinuousDays,
    maxLeavesAllowed,
    minWorkingDaysSinceJoining,
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {showAlert && (
          <div
            className={`mb-4 rounded-md border px-4 py-3 text-sm ${
              alertType === 'success'
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {alertMessage}
          </div>
        )}
        {/* Main Container */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Main Content */}
          <div className="p-6">
             {/* Two Column Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Input Fields */}
              <div className="space-y-4">
                {/* Leave Type Name - Required */}
                <div>
                  <label htmlFor="leave-type-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Leave Type Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="leave-type-name"
                    value={leaveTypeName}
                    onChange={(e) => setLeaveTypeName(e.target.value)}
                    className="w-full px-3  rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Maximum Leave Allocation Allowed per Leave Period */}
                <div>
                  <label htmlFor="max-allocation" className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Leave Allocation Allowed per Leave Period
                  </label>
                  <input
                    type="number"
                    id="max-allocation"
                    value={maxLeavesAllowed}
                    onChange={(e) => setMaxLeavesAllowed(e.target.value)}
                    className="w-full px-3  rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Allow Leave Application After (Working Days) */}
                <div>
                  <label htmlFor="allow-application-after" className="block text-sm font-medium text-gray-700 mb-1">
                    Allow Leave Application After (Working Days)
                  </label>
                  <input
                    type="number"
                    id="allow-application-after"
                    value={applicableAfter}
                    onChange={(e) => setApplicableAfter(e.target.value)}
                    className="w-full px-3  rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Minimum working days required since Date of Joining to apply for this leave */}
                <div>
                  <label htmlFor="min-working-days" className="block text-sm font-medium text-gray-700 ">
                    Minimum working days required since Date of Joining to apply for this leave
                  </label>
                  <input
                    type="number"
                    id="min-working-days"
                    value={minWorkingDaysSinceJoining}
                    onChange={(e) => setMinWorkingDaysSinceJoining(e.target.value)}
                    className="w-full px-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Maximum Consecutive Leaves Allowed */}
                <div>
                  <label htmlFor="max-consecutive" className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Consecutive Leaves Allowed
                  </label>
                  <input
                    type="number"
                    id="max-consecutive"
                    value={maxContinuousDays}
                    onChange={(e) => setMaxContinuousDays(e.target.value)}
                    className="w-full px-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Maximum Carry Forwarded Leaves */}
                <div>
                  <label htmlFor="max-carry-forward" className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Carry Forwarded Leaves
                  </label>
                  <input
                    type="number"
                    id="max-carry-forward"
                    value={maxCarryForwardedLeaves}
                    onChange={(e) => setMaxCarryForwardedLeaves(e.target.value)}
                    className="w-full px-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Fraction of Daily Rate */}
                <div>
                  <label htmlFor="fraction-daily-rate" className="block text-sm font-medium text-gray-700 mb-1">
                    Fraction of Daily Rate
                  </label>
                  <input
                    type="number"
                    id="fraction-daily-rate"
                    step="0.01"
                    value={fractionOfDailyRate}
                    onChange={(e) => setFractionOfDailyRate(e.target.value)}
                    className="w-full px-3  rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Earning Component */}
                <div>
                  <label htmlFor="earning-component" className="block text-sm font-medium text-gray-700 mb-1">
                    Earning Component
                  </label>
                  <input
                    type="text"
                    id="earning-component"
                    value={earningComponent}
                    onChange={(e) => setEarningComponent(e.target.value)}
                    className="w-full px-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Right Column - Checkboxes */}
              <div className="space-y-4">
                {/* Is Carry Forward */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is-carry-forward"
                    checked={isCarryForward}
                    onChange={(e) => setIsCarryForward(e.target.checked)}
                    className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is-carry-forward" className="ml-2 text-sm text-gray-700">
                    Is Carry Forward
                  </label>
                </div>

                {/* Is Leave Without Pay */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is-leave-without-pay"
                    checked={isLeaveWithoutPay}
                    onChange={(e) => setIsLeaveWithoutPay(e.target.checked)}
                    className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is-leave-without-pay" className="ml-2 text-sm text-gray-700">
                    Is Leave Without Pay
                  </label>
                </div>

                {/* Is Paid Leave */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is-paid"
                    checked={isPaid}
                    onChange={(e) => setIsPaid(e.target.checked)}
                    className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is-paid" className="ml-2 text-sm text-gray-700">
                    Is Paid Leave
                  </label>
                </div>

                {/* Is Partially Paid Leave */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is-partially-paid"
                    checked={isPartiallyPaidLeave}
                    onChange={(e) => setIsPartiallyPaidLeave(e.target.checked)}
                    className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is-partially-paid" className="ml-2 text-sm text-gray-700">
                    Is Partially Paid Leave
                  </label>
                </div>

                {/* Is Optional Leave */}
                <div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="is-optional"
                      checked={isOptional}
                      onChange={(e) => setIsOptional(e.target.checked)}
                      className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="is-optional" className="ml-2 text-sm text-gray-700">
                      Is Optional Leave
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">
                    These leaves are holidays permitted by the company however, availing it is optional for an Employee.
                  </p>
                </div>

                {/* Allow Negative Balance */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allow-negative"
                    checked={allowNegative}
                    onChange={(e) => setAllowNegative(e.target.checked)}
                    className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="allow-negative" className="ml-2 text-sm text-gray-700">
                    Allow Negative Balance
                  </label>
                </div>

                {/* Allow Over Allocation */}
                <div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="allow-over-allocation"
                      checked={allowOverAllocation}
                      onChange={(e) => setAllowOverAllocation(e.target.checked)}
                      className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="allow-over-allocation" className="ml-2 text-sm text-gray-700">
                      Allow Over Allocation
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">
                    Allows allocating more leaves than the number of days in the allocation period.
                  </p>
                </div>

                {/* Include holidays within leaves as leaves */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="include-holiday"
                    checked={includeHoliday}
                    onChange={(e) => setIncludeHoliday(e.target.checked)}
                    className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="include-holiday" className="ml-2 text-sm text-gray-700">
                    Include holidays within leaves as leaves
                  </label>
                </div>

                {/* Is Compensatory */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is-compensatory"
                    checked={isCompensatory}
                    onChange={(e) => setIsCompensatory(e.target.checked)}
                    className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is-compensatory" className="ml-2 text-sm text-gray-700">
                    Is Compensatory
                  </label>
                </div>
              </div>
            </div>

            {/* Encashment Section */}
            <div className="mt-8 border-t border-gray-200 pt-2">
              <div
                className="flex items-center mb-4 cursor-pointer"
                onClick={() => setEncashmentSectionOpen(!encashmentSectionOpen)}
              >
                <button className="text-gray-400 hover:text-gray-600 mr-2">
                  <svg
                    className={`h-5 w-5 transition-transform ${encashmentSectionOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <h3 className="text-base font-semibold text-gray-900">Encashment</h3>
              </div>

              {encashmentSectionOpen && (
                <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                  {/* Allow Encashment Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="allow-encashment"
                      checked={allowEncashment}
                      onChange={(e) => setAllowEncashment(e.target.checked)}
                      className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="allow-encashment" className="ml-2 text-sm text-gray-700">
                      Allow Encashment
                    </label>
                  </div>

                  {/* Encashment Threshold */}
                  <div>
                    <label htmlFor="encashment-threshold" className="block text-sm font-medium text-gray-700 mb-1">
                      Encashment Threshold
                    </label>
                    <input
                      type="number"
                      id="encashment-threshold"
                      value={encashmentThreshold}
                      onChange={(e) => setEncashmentThreshold(e.target.value)}
                      className="w-full px-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Earned Leave Section */}
            <div className="mt-6 border-t border-gray-200 pt-2">
              <div
                className="flex items-center mb-4 cursor-pointer"
                onClick={() => setCarryForwardSectionOpen(!carryForwardSectionOpen)}
              >
                <button className="text-gray-400 hover:text-gray-600 mr-2">
                  <svg
                    className={`h-5 w-5 transition-transform ${carryForwardSectionOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <h3 className="text-base font-semibold text-gray-900">Earned Leave</h3>
              </div>

              {carryForwardSectionOpen && (
                <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                  {/* Carry Forward Expiry */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="carry-forward-expiry"
                      checked={carryForwardExpiryEnabled}
                      onChange={(e) => setCarryForwardExpiryEnabled(e.target.checked)}
                      className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="carry-forward-expiry" className="ml-2 text-sm text-gray-700">
                      Enable Carry Forward Expiry
                    </label>
                  </div>

                  {carryForwardExpiryEnabled && (
                    <div>
                      <label htmlFor="expire-carry-forwarded-days" className="block text-sm font-medium text-gray-700 mb-1">
                        Expire Carry Forwarded Leaves After (Days)
                      </label>
                      <input
                        type="number"
                        id="expire-carry-forwarded-days"
                        value={expireCarryForwardedDays}
                        onChange={(e) => setExpireCarryForwardedDays(e.target.value)}
                        className="w-full px-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {/* Is Earned Leave Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is-earned-leave"
                      checked={isEarnedLeave}
                      onChange={(e) => setIsEarnedLeave(e.target.checked)}
                      className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="is-earned-leave" className="ml-2 text-sm text-gray-700">
                      Is Earned Leave
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <label htmlFor="leave-description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="leave-description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add additional details about this leave type"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

