import React from 'react';
import Footer from '../pricing/Footer';
import { getFeatureConfig } from '../../config/featuresConfig';

export default function FeatureSteps({ featureName }) {
  const config = getFeatureConfig(featureName);
  
  if (!config) {
    return <div>Feature not found</div>;
  }

  const scrollToNextFeature = () => {
    if (!config.navigation.next) return;
    
    console.log(`Attempting to navigate to ${config.navigation.next}`);
    
    // Method 1: Try to directly update the parent component's state
    if (window.navigateToPage) {
      window.navigateToPage(config.navigation.next);
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
    const eventName = `navigateTo${config.navigation.next.replace(/[^a-zA-Z0-9]/g, '')}`;
    window.dispatchEvent(new CustomEvent(eventName));
    
    // Method 3: Try to find and click sidebar button
    setTimeout(() => {
      const sidebarItems = document.querySelectorAll('[role="button"], button, div[onclick], .sidebar-item');
      console.log('Found sidebar items:', sidebarItems.length);
      
      const nextButton = Array.from(sidebarItems).find(item => {
        const text = item.textContent?.trim();
        console.log('Checking item text:', text);
        return text === config.navigation.next;
      });
      
      if (nextButton) {
        console.log(`Found ${config.navigation.next} button, clicking...`);
        nextButton.click();
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
        console.log(`${config.navigation.next} button not found, trying alternative...`);
        // Try clicking any element that contains part of the name
        const altButton = Array.from(sidebarItems).find(item => 
          item.textContent?.includes(config.navigation.next.split(' ')[0])
        );
        if (altButton) {
          console.log(`Found alternative button with "${config.navigation.next.split(' ')[0]}", clicking...`);
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
    if (!config.navigation.previous) return;
    
    console.log(`Attempting to navigate to ${config.navigation.previous}`);
    
    // Method 1: Try to directly update the parent component's state
    if (window.navigateToPage) {
      window.navigateToPage(config.navigation.previous);
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
    const eventName = `navigateTo${config.navigation.previous.replace(/[^a-zA-Z0-9]/g, '')}`;
    window.dispatchEvent(new CustomEvent(eventName));
    
    // Method 3: Try to find and click sidebar button
    setTimeout(() => {
      const sidebarItems = document.querySelectorAll('[role="button"], button, div[onclick], .sidebar-item');
      console.log('Found sidebar items:', sidebarItems.length);
      
      const prevButton = Array.from(sidebarItems).find(item => {
        const text = item.textContent?.trim();
        console.log('Checking item text:', text);
        return text === config.navigation.previous;
      });
      
      if (prevButton) {
        console.log(`Found ${config.navigation.previous} button, clicking...`);
        prevButton.click();
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
        console.log(`${config.navigation.previous} button not found, trying alternative...`);
        // Try clicking any element that contains part of the name
        const altButton = Array.from(sidebarItems).find(item => 
          item.textContent?.includes(config.navigation.previous.split(' ')[0])
        );
        if (altButton) {
          console.log(`Found alternative button with "${config.navigation.previous.split(' ')[0]}", clicking...`);
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

  const renderMedia = (step) => {
    if (!step.media || !step.media.type) {
      return null;
    }
    
    if (step.media.type === 'video') {
      return (
        <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-sm">
          <video 
            className="w-full h-[500px] object-cover" 
            controls 
            preload="metadata"
            poster="/api/placeholder/800/450"
          >
            <source src={step.media.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else {
      return (
        <img 
          src={step.media.src} 
          alt={`${step.heading} Interface Preview`}
          className="w-full h-auto rounded-lg shadow-sm"
        />
      );
    }
  };

  return (
    <div className=" ">
      {/* All Content Sections */}
      {config.steps.map((step) => (
        <div key={step.id} id={`step-${step.id}`} className="mb-16 px-10 max-w-4xl mx-auto">
          <div className="text-center">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-start px-28 text-gray-900 mb-6 font-Newsreader">
              {step.heading}
            </h2>

            {/* Paragraph */}
            <div className="max-w-[590px] mx-auto mb-8">
              <p className="text-sm text-gray-700 leading-relaxed text-left">
                {step.description}
              </p>
            </div>

            {/* Media Content */}
            <div className="max-w-4xl mx-auto">
              {renderMedia(step)}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Section */}
      <div className="mt-1 pt-8">
        <hr className="w-full max-w-[700px] mx-auto border-gray-300 mb-4"/>
        <div className="max-w-[700px] mx-auto flex justify-between items-center px-4">
          {/* Previous Feature */}
          {config.navigation.previous && (
            <div className="text-left">
              <p className="text-gray-500 text-[10px] uppercase tracking-wider ">PREVIOUS FEATURE</p>
              <p className="text-gray-700 text-lg font-medium cursor-pointer hover:text-gray-900 transition-colors" onClick={() => scrollToPreviousFeature()}>
                ← {config.navigation.previous}
              </p>
            </div>
          )}
          
          {/* Next Feature */}
          {config.navigation.next && (
            <div className={`text-right ${!config.navigation.previous ? 'ml-auto' : ''}`}>
              <p className="text-gray-500 text-[10px] uppercase tracking-wider ">NEXT FEATURE</p>
              <p className="text-gray-700 text-lg font-medium cursor-pointer hover:text-gray-900 transition-colors" onClick={() => scrollToNextFeature()}>
                {config.navigation.next} →
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
