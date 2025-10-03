'use client';

import React, { useState } from 'react';

export default function About() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    {
      question: "How does Frappe HR compare to traditional HRMS solutions in terms of cost and flexibility?",
      answer: "Frappe HR is open-source HR management software that helps you avoid expensive license fees and vendor lock-in, which are common with proprietary HRMS solutions. You have the flexibility to self-host or opt for a managed cloud, ensuring costs are predictable and under your control. Frappe HR is built on the Frappe Framework, which facilitates easy customization of workflows, forms, reports, and permissions to suit your HR policies."
    },
    {
      question: "Does Frappe HR support remote and hybrid workforce management?",
      answer: "Yes, Frappe HR provides comprehensive support for remote and hybrid workforce management. It includes features like remote attendance tracking, virtual leave management, online performance reviews, and digital document management. The system supports multiple time zones and flexible work arrangements, making it ideal for modern distributed teams."
    },
    {
      question: "How customizable is Frappe HR compared to other HR software?",
      answer: "Frappe HR offers extensive customization capabilities through its open-source nature and Frappe Framework. You can modify workflows, create custom fields, design personalized reports, and integrate with third-party applications. Unlike proprietary solutions, you have full access to the source code, allowing for unlimited customization to match your specific business requirements."
    },
    {
      question: "Is Frappe HR suitable for enterprises or small businesses?",
      answer: "Frappe HR is designed to scale with organizations of all sizes. For small businesses, it provides essential HR functions with minimal setup. For enterprises, it offers advanced features like multi-company support, complex approval workflows, and enterprise-grade security. The modular architecture allows you to start with basic features and expand as your organization grows."
    },
    {
      question: "Can I integrate Frappe HR with my existing ERP or accounting system?",
      answer: "Yes, Frappe HR offers robust integration capabilities with various ERP and accounting systems. It supports REST API integrations, webhook connections, and data import/export functionalities. Popular integrations include ERPNext, SAP, QuickBooks, and other business management systems, ensuring seamless data flow across your organization."
    },
    {
      question: "What kind of reports and analytics does Frappe HR provide for decision making?",
      answer: "Frappe HR provides comprehensive reporting and analytics including employee performance metrics, attendance reports, payroll summaries, leave analytics, and recruitment statistics. The system offers customizable dashboards, scheduled reports, and data visualization tools to help HR managers and executives make informed decisions based on real-time data."
    },
    {
      question: "How secure is employee data stored in Frappe HR?",
      answer: "Frappe HR implements enterprise-grade security measures including data encryption, role-based access controls, audit trails, and secure authentication protocols. The system complies with data protection regulations and offers both on-premise and cloud hosting options. Regular security updates and community-driven security reviews ensure your employee data remains protected."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="text-center py-16 px-8">
        {/* Logo and Name */}
        <div className="flex flex-col justify-center items-center gap-3 mb-6">
        <div className="w-[52px] h-[52px] flex items-center justify-center">
        <svg fill="none" height="52" viewBox="0 0 32 32" width="52" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.8571 0H9.14286C4.0934 0 0 4.0934 0 9.14286V22.8571C0 27.9066 4.0934 32 9.14286 32H22.8571C27.9066 32 32 27.9066 32 22.8571V9.14286C32 4.0934 27.9066 0 22.8571 0Z" fill="#06B58B"></path>
          <path d="M9.70274 25.1431L8.15991 23.4517C10.3199 21.4974 13.097 20.4116 15.9885 20.4116C18.8799 20.4116 21.6685 21.4859 23.8171 23.4517L22.2742 25.1431C20.537 23.5659 18.3085 22.6973 15.9885 22.6973C13.6685 22.6973 11.4285 23.5659 9.69137 25.1431H9.70274Z" fill="white"></path>
          <path d="M17.0514 6.85742H10.3542V9.14314H17.0514C18.3086 9.14314 19.3372 10.1717 19.3372 11.4289V13.5545C19.3372 14.8117 18.3086 15.8403 17.0514 15.8403H14.9257C13.6685 15.8403 12.64 14.8117 12.64 13.5545V12.1145H10.3542V13.5545C10.3542 16.0803 12.4 18.126 14.9257 18.126H17.0514C19.5772 18.126 21.6229 16.0803 21.6229 13.5545V11.4289C21.6229 8.90314 19.5772 6.85742 17.0514 6.85742Z" fill="white"></path>
        </svg>
      </div>
          <span className="text-[20px]  font-bold text-[#525252]">Frappe HR</span>
        </div>

        {/* Border Line */}
        <dir>
          <hr className="my-9 border-gray-200 w-[100px] mx-auto " />
        </dir>
        {/* H1 Heading */}
        <h1 className="text-[40px] font-[800px] font-family-Newsreader text-[#171717] mb-4">The HR revolution brewing just for you</h1>
        <p className="text-xl text-gray-600 mb-8"></p>

        {/* Two Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <a href="/signup" className="bg-black text-white px-4 py-1 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
            Get started
            <span>→</span>
          </a>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            GitHub 6.8K
          </button>
        </div>

        {/* Video */}
        <div className="relative bg-gray-100 rounded-[10px] overflow-hidden mb-8 mx-[150px]" style={{height: '400px'}}>
          <video 
            className="w-full h-full object-cover"
            poster="/files/frappehr-intro-poster.png" 
            src="/files/frappe-hr-hero-video-final.mp4"
            controls
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="flex justify-center px-8 pb-16">
        <div className="max-w-2xl">
          {/* Centered Text */}
          <div className="text-start mb-8 max-w-[600px]">
            <p className="text-lg text-gray-600 leading-relaxed">
              Frappe HR is a 100% open source, modern, user-friendly solution to drive excellence within your team. 
              Simplify your HR and Payroll operations with a product crafted as per your needs.
            </p>
            <h2 className="text-[17px] font-bold text-[#171717] text-start mb-8
            mt-8">Trusted by teams of all sizes</h2>
          </div>

          {/* Brand Names */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="">
              <div className="text-blue-600 font-bold text-lg">ZERODHA</div>
            </div>
            <div className="text-center">
              <div className="text-blue-600 font-bold text-lg">iftas</div>
            </div>
            <div className="text-center">
              <div className="text-red-600 font-bold text-lg">SELCO</div>
            </div>
            <div className="text-center">
              <div className="text-green-600 font-bold text-lg">Jiva</div>
            </div>
            <div className="text-center">
              <div className="text-red-600 font-bold text-lg">Lifelong</div>
            </div>
            <div className="text-center">
              <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">VIKRAM TEA</div>
            </div>
            <div className="text-center">
              <div className="text-black font-bold text-lg">rtCamp</div>
            </div>
          </div>
        </div>

        {/* Read Customer Stories Button */}
         <div className="text-start mb-16">
           <button className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2 ">
            Read customer stories
            <span>→</span>
          </button>
        </div>

        {/* H3 Heading (gray-400) */}
        <h3 className="text-sm  text-gray-400 text-start mb-2">BENEFITS</h3>

        {/* Another H1 Heading */}
        <h1 className="text-[20px] font-bold text-gray-900 text-start mb-8">Why Frappe HR?</h1>

        {/* Numbered Points/Features */}
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <div className="bg-gray-200 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">100% Open Source</h4>
              <p className="text-gray-600">
                Frappe HR is completely open source, giving you full control over your data and the ability to customize 
                the system according to your specific needs. No vendor lock-in, complete transparency.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="bg-gray-200 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Affordable & Inclusive</h4>
              <p className="text-gray-600">
                Our pricing model is designed to be accessible to organizations of all sizes. From startups to enterprises, 
                everyone can benefit from our comprehensive HR solution without breaking the budget.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="bg-gray-200 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Highly Customizable</h4>
              <p className="text-gray-600">
                Built on the powerful Frappe Framework, Frappe HR offers extensive customization options. 
                Modify workflows, create custom fields, and adapt the system to match your unique business processes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="bg-gray-200 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Easy Integrations</h4>
              <p className="text-gray-600">
                Seamlessly integrate with your existing tools and systems. Frappe HR supports REST APIs, 
                webhooks, and various third-party integrations to ensure smooth data flow across your organization.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="bg-gray-200 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Powered by the low-code, no-code Frappe Framework</h4>
              <p className="text-gray-600">
                Built on Frappe Framework&apos;s robust foundation, Frappe HR leverages low-code/no-code capabilities 
                to provide rapid deployment and easy maintenance without requiring extensive technical expertise.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="bg-gray-200 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">6</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">All-in-one HR suite of products</h4>
              <p className="text-gray-600">
                From recruitment to retirement, Frappe HR covers the entire employee lifecycle. Manage recruitment, 
                onboarding, attendance, payroll, performance, and more from a single, unified platform.
              </p>
            </div>
          </div>
        </div>

        {/* What Frappe HR has to offer you */}
        <div className="mb-16 mt-16">
        <h3 className="text-sm   text-gray-400 text-start mb-2">FEATURES</h3>

        <h1 className="text-[20px] font-bold text-gray-900 text-start mb-8">What Frappe HR has to offer you</h1>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recruitment Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-gray-400 transition-all duration-200">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Recruitment</h3>
              <p className="text-gray-600">Growth made easy: plan, publish, analyze, engage, evaluate & hire</p>
            </div>

            {/* Employee Lifecycle Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-gray-400 transition-all duration-200">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Employee Lifecycle</h3>
              <p className="text-gray-600">From onboarding to exits, transfers to promotions, we&apos;ve got your back every step of the way</p>
            </div>

            {/* Shifts & Attendance Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-gray-400 transition-all duration-200">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Shifts & Attendance</h3>
              <p className="text-gray-600">Mobile check-ins, roster management, and auto attendance</p>
            </div>

            {/* Leave Management Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-gray-400 transition-all duration-200">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Leave Management</h3>
              <p className="text-gray-600">Manage holidays, complex leave policies and encashments</p>
            </div>

            {/* Expense Management Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-gray-400 transition-all duration-200">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expense Management</h3>
              <p className="text-gray-600">Track and manage employee expenses with ease</p>
            </div>

            {/* Performance Management Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:border-gray-400 transition-all duration-200">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Management</h3>
              <p className="text-gray-600">Set goals, track progress, and evaluate performance effectively</p>
            </div>
          </div>
        </div>

        {/* Story of Frappe HR */}
        <div className="mb-16">
        <h3 className="text-sm   text-gray-400 text-start mb-2">FROM THE AUTHOR</h3>

          <h1 className="text-[20px] font-bold text-gray-900 text-start mb-8">Story of Frappe HR</h1>
          
          <div className="space-y-6 mb-8">
            <p className="text-gray-600 leading-relaxed">
              Frappe HR was born out of a simple yet powerful vision: to create an open-source HR and Payroll software that could compete with the best proprietary solutions in the market. As die-hard FOSS fans, we believed that every organization, regardless of size or budget, deserved access to world-class HR tools.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our journey began with a commitment to building a 100% open-source portal that would offer seamless UX and a sophisticated UI. We leveraged the robust ERPNext platform and the flexible Frappe Framework to create something truly special.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, Frappe HR stands as a testament to what&apos;s possible when open-source principles meet exceptional design and user experience. We&apos;ve created a comprehensive HR solution that empowers organizations to manage their most valuable asset - their people - with efficiency, transparency, and innovation.
            </p>
          </div>

         

          {/* Author Profile */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img 
                src="https://media.istockphoto.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=0&k=20&c=EqR2Lffp4tkIYzpqYh8aYIPRr-gmZliRHRxcQC5yylY=" 
                alt="Rucha Mahabal" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Rucha Mahabal</h3>
              <p className="text-gray-600">Product Engineer</p>
            </div>
          </div>
        </div>

        {/* USER REVIEWS */}
        <div className="mb-16">
        <h3 className="text-sm   text-gray-400 text-start mb-2">USER REVIEWS</h3>

<h1 className="text-[20px] font-bold text-gray-900 text-start mb-8">Take it from our users</h1>
       
          <div className="space-y-8">
            {[
              {
                name: "Nikhil Ponnuru",
                company: "Zerodha",
                image: "https://plus.unsplash.com/premium_photo-1661492413927-5bdcbb198a30?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFsZSUyMG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D",
                quote: "We have been using the HR module for some years now and the growth with which it has matured is impressive. The UI and UX are very usable and human-friendly. Many things are provided out of the box with a customization option and being open source makes it even more easier to use."
              },
              {
                name: "Imesha Sudasingha",
                company: "Founder & Leadership, HighFlyer",
                image: "https://static.vecteezy.com/system/resources/thumbnails/029/771/887/small/portrait-of-a-handsome-businessman-in-modern-office-asian-manager-looking-at-camera-and-smiling-confident-male-ceo-planning-and-managing-company-strategy-free-photo.jpeg",
                quote: "I have been using this for several months for an organization with 50+ employees with automated attendance based on fingerprint reader based employee checkins. It's been awesome so far."
              },
              {
                name: "Mathew Chacko",
                company: "Operations, Anther Technologies",
                image: "https://www.shutterstock.com/image-photo/young-smiling-happy-fun-successful-260nw-2311181029.jpg",
                quote: "It's my favourite HR software. I liked the simple UI, flexibility and extendability of the product. As business continuity is important for me, and they have the solution for that too, they provide the source code."
              }
            ].map((testimonial, index) => (
              <div key={index} className="">
                {/* Profile Section */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex flex-col">
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <span className="text-gray-500 text-sm">{testimonial.company}</span>
                    </div>
                  </div>
                </div>
                {/* Quote Section */}
                <p className="text-gray-600 leading-relaxed items-start">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* View All Testimonials Button */}
          <div className="text-start mt-8 pb-[100px]">
            <button className="text-black hover:text-black font-medium flex items-center gap-2">
              view all testimonials
              <span>→</span>
            </button>
          </div>
        </div>

        {/* GOT A QUERY? */}
        <div className="mb-16">
          <h3 className="text-sm text-gray-400 text-start mb-2">GOT A QUERY?</h3>
          <h1 className="text-[20px] font-bold text-gray-900 text-start mb-4">Frequently asked questions</h1>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <div 
                  className="flex items-center justify-between py-4 transition-colors cursor-pointer "
                  onClick={() => toggleFAQ(index)}
                >
                  <p className="text-gray-900 font-medium pr-4">{faq.question}</p>
                  <span className="text-black text-xl font-light">
                    {openFAQ === index ? '−' : '+'}
                  </span>
                </div>
                {openFAQ === index && (
                  <div className="pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Ready to ease your everyday people ops? */}
        <div className="text-center py-16 px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Ready to ease your everyday people ops?
          </h1>
          
          <div className="flex flex-col items-center gap-2">
            <button className="bg-white border border-gray-900 text-gray-900 px-4 py-1 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
              Get started with Frappe HR
              <span>→</span>
            </button>
            
            <a href="#" className="text-gray-900 hover:text-gray-700 font-medium pt-2">
              Read the documentation
            </a>
          </div>
        </div>
         <div>
           <hr className="border-gray-200 " />
         </div>

         {/* Footer */}
        <footer className="bg-white  py-12 px-10 ">
          <div className="max-w-6xl mx-auto">
            {/* Logo */}
            <div className="text-center mb-8">
              <h2 className="text-1xl font-bold text-gray-900">Frappe</h2>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex justify-center gap-6 mb-8">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            
            {/* Navigation Links */}
            <div className="flex justify-center gap-8 text-sm">
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Contents</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Products</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Partners</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Certifications</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Contact</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Terms</a>
            </div>
          </div>
        </footer>

        {/* Inspirational Quote */}
        <div className="text-center py-8 px-8">
          <div className="relative">
            <span className="text-4xl text-gray-300 font-serif absolute -left-2 -top-1">&ldquo;</span>
            <p className="text-sm text-gray-400 italic font-light leading-relaxed px-6">
              The only way to do great work is to love what you do. - Steve Jobs
            </p>
            <span className="text-4xl text-gray-300 font-serif absolute -right-2 -bottom-1">&rdquo;</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
