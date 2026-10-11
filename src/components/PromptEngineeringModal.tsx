import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Sparkles, 
  Code, 
  Terminal, 
  Cpu, 
  Layers, 
  BookOpen, 
  ExternalLink,
  Sliders,
  CheckCircle2
} from 'lucide-react';

interface PromptEngineeringModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'zh' | 'en';
}

const TEMPLATES = [
  {
    id: 'template-1',
    title: '模板 1: 高转化 B2B 增长与营销落地页 (招揽客户推荐)',
    desc: '单页全功能架构，包含 Hero、动态数据、Tab 实操沙盒与预约表单',
    targetTool: '适用于 ChatGPT / Claude / DeepSeek',
    content: `你是一位顶级 UI/UX 设计师兼全栈前端工程师。请帮我编写一个单页（Single-Page）B2B 营销落地页的完整前端代码。

1. 网站主题：独立站自动化增长与营销服务机构官网 (NexusGrowth)。
2. 视觉风格：深色模式（Dark Mode），深灰/纯黑背景，搭配霓虹蓝（Neon Blue）与科技紫（Cyber Purple）渐变高光，高科技感、现代且富有信任感。
3. 页面结构：
   - Header/Nav：包含 Logo、服务菜单、语言切换指示器以及一个高亮的“免费诊断” Call-to-Action 按钮。
   - Hero 首屏：大号强力标题（“24小时建立全网流量闭环”）、副标题、动态数据计数器（“已提升 300%+ 转化率”），以及“立即体验”主按钮。
   - Interactive Demo 区块：设计一个带 Tab 切换的交互演示卡片，包含：① ROI/成本节省计算器（带有滑动条动态算账）；② 5 国语言信任徽章展示卡片；③ TikTok/Pinterest 批量生成预览。
   - 服务矩阵卡片：用 3x2 网格展示 6 大核心打法，悬停时有光晕渐变边框效果（Hover Effects）。
   - 表单/预约弹窗：收集客户姓名、邮箱、网址并带有表单验证。
   - Footer：版权信息及社交媒体链接。
4. 技术规范：
   - 使用纯 HTML5、Tailwind CSS（通过 CDN 引入）和原生 JavaScript 写在单个文件中。
   - 必须完全适配移动端（Fully Responsive），导航栏在移动端自动折叠为抽屉/汉堡菜单。
   - 加上流畅的滚屏动画与微交互（Micro-interactions）。`,
  },
  {
    id: 'template-2',
    title: '模板 2: 独立站成本与利润节省计算器交互组件',
    desc: '轻量级交互工具，带 3 个滑动条实时联动与平滑递增动画',
    targetTool: '适用于独立站插件 / 营销嵌入页',
    content: `请为我开发一个“独立站运营成本与利润节省计算器”的前端交互组件。

要求：
1. 输入项：提供 3 个可拖动的范围滑动条（Range Slider）：
   - 月度广告花费（$1,000 - $100,000）
   - 当前网站转化率（0.5% - 5.0%）
   - 当前月销售额（$5,000 - $500,000）
2. 输出项：根据公式实时计算并动态更新：
   - 预计每年浪费的流量开支
   - 使用自动化打法后预计每年新增的净利润
3. 视觉要求：苹果风（Apple Style）极简洁白卡片风格，带柔和阴影，数值变化时带有平滑递增动画。
4. 转化引导：计算结果下方显示一个高亮按钮：“解锁完整降本方案”，点击后弹窗提示提交 Email。
5. 代码要求：提供可以直接运行的完整 HTML、CSS 和 JavaScript 代码（单文件或独立 React 组件）。`,
  },
  {
    id: 'template-3',
    title: '模板 3: 轻量级 SaaS / AI 工具产品单页',
    desc: '专为 v0.dev / Bolt.new / Lovable.dev 设计的英文精益提示词',
    targetTool: '适用于 v0.dev / Bolt.new / Lovable',
    content: `Build a modern SaaS landing page for an AI Video & Image Deduplication tool.

Key Features:
1. Navbar: Logo, Features, Pricing, Sign In button.
2. Hero Section: Headline "Instantly Deduplicate & Re-render TikTok Videos in 5 Seconds", with a Live File Dropzone (drag & drop image/video simulator).
3. Interactive Playground: Show a side-by-side comparison slider (Before vs After processing) with watermarked preview.
4. Pricing Table: 3 tiers (Free Tier with Watermark, Pro $29/mo, Agency $99/mo) with a "Popular" badge on Pro.
5. Tech Stack: React, Tailwind CSS, Lucide Icons, Framer Motion for smooth animations. Fully responsive for mobile and desktop viewports.`,
  },
];

