import React from 'react';
import Footer from '../pricing/Footer';

export default function RecruitmentSteps() {
  const recruitmentSteps = [
    {
      id: 1,
      heading: "Anticipate your hiring needs"
    },
    {
      id: 2,
      heading: "Create staffing plans"
    },
    {
      id: 3,
      heading: "List job openings"
    },
    {
      id: 4,
      heading: "Manage job applicants"
    },
    {
      id: 5,
      heading: "Schedule interviews"
    },
    {
      id: 6,
      heading: "Capture & analyse feedback for decision making"
    },
    {
      id: 7,
      heading: "Send job offers"
    },
    {
      id: 8,
      heading: "Recruitment Analytics"
    }
  ];

  const scrollToNextFeature = () => {
    console.log('Attempting to navigate to Employee Lifecycle');
    
    // Method 1: Try to directly update the parent component's state
    if (window.navigateToPage) {
      window.navigateToPage('Employee Lifecycle');
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
    window.dispatchEvent(new CustomEvent('navigateToEmployeeLifecycle'));
    
    // Method 3: Try to find and click sidebar button
    setTimeout(() => {
      const sidebarItems = document.querySelectorAll('[role="button"], button, div[onclick], .sidebar-item');
      console.log('Found sidebar items:', sidebarItems.length);
      
      const employeeLifecycleButton = Array.from(sidebarItems).find(item => {
        const text = item.textContent?.trim();
        console.log('Checking item text:', text);
        return text === 'Employee Lifecycle';
      });
      
      if (employeeLifecycleButton) {
        console.log('Found Employee Lifecycle button, clicking...');
        employeeLifecycleButton.click();
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
        console.log('Employee Lifecycle button not found, trying alternative...');
        // Try clicking any element that contains "Employee"
        const altButton = Array.from(sidebarItems).find(item => 
          item.textContent?.includes('Employee')
        );
        if (altButton) {
          console.log('Found alternative button with "Employee", clicking...');
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
      {recruitmentSteps.map((step) => (
        <div key={step.id} id={`step-${step.id}`} className="mb-16 px-10 max-w-4xl mx-auto">
          <div className="text-center">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-start px-28 text-gray-900 mb-6 font-Newsreader">
              {step.heading}
            </h2>

            {/* Paragraph */}
            <div className="max-w-[590px] mx-auto mb-8">
              <p className="text-sm text-gray-700 leading-relaxed text-left">
                {step.id === 1 && "Make your recruitment process inclusive to avoid over-hiring. Allow hiring managers and department heads to raise Job Requisitions, clearly communicating their needs. Encourage employees to refer suitable candidates from their network to build a strong team."}
                {step.id === 2 && "Plan your workforce strategically with comprehensive staffing plans. Define roles, responsibilities, and timelines for each position. Track budget allocations and ensure alignment with organizational goals and growth projections."}
                {step.id === 3 && "Publish job openings across multiple channels to reach the right candidates. Create compelling job descriptions, set application deadlines, and manage posting schedules. Track performance metrics for each job posting."}
                {step.id === 4 && "Streamline applicant management with automated workflows. Parse resumes, screen candidates, and maintain detailed applicant profiles. Track application status and communication history throughout the hiring process."}
                {step.id === 5 && "Coordinate interview schedules efficiently with calendar integration. Send automated reminders, manage interviewer availability, and track interview feedback. Ensure smooth communication between all stakeholders."}
                {step.id === 6 && "Collect comprehensive feedback from all interviewers and stakeholders. Analyze candidate performance, compare against job requirements, and make data-driven hiring decisions. Maintain detailed records for future reference."}
                {step.id === 7 && "Create and send professional job offers with detailed terms and conditions. Track offer acceptance rates, negotiate terms when needed, and manage the onboarding process. Ensure compliance with employment laws and company policies."}
                {step.id === 8 && "Analyze recruitment performance with comprehensive analytics and reporting. Track key metrics like time-to-hire, cost-per-hire, and source effectiveness. Generate insights to optimize your recruitment strategy and improve hiring outcomes."}
              </p>
            </div>

            {/* Media Content */}
            <div className="max-w-4xl mx-auto">
              {step.id === 3 ? (
                <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                  <video 
                    className="w-full h-[500px] object-cover" 
                    controls 
                    preload="metadata"
                    poster="/api/placeholder/800/450"
                  >
                    <source src="/files/job-listing-4k.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : step.id === 6 ? (
                <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                  <video 
                    className="w-full h-[500px] object-cover" 
                    controls 
                    preload="metadata"
                    poster="/api/placeholder/800/450"
                  >
                    <source src="/files/interview-4k.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : step.id === 7 ? (
                <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                  <video 
                    className="w-full h-[500px] object-cover" 
                    controls 
                    preload="metadata"
                    poster="/api/placeholder/800/450"
                  >
                    <source src="/files/send-job-offers39e42c.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <img 
                  src={step.id === 1 ? "https://frappe.io/files/anticipate-hiring-needs.webp" : 
                        step.id === 2 ? "https://frappe.io/files/staffing-plans.webp" : 
                        step.id === 4 ? "https://frappe.io/files/manage-job-applicants869c0c.webp" :
                        step.id === 5 ? "https://frappe.io/files/schedule-interviews.webp" :
                        step.id === 8 ? "https://frappe.io/files/recruitment-dashboardef6b4b.webp" :
                        "https://frappe.io/files/anticipate-hiring-needs.webp"} 
                  alt={`${step.heading} Interface Preview`}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              )}
            </div>
            
          </div>
        </div>
      ))}
                 

      {/* Next Feature Section */}
      <div className="mt-1 pt-8">
        <hr className="w-full max-w-[700px] mx-auto border-gray-300 mb-4"/>
        <div className="max-w-[700px] mx-auto flex justify-end items-center px-4">
          {/* Next Feature */}
          <div className="text-right">
            <p className="text-gray-500 text-[10px] uppercase tracking-wider ">NEXT FEATURE</p>
            <p className="text-gray-700 text-lg font-medium cursor-pointer hover:text-gray-900 transition-colors" onClick={() => scrollToNextFeature()}>
              Employee Lifecycle →
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
