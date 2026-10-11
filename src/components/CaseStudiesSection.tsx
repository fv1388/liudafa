import React from 'react';
import { CASE_STUDIES } from '../data/caseStudies';
import { ArrowUpRight, TrendingUp, ShieldCheck } from 'lucide-react';

interface CaseStudiesSectionProps {
  onOpenAuditModal: () => void;
  lang: 'zh' | 'en';
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenAuditModal, lang }) => {
  return (
    <section id="case-studies" className="py-16 lg:py-24 bg-[#07090e] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            {lang === 'zh' ? '实战战绩检验 · 真实客户数据' : 'Verified Case Studies · Real Client Proof'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            {lang === 'zh'
              ? '从月烧数万广告费，到自然流量与海外直客闭环'
              : 'Proven Transformations: From Paid Ad Bleed to Direct B2B Revenue'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {lang === 'zh'
              ? '不看空洞理论，用真实出海卖家的经营损益表 (P&L) 和订单增量说话。涵盖 3C 消费电子、传统汽配外贸厂与跨境快时尚品牌。'
              : 'Verifiable operational outcomes across DTC brands, export manufacturing factories, and cross-border retailers.'}
          </p>
        </div>

        {/* 3 In-Depth Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div className="space-y-5">
                {/* Client info unboxed text */}
                <div className="space-y-1 pb-4 border-b border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-blue-400">{study.clientType}</span>
                    <span className="font-mono text-slate-500">{study.location}</span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    垂直品类: {study.industry}
                  </div>
                </div>

                {/* Headline */}
                <h3 className="text-base font-bold text-white leading-snug">
                  {study.headline}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {study.description}
                </p>

                {/* Quantitative Metrics Grid */}
                <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 text-center">
                  {study.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="space-y-1">
                      <div className="text-[10px] text-slate-500 line-clamp-1">{metric.label}</div>
                      <div className="text-xs font-bold text-emerald-400 font-mono tabular-nums">
                        {metric.improvement}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {metric.before} → {metric.after}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Applied Hacks */}
                <div className="space-y-1.5">
                  <div className="text-[11px] text-slate-400 font-medium">接入的核心打法流水线:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {study.appliedHacks.map((hack, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-[11px] text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700"
                      >
                        {hack}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Attributable Testimonial */}
              <div className="pt-5 mt-6 border-t border-slate-800 space-y-3">
                <blockquote className="text-xs text-slate-300 italic leading-relaxed">
                  “{study.testimonial.quote}”
                </blockquote>
                <div className="text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-200">{study.testimonial.author}</span>
                  <span className="mx-1 text-slate-600">·</span>
                  <span>{study.testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-white">
              想知道您的独立站适用哪一套打法组合？
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              我们的技术专家将在 24 小时内为您完成站点全方位收录及转化诊断。
            </p>
          </div>
          <button
            onClick={onOpenAuditModal}
            className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/30 transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            免费获取我的站点增长评估书
          </button>
        </div>
      </div>
    </section>
  );
};