const FORMULA_STEPS = [
  { step: '1. 角色 (Role)', desc: '设定资深全栈工程师与 UI/UX 设计师身份，确立代码质量水准。' },
  { step: '2. 目标 (Goal)', desc: '明确业务目的与转化诉求（如：B2B获客单页、SaaS工具官网）。' },
  { step: '3. 架构 (Structure)', desc: '逐个列出 Header、Hero、交互计算器、Bento Grid、表单的要素。' },
  { step: '4. 视觉 (Design)', desc: '指明深色模式/极简白、主色调、渐变光晕及排版节奏。' },
  { step: '5. 技术 (Tech Stack)', desc: '指定具体框架（React/Tailwind/HTML5）与移动端响应式交互。' },
];

const TOOL_TIPS = [
  {
    tool: 'ChatGPT (GPT-4o) / Claude 3.5 Sonnet',
    tip: '必须明确说明“输出单个完整可运行的 HTML/CSS/JS 文件”，防止只给代码片段；样式复杂时指定 Tailwind CSS CDN。',
  },
  {
    tool: 'v0.dev / Bolt.new / Lovable.dev',
    tip: '推荐使用英文提示词。直接指定 UI 库（如 shadcn/ui、lucide-react、Tailwind），具体描述交互组件的动作。',
  },
  {
    tool: 'Cursor / Replit Agent',
    tip: '结合上下文提示。先提供网站的目录结构或设计参考图，提示词强调逻辑完整度与 API 接口连通性。',
  },
];

const ADVANCED_HACKS = [
  { title: '分步提问 (Iterative Prompting)', desc: '不要试图一条 Prompt 做完所有功能。先让 AI 给出框架和样式，再逐步追加细节功能。' },
  { title: '提供参考参照物 (Reference Style)', desc: '在提示词中加入“参考 Apple 极简白”、“Stripe 渐变高光”或“Vercel 黑白极简”。' },
  { title: '指定响应式断点 (Responsive)', desc: '结尾固定加上：确保在 iPhone 手机端与 Desktop 大屏完美自适应，导航栏支持折叠汉堡菜单。' },
  { title: '处理长代码中断问题', desc: '若 AI 生成长代码中途停止，直接回复：“请从上次中断的代码行继续输出，不要重复前面内容”。' },
];

export const PromptEngineeringModal: React.FC<PromptEngineeringModalProps> = ({ isOpen, onClose, lang }) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'formula' | 'tools' | 'tips'>('templates');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 font-mono">
                AI Website Prompt Engineering Center
              </div>
              <h3 className="text-lg font-bold text-white">
                AI 生成高转化网站黄金提示词公式与实战模板库
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch bar */}
        <div className="flex items-center gap-1.5 p-2 bg-slate-950 border-b border-slate-800 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'templates' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            3 套实战提示词模板
          </button>
          <button
            onClick={() => setActiveTab('formula')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'formula' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            5 大核心要素黄金公式
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'tools' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            各 AI 工具偏好技巧
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'tips' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            4 大进阶防翻车贴士
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Tab 1: 3 Templates */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              {TEMPLATES.map((tmpl) => (
                <div key={tmpl.id} className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="font-bold text-white text-sm">{tmpl.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{tmpl.desc}</p>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40 shrink-0">
                      {tmpl.targetTool}
                    </span>
                  </div>

                  {/* Code box */}
                  <div className="p-3.5 rounded-lg bg-black/60 border border-slate-800 font-mono text-[11px] text-slate-300 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
                    {tmpl.content}
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => copyToClipboard(tmpl.content, tmpl.id)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedKey === tmpl.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === tmpl.id ? '提示词已复制' : '一键复制此模板 Prompt'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Golden Formula */}
          {activeTab === 'formula' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-900/50 space-y-2">
                <div className="text-xs font-mono font-bold text-blue-400">黄金提示词万能公式:</div>
                <div className="text-sm sm:text-base font-bold text-white font-mono bg-black/50 p-3 rounded-lg border border-slate-800">
                  [角色设定] + [项目类型与目标] + [页面结构与内容] + [视觉风格与配色] + [技术栈与交互要求]
                </div>
              </div>

              <div className="space-y-3">
                {FORMULA_STEPS.map((s, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs sm:text-sm">{s.step}</div>
                      <div className="text-xs text-slate-400 mt-1">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Tool-Specific Tips */}
          {activeTab === 'tools' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                不同 AI 模型的上下文窗口和代码补全偏好各不相同，选用专属策略可大幅避免死循环或截断：
              </div>
              {TOOL_TIPS.map((t, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span>{t.tool}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    {t.tip}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: 4 Pro Tips */}
          {activeTab === 'tips' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ADVANCED_HACKS.map((hack, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{hack.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {hack.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>提示：配合本站的“获客实战SOP”与冷开发信模板效果更佳</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            关闭窗口
          </button>
        </div>
      </div>
    </div>
  );
};
