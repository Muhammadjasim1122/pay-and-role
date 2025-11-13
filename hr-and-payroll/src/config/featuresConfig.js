// Centralized configuration for all HR features
export const featuresConfig = {
  'Recruitment': {
    id: 'recruitment',
    title: 'Recruitment',
    description: 'With a growing company, comes a rapidly growing roster of employees. From planning your hiring strategy and scheduling interviews to identifying the best candidates and making job offers, Frappe HR has got you covered throughout your recruitment cycle.',
    steps: [
      {
        id: 1,
        heading: 'Anticipate your hiring needs',
        description: 'Make your recruitment process inclusive to avoid over-hiring. Allow hiring managers and department heads to raise Job Requisitions, clearly communicating their needs. Encourage employees to refer suitable candidates from their network to build a strong team.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/anticipate-hiring-needs.webp'
        }
      },
      {
        id: 2,
        heading: 'Create staffing plans',
        description: 'Plan your workforce strategically with comprehensive staffing plans. Define roles, responsibilities, and timelines for each position. Track budget allocations and ensure alignment with organizational goals and growth projections.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/staffing-plans.webp'
        }
      },
      {
        id: 3,
        heading: 'List job openings',
        description: 'Publish job openings across multiple channels to reach the right candidates. Create compelling job descriptions, set application deadlines, and manage posting schedules. Track performance metrics for each job posting.',
        media: {
          type: 'video',
          src: '/files/job-listing-4k.mp4'
        }
      },
      {
        id: 4,
        heading: 'Manage job applicants',
        description: 'Streamline applicant management with automated workflows. Parse resumes, screen candidates, and maintain detailed applicant profiles. Track application status and communication history throughout the hiring process.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/manage-job-applicants869c0c.webp'
        }
      },
      {
        id: 5,
        heading: 'Schedule interviews',
        description: 'Coordinate interview schedules efficiently with calendar integration. Send automated reminders, manage interviewer availability, and track interview feedback. Ensure smooth communication between all stakeholders.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/schedule-interviews.webp'
        }
      },
      {
        id: 6,
        heading: 'Capture & analyse feedback for decision making',
        description: 'Collect comprehensive feedback from all interviewers and stakeholders. Analyze candidate performance, compare against job requirements, and make data-driven hiring decisions. Maintain detailed records for future reference.',
        media: {
          type: 'video',
          src: '/files/interview-4k.mp4'
        }
      },
      {
        id: 7,
        heading: 'Send job offers',
        description: 'Create and send professional job offers with detailed terms and conditions. Track offer acceptance rates, negotiate terms when needed, and manage the onboarding process. Ensure compliance with employment laws and company policies.',
        media: {
          type: 'video',
          src: '/files/send-job-offers39e42c.mp4'
        }
      },
      {
        id: 8,
        heading: 'Recruitment Analytics',
        description: 'Analyze recruitment performance with comprehensive analytics and reporting. Track key metrics like time-to-hire, cost-per-hire, and source effectiveness. Generate insights to optimize your recruitment strategy and improve hiring outcomes.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/recruitment-dashboardef6b4b.webp'
        }
      }
    ],
    navigation: {
      previous: null, // No previous feature
      next: 'Employee Lifecycle'
    }
  },

  'Employee Lifecycle': {
    id: 'employee-lifecycle',
    title: 'Employee Lifecycle',
    description: 'We understand that as an HR rep, your goal is to make life easier for your employees throughout their entire lifecycle. Right from onboarding to exits, transfers to promotions, we have got your back every step of the way.',
    steps: [
      {
        id: 1,
        heading: 'Maintain a comprehensive employee repository',
        description: 'As your business grows, organize your company based on branches, departments, designations, and more with a highly scalable employee database. Quickly access any document linked to an employee right from the employee dashboard.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/onboard-employees.webp'
        }
      },
      {
        id: 2,
        heading: 'Visualize your org structure',
        description: 'The organizational chart in Frappe HR visually represents who a person is reporting to and their position in the organization hierarchy. Providing employees access to the organization chart can help them reach out to the right people, and improve communication and collaboration across teams and hierarchies.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/org-chart6f6cbc.webp'
        }
      },
      {
        id: 3,
        heading: 'Onboard employees',
        description: 'Onboarding an employee involves coordinating with different departments and reporting managers. Standardize onboarding procedures by creating department or designation-wise templates, outlining task assignments with due dates - be it access-related activities, issuing assets, allocating leaves, or document uploads.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/onboard-employees.webp'
        }
      },
      {
        id: 4,
        heading: 'Manage promotions & transfers',
        description: 'Reward your top employees with promotions and manage company/department-wise transfers seamlessly. Frappe HR maintains an internal work history to record your employee\'s journey within the organization.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/onboard-employees.webp'
        }
      },
      {
        id: 5,
        heading: 'Automate employee reminders',
        description: 'Don\'t miss out on important events for your teammates with birthday and work anniversary reminders. You can also enable advance holiday reminders to help you plan the next holiday you want to go on!',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/manage-promotions.webp'
        }
      },
      {
        id: 6,
        heading: 'Acknowledge grievances',
        description: 'Ensure your employees feel heard by managing grievance reporting and resolution effectively. Provide a platform to employees for expressing concerns, whether it\'s with a teammate, department, or the company.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/remindersaa8b0e.webp'
        }
      },
      {
        id: 7,
        heading: 'Settle full and final statements',
        description: 'Frappe HR simplifies separation tasks with full and final settlements. Settle payables, receivables, and assets allocated to the employee, and record the accounting impact. You can also choose to recover asset costs instead of returning them, letting the employees own the assets.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/grievancesa9a870.webp'
        }
      },
      {
        id: 8,
        heading: 'Document employee feedback with exit interviews',
        description: 'Document your exit interviews and gather feedback using customized exit questionnaires to identify areas of improvement for the company.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/fullandfinal.webp'
        }
      }
    ],
    navigation: {
      previous: 'Recruitment',
      next: 'Shifts & Attendance'
    }
  },

  'Shifts & Attendance': {
    id: 'shifts-attendance',
    title: 'Shifts & Attendance',
    description: 'Managing attendance for a geographically scattered team can be a nightmare. Bid adieu to tedious spreadsheets and shift registers. Frappe HR offers a variety of options to ensure that attendance records are always up-to-date. Our mobile app enables your team to clock in and out from anywhere with geolocation capturing. You can also manage shifts and rosters effortlessly and integrate your biometric device for auto attendance. Need more control? The bulk attendance & shift tools help you efficiently manage attendance at scale.',
    steps: [
      {
        id: 1,
        heading: 'Configure shifts',
        description: 'Easily configure multiple shifts with auto attendance settings. Control working hours threshold, calculation methods, and grace period settings.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/configure-shifts.webp'
        }
      },
      {
        id: 2,
        heading: 'Apply & approve shift requests',
        description: 'Let employees pick shifts that work best for them. Shift calendar makes it easier to visualize their team\'s schedules. You can also set up multi-level approval workflows to finalize the assignments.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/shift-request.webp'
        }
      },
      {
        id: 3,
        heading: 'Manage rosters',
        description: 'Visualize your employee list, holidays, and existing shift assignments and requests with the shift planning view. Drag & drop shifts to alter or swap schedules with other employees. You can also create repeating shift schedules ahead of time.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/roster.webp'
        }
      },
      {
        id: 4,
        heading: 'Check-in and check-out with geolocation capturing',
        description: 'Make check-ins and check-outs a breeze with the Frappe HR mobile app\'s easy interface. You can also enable geolocation tracking for a detailed work location history.',
        media: {
          type: 'video',
          src: '/files/employee-checkin.mp4'
        }
      },
      {
        id: 5,
        heading: 'Integrate biometric devices',
        description: 'Improve accuracy and eliminate manual errors by seamlessly integrating biometric devices from multiple locations for syncing logs.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/employee-checkin.webp'
        }
      },
      {
        id: 6,
        heading: 'Auto attendance in sync with your payroll',
        description: 'Frappe HR marks auto attendance based on your check-ins and shift settings. It also calculates working hours, and flags late entries & early exits based on your configuration. If you are using separate systems for attendance & payroll, Frappe HR can make your life easier. The attendance system is closely integrated with payroll to ensure accurate and timely payments.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/auto-attendance.webp'
        }
      },
      {
        id: 7,
        heading: 'Regularize attendance with attendance requests',
        description: 'Missed a swipe? No sweat. Employees can easily submit attendance requests to rectify the attendance marked by the system.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/attendance-request.webp'
        }
      },
      {
        id: 8,
        heading: 'Use bulk attendance tools for more control',
        description: 'If you prefer marking attendance manually, use Frappe HR\'s bulk tools. The employee attendance tool helps you mark attendance for all employees with drill-down filters while keeping the marked attendance data handy. You can also upload attendance from your spreadsheets using Upload Attendance or Data Import tools.'
      },
      {
        id: 9,
        heading: 'Analyse with attendance reports',
        description: 'Missed an entry? Don\'t worry. You can refer back to the monthly attendance sheet with drill-down filters to see day-wise attendance status per shift. Easily visualize leaves and holidays or view a summary of total present/absent days, late entries, early exits, and leaves taken for each type. View checkin & attendance summary with the shift attendance report.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/attendance-sheet.webp'
        }
      }
    ],
    navigation: {
      previous: 'Employee Lifecycle',
      next: 'Leave Management'
    }
  },

  'Leave Management': {
    id: 'leave-management',
    title: 'Leave Management',
    description: 'Streamline leave requests and approvals with automated workflows and comprehensive leave tracking. Manage leave policies, allocations, and approvals with ease.',
    steps: [
      {
        id: 1,
        heading: 'Configurable leave policies',
        description: 'Tailor your leave policies to fit your organizational needs perfectly. Be it carry-forwarding, expiry, compensatory off, leave without pay, partially paid leave, earned leave, encashments, or consecutive leave allowance — Frappe HR offers a rich set of rules to configure your leave types. Define annual allocation for each leave type with leave policies.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/leave-type915c4d.webp'
        }
      },
      {
        id: 2,
        heading: 'Bulk allocations from the leave control panel',
        description: 'We understand that a single policy cannot be applied to teams with a diverse set of roles and responsibilities. With the leave control panel, filter & drill down to specific employee groups, then assign policies in bulk for consistent and fair leave management.',
        media: {
          type: 'video',
          src: '/files/leave-control-panel.mp4'
        }
      },
      {
        id: 3,
        heading: 'Apply and approve leaves',
        description: 'See an instant leave balance summary while applying for leaves from the desk or your phone. Set up multi-level approval workflows and configure notifications to keep your team informed at all times.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/leave-applicationdeab89.webp'
        }
      },
      {
        id: 4,
        heading: 'Plan better with the leave calendar',
        description: 'Our leave calendar gives you a complete overview of employee availability. See who\'s on leave and when, helping you avoid scheduling conflicts and manage workloads efficiently. Employees can apply for days off directly through the calendar, keeping everyone on the same page.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/leave-calendar.webp'
        }
      },
      {
        id: 5,
        heading: 'Block leave requests during peak periods',
        description: 'Peak seasons, project launches, or critical events require your team to be optimally staffed. Leave block lists enable you to configure leave block dates with reasons applicable to the entire company or specific departments. It also allows you to define a list of approvers who can approve leave applications on these specific dates, in case of urgency.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/leave-block.webp'
        }
      },
      {
        id: 6,
        heading: 'Encash leave balances',
        description: 'Configure salary component & encashment amount per day as per your policies. You can also set up maximum encashable leaves to ensure responsible use. Our payroll engine handles the calculations to ensure fair compensation for unused leave.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/leave-encashment.webp'
        }
      },
      {
        id: 7,
        heading: 'Configure earned leaves',
        description: 'Frappe HR allows you to configure earned leaves - i.e. leaves that are "earned" by employees after working in the company for a certain period. Based on your settings, earned leaves are allocated to the employee on a pro-rata basis for the defined duration. You can also configure rounding of allocated leaves for fractional allotments and choose the accrual day of the month - first day, last day, or day of joining for the employee.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/earned-leave6089b8.webp'
        }
      },
      {
        id: 8,
        heading: 'Effortless holiday planning',
        description: 'Holiday lists have a crucial role to play in attendance, leaves, and payroll calculations. Plan for the year ahead by setting up and sharing a calendar of weekly off, fixed, and optional holidays. Employees can view this list anytime, making project planning and managing deadlines a cinch.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/holiday-listc80489.webp'
        }
      },
      {
        id: 9,
        heading: 'Pull regional holidays with a click',
        description: 'You don\'t need to manually add every local holiday to the list. Just select your country and subdivision and Frappe HR will pull that region\'s local holidays into the list.',
        media: {
          type: 'video',
          src: '/files/regional-holidays.mp4'
        }
      },
      {
        id: 10,
        heading: 'Track balances with leave reports',
        description: 'Get the complete picture with detailed leave balance reports. Use filters for a deep dive into opening balances, carry-forwarded leaves, new allocations, used and expired leaves, and closing balances for every employee. You can also view the leave ledger report to see the complete history of how your leaves were used, allocated, and expired. Use this data to plan and refine leave policies for the upcoming year, ensuring a balanced system that benefits both your team and your business.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/leave-ledgerebc271.webp'
        }
      }
    ],
    navigation: {
      previous: 'Shifts & Attendance',
      next: 'Expense Management'
    }
  },

  'Expense Management': {
    id: 'expense-management',
    title: 'Expense Management',
    description: 'Track and manage employee expenses with detailed expense management tools and automated approvals.',
    steps: [
      {
        id: 1,
        heading: 'Expense Tracking',
        description: 'Track employee expenses with detailed expense management tools. Set budgets, approve requests, and manage reimbursements seamlessly.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/expense-tracking.webp'
        }
      }
    ],
    navigation: {
      previous: 'Leave Management',
      next: 'Performance Management'
    }
  },

  'Performance Management': {
    id: 'performance-management',
    title: 'Performance Management',
    description: 'Track employee performance with comprehensive performance management tools and goal setting.',
    steps: [
      {
        id: 1,
        heading: 'Performance Reviews',
        description: 'Track employee performance with comprehensive performance management tools. Set goals, review progress, and provide feedback to help employees grow and succeed.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/performance-reviews.webp'
        }
      }
    ],
    navigation: {
      previous: 'Expense Management',
      next: 'Payroll'
    }
  },

  'Payroll': {
    id: 'payroll',
    title: 'Payroll',
    description: 'Manage payroll with automated salary calculations, tax deductions, and statutory compliance.',
    steps: [
      {
        id: 1,
        heading: 'Payroll Processing',
        description: 'Manage payroll with automated salary calculations, tax deductions, and statutory compliance. Ensure timely and accurate payroll processing for all employees.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/payroll-processing.webp'
        }
      }
    ],
    navigation: {
      previous: 'Performance Management',
      next: 'Payroll Tax & Reports'
    }
  },

  'Payroll Tax & Reports': {
    id: 'payroll-tax-reports',
    title: 'Payroll Tax & Reports',
    description: 'Generate comprehensive payroll reports and manage tax compliance with automated reporting tools.',
    steps: [
      {
        id: 1,
        heading: 'Tax Management',
        description: 'Generate comprehensive payroll reports and manage tax compliance with automated reporting tools.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/tax-management.webp'
        }
      }
    ],
    navigation: {
      previous: 'Payroll',
      next: 'Mobile App'
    }
  },

  'Mobile App': {
    id: 'mobile-app',
    title: 'Mobile App',
    description: 'Access all HR features on the go with our comprehensive mobile application.',
    steps: [
      {
        id: 1,
        heading: 'Mobile Access',
        description: 'Access all HR features on the go with our comprehensive mobile application. Available for both iOS and Android devices.',
        media: {
          type: 'image',
          src: 'https://frappe.io/files/mobile-app.webp'
        }
      }
    ],
    navigation: {
      previous: 'Payroll Tax & Reports',
      next: null // No next feature
    }
  }
};

// Helper function to get feature configuration
export const getFeatureConfig = (featureName) => {
  return featuresConfig[featureName] || null;
};

// Helper function to get all feature names
export const getAllFeatureNames = () => {
  return Object.keys(featuresConfig);
};

// Helper function to get navigation chain
export const getNavigationChain = () => {
  return Object.keys(featuresConfig).map(key => ({
    name: key,
    id: featuresConfig[key].id,
    previous: featuresConfig[key].navigation.previous,
    next: featuresConfig[key].navigation.next
  }));
};
