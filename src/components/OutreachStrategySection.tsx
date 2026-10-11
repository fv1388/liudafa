import React, { useState } from 'react';
import { OUTREACH_STRATEGIES } from '../data/socialProofs';
import { 
  Copy, 
  Check, 
  Send, 
  MessageSquare, 
  Video, 
  Target, 
  PhoneCall, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface OutreachStrategySectionProps {
  onOpenAuditModal: () => void;
  onOpenPromptModal?: () => void;
  lang: 'zh' | 'en';
}

const SALES_SCRIPTS = [
  {
    targetUser: '体验了“海报 / 去重生成器”的客户',
    tag: '社媒矩阵客户',
    pitchTitle: '从单张体验到 500 SKU 自动化流水线',
    script: '“您刚才体验的是单张图片的处理效果。如果您升级到我们的自动化流水线，今晚系统就能自动为您网站上的 500 个 SKU 生成 5,000 张 Pinterest 爆款海报并自动定时发布，省下您至少 2 个美工的人力成本。”',
    highlight: '锁定省人工与海量铺货心智',
  },
  {
    targetUser: '体验了“SEO 诊断 / Sitemap 推送”的客户',
    tag: '流量饥渴客户',
    pitchTitle: '从漫长等待到 24 小时 instant 导弹收录',
    script: '“刚才扫描看到您的网站有大量页面 Google 还没有收录。我们今天启动【24 小时 instant 导弹推送】，明早您登录 Google Search Console 就可以看到收录抓取曲线直线飙升。”',
    highlight: '锁定即时可见成效与权威背书',
  },
  {
    targetUser: '体验了“成本与利润计算器”的客户',
    tag: 'ROI 敏感客户',
    pitchTitle: '从无效流失到赠送 $500 AR 转化磁铁',
    script: '“刚才计算器算出来的结果您也看到了，您每个月在无效流量和低转化率上的损失远远超过了我们服务的费用。今天下单，我们直接为您赠送价值 $500 的 AR 试戴 H5 模块组件！”',
    highlight: '锁定无风险对比与超值赠品临门一脚',
  },
];

export const OutreachStrategySection: React.FC<OutreachStrategySectionProps> = ({ 
  onOpenAuditModal, 
  onOpenPromptModal, 
  lang 
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="outreach-playbook" className="py-16 lg:py-24 bg-[#090d16] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Part 1: Client Acquisition Playbook (三、 网站上线后的下一步招揽客户策略) */}
        <div>
          <div className="max-w-3xl space-y-4 mb-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              {lang === 'zh' ? '实战获客 SOP · 获客引流指南' : 'Client Acquisition Playbook · 3 Inbound Channels'}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              {lang === 'zh'
                ? '网站上线后：3 个低成本渠道快速引流招揽第一批客户'
                : '3 Low-Cost Channels to Acquire Your First Batch of High-Ticket Clients'}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {lang === 'zh'
                ? '拥有了这个高转化落地页与 Live Demo 后，你可以直接通过以下 3 个经过实测的渠道执行冷启动开发，并直接复制现成的话术与邮件模板。'
                : 'Leverage our ready-to-use cold outreach templates and multi-channel strategies to turn site visitors into signed agency clients.'}
            </p>
          </div>

          {/* 3 Channel Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {OUTREACH_STRATEGIES.map((strategy) => (
              <div
                key={strategy.number}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-mono font-bold text-blue-400">
                      渠道 {strategy.number}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      实操转化率 8.4%
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {strategy.channel}
                  </h3>

                  <div className="text-xs text-slate-400">
                    <span className="text-slate-300 font-semibold">目标受众: </span>
                    {strategy.targetAudience}
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                    <div className="font-semibold text-blue-300 mb-1">执行路径:</div>
                    {strategy.actionDetails}
                  </div>
                </div>

                {/* Template Copy Box */}
                <div className="space-y-2 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-medium text-slate-300">{strategy.templateLabel}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-black/60 border border-slate-800/90 font-mono text-[11px] text-slate-300 max-h-32 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
                    {strategy.templateContent}
                  </div>
                  <button
                    onClick={() => copyToClipboard(strategy.templateContent, `outreach-${strategy.number}`)}
                    className="w-full py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedKey === `outreach-${strategy.number}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {copiedKey === `outreach-${strategy.number}` ? '话术模板已复制到剪贴板' : '一键复制完整开发信 / 发帖脚本'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: 3 High-Converting Sales Pitch Scripts (快速落地的 3 个“成交话术”建议) */}
        <div className="pt-12 border-t border-slate-800/80">
          <div className="max-w-3xl space-y-3 mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              成交转化心法 · 快速落地武器库
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              当客户体验完 Demo 前来咨询时：配合这 3 套话术精准锁定成交
            </h2>
            <p className="text-sm text-slate-400">
              用不可辩驳的利弊对比、超值赠品与确定性成果，消除潜客最后的犹豫，实现 100% 临门一脚。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SALES_SCRIPTS.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950 p-6 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
                    <span className="font-semibold text-emerald-400">{item.tag}</span>
                    <span className="text-[11px] font-mono text-slate-500">SCENE #{idx + 1}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white">
                    {item.pitchTitle}
                  </h3>

                  <div className="text-[11px] text-slate-400">
                    适配场景：{item.targetUser}
                  </div>

                  <blockquote className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-200 italic leading-relaxed">
                    {item.script}
                  </blockquote>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 font-medium">
                    ✦ {item.highlight}
                  </span>
                  <button
                    onClick={() => copyToClipboard(item.script, `script-${idx}`)}
                    className="p-1.5 rounded-md text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                    title="复制话术"
                  >
                    {copiedKey === `script-${idx}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 3: AI Website Prompt Engineering Center Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-800/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-blue-400">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>开发者与出海团队特别赠礼 · AI 建站提示词工场</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              想要用 ChatGPT / Claude / v0 / Bolt 直接生成高转化独立站代码？
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              我们整理了【AI 生成网站黄金公式：[角色]+[目标]+[架构]+[视觉]+[技术]】以及 3 套即拿即用的实战 Prompt 模板与各工具防翻车贴士。
            </p>
          </div>

          {onOpenPromptModal && (
            <button
              onClick={onOpenPromptModal}
              className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 shrink-0"
            >
              <span>打开 AI 提示词工程中心</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
