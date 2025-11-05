import React from 'react';
import Footer from '../pricing/Footer';

export default function EmployeeSteps() {
  const employeeSteps = [
    {
      id: 1,
      heading: "Maintain a comprehensive employee repository"
    },
    {
      id: 2,
      heading: "Visualize your org structure"
    },
    {
      id: 3,
      heading: "Onboard employees"
    },
    {
      id: 4,
      heading: "Manage promotions & transfers"
    },
    {
      id: 5,
      heading: "Automate employee reminders"
    },
    {
      id: 6,
      heading: "Acknowledge grievances"
    },
    {
      id: 7,
      heading: "Settle full and final statements"
    },
    {
      id: 8,
      heading: "Document employee feedback with exit interviews"
    }
  ];

  const scrollToNextFeature = () => {
    console.log('Attempting to navigate to Shifts & Attendance');
    
    // Method 1: Try to directly update the parent component's state
    if (window.navigateToPage) {
      window.navigateToPage('Shifts & Attendance');
      // Scroll the main content area to top after navigation
      setTimeout(() => {
        const mainContent = document.querySelector('.flex-1.overflow-y-auto');
        if (mainContent) {
          mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    
    // Method 2: Dispatch custom event
    window.dispatchEvent(new CustomEvent('navigateToShiftsAttendance'));
    
    // Method 3: Try to find and click sidebar button
    setTimeout(() => {
      const sidebarItems = document.querySelectorAll('[role="button"], button, div[onclick], .sidebar-item');
      console.log('Found sidebar items:', sidebarItems.length);
      
      const shiftsButton = Array.from(sidebarItems).find(item => {
        const text = item.textContent?.trim();
        console.log('Checking item text:', text);
        return text === 'Shifts & Attendance';
      });
      
      if (shiftsButton) {
        console.log('Found Shifts & Attendance button, clicking...');
        shiftsButton.click();
        // Scroll the main content area to top after navigation
        setTimeout(() => {
          const mainContent = document.querySelector('.flex-1.overflow-y-auto');
          if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 200);
      } else {
        console.log('Shifts & Attendance button not found, trying alternative...');
        // Try clicking any element that contains "Shifts"
        const altButton = Array.from(sidebarItems).find(item => 
          item.textContent?.includes('Shifts')
        );
        if (altButton) {
          console.log('Found alternative button with "Shifts", clicking...');
          altButton.click();
          // Scroll the main content area to top after navigation
          setTimeout(() => {
            const mainContent = document.querySelector('.flex-1.overflow-y-auto');
            if (mainContent) {
              mainContent.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 200);
        }
      }
    }, 100);
  };

  const scrollToPreviousFeature = () => {
    console.log('Attempting to navigate to Recruitment');
    
    // Method 1: Try to directly update the parent component's state
    if (window.navigateToPage) {
      window.navigateToPage('Recruitment');
      // Scroll the main content area to top after navigation
      setTimeout(() => {
        const mainContent = document.querySelector('.flex-1.overflow-y-auto');
        if (mainContent) {
          mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    
    // Method 2: Dispatch custom event
    window.dispatchEvent(new CustomEvent('navigateToRecruitment'));
    
    // Method 3: Try to find and click sidebar button
    setTimeout(() => {
      const sidebarItems = document.querySelectorAll('[role="button"], button, div[onclick], .sidebar-item');
      console.log('Found sidebar items:', sidebarItems.length);
      
      const recruitmentButton = Array.from(sidebarItems).find(item => {
        const text = item.textContent?.trim();
        console.log('Checking item text:', text);
        return text === 'Recruitment';
      });
      
      if (recruitmentButton) {
        console.log('Found Recruitment button, clicking...');
        recruitmentButton.click();
        // Scroll the main content area to top after navigation
        setTimeout(() => {
          const mainContent = document.querySelector('.flex-1.overflow-y-auto');
          if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 200);
      } else {
        console.log('Recruitment button not found, trying alternative...');
        // Try clicking any element that contains "Recruitment"
        const altButton = Array.from(sidebarItems).find(item => 
          item.textContent?.includes('Recruitment')
        );
        if (altButton) {
          console.log('Found alternative button with "Recruitment", clicking...');
          altButton.click();
          // Scroll the main content area to top after navigation
          setTimeout(() => {
            const mainContent = document.querySelector('.flex-1.overflow-y-auto');
            if (mainContent) {
              mainContent.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }, 200);
        }
      }
    }, 100);
  };

  return (
    <div className=" ">
        
      {/* All Content Sections */}
        {employeeSteps.map((step) => (
        <div key={step.id} id={`step-${step.id}`} className="mb-16 px-10 max-w-4xl mx-auto">
          <div className="text-center">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-start px-28 text-gray-900 mb-6 font-Newsreader">
              {step.heading}
            </h2>

            {/* Paragraph */}
            <div className="max-w-[590px] mx-auto mb-8">
              <p className="text-sm text-gray-700 leading-relaxed text-left">
                {step.id === 1 && "As your business grows, organize your company based on branches, departments, designations, and more with a highly scalable employee database. Quickly access any document linked to an employee right from the employee dashboard."}
                {step.id === 2 && "The organizational chart in Frappe HR visually represents who a person is reporting to and their position in the organization hierarchy. Providing employees access to the organization chart can help them reach out to the right people, and improve communication and collaboration across teams and hierarchies."}
                {step.id === 3 && "Onboarding an employee involves coordinating with different departments and reporting managers. Standardize onboarding procedures by creating department or designation-wise templates, outlining task assignments with due dates - be it access-related activities, issuing assets, allocating leaves, or document uploads."}
                {step.id === 4 && "Reward your top employees with promotions and manage company/department-wise transfers seamlessly. Frappe HR maintains an internal work history to record your employee's journey within the organization."}
                {step.id === 5 && "Don't miss out on important events for your teammates with birthday and work anniversary reminders. You can also enable advance holiday reminders to help you plan the next holiday you want to go on!"}
                {step.id === 6 && "Ensure your employees feel heard by managing grievance reporting and resolution effectively. Provide a platform to employees for expressing concerns, whether it's with a teammate, department, or the company."}
                {step.id === 7 && "Frappe HR simplifies separation tasks with full and final settlements. Settle payables, receivables, and assets allocated to the employee, and record the accounting impact. You can also choose to recover asset costs instead of returning them, letting the employees own the assets."}
                {step.id === 8 && "Document your exit interviews and gather feedback using customized exit questionnaires to identify areas of improvement for the company."}
              </p>
            </div>

            {/* Media Content */}
            <div className="max-w-4xl mx-auto">
              {step.id === 1 ? (
                <img 
                  src="https://frappe.io/files/onboard-employees.webp" 
                  alt={`${step.heading} Interface Preview`}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              ) : step.id === 2 ? (
                <img 
                  src="https://frappe.io/files/org-chart6f6cbc.webp" 
                  alt={`${step.heading} Interface Preview`}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              ) : step.id === 3 ? (
                <img 
                  src="https://frappe.io/files/onboard-employees.webp" 
                  alt={`${step.heading} Interface Preview`}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
                ) : step.id === 4 ? (
                <img 
                  src="https://frappe.io/files/onboard-employees.webp" 
                  alt={`${step.heading} Interface Preview`}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              ) : step.id === 5 ? (
                <img 
                  src="https://frappe.io/files/manage-promotions.webp" 
                  alt={`${step.heading} Interface Preview`}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              ) : step.id === 6 ? (
                <img 
                  src="https://frappe.io/files/remindersaa8b0e.webp" 
                  alt={`${step.heading} Interface Preview`}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              ) : step.id === 7 ? (
                <img 
                  src="https://frappe.io/files/grievancesa9a870.webp" 
                  alt={`${step.heading} Interface Preview`}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              ) : step.id === 8 ? (
                <img 
                  src="https://frappe.io/files/fullandfinal.webp" 
                  alt={`${step.heading} Interface Preview`}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              ) : (
                <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                  <img 
                  src={step.id === 1 ? "https://frappe.io/files/onboarding-4k.webp" : 
                        step.id === 2 ? "https://frappe.io/files/performance-management-4k.webp" : 
                        step.id === 3 ? "https://frappe.io/files/attendance-management-4k.webp" :
                        step.id === 4 ? "https://frappe.io/files/leave-management-4k.webp" :
                        step.id === 5 ? "https://frappe.io/files/expense-management-4k.webp" :
                        step.id === 6 ? "https://frappe.io/files/payroll-management-4k.webp" :
                        step.id === 7 ? "https://frappe.io/files/offboarding-4k.webp" :
                        step.id === 8 ? "https://frappe.io/files/employee-analytics-4k.webp" :
                        "https://frappe.io/files/onboarding-4k.webp"} 
                            alt={`${step.heading} Interface Preview`}
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
              )}
            </div>
            
          </div>
        </div>
      ))}
                 

      {/* Previous/Next Feature Section */}
      <div className="mt-1 pt-8">
        <hr className="w-full max-w-[700px] mx-auto border-gray-300 mb-4"/>
        <div className="max-w-[700px] mx-auto flex justify-between items-center px-4">
          {/* Previous Feature */}
          <div className="text-left">
            <p className="text-gray-500 text-[10px] uppercase tracking-wider ">PREVIOUS FEATURE</p>
            <p className="text-gray-700 text-lg font-medium cursor-pointer hover:text-gray-900 transition-colors" onClick={() => scrollToPreviousFeature()}>
              ← Recruitment
            </p>
          </div>
          
          {/* Next Feature */}
          <div className="text-right">
            <p className="text-gray-500 text-[10px] uppercase tracking-wider ">NEXT FEATURE</p>
            <p className="text-gray-700 text-lg font-medium cursor-pointer hover:text-gray-900 transition-colors" onClick={() => scrollToNextFeature()}>
              Shifts & Attendance →
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
