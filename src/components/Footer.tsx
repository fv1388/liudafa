import React from 'react';

interface FooterProps {
  onOpenAuditModal: () => void;
  lang: 'zh' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuditModal, lang }) => {
  return (
    <footer className="bg-[#05070b] border-t border-slate-900 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                N
              </div>
              <span className="text-base font-bold text-white tracking-tight">NexusGrowth</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              24小时建立独立站全网流量闭环 · 11大 AI 与自动化增长打法
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <a href="#hacks-matrix" className="hover:text-white transition-colors">打法矩阵</a>
            <a href="#roi-calculator" className="hover:text-white transition-colors">利润测算器</a>
            <a href="#live-playgrounds" className="hover:text-white transition-colors">实操沙盒</a>
            <a href="#case-studies" className="hover:text-white transition-colors">真实案例</a>
            <a href="#faq-section" className="hover:text-white transition-colors">合作答疑</a>
            <a href="#outreach-playbook" className="hover:text-white transition-colors">获客SOP</a>
            <button
              onClick={onOpenAuditModal}
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium cursor-pointer"
            >
              预约策略诊断
            </button>
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} NexusGrowth. All rights reserved. 专为跨境电商卖家、外贸工厂与海外本地商家服务。
          </div>
          <div className="flex items-center gap-4">
            <span>隐私政策</span>
            <span aria-hidden="true">·</span>
            <span>服务协议</span>
            <span aria-hidden="true">·</span>
            <span>商业保密承诺</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
