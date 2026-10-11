import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  BarChart,
  Cell,
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Percent, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles,
  BarChart3,
  Layers
} from 'lucide-react';

interface GrowthImpactDashboardProps {
  onOpenAuditModal: () => void;
  lang: 'zh' | 'en';
}

// 6-Month Flywheel Trajectory Data
const TIMELINE_DATA = [
  {
    month: '第1月 (启动期)',
    adCostTraditional: 12500,
    adCostNexus: 8800,
    adSaved: 3700,
    conversionRate: 1.4,
    inquiries: 18,
    organicTraffic: 3200,
  },
  {
    month: '第2月 (矩阵铺量)',
    adCostTraditional: 14000,
    adCostNexus: 8200,
    adSaved: 5800,
    conversionRate: 2.1,
    inquiries: 34,
    organicTraffic: 7900,
  },
  {
    month: '第3月 (SEO收录爆发)',
    adCostTraditional: 15500,
    adCostNexus: 7600,
    adSaved: 7900,
    conversionRate: 2.8,
    inquiries: 62,
    organicTraffic: 16400,
  },
  {
    month: '第4月 (AR试穿放量)',
    adCostTraditional: 16800,
    adCostNexus: 7100,
    adSaved: 9700,
    conversionRate: 3.4,
    inquiries: 88,
    organicTraffic: 24800,
  },
  {
    month: '第5月 (B2B探针收获)',
    adCostTraditional: 18000,
    adCostNexus: 6800,
    adSaved: 11200,
    conversionRate: 3.8,
    inquiries: 114,
    organicTraffic: 33500,
  },
  {
    month: '第6月 (全网流量闭环)',
    adCostTraditional: 19500,
    adCostNexus: 6400,
    adSaved: 13100,
    conversionRate: 4.2,
    inquiries: 146,
    organicTraffic: 42800,
  },
];

// Industry Breakdown Performance Comparison
const CATEGORY_DATA = [
  {
    category: '3C数码 / 智能硬件',
    adSavingsRate: 44, // %
    crIncreaseRate: 180, // %
    avgMonthlySaved: 14200, // $
    orderLift: '+290%',
  },
  {
    category: '精密汽配 / 外贸制造',
    adSavingsRate: 52,
    crIncreaseRate: 240,
    avgMonthlySaved: 18600,
    orderLift: '+360%',
  },
  {
    category: '出海美妆 / 个人护理',
    adSavingsRate: 38,
    crIncreaseRate: 210,
    avgMonthlySaved: 12500,
    orderLift: '+275%',
  },
  {
    category: '家居园艺 / 户外运动',
    adSavingsRate: 41,
    crIncreaseRate: 165,
    avgMonthlySaved: 11800,
    orderLift: '+240%',
  },
  {
    category: '海外本地批发 / 连锁',
    adSavingsRate: 48,
    crIncreaseRate: 195,
    avgMonthlySaved: 15300,
    orderLift: '+310%',
  },
];

