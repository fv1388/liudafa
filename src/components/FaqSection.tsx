import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface FaqSectionProps {
  onOpenAuditModal: () => void;
  lang: 'zh' | 'en';
}

interface FaqItem {
  id: string;
  category: 'tech' | 'roi' | 'platform' | 'compliance';
  categoryLabel: string;
  question: string;
  answer: string;
  keyPoints: string[];
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-01',
    category: 'tech',
    categoryLabel: '技术与集成',
    question: '接入这 11 大增长流水线需要多长时间？我们团队没有技术开发人员能用吗？',
    answer: '完全不需要您的团队懂任何代码。我们的全套流水线为无侵入式（Non-invasive）云端自动化交付，最快可在 24 小时内完成首批打法部署与验证。',
    keyPoints: [
      '无需改动您的现有技术架构，提供一键式 Webhook 与 Cloudflare 边缘代理配置',
      '5 国语言信任徽章与 AR 试戴组件支持一段代码 60 秒极速嵌入',
      '指派 1 对 1 技术实施专家全程代跑，交付完整开箱即用的自动化调度后台',
    ],
  },
  {
    id: 'faq-02',
    category: 'platform',
    categoryLabel: '平台兼容性',
    question: '我们的独立站是 Shopify / WooCommerce / 自研建站，系统是否全面兼容？',
    answer: '100% 全面兼容主流海外独立站与外贸建站系统。无论您使用的是 Shopify、WooCommerce、Magento、BigCommerce、Shopline、Shoplazza，还是基于 React / Vue / Next.js 的自研定制系统，都能即插即用。',
    keyPoints: [
      'Shopify / WooCommerce 官方 App 与应用级深度打通',
      '支持无头电商 (Headless Commerce) 与传统静态外贸站点',
      '外贸工厂纯静态 B2B 官网同样完美支持 Google 秒级索引与 Maps 探针',
    ],
  },
  {
    id: 'faq-03',
    category: 'roi',
    categoryLabel: '效果与ROI保障',
    question: '你们是否有明确的 ROI 增长效果保障？如果达不到预期怎么办？',
    answer: '我们提供阶段性量化交付里程碑与对赌保障。在签约前，技术团队会基于您的当前独立站数据出具《基准线协议》，明确约定 Google 收录增长数、社媒海报过审率与广告费下降指标。',
    keyPoints: [
      '首月启动期若 Google 索引主动推送未在 48 小时内生效，承诺无条件全额退款',
      '明确写入合同：3 个月内若未帮客户节省下对应服务费等额的广告成本，免费提供技术运维直至达标',
      '每一笔订单与询盘均有 Google Analytics 4 与 CRM 追踪闭环，成效完全透明',
    ],
  },
  {
    id: 'faq-04',
    category: 'compliance',
    categoryLabel: '安全与合规',
    question: 'TikTok / Shorts 音视频 MD5 去重和 Pinterest 矩阵引流会有封号或限流风险吗？',
    answer: '不会。我们的去重流水线并非市面上廉价的粗暴反转或简单加边框，而是深入到音频声学指纹（微频音调偏移）和视频底层散列重构（逐帧像素坐标与 EXIF 抹除），在各大平台算法层均被判定为“全新唯一原创内容”。',
    keyPoints: [
      '严格遵从平台防封白名单规则，实测算法过审率高达 99.4%',
      '配合指纹浏览器环境与真实住宅 IP 发帖调度，彻底规避关联封号风险',
      'Pinterest 2:3 海报模板遵循欧美本土商业视觉规范，拒绝垃圾信息降权',
    ],
  },
  {
    id: 'faq-05',
    category: 'compliance',
    categoryLabel: 'SEO规范',
    question: 'Google 24h 秒级主动收录是否符合 Google 白帽 SEO 规范？会被降权吗？',
    answer: '完全属于官方白帽准则范畴。我们的打法使用的是 Google 官方开放的 Indexing API 协议以及微软必应等搜索引擎推崇的开源 IndexNow 协议，旨在主动向搜索引擎通报内容更新，而不是使用作弊黑帽蜘蛛池。',
    keyPoints: [
      '完全调用官方 API 边缘推流接口，符合 Google Webmaster 官方开发文档',
      '自动配套 Schema.org JSON-LD 高标准富文本微数据结构，爬虫体验极度友好',
      '已被超 120+ 品牌独立站长期验证，安全稳定且积累高权重长尾资产',
    ],
  },
  {
    id: 'faq-06',
    category: 'tech',
    categoryLabel: '数据安全',
    question: '我们的商品 SKU 选品、工厂底价和海外客户询盘数据会泄露吗？',
    answer: '我们与每一位签约客户均签订具有法律效力的严格双向商业保密协议 (NDA)。所有探针扫描数据、客户订单与询盘均沉淀在您独立的云端实例或您自己的服务器中，绝不做任何跨客户数据共享或选品跟卖。',
    keyPoints: [
      '签署正式具备法律效力的《跨境商业数据隐私与防跟卖保密协议》',
      '数据传输全链路 256-Bit SSL 银行级加密，支持本地离线数据导出与销毁',
      '核心爆品 SKU 资产与买家私域线索 100% 归属于您企业自身所有',
    ],
  },
];

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenAuditModal, lang }) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-01', 'faq-03']);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = filterCategory === 'all' || faq.category === filterCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="faq-section" className="py-16 lg:py-24 bg-[#07090e] border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span>客户高频答疑 · 消除所有合作疑虑</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            {lang === 'zh'
              ? '常见疑问与 B2B 合作保障解答'
              : 'Frequently Asked Questions & Partnership Safeguards'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {lang === 'zh'
              ? '关于技术对接周期、ROI 效果对赌、独立站平台兼容性与账号安全合规的所有事实细节，都在这里公开透明呈现。'
              : 'Everything you need to know about implementation timelines, ROI guarantees, platform integrations, and compliance safety.'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-slate-900/80 rounded-xl border border-slate-800">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              全部疑问 ({FAQS.length})
            </button>
            <button
              onClick={() => setFilterCategory('tech')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filterCategory === 'tech'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              技术对接
            </button>
            <button
              onClick={() => setFilterCategory('roi')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filterCategory === 'roi'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ROI效果对赌
            </button>
            <button
              onClick={() => setFilterCategory('platform')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filterCategory === 'platform'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              平台兼容性
            </button>
            <button
              onClick={() => setFilterCategory('compliance')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filterCategory === 'compliance'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              安全合规
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索疑问 (如 Shopify / 退款 / 封号)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-blue-900/60 shadow-lg shadow-blue-950/20'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-blue-400 font-semibold">{faq.categoryLabel}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-lg border border-slate-700/80 bg-slate-800/80 flex items-center justify-center text-slate-300 shrink-0 transition-transform duration-200 mt-1 ${
                      isOpen ? 'rotate-180 bg-blue-600/30 text-blue-300 border-blue-500/40' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-150">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-800/60">
                      {faq.keyPoints.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs rounded-xl bg-slate-900/40 border border-slate-800">
              未找到与 “{searchQuery}” 相关的疑问。您可以直接点击下方按钮向我们的资深技术顾问提问。
            </div>
          )}
        </div>

        {/* Bottom Support Callout Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/30 via-slate-900 to-slate-900 border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>仍有针对您特定行业品类的定制疑问？</span>
            </h4>
            <p className="text-xs text-slate-400">
              预约 1 对 1 策略诊断，技术架构师将在 30 分钟内针对您的现有网站提供技术解答。
            </p>
          </div>

          <button
            onClick={onOpenAuditModal}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
          >
            <span>直接向技术顾问咨询</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
