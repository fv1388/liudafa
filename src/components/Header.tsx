import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenAuditModal: () => void;
  onOpenPromptModal: () => void;
  onOpenColabModal?: () => void;
  lang: 'zh' | 'en';
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenAuditModal, 
  onOpenPromptModal, 
  onOpenColabModal,
  lang, 
  onToggleLang 
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#07090e]/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
              N
            </div>
            <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
              NexusGrowth
            </span>
          </a>
        </div>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#hacks-matrix" className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            {lang === 'zh' ? '11大打法矩阵' : '11 Growth Hacks'}
          </a>
          <a href="#roi-calculator" className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            {lang === 'zh' ? '成本与利润测算' : 'ROI Calculator'}
          </a>
          <a href="#live-playgrounds" className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            {lang === 'zh' ? '实操沙盒实验' : 'Live Playgrounds'}
          </a>
          <a href="#case-studies" className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            {lang === 'zh' ? '实战客户案例' : 'Case Studies'}
          </a>
          <a href="#outreach-playbook" className="hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            {lang === 'zh' ? '获客实战SOP' : 'Outreach Playbook'}
          </a>
        </nav>

        {/* Zone 3: 1 primary action + Language switch */}
        <div className="flex items-center gap-3 shrink-0">
          {onOpenColabModal && (
            <button
              onClick={onOpenColabModal}
              className="hidden md:flex items-center gap-1.5 text-xs text-emerald-400 hover:text-white px-2.5 py-1 rounded-md border border-emerald-900/60 bg-emerald-950/40 hover:bg-emerald-900/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="直连 Google Colab / Python Gradio 算力后端"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Colab算力直连</span>
            </button>
          )}

          <button
            onClick={onOpenPromptModal}
            className="hidden sm:flex items-center gap-1.5 text-xs text-blue-300 hover:text-white px-2.5 py-1 rounded-md border border-blue-900/60 bg-blue-950/40 hover:bg-blue-900/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="查看 AI 建站提示词公式与模板"
          >
            <span>AI建站Prompt</span>
          </button>

          <button
            onClick={onToggleLang}
            className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded border border-slate-800 hover:border-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Switch Language / 切换语言"
          >
            {lang === 'zh' ? 'EN' : '中文'}
          </button>
          
          <button
            onClick={onOpenAuditModal}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all shadow-sm shadow-blue-600/30 hover:shadow-blue-500/40 whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
          >
            <span>{lang === 'zh' ? '预约1v1策略诊断' : 'Book 1-on-1 Audit'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