export const GrowthImpactDashboard: React.FC<GrowthImpactDashboardProps> = ({ onOpenAuditModal, lang }) => {
  const [viewMode, setViewMode] = useState<'timeline' | 'categories'>('timeline');
  const [metricFocus, setMetricFocus] = useState<'both' | 'savings' | 'conversion'>('both');

  // Custom Dark Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3.5 rounded-xl bg-slate-950/95 border border-slate-700 shadow-2xl backdrop-blur-md text-xs space-y-1.5 font-sans min-w-[200px]">
          <div className="font-bold text-white pb-1 border-b border-slate-800 flex items-center justify-between">
            <span>{label}</span>
            <span className="text-[10px] text-blue-400 font-mono">NEXUS DATA</span>
          </div>
          {payload.map((entry: any, index: number) => {
            let labelText = entry.name;
            let displayVal = entry.value;

            if (entry.dataKey === 'adCostTraditional') {
              labelText = '传统高昂广告费';
              displayVal = `$${entry.value.toLocaleString()}`;
            } else if (entry.dataKey === 'adCostNexus') {
              labelText = '11大打法优化后支出';
              displayVal = `$${entry.value.toLocaleString()}`;
            } else if (entry.dataKey === 'adSaved') {
              labelText = '当月节省广告费';
              displayVal = `$${entry.value.toLocaleString()}`;
            } else if (entry.dataKey === 'conversionRate') {
              labelText = '独立站转化率';
              displayVal = `${entry.value}%`;
            } else if (entry.dataKey === 'inquiries') {
              labelText = '高意向大宗询盘/订单';
              displayVal = `${entry.value} 封`;
            }

            return (
              <div key={`item-${index}`} className="flex items-center justify-between text-[11px] gap-2">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span>{labelText}</span>
                </span>
                <span className="font-mono font-bold text-white tabular-nums">
                  {displayVal}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="growth-dashboard" className="py-16 lg:py-24 bg-[#080b13] border-b border-slate-800/80 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span>动态数据仪表盘 · 视觉效果验证</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              {lang === 'zh'
                ? '广告费支出 vs 询盘转化率：6 个月增长飞轮对比'
                : 'Ad Cost Reductions vs Conversion Rate Lift: 6-Month Trajectory'}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              数据源自我们服务的 14 家出海独立站与外贸工厂真实脱敏聚合数据。直观展现传统买量模式与 11 大自动化增长流水线的真实效益剪刀差。
            </p>
          </div>

          {/* Interactive Mode & Metric Switchers */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  viewMode === 'timeline'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                6个月增长飞轮
              </button>
              <button
                onClick={() => setViewMode('categories')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  viewMode === 'categories'
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                5大品类战绩分布
              </button>
            </div>

            {viewMode === 'timeline' && (
              <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
                <button
                  onClick={() => setMetricFocus('both')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                    metricFocus === 'both' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  综合视图
                </button>
                <button
                  onClick={() => setMetricFocus('savings')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                    metricFocus === 'savings' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  广告降本
                </button>
                <button
                  onClick={() => setMetricFocus('conversion')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                    metricFocus === 'conversion' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  转化飞跃
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4 Quantitative Hero Numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400">累计为出海企业节省广告开支</div>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono tabular-nums">
              $1,840,000+
            </div>
            <div className="text-[10px] text-slate-500">替代高昂 Google / Meta CPC</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400">平均独立站转化率提升</div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums flex items-baseline gap-1">
              <span>1.4%</span>
              <span className="text-xs text-blue-400 font-normal">→</span>
              <span className="text-amber-400">4.2%</span>
            </div>
            <div className="text-[10px] text-slate-500">转化率飞跃提升 +200%</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400">Google 爬虫主动收录登顶词</div>
            <div className="text-xl sm:text-2xl font-extrabold text-blue-400 font-mono tabular-nums">
              48,200+ 个
            </div>
            <div className="text-[10px] text-slate-500">打法 01 边缘主动推流协议</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400">海外采购商直接询盘增幅</div>
            <div className="text-xl sm:text-2xl font-extrabold text-indigo-300 font-mono tabular-nums">
              +711%
            </div>
            <div className="text-[10px] text-slate-500">Maps 探针直通企业采购部</div>
          </div>
        </div>

        {/* The Main Recharts Container Card */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900/80 to-[#0a0e19] border border-slate-800 p-5 sm:p-7 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                {viewMode === 'timeline' ? '月度成本与转化动态剪刀差曲线 (USD vs % CR)' : '5大出海品类广告降本率与转化提振率对比'}
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-red-400 rounded-full" />
                <span>传统买量成本</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-emerald-400 rounded-full" />
                <span>优化后支出</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-amber-400 rounded-full" />
                <span>转化率 (%)</span>
              </span>
            </div>
          </div>

          {/* Chart View 1: 6-Month Timeline ComposedChart */}
          {viewMode === 'timeline' && (
            <div className="h-[360px] sm:h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={TIMELINE_DATA}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorAdSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorNexusSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

                  <XAxis
                    dataKey="month"
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    tickLine={false}
                  />

                  {/* Left YAxis: Ad Cost in Dollars */}
                  <YAxis
                    yAxisId="left"
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    tickLine={false}
                    tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                  />

                  {/* Right YAxis: Conversion Rate in Percentage */}
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#64748b"
                    tick={{ fill: '#f59e0b', fontSize: 11 }}
                    tickLine={false}
                    tickFormatter={(val) => `${val}%`}
                  />

                  <Tooltip content={<CustomTooltip />} />

                  {/* Render based on selected filter */}
                  {(metricFocus === 'both' || metricFocus === 'savings') && (
                    <>
                      {/* Traditional Cost Bar / Area */}
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="adCostTraditional"
                        name="adCostTraditional"
                        stroke="#f87171"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        dot={{ r: 3, fill: '#f87171' }}
                      />

                      {/* Nexus Cost Area */}
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="adCostNexus"
                        name="adCostNexus"
                        stroke="#3b82f6"
                        strokeWidth={2.5}
                        fill="url(#colorNexusSpend)"
                      />

                      {/* Ad Saved Amount Bar */}
                      <Bar
                        yAxisId="left"
                        dataKey="adSaved"
                        name="adSaved"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={32}
                      />
                    </>
                  )}

                  {(metricFocus === 'both' || metricFocus === 'conversion') && (
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="conversionRate"
                      name="conversionRate"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#f59e0b', stroke: '#07090e', strokeWidth: 2 }}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Chart View 2: Category Breakdown BarChart */}
          {viewMode === 'categories' && (
            <div className="h-[360px] sm:h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={CATEGORY_DATA}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="category"
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    tickLine={false}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <Tooltip
                    content={({ active, payload, label }: any) => {
                      if (active && payload && payload.length) {
                        const item = payload[0].payload;
                        return (
                          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-700 shadow-2xl text-xs space-y-1">
                            <div className="font-bold text-white pb-1 border-b border-slate-800">
                              {label}
                            </div>
                            <div className="text-emerald-400">
                              平均月广告费节省率: <span className="font-mono font-bold">-{item.adSavingsRate}%</span>
                            </div>
                            <div className="text-amber-400">
                              独立站转化率提振: <span className="font-mono font-bold">+{item.crIncreaseRate}%</span>
                            </div>
                            <div className="text-blue-400">
                              平均每月节省开支: <span className="font-mono font-bold">${item.avgMonthlySaved.toLocaleString()}</span>
                            </div>
                            <div className="text-slate-300">
                              综合订单增量: <span className="font-mono font-bold">{item.orderLift}</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="adSavingsRate"
                    name="广告节省率 (%)"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                  <Bar
                    dataKey="crIncreaseRate"
                    name="转化率提升幅度 (%)"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Interactive takeaway summary bar */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-slate-400 flex items-center gap-2 text-center sm:text-left">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                结论：从第 3 个月开始，随着 SEO 秒级收录与 Pinterest 自然矩阵成型，客户广告费进入永久性下降通道。
              </span>
            </div>

            <button
              onClick={onOpenAuditModal}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
            >
              <span>为我的站点生成专属增长曲线</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
