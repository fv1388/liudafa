import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Film, 
  MapPin, 
  ChevronRight,
  TrendingUp,
  Clock,
  Zap,
  Globe2
} from 'lucide-react';
import heroBg from '../assets/images/hero_growth_pipeline_1791661046524.jpg';

interface HeroProps {
  onOpenAuditModal: () => void;
  lang: 'zh' | 'en';
}

const PIPELINE_NODES = [
  { id: 'seo', name: 'Google 秒级收录', code: '01', icon: Search, detail: 'Google Indexing API + IndexNow 主动推流 · 响应 200 OK' },
  { id: 'pin', name: 'Pinterest 2:3 海报', code: '04', icon: Sparkles, detail: '1000x1500 黄金分割 · 5秒批量渲染 10 套出海视觉' },
  { id: 'tk', name: 'TikTok MD5 去重', code: '05', icon: Film, detail: '音频微频移位 + 字节流重构 · 算法过审率 99.4%' },
  { id: 'trust', name: '5国语言信任徽章', code: '10', icon: ShieldCheck, detail: '256-Bit SSL 金融级盾牌 · 欧美结账弃单率骤降 41%' },
  { id: 'maps', name: 'Google Maps 探针', code: '09', icon: MapPin, detail: '扫描欧美无独立站实体批发商 · 自动生成英文开发信' },
];

export const Hero: React.FC<HeroProps> = ({ onOpenAuditModal, lang }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PIPELINE_NODES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800/80">
      {/* Background with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="NexusGrowth Global Automated Command Center"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/90 via-[#07090e]/85 to-[#07090e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.2),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Grid: Left Headline & CTA, Right Live Pipeline visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet contextual kicker without pill box */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-400">
              <span className="uppercase tracking-widest">
                {lang === 'zh' ? '专为跨境电商 · 外贸工厂 · 海外本地商家定制' : 'For DTC Brands · Global OEM Factories · Local Merchants'}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">2026 增长架构</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18] [text-wrap:balance]">
              {lang === 'zh' ? (
                <>
                  24小时帮你的独立站建立全网流量闭环
                  <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">
                    11 大 AI 与自动化增长打法
                  </span>
                </>
              ) : (
                <>
                  Build a Full-Funnel Automated Traffic Engine in 24 Hours
                  <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">
                    11 AI & Automation Growth Hacks
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {lang === 'zh' ? (
                '告别昂贵的 Meta/Google 广告烧钱陷阱。通过自动化 SEO 霸屏、TikTok/Pinterest 矩阵引流、高转化 AR 互动磁铁与海外 B2B 潜客探针，让你的订单与询盘增长 300%。'
              ) : (
                'Escape the rising ad spend trap. Leverage automated SEO dominance, viral TikTok/Pinterest matrices, high-converting AR widgets, and Google Maps buyer probes to boost inquiries by 300%.'
              )}
            </p>

            {/* Primary & Secondary Action Block */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#roi-calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all cursor-pointer whitespace-nowrap active:scale-95"
              >
                <span>{lang === 'zh' ? '免费测算您的站点增长潜力' : 'Calculate Your ROI & Cost Savings'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#live-playgrounds"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>{lang === 'zh' ? '体验 11 大增长实操流水线' : 'Test Live Playgrounds'}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Subtle editorial trust proof */}
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>实战验证无封号风险</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <div className="flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-blue-400" />
                <span>覆盖全球 120+ 跨境品类</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>24h 极速部署上线</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Pipeline Simulator */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 backdrop-blur-md p-5 sm:p-6 shadow-xl relative overflow-hidden">
              {/* Header of pipeline card */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                    全网流量闭环自动化调度控制台
                  </span>
                </div>
                <span className="text-[11px] font-mono tabular-nums text-slate-400">
                  NODE #{PIPELINE_NODES[activeStep].code} / 05
                </span>
              </div>

              {/* Step indicator items */}
              <div className="mt-4 space-y-2.5">
                {PIPELINE_NODES.map((node, index) => {
                  const Icon = node.icon;
                  const isActive = index === activeStep;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setActiveStep(index)}
                      className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 cursor-pointer ${
                        isActive
                          ? 'bg-blue-950/40 border-blue-600/70 shadow-sm'
                          : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-xs font-semibold truncate ${
                              isActive ? 'text-white' : 'text-slate-300'
                            }`}
                          >
                            {node.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 shrink-0">
                            打法 {node.code}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                          {node.detail}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Node Live Packet telemetry simulation */}
              <div className="mt-4 p-3 rounded-lg bg-black/50 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>实时调度状态:</span>
                  <span className="text-emerald-400">● 运转中 (200 OK)</span>
                </div>
                <div className="text-[11px] text-blue-300 truncate">
                  &gt; {PIPELINE_NODES[activeStep].detail}
                </div>
              </div>

              {/* Card footer CTA */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  全套打法支持独立站与工厂无缝集成
                </span>
                <button
                  onClick={onOpenAuditModal}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>立即接入</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column KPI Strip below the hero split */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums flex items-baseline gap-1">
              <span>+300%</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xs text-slate-400">平均订单与外贸询盘提振</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums flex items-baseline gap-1">
              <span>&lt; 24h</span>
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xs text-slate-400">Google 爬虫秒级主动收录</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums flex items-baseline gap-1">
              <span>-42%</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xs text-slate-400">独立站单客获客成本降低</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums flex items-baseline gap-1">
              <span>99.4%</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xs text-slate-400">社媒矩阵算法去重过审率</div>
          </div>
        </div>
      </div>
    </section>
  );
};
