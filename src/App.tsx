import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RoiCalculator } from './components/RoiCalculator';
import { HacksMatrix } from './components/HacksMatrix';
import { LivePlayground } from './components/LivePlayground';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { OutreachStrategySection } from './components/OutreachStrategySection';
import { Footer } from './components/Footer';
import { FomoWidget } from './components/FomoWidget';
import { ExitIntentModal } from './components/ExitIntentModal';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { GrowthImpactDashboard } from './components/GrowthImpactDashboard';
import { FaqSection } from './components/FaqSection';
import { PromptEngineeringModal } from './components/PromptEngineeringModal';
import { ColabBackendModal } from './components/ColabBackendModal';

export default function App() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isColabModalOpen, setIsColabModalOpen] = useState(false);
  const [auditPrefill, setAuditPrefill] = useState<{
    gmv?: number;
    adSaving?: number;
    profitBoost?: number;
    category?: string;
  } | null>(null);

  const [activePlaygroundTool, setActivePlaygroundTool] = useState<
    'badge' | 'pinterest' | 'tiktok' | 'maps' | 'ar'
  >('badge');

  const handleOpenAuditModal = () => {
    setAuditPrefill(null);
    setIsAuditModalOpen(true);
  };

  const handleOpenAuditWithData = (data: {
    gmv: number;
    adSaving: number;
    profitBoost: number;
    category: string;
  }) => {
    setAuditPrefill(data);
    setIsAuditModalOpen(true);
  };

  const handleSelectPlayground = (tool: 'badge' | 'pinterest' | 'tiktok' | 'maps' | 'ar') => {
    setActivePlaygroundTool(tool);
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* 3-Zone Navigation Header */}
      <Header
        onOpenAuditModal={handleOpenAuditModal}
        onOpenPromptModal={() => setIsPromptModalOpen(true)}
        onOpenColabModal={() => setIsColabModalOpen(true)}
        lang={lang}
        onToggleLang={toggleLang}
      />

      <main className="flex-1">
        {/* Module 1: Hero Section */}
        <Hero
          onOpenAuditModal={handleOpenAuditModal}
          lang={lang}
        />

        {/* Module 2: Interactive ROI & Cost Saving Calculator (Hack 3.2) */}
        <RoiCalculator
          onOpenAuditModalWithData={handleOpenAuditWithData}
          lang={lang}
        />

        {/* Module 3: 11 Growth Hacks Matrix across 5 Dimensions */}
        <HacksMatrix
          onSelectPlayground={handleSelectPlayground}
          lang={lang}
        />

        {/* Dynamic Growth Impact Dashboard (Recharts Data Visualization) */}
        <GrowthImpactDashboard
          onOpenAuditModal={handleOpenAuditModal}
          lang={lang}
        />

        {/* Module 4: Real-time Live Demo / Interactive Playground */}
        <LivePlayground
          key={activePlaygroundTool}
          initialTool={activePlaygroundTool}
          lang={lang}
          onOpenAuditModal={handleOpenAuditModal}
          onOpenColabModal={() => setIsColabModalOpen(true)}
        />

        {/* Module 5: Case Studies & Quantified Impact */}
        <CaseStudiesSection
          onOpenAuditModal={handleOpenAuditModal}
          lang={lang}
        />

        {/* Module 6: B2B Objections & Partnership FAQ Accordion */}
        <FaqSection
          onOpenAuditModal={handleOpenAuditModal}
          lang={lang}
        />

        {/* Module 7: Outreach Playbook & Closing Sales Pitch Scripts */}
        <OutreachStrategySection
          onOpenAuditModal={handleOpenAuditModal}
          onOpenPromptModal={() => setIsPromptModalOpen(true)}
          lang={lang}
        />
      </main>

      {/* Quiet Footer */}
      <Footer
        onOpenAuditModal={handleOpenAuditModal}
        lang={lang}
      />

      {/* Floating FOMO Countdown & Live Social Proof Toast */}
      <FomoWidget
        onOpenAuditModal={handleOpenAuditModal}
        lang={lang}
      />

      {/* Exit Intent Retention Modal */}
      <ExitIntentModal
        onOpenAuditModal={handleOpenAuditModal}
        lang={lang}
      />

      {/* Lead Capture & Diagnostic Report Modal */}
      <LeadCaptureModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        prefillData={auditPrefill}
        lang={lang}
      />

      {/* AI Website Prompt Engineering Center Modal */}
      <PromptEngineeringModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        lang={lang}
      />

      {/* Google Colab / Gradio Python Compute Engine Modal */}
      <ColabBackendModal
        isOpen={isColabModalOpen}
        onClose={() => setIsColabModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
