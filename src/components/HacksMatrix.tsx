import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Check, 
  ExternalLink, 
  X,
  Search,
  Sparkles,
  Layers,
  Shield,
  Activity,
  Zap,
  Globe
} from 'lucide-react';
import { GROWTH_HACKS, DIMENSIONS } from '../data/growthHacks';
import { GrowthHack } from '../types';
import bentoSeo from '../assets/images/bento_seo_matrix_1791661055543.jpg';
import bentoAr from '../assets/images/bento_ar_interactive_1791661064096.jpg';
import bentoLogistics from '../assets/images/bento_global_logistics_1791661073180.jpg';

interface HacksMatrixProps {
  onSelectPlayground: (key: 'badge' | 'pinterest' | 'tiktok' | 'maps' | 'ar') => void;
  lang: 'zh' | 'en';
}

export const HacksMatrix: React.FC<HacksMatrixProps> = ({ onSelectPlayground, lang }) => {
  const [selectedDimension, setSelectedDimension] = useState<string>('all');
  const [activeHackModal, setActiveHackModal] = useState<GrowthHack | null>(null);

  const filteredHacks = selectedDimension === 'all'
    ? GROWTH_HACKS
    : GROWTH_HACKS.filter((h) => h.dimensionId === selectedDimension);

  return (
    <section id="hacks-matrix" className="py-16 lg:py-24 bg-[#07090e] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            {lang === 'zh' ? '全景能力矩阵 · 5大核心维度' : 'Comprehensive Capabilities · 5 Core Dimensions'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            {lang === 'zh'
              ? '11 大 AI 与自动化增长打法全景架构'
              : '11 AI & Automated Growth Engine Pipelines'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {lang === 'zh'
              ? '从 Google 秒级收录、社媒算法去重，到零门槛 AR 试戴与海外 B2B 潜客探针。每一套打法均经过千万级出海实战检验，支持全自动化交付。'
              : 'From active indexing and social hash manipulation to zero-app AR try-on and B2B buyer radar probes.'}
          </p>
        </div>

        {/* Dimension Filter Controls (Functional Button Tabs) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800 overflow-x-auto max-w-full mb-10">
          <button
            onClick={() => setSelectedDimension('all')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              selectedDimension === 'all'
                ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            全部 11 大打法 (All 11 Hacks)
          </button>
          {DIMENSIONS.map((dim) => {
            const isSelected = selectedDimension === dim.id;
            return (
              <button
                key={dim.id}
                onClick={() => setSelectedDimension(dim.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{dim.title}</span>
                <span className="ml-1 text-[10px] text-slate-400 opacity-80">({dim.hacksCount})</span>
              </button>
            );
          })}
        </div>

        {/* Visual Banner Strip: Marquee Domain Spotlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Spotlight 1: SEO Architecture */}
          <div className="rounded-xl border border-slate-800/90 bg-slate-900/40 overflow-hidden relative group">
            <div className="h-44 overflow-hidden relative">
              <img
                src={bentoSeo}
                alt="SEO 边缘主动索引与数据流"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/40 to-transparent" />
            </div>
            <div className="p-5 -mt-6 relative z-10 space-y-1.5">
              <div className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                <span>维度一：主动索引与高权重矩阵</span>
              </div>
              <h3 className="text-base font-bold text-white">Google 24h 秒级主动收录</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                彻底告别 60 天被动等待爬虫，首发即霸屏 Google / Bing 搜索前三页。
              </p>
            </div>
          </div>

          {/* Spotlight 2: AR & Interactive conversion */}
          <div className="rounded-xl border border-slate-800/90 bg-slate-900/40 overflow-hidden relative group">
            <div className="h-44 overflow-hidden relative">
              <img
                src={bentoAr}
                alt="AR 虚拟试戴与3D交互"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/40 to-transparent" />
            </div>
            <div className="p-5 -mt-6 relative z-10 space-y-1.5">
              <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>维度三：高转化互动与心理学拦截</span>
              </div>
              <h3 className="text-base font-bold text-white">零 App 门槛 AR 实时试穿</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                手机原生 WebGL 交互，页面停留拉长 600%，退货率骤降 44%。
              </p>
            </div>
          </div>

          {/* Spotlight 3: Global B2B Lead Radar */}
          <div className="rounded-xl border border-slate-800/90 bg-slate-900/40 overflow-hidden relative group">
            <div className="h-44 overflow-hidden relative">
              <img
                src={bentoLogistics}
                alt="Google Maps 海外潜客探针"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/40 to-transparent" />
            </div>
            <div className="p-5 -mt-6 relative z-10 space-y-1.5">
              <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>维度四：高权重外链与 B2B 探针</span>
              </div>
              <h3 className="text-base font-bold text-white">Google Maps 实体客商探针</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                秒级扫描目标国家无独立站传统批发商，一键直达老板 WhatsApp。
              </p>
            </div>
          </div>
        </div>

        {/* The 11 Growth Hacks Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHacks.map((hack) => {
            const hasLiveDemo = Boolean(hack.demoKey);
            return (
              <div
                key={hack.id}
                className="rounded-xl border border-slate-800/90 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-slate-700 transition-all hover:bg-slate-900/70 group"
              >
                <div className="space-y-4">
                  {/* Card Header: Editorial Number and Clean Category text */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-mono font-bold text-blue-400">打法 {hack.code}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-300">{hack.dimensionTitle}</span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-emerald-400 tabular-nums">
                      {hack.metrics.value}
                    </span>
                  </div>

                  {/* Title and Subtitle */}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                      {hack.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {hack.subtitle}
                    </p>
                  </div>

                  {/* Pain Point vs Solution comparison */}
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-900/30 text-slate-300">
                      <span className="text-red-400 font-semibold mr-1">痛点:</span>
                      <span className="line-clamp-2">{hack.painPoint}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-900/30 text-slate-300">
                      <span className="text-blue-400 font-semibold mr-1">方案:</span>
                      <span className="line-clamp-2">{hack.solution}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveHackModal(hack)}
                    className="text-xs text-slate-300 hover:text-white font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>底层实现原理</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {hasLiveDemo ? (
                    <button
                      onClick={() => {
                        if (hack.demoKey) {
                          onSelectPlayground(hack.demoKey);
                          const el = document.getElementById('live-playgrounds');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors inline-flex items-center gap-1 cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      <span>实操 Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-500">
                      提供即用部署脚本
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal for Technical Mechanisms */}
      {activeHackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="text-xs font-semibold text-blue-400 font-mono">
                  打法 {activeHackModal.code} · {activeHackModal.dimensionTitle}
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  {activeHackModal.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeHackModal.subtitle}
                </p>
              </div>
              <button
                onClick={() => setActiveHackModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pain Point & Solution Details */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <div className="text-slate-400 font-medium mb-1">解决的核心行业痛点:</div>
                <div className="p-3 rounded-lg bg-red-950/25 border border-red-900/30 text-slate-300 leading-relaxed">
                  {activeHackModal.painPoint}
                </div>
              </div>
              <div>
                <div className="text-slate-400 font-medium mb-1">自动化技术解法:</div>
                <div className="p-3 rounded-lg bg-blue-950/25 border border-blue-900/30 text-slate-200 leading-relaxed">
                  {activeHackModal.solution}
                </div>
              </div>
            </div>

            {/* Step-by-Step Mechanisms */}
            <div className="space-y-2.5">
              <div className="text-xs sm:text-sm font-semibold text-slate-200">
                标准化自动化执行 SOP 机制:
              </div>
              <div className="space-y-2">
                {activeHackModal.mechanism.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-mono">
                      {idx + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics & Action buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                预期成效交付指标: <span className="text-emerald-400 font-bold font-mono">{activeHackModal.metrics.value}</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {activeHackModal.demoKey && (
                  <button
                    onClick={() => {
                      if (activeHackModal.demoKey) {
                        onSelectPlayground(activeHackModal.demoKey);
                        setActiveHackModal(null);
                        const el = document.getElementById('live-playgrounds');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
                  >
                    进入实操沙盒体验
                  </button>
                )}
                <button
                  onClick={() => setActiveHackModal(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
