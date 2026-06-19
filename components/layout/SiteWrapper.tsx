import * as React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface SiteWrapperProps {
  children: React.ReactNode;
}

export const SiteWrapper: React.FC<SiteWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 selection:bg-indigo-50 selection:text-indigo-600 antialiased">
      {/* Dynamic Header Shell */}
      <Navbar />
      
      {/* Global Context Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        {children}
      </main>
      
      {/* Application Base Footer */}
      <Footer />
    </div>
  );
};