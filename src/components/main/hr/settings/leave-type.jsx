'use client';

import React, { useState } from 'react';

export default function LeaveType() {
  const [leaveTypeName, setLeaveTypeName] = useState('');
  const [maxLeavesAllowed, setMaxLeavesAllowed] = useState('');
  const [applicableAfter, setApplicableAfter] = useState('');
  const [maxContinuousDays, setMaxContinuousDays] = useState('');
  const [isCarryForward, setIsCarryForward] = useState(false);
  const [maxCarryForwardedLeaves, setMaxCarryForwardedLeaves] = useState('');
  const [carryForwardExpiry, setCarryForwardExpiry] = useState(false);
  const [expireCarryForwardedDays, setExpireCarryForwardedDays] = useState('');
  const [encashment, setEncashment] = useState(false);
  const [encashmentThreshold, setEncashmentThreshold] = useState('');
  const [earningComponent, setEarningComponent] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [fractionOfDailyRate, setFractionOfDailyRate] = useState('');
  const [includeHoliday, setIncludeHoliday] = useState(false);
  const [isCompensatory, setIsCompensatory] = useState(false);
  const [isOptional, setIsOptional] = useState(false);
  const [allowNegative, setAllowNegative] = useState(false);
  const [description, setDescription] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
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
                  
                </div>

                {/* Maximum Consecutive Leaves Allowed */}
                <div>
                  <label htmlFor="max-consecutive" className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Consecutive Leaves Allowed
                  </label>
                  <input
                    type="number"
                    id="max-consecutive"
                    className="w-full px-3  rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="is-leave-without-pay" className="ml-2 text-sm text-gray-700">
                    Is Leave Without Pay
                  </label>
                </div>

                {/* Is Partially Paid Leave */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is-partially-paid"
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
              <div className="flex items-center mb-4 cursor-pointer" onClick={() => setEncashment(!encashment)}>
                <button className="text-gray-400 hover:text-gray-600 mr-2">
                  <svg className={`h-5 w-5 transition-transform ${encashment ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <h3 className="text-base font-semibold text-gray-900">Encashment</h3>
              </div>

              {encashment && (
                <div className="space-y-4">
                  {/* Allow Encashment Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="allow-encashment"
                      className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="allow-encashment" className="ml-2 text-sm text-gray-700">
                      Allow Encashment
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Earned Leave Section */}
            <div className="mt-6 border-t border-gray-200 pt-2">
              <div className="flex items-center mb-4 cursor-pointer" onClick={() => setCarryForwardExpiry(!carryForwardExpiry)}>
                <button className="text-gray-400 hover:text-gray-600 mr-2">
                  <svg className={`h-5 w-5 transition-transform ${carryForwardExpiry ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <h3 className="text-base font-semibold text-gray-900">Earned Leave</h3>
              </div>

              {carryForwardExpiry && (
                <div className="space-y-4">
                  {/* Is Earned Leave Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is-earned-leave"
                      className="h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="is-earned-leave" className="ml-2 text-sm text-gray-700">
                      Is Earned Leave
                    </label>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

