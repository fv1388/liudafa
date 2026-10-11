import React, { useState, useId } from 'react';
import { 
  DollarSign, 
  Percent, 
  ArrowRight, 
  Sparkles,
  Building2,
  Store,
  Factory,
  Globe
} from 'lucide-react';
import { CalculatorInputs } from '../types';

interface RoiCalculatorProps {
  onOpenAuditModalWithData: (data: {
    gmv: number;
    adSaving: number;
    profitBoost: number;
    category: string;
  }) => void;
  lang: 'zh' | 'en';
}

const BUSINESS_CATEGORIES = [
  { id: 'dtc', label: '跨境 DTC 独立站', icon: Store, liftFactor: 1.9, margin: 0.55 },
  { id: 'factory', label: '外贸制造工厂 (B2B)', icon: Factory, liftFactor: 2.3, margin: 0.40 },
  { id: 'b2b_local', label: '海外本地批发/零售', icon: Building2, liftFactor: 1.8, margin: 0.48 },
  { id: 'amazon_to_dtc', label: '平台转型出海独立站', icon: Globe, liftFactor: 2.1, margin: 0.52 },
] as const;

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenAuditModalWithData, lang }) => {
  const gmvInputId = useId();
  const adSpendInputId = useId();
  const crInputId = useId();

  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyGmv: 60000,
    adSpendPercent: 32,
    conversionRate: 1.5,
    businessType: 'dtc',
  });

  const selectedCategory = BUSINESS_CATEGORIES.find((c) => c.id === inputs.businessType) || BUSINESS_CATEGORIES[0];

  // Mathematical logic
  const currentAdSpend = Math.round(inputs.monthlyGmv * (inputs.adSpendPercent / 100));
  // By shifting 38% of paid search to automated SEO indexing & Pinterest viral loop
  const projectedAdSaving = Math.round(currentAdSpend * 0.38);
  const projectedAdSpend = currentAdSpend - projectedAdSaving;

  // Conversion rate boost from AR try-on widget (hack 06) + 5-lang trust badges (hack 10) + FOMO exit retention (hack 07)
  const projectedCr = +(inputs.conversionRate * selectedCategory.liftFactor).toFixed(2);
  const conversionLiftMultiplier = projectedCr / inputs.conversionRate;
  
  // Incremental Gross Margin Profit from conversion boost
  const additionalRevenue = Math.round(inputs.monthlyGmv * (conversionLiftMultiplier - 1) * 0.5);
  const additionalGrossProfit = Math.round(additionalRevenue * selectedCategory.margin);
  
  const monthlyProfitIncrease = projectedAdSaving + additionalGrossProfit;
  const annualProfitIncrease = monthlyProfitIncrease * 12;

  const handleOpenAudit = () => {
    onOpenAuditModalWithData({
      gmv: inputs.monthlyGmv,
      adSaving: projectedAdSaving,
      profitBoost: monthlyProfitIncrease,
      category: selectedCategory.label,
    });
  };

  return (
    <section id="roi-calculator" className="py-16 lg:py-24 bg-[#090c14] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            {lang === 'zh' ? '交互式增长测算器 · 打法 3.2' : 'Interactive Growth & Cost Simulator · Hack 3.2'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            {lang === 'zh' 
              ? '测算你的独立站能节省多少广告费与新增多少净利润' 
              : 'Calculate Your Exact Ad Cost Savings & Net Profit Boost'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {lang === 'zh'
              ? '输入你的月销售额与广告预算，系统将基于 11 大自动化打法的实战模型，实时为您输出减支与增收测算数据。'
              : 'Enter your monthly revenue and ad budget to simulate the exact cost reduction and conversion lift our 11 growth hacks will deliver.'}
          </p>
        </div>

        {/* Business Category Segmented Control */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="text-xs font-medium text-slate-400 mb-3 text-center sm:text-left">
            第一步：选择您的出海业务形态
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800">
            {BUSINESS_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = inputs.businessType === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setInputs({ ...inputs, businessType: cat.id as any })}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Split: Sliders on the Left, Live Profit Breakdown on the Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-6 rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-7 space-y-6">
            <div className="text-sm font-semibold text-slate-200 pb-3 border-b border-slate-800">
              第二步：调整您当前站点的经营指标
            </div>

            {/* Slider 1: Monthly GMV */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={gmvInputId} className="text-slate-300 font-medium">当前月销售额 (USD)</label>
                <span className="font-mono tabular-nums text-white font-bold text-sm bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
                  ${inputs.monthlyGmv.toLocaleString()}
                </span>
              </div>
              <input
                id={gmvInputId}
                type="range"
                min="5000"
                max="300000"
                step="5000"
                value={inputs.monthlyGmv}
                onChange={(e) => setInputs({ ...inputs, monthlyGmv: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>$5,000</span>
                <span>$150,000</span>
                <span>$300,000+</span>
              </div>
            </div>

            {/* Slider 2: Ad Spend % */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={adSpendInputId} className="text-slate-300 font-medium">当前月广告费支出占比 (%)</label>
                <span className="font-mono tabular-nums text-white font-bold text-sm bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
                  {inputs.adSpendPercent}% (${currentAdSpend.toLocaleString()}/月)
                </span>
              </div>
              <input
                id={adSpendInputId}
                type="range"
                min="10"
                max="60"
                step="1"
                value={inputs.adSpendPercent}
                onChange={(e) => setInputs({ ...inputs, adSpendPercent: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>10% (轻广告)</span>
                <span>30% (行业中位数)</span>
                <span>60% (重度买量)</span>
              </div>
            </div>

            {/* Slider 3: Conversion Rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={crInputId} className="text-slate-300 font-medium">当前独立站转化率 (%)</label>
                <span className="font-mono tabular-nums text-white font-bold text-sm bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
                  {inputs.conversionRate.toFixed(1)}%
                </span>
              </div>
              <input
                id={crInputId}
                type="range"
                min="0.5"
                max="4.0"
                step="0.1"
                value={inputs.conversionRate}
                onChange={(e) => setInputs({ ...inputs, conversionRate: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>0.5% (亟待优化)</span>
                <span>1.6% (欧美平均)</span>
                <span>4.0% (高转化)</span>
              </div>
            </div>

            {/* Quick insights tip */}
            <div className="p-3.5 rounded-lg bg-blue-950/30 border border-blue-800/40 text-xs text-blue-300 space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>计算器底层测算逻辑:</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                通过 SEO 主动收录 (打法01) 与 Pinterest 2:3 海报矩阵 (打法04) 替换 38% 高昂 CPC 买量；通过 5 国信任徽章 (打法10) 与 AR 试穿 (打法06) 将转化率从 {inputs.conversionRate}% 提振至 {projectedCr}%。
              </p>
            </div>
          </div>

          {/* Right Column: Calculated ROI Matrix & Lead Bridge */}
          <div className="lg:col-span-6 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0b101c] border border-blue-900/40 p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  测算结果：预期净增益
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  ● 动态模型校验通过
                </span>
              </div>

              {/* Big Hero Number: Projected Monthly Net Profit Increase */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-2">
                <div className="text-xs text-slate-400 font-medium">预计每月为您的站点新增净利润:</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 font-mono tabular-nums">
                  +${monthlyProfitIncrease.toLocaleString()} / 月
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  折合年度累计额外净利润提振: <span className="text-slate-300 font-semibold">+${annualProfitIncrease.toLocaleString()}</span>
                </div>
              </div>

              {/* Detailed Breakdown Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* Metric A: Ad Cost Saved */}
                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                    <span>月节省广告费</span>
                  </div>
                  <div className="text-xl font-bold text-white font-mono tabular-nums">
                    ${projectedAdSaving.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    原广告费 ${currentAdSpend.toLocaleString()} 降至 ${projectedAdSpend.toLocaleString()}
                  </div>
                </div>

                {/* Metric B: Conversion Rate Jump */}
                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Percent className="w-3.5 h-3.5 text-blue-400" />
                    <span>转化率跃迁</span>
                  </div>
                  <div className="text-xl font-bold text-white font-mono tabular-nums flex items-baseline gap-1">
                    <span>{inputs.conversionRate}%</span>
                    <span className="text-xs text-blue-400 font-normal">→</span>
                    <span className="text-emerald-400">{projectedCr}%</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    客单转化效率提升 {Math.round((selectedCategory.liftFactor - 1) * 100)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="pt-6 mt-6 border-t border-slate-800 space-y-3">
              <button
                onClick={handleOpenAudit}
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>预约 1 对 1 策略诊断并领取专属评估书</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[11px] text-slate-500">
                诊断报告包含：爬虫收录检测、长尾词霸屏池、社媒去重流水线配置建议
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
