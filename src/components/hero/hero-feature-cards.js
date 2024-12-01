import React from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';

const FeatureCard = ({ title, subtitle, description, dark = false }) => {
  // Desktop version (hidden on mobile)
  const DesktopCard = () => (
    <div className={`
      hidden md:flex relative items-center justify-between p-8 rounded-full cursor-pointer
      transition-all duration-300
      ${dark ? 'bg-black text-white' : 'bg-white border border-gray-100'}
    `}>
      <div className="flex items-start gap-4">
        <CheckCircle className="w-6 h-6 mt-1 text-blue-500" />
        <div>
          <h3 className="text-xl font-medium">{title}</h3>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <p className={`text-sm ${dark ? 'text-white/70' : ''}`}>{description}</p>
        <ChevronRight className={`w-5 h-5 ${dark ? 'text-white' : 'text-white/70'}`} />
      </div>
    </div>
  );

  // Mobile version (hidden on desktop)
  const MobileCard = () => (
    <div className={`
      md:hidden relative flex flex-col p-6 rounded-[20px] cursor-pointer
      transition-all duration-300
      ${dark ? 'bg-black text-white' : 'bg-white border border-gray-100'}
    `}>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle className="w-5 h-5 mt-0.5 text-blue-500" />
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className={`text-sm ${dark ? 'text-white/70' : ''}`}>{description}</p>
        <ChevronRight className={`w-4 h-4 ${dark ? 'text-white' : 'text-white/70'} ml-2 flex-shrink-0`} />
      </div>
    </div>
  );

  return (
    <>
      <DesktopCard />
      <MobileCard />
    </>
  );
};

const FeatureSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:mt-32">
      {/* Header */}
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-5xl font-medium mb-8 text-3xl">
          <span className="text-black">Fully on-chain </span>
          <span className="text-gray-400">event</span>
          <br />
          <span className="text-gray-400">ticketing </span>
          <span className="text-black">System</span>
        </h1>
        {/* Tags */}
        <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
          <span className="px-3 md:px-4 py-1.5 bg-red-50 text-red-500 rounded-full text-xs md:text-sm flex items-center gap-2">
            <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-red-500 rounded-full" />
            Secure
          </span>
          <span className="px-3 md:px-4 py-1.5 bg-blue-50 text-blue-500 rounded-full text-xs md:text-sm flex items-center gap-2">
            <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-blue-500 rounded-full" />
            Seamless
          </span>
          <span className="px-3 md:px-4 py-1.5 bg-green-50 text-green-500 rounded-full text-xs md:text-sm flex items-center gap-2">
            <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-500 rounded-full" />
            Scalable
          </span>
        </div>
      </div>
      {/* Feature Cards */}
      <div className="space-y-3 md:space-y-4">
        <FeatureCard
          title="Tailored Ticketing Solutions"
          subtitle="Web3 Integration"
          description="Seamlessly integrate ticketing services with Web3 and blockchain platforms."
        />
        <FeatureCard
          title="Attendee Ticket Portal"
          subtitle="Secure Access"
          description="A secure portal for attendees to manage and access their event tickets."
          dark
        />
        <FeatureCard
          title="Encrypted Ticket Transfers"
          subtitle="On-chain transfers"
          description="Efficient and encrypted transfers of tickets for seamless resales or gifting."
        />
        <FeatureCard
          title="Automated Refund Managemen"
          subtitle="Smart Solutions"
          description="Retry and manage failed transactions or refund requests effortlessly."
        />
        <FeatureCard
          title="Detailed Event Analytics"
          subtitle="Custom insights"
          description="Comprehensive insights and reporting tailored to organizers' needs."
        />
      </div>
    </div>
  );
};

export default FeatureSection;