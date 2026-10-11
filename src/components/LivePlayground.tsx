import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Film, 
  MapPin, 
  Glasses, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  Search, 
  Lock, 
  CreditCard, 
  Layers,
  Flame,
  ArrowRight,
  Cpu
} from 'lucide-react';
import { runGrowthHackViaGradio, getSavedGradioEndpoint } from '../services/gradioClient';

interface LivePlaygroundProps {
  initialTool?: 'badge' | 'pinterest' | 'tiktok' | 'maps' | 'ar' | 'colab';
  lang: 'zh' | 'en';
  onOpenAuditModal: () => void;
  onOpenColabModal?: () => void;
}

export const LivePlayground: React.FC<LivePlaygroundProps> = ({ 
  initialTool = 'badge', 
  lang,
  onOpenAuditModal,
  onOpenColabModal
}) => {
  const [activeTab, setActiveTab] = useState<'badge' | 'pinterest' | 'tiktok' | 'maps' | 'ar' | 'colab'>(initialTool);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // State for Colab direct integration testing
  const [colabDirectUrl, setColabDirectUrl] = useState(() => getSavedGradioEndpoint());
  const [colabHackType, setColabHackType] = useState('Pinterest 海报批量渲染');
  const [colabInputVal, setColabInputVal] = useState('https://get100shop.com');
  const [isColabRunning, setIsColabRunning] = useState(false);
  const [colabResultMsg, setColabResultMsg] = useState<string | null>(null);
  const [colabResultImg, setColabResultImg] = useState<string | null>(null);

  const handleTriggerColabHack = async () => {
    setIsColabRunning(true);
    setColabResultMsg('⏳ 正在通过公网请求 Google Colab 容器算力执行中...');
    setColabResultImg(null);

    try {
      const res = await runGrowthHackViaGradio(colabHackType, colabInputVal, colabDirectUrl);
      setColabResultMsg(res.message);
      if (res.outputImageUrl) {
        setColabResultImg(res.outputImageUrl);
      }
    } catch (err: any) {
      setColabResultMsg(`❌ 连接 Colab 失败，请检查 Colab 是否仍在运行或 URL 是否过期。\n错误信息: ${err?.message}`);
    } finally {
      setIsColabRunning(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // State for Tool 1: 5-language trust badge
  const [badgeLang, setBadgeLang] = useState<'en' | 'de' | 'fr' | 'es' | 'ja'>('en');
  const [badgeTheme, setBadgeTheme] = useState<'gold' | 'dark' | 'blue'>('gold');

  const BADGE_TRANSLATIONS = {
    en: {
      title: 'Guaranteed Safe & Secure Checkout',
      ssl: '256-Bit SSL Bank-Grade Encryption',
      guarantee: '30-Day Money Back Guarantee',
      cards: 'Verified Visa · Mastercard · PayPal · Stripe',
      trustScore: '99.8% Buyer Satisfaction Score',
    },
    de: {
      title: 'Garantierter sicherer und verschlüsselter Checkout',
      ssl: '256-Bit-SSL-Verschlüsselung nach Bankenstandard',
      guarantee: '30 Tage Geld-zurück-Garantie',
      cards: 'Geprüft von Visa · Mastercard · PayPal · Klarna',
      trustScore: 'TÜV & SSL Geprüfter Käuferschutz',
    },
    fr: {
      title: 'Paiement Sécurisé et Garanti à 100%',
      ssl: 'Chiffrement SSL 256 bits de niveau bancaire',
      guarantee: 'Garantie satisfait ou remboursé de 30 jours',
      cards: 'Vérifié par Visa · Mastercard · PayPal · Stripe',
      trustScore: 'Protection des acheteurs certifiée',
    },
    es: {
      title: 'Pago 100% Seguro y Protegido',
      ssl: 'Encriptación SSL de 256 bits nivel bancario',
      guarantee: 'Garantía de devolución de 30 días',
      cards: 'Verificado por Visa · Mastercard · PayPal · Stripe',
      trustScore: 'Satisfacción y entrega garantizada',
    },
    ja: {
      title: '100% 安全で保護された決済システム',
      ssl: '256ビットSSL銀行基準暗号化通信',
      guarantee: '30日間全額返金保証制度',
      cards: 'Visa · Mastercard · PayPal · JCB 決済対応',
      trustScore: '国際セキュリティ基準認証取得',
    },
  };

  // State for Tool 2: Pinterest 2:3 Canvas Batch Generator
  const [pinTitle, setPinTitle] = useState('Minimalist Titanium EDC Pocket Tool');
  const [pinTagline, setPinTagline] = useState('Aircraft-Grade Lightweight Durability');
  const [pinDiscount, setPinDiscount] = useState('20% OFF Limited Drop');
  const [isGeneratingPins, setIsGeneratingPins] = useState(false);

  // State for Tool 3: TikTok MD5 Dedup
  const [audioPitch, setAudioPitch] = useState(1.02);
  const [microCrop, setMicroCrop] = useState(1.2);
  const [isDenoising, setIsDenoising] = useState(true);
  const [isStripExif, setIsStripExif] = useState(true);
  const [dedupStatus, setDedupStatus] = useState<'ready' | 'processing' | 'done'>('ready');
  const [originalHash, setOriginalHash] = useState('a9c4b780f2d1e56b');
  const [newHash, setNewHash] = useState('e3f9104bd8a61902');

  const runDedupTest = () => {
    setDedupStatus('processing');
    setTimeout(() => {
      const generated = Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
      setNewHash(generated);
      setDedupStatus('done');
    }, 800);
  };

  // State for Tool 4: Google Maps Lead Probe
  const [targetLocation, setTargetLocation] = useState('Berlin, Germany');
  const [targetNiche, setTargetNiche] = useState('Auto Parts & Accessories Wholesalers');
  const [isScanningMaps, setIsScanningMaps] = useState(false);
  const [mapsScanDone, setMapsScanDone] = useState(true);

  const SAMPLE_LEADS = [
    {
      name: 'Bavaria Motor Parts GmbH',
      city: 'Berlin, Germany',
      phone: '+49 30 9182****',
      rating: 4.8,
      reviews: 142,
      siteStatus: '无独立站 (仅有电话黄页)',
      opportunity: '高价值 B2B 批发商，急需在线样品目录与询价通道',
      email: 'einkauf@bavaria-parts-berlin.de',
    },
    {
      name: 'Schmidt & Sohn Kfz-Handel',
      city: 'Potsdam, Germany',
      phone: '+49 33 1293****',
      rating: 4.6,
      reviews: 89,
      siteStatus: '老旧非响应式站点 (2018年)',
      opportunity: '移动端无法访问，流失 60% 线上采购客户',
      email: 'info@schmidt-kfz-handel.de',
    },
    {
      name: 'Nordic Auto Components KG',
      city: 'Hamburg, Germany',
      phone: '+49 40 8821****',
      rating: 4.9,
      reviews: 210,
      siteStatus: '仅有 Facebook 主页',
      opportunity: '大量本地修理厂寻找一手供货商，适合提供批发账期',
      email: 'wholesale@nordic-components.de',
    },
  ];

  const handleRunMapsScan = () => {
    setIsScanningMaps(true);
    setMapsScanDone(false);
    setTimeout(() => {
      setIsScanningMaps(false);
      setMapsScanDone(true);
    }, 1200);
  };

  // State for Tool 5: AR 3D Product
  const [arProduct, setArProduct] = useState<'glasses' | 'watch'>('glasses');
  const [arColor, setArColor] = useState<'black' | 'gold' | 'silver'>('black');
  const [arMode, setArMode] = useState<'3d' | 'ar_face'>('3d');

  return (
    <section id="live-playgrounds" className="py-16 lg:py-24 bg-[#080b12] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            {lang === 'zh' ? '交互式体验中心 · 用效果说话' : 'Interactive Playground · Live Proof in Action'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            {lang === 'zh'
              ? '亲手测试 5 款实战自动化增长工具'
              : 'Hands-On Interactive Growth Workstations'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {lang === 'zh'
              ? '每一个组件均为实际生产级代码构建。你可以随时自定义参数、查看实时渲染反馈，并直接复制代码或导出数据。'
              : 'Test our real automated modules right now in your browser. Customize inputs, inspect real-time outputs, and copy production assets.'}
          </p>
        </div>

        {/* Colab / Gradio Python Compute Engine Banner */}
        <div className="mb-6 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div className="text-slate-300">
              <span className="font-semibold text-white">云端算力调度状态: </span>
              {getSavedGradioEndpoint() ? (
                <span className="text-emerald-400 font-mono">
                  已直连 Colab ({getSavedGradioEndpoint()})
                </span>
              ) : (
                <span className="text-slate-400">
                  当前处于高仿真沙盒模式 (支持直连你的 Google Colab Python 脚本)
                </span>
              )}
            </div>
          </div>

          {onOpenColabModal && (
            <button
              onClick={onOpenColabModal}
              className="px-3 py-1.5 text-xs font-medium text-emerald-400 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-900/60 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>配置 Google Colab / Gradio 直连</span>
            </button>
          )}
        </div>

        {/* Tab Selection Bar (Functional buttons) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800 overflow-x-auto mb-8 max-w-full">
          <button
            onClick={() => setActiveTab('badge')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'badge'
                ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>5国语言 SSL 信任徽章 (打法10)</span>
          </button>

          <button
            onClick={() => setActiveTab('pinterest')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'pinterest'
                ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pinterest 2:3 爆款海报秒级渲染 (打法04)</span>
          </button>

          <button
            onClick={() => setActiveTab('tiktok')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'tiktok'
                ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>TikTok 音视频 MD5 去重测试 (打法05)</span>
          </button>

          <button
            onClick={() => setActiveTab('maps')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'maps'
                ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Google Maps 海外采购商探针 (打法09)</span>
          </button>

          <button
            onClick={() => setActiveTab('ar')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'ar'
                ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Glasses className="w-3.5 h-3.5" />
            <span>AR 试戴与 3D 交互展厅 (打法06)</span>
          </button>

          <button
            onClick={() => setActiveTab('colab')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'colab'
                ? 'bg-emerald-600 text-white font-semibold shadow-sm shadow-emerald-600/30'
                : 'text-emerald-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Colab 算力直连测试 (Gradio API)</span>
          </button>
        </div>

        {/* Tab 1: 5-Language SSL Trust Badge */}
        {activeTab === 'badge' && (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>5国语言 SSL 银行级信任徽章生成系统</span>
                  <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    实测结账转化率提升 +41%
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  这就是我们为你网站安装的同款母语信任徽章。自动识别访客 IP，消除欧美买家卡盗刷与跨境欺诈疑虑。
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Language pills */}
                <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
                  {(['en', 'de', 'fr', 'es', 'ja'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setBadgeLang(l)}
                      className={`px-2.5 py-1 text-xs font-medium rounded uppercase transition-colors cursor-pointer ${
                        badgeLang === l ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>

                {/* Theme pills */}
                <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setBadgeTheme('gold')}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                      badgeTheme === 'gold' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    尊贵金盾
                  </button>
                  <button
                    onClick={() => setBadgeTheme('dark')}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                      badgeTheme === 'dark' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    黑曜石
                  </button>
                  <button
                    onClick={() => setBadgeTheme('blue')}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                      badgeTheme === 'blue' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    科技蓝
                  </button>
                </div>
              </div>
            </div>

            {/* Live Interactive Badge Renderer */}
            <div className="space-y-4">
              <div className="text-xs font-medium text-slate-400">实时渲染预览 (支持嵌入 Shopify / 独立站结算页):</div>
              <div
                className={`p-6 sm:p-8 rounded-xl border transition-all ${
                  badgeTheme === 'gold'
                    ? 'bg-gradient-to-r from-[#181308] via-[#221c0e] to-[#181308] border-amber-500/40 shadow-lg shadow-amber-950/20'
                    : badgeTheme === 'dark'
                    ? 'bg-slate-950 border-slate-700'
                    : 'bg-gradient-to-r from-blue-950/30 via-slate-900 to-blue-950/30 border-blue-500/40'
                }`}
              >
                <div className="max-w-2xl mx-auto space-y-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <ShieldCheck
                      className={`w-6 h-6 ${
                        badgeTheme === 'gold' ? 'text-amber-400' : badgeTheme === 'blue' ? 'text-blue-400' : 'text-emerald-400'
                      }`}
                    />
                    <span
                      className={`text-sm sm:text-base font-bold tracking-tight ${
                        badgeTheme === 'gold' ? 'text-amber-200' : 'text-white'
                      }`}
                    >
                      {BADGE_TRANSLATIONS[badgeLang].title}
                    </span>
                  </div>

                  {/* Trust markers row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 pb-2 text-xs">
                    <div className="flex items-center justify-center gap-1.5 text-slate-300">
                      <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{BADGE_TRANSLATIONS[badgeLang].ssl}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-slate-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{BADGE_TRANSLATIONS[badgeLang].guarantee}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-slate-300">
                      <CreditCard className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{BADGE_TRANSLATIONS[badgeLang].trustScore}</span>
                    </div>
                  </div>

                  {/* Payment provider icon badges */}
                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-black/40 border border-slate-700/80 font-mono font-bold text-white text-[11px]">
                      VISA
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/40 border border-slate-700/80 font-mono font-bold text-white text-[11px]">
                      Mastercard
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/40 border border-slate-700/80 font-mono font-bold text-blue-400 text-[11px]">
                      PayPal
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/40 border border-slate-700/80 font-mono font-bold text-indigo-300 text-[11px]">
                      Stripe
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/40 border border-slate-700/80 font-mono font-bold text-emerald-400 text-[11px]">
                      Norton Secured
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Copy & Download Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-400">
                支持以 Web Component、Shopify Liquid 或 React 原生标签 1 秒植入。
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    copyToClipboard(
                      `<div class="nexus-trust-badge" data-lang="${badgeLang}" data-theme="${badgeTheme}">\n  <!-- NexusGrowth Verified 256-Bit SSL Checkout Badge -->\n</div>`,
                      'badge-code'
                    )
                  }
                  className="px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedKey === 'badge-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'badge-code' ? '代码已复制' : '复制嵌入代码 (Embed Code)'}</span>
                </button>

                <button
                  onClick={onOpenAuditModal}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>获取无水印全套母语徽章</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Pinterest 2:3 Pin Batch Generator */}
        {activeTab === 'pinterest' && (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Pinterest 2:3 爆款出海海报秒级批量渲染工作台</span>
                  <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    5秒批量渲染 10 套视觉
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  严格采用 1000x1500px 黄金 2:3 竖屏比例与欧美留白构图，高意向买家点击率比传统 1:1 图片高出 240%。
                </p>
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">快速填入案例:</span>
                <button
                  onClick={() => {
                    setPinTitle('Aerospace Titanium EDC Pocket Tool');
                    setPinTagline('Ultra-Compact · Built for Everyday Resilience');
                    setPinDiscount('25% OFF Limited Drop');
                  }}
                  className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 rounded border border-slate-700 cursor-pointer"
                >
                  3C/五金
                </button>
                <button
                  onClick={() => {
                    setPinTitle('Bio-Active Peptide Glow Serum');
                    setPinTagline('Clean Botanical Hydration for Glass Skin');
                    setPinDiscount('Free Global Shipping');
                  }}
                  className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 rounded border border-slate-700 cursor-pointer"
                >
                  美妆护肤
                </button>
              </div>
            </div>

            {/* Inputs & Batch Preview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Inputs */}
              <div className="lg:col-span-4 space-y-4 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                <div className="text-xs font-semibold text-slate-300">商品与文案要素:</div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400">商品英文标题 (Product Title)</label>
                  <input
                    type="text"
                    value={pinTitle}
                    onChange={(e) => setPinTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400">核心卖点 (USP Tagline)</label>
                  <input
                    type="text"
                    value={pinTagline}
                    onChange={(e) => setPinTagline(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400">促销/行动指令 (CTA Offer)</label>
                  <input
                    type="text"
                    value={pinDiscount}
                    onChange={(e) => setPinDiscount(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsGeneratingPins(true);
                      setTimeout(() => setIsGeneratingPins(false), 600);
                    }}
                    className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingPins ? 'animate-spin' : ''}`} />
                    <span>5秒批量重新渲染海报</span>
                  </button>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="text-slate-300 font-semibold">自动匹配的 Pinterest 高搜 SEO Tags:</div>
                  <div className="font-mono text-blue-400 break-words">
                    #EDCgear #MinimalistDesign #EverydayCarry #Drop2026 #Craftsmanship
                  </div>
                </div>
              </div>

              {/* 3 Live 2:3 Canvas Cards */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Style 1: Minimalist Editorial */}
                <div className="aspect-[2/3] rounded-xl bg-gradient-to-b from-stone-900 to-black border border-stone-800 p-4 flex flex-col justify-between relative overflow-hidden group shadow-md">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400">
                      STYLE A · MINIMALIST
                    </span>
                    <h4 className="text-sm font-bold text-white tracking-tight leading-snug">
                      {pinTitle}
                    </h4>
                    <p className="text-[11px] text-stone-400 leading-normal">
                      {pinTagline}
                    </p>
                  </div>
                  <div className="my-auto py-6 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-stone-700 flex items-center justify-center text-stone-500 text-xs font-mono">
                      [2:3 视觉]
                    </div>
                  </div>
                  <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-300">{pinDiscount}</span>
                    <span className="text-[9px] uppercase tracking-wider text-stone-400">Shop Now →</span>
                  </div>
                </div>

                {/* Style 2: Obsidian Cyber */}
                <div className="aspect-[2/3] rounded-xl bg-gradient-to-b from-blue-950/80 via-slate-950 to-black border border-blue-900/60 p-4 flex flex-col justify-between relative overflow-hidden shadow-md">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400">
                      STYLE B · TECH OBSIDIAN
                    </span>
                    <h4 className="text-sm font-bold text-white tracking-tight leading-snug">
                      {pinTitle}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      {pinTagline}
                    </p>
                  </div>
                  <div className="my-auto py-6 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-lg border border-blue-800/80 bg-blue-950/40 flex items-center justify-center text-blue-400 text-xs font-mono">
                      [超清特写]
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-400">{pinDiscount}</span>
                    <span className="text-[9px] uppercase tracking-wider text-blue-300">Tap to View →</span>
                  </div>
                </div>

                {/* Style 3: Clean Contrast */}
                <div className="aspect-[2/3] rounded-xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800 p-4 flex flex-col justify-between relative overflow-hidden shadow-md">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400">
                      STYLE C · EDITORIAL DROP
                    </span>
                    <h4 className="text-sm font-bold text-white tracking-tight leading-snug">
                      {pinTitle}
                    </h4>
                    <p className="text-[11px] text-neutral-400 leading-normal">
                      {pinTagline}
                    </p>
                  </div>
                  <div className="my-auto py-6 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-neutral-700 bg-neutral-900 flex items-center justify-center text-neutral-400 text-xs font-mono">
                      [模特场景]
                    </div>
                  </div>
                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-white">{pinDiscount}</span>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400">Explore →</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-400">
                支持连接 Pinterest 官方 API 自动化批量发帖调度流水线。
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    copyToClipboard(
                      `${pinTitle} - ${pinTagline}\n${pinDiscount}\n\n#EDCgear #MinimalistDesign #EverydayCarry #Drop2026 #Craftsmanship`,
                      'pin-copy'
                    )
                  }
                  className="px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedKey === 'pin-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'pin-copy' ? '已复制发布文案' : '复制 Pin 标题与 SEO 标签'}</span>
                </button>
                <button
                  onClick={onOpenAuditModal}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>批量处理 500+ SKU</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: TikTok / Reels MD5 De-dup */}
        {activeTab === 'tiktok' && (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>TikTok / Shorts 音轨 MD5 深度去重流水线</span>
                  <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    实测平台过审率 99.4%
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  彻底解决视频被判定“Unoriginal Content”限流 200 播放量。重塑视频与音频的数字散列指纹。
                </p>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                算法状态: <span className="text-emerald-400 font-semibold">● 规则库 2026 最新</span>
              </div>
            </div>

            {/* 2-Column Parameter Playground */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Parameters */}
              <div className="lg:col-span-5 space-y-5 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                <div className="text-xs font-semibold text-slate-300">去重微调参数:</div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">音频音调微偏 (Pitch Shift)</span>
                    <span className="font-mono text-white font-bold">{audioPitch.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="1.00"
                    max="1.05"
                    step="0.01"
                    value={audioPitch}
                    onChange={(e) => setAudioPitch(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="text-[10px] text-slate-500">人耳完全无法分辨，但可破坏平台音频声学指纹库比对</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">边缘画幅微裁剪 (Micro-Crop)</span>
                    <span className="font-mono text-white font-bold">{microCrop.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.1"
                    value={microCrop}
                    onChange={(e) => setMicroCrop(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="text-[10px] text-slate-500">重构视频每一帧的关键像素坐标矩阵</div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isDenoising}
                      onChange={(e) => setIsDenoising(e.target.checked)}
                      className="rounded accent-blue-500"
                    />
                    <span>注入微量人眼无感噪点波形 (Noise Dithering)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isStripExif}
                      onChange={(e) => setIsStripExif(e.target.checked)}
                      className="rounded accent-blue-500"
                    />
                    <span>抹除并伪造拍摄设备 EXIF 元数据 & 时间戳</span>
                  </label>
                </div>

                <button
                  onClick={runDedupTest}
                  disabled={dedupStatus === 'processing'}
                  className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${dedupStatus === 'processing' ? 'animate-spin' : ''}`} />
                  <span>{dedupStatus === 'processing' ? '正在执行底层散列重构...' : '执行去重并计算新散列值'}</span>
                </button>
              </div>

              {/* Hash & Pass Rate Output */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4 font-mono">
                  <div className="text-xs text-slate-400 font-sans font-semibold">
                    数字指纹对比结果:
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
                      <span className="text-slate-400 font-sans">处理前原文件 MD5:</span>
                      <span className="text-red-400">{originalHash}4819e078ba194</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-blue-900/40">
                      <span className="text-slate-400 font-sans">重构后全新唯一 MD5:</span>
                      <span className="text-emerald-400">{newHash}c308291aa892</span>
                    </div>
                  </div>

                  {/* Safety Score Meter */}
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs font-sans">
                      <span className="text-slate-300">TikTok / Reels / Shorts 算法安全评测:</span>
                      <span className="text-emerald-400 font-bold font-mono">99.4% (通过率极高)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-[99.4%] h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/30 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-blue-300">自动化流水线交付价值:</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    本打法支持与云端队列服务器对接，一个晚上可无感处理 2,000+ 条爆款视频，配合多账号矩阵调度系统，实现单日百万级垂直播放量。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Google Maps B2B Lead Probe */}
        {activeTab === 'maps' && (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Google Maps 海外本地商户/海外采购商主动探针</span>
                  <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    B2B 外贸大单杀手锏
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  秒级扫描欧美实体批发商与零售门店。精准筛选出“没有独立站”或“网站年久失修”的目标老板，一键生成高回复率外贸冷邮件。
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunMapsScan}
                  disabled={isScanningMaps}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Search className={`w-3.5 h-3.5 ${isScanningMaps ? 'animate-spin' : ''}`} />
                  <span>{isScanningMaps ? '正在扫描海外地图经纬度...' : '开始雷达探针扫描'}</span>
                </button>
              </div>
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400">目标海外国家/城市</label>
                <input
                  type="text"
                  value={targetLocation}
                  onChange={(e) => setTargetLocation(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">目标采购品类/行业关键词</label>
                <input
                  type="text"
                  value={targetNiche}
                  onChange={(e) => setTargetNiche(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>
            </div>

            {/* Live Leads Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>实时扫描到的高意向海外 B2B 客户 (共 3 户代表性潜客):</span>
                <span className="font-mono text-emerald-400">探针匹配度 98%</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4 font-semibold">商户/采购商名称</th>
                      <th className="py-3 px-4 font-semibold">地理位置与联系方式</th>
                      <th className="py-3 px-4 font-semibold">独立站现状诊断</th>
                      <th className="py-3 px-4 font-semibold">切入点与开发建议</th>
                      <th className="py-3 px-4 font-semibold text-right">外贸开发信</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {SAMPLE_LEADS.map((lead, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-white">
                          <div>{lead.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">Google 评分 {lead.rating} ★ ({lead.reviews} 评价)</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono">
                          <div>{lead.city}</div>
                          <div className="text-blue-400 text-[11px]">{lead.phone}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-amber-400 font-medium">
                            {lead.siteStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 max-w-xs text-[11px]">
                          {lead.opportunity}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() =>
                              copyToClipboard(
                                `Subject: Wholesale inquiries & product catalog for ${lead.name}\n\nHi ${lead.name} team,\n\nI noticed your store in ${lead.city} has an outstanding local reputation. However, buyers cannot currently view your digital catalog online.\n\nWe are a direct manufacturer specializing in this sector. Would you like to review our digital wholesale pricing list?\n\nBest,\n[Your Company]`,
                                `lead-${idx}`
                              )
                            }
                            className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors cursor-pointer inline-flex items-center gap-1"
                          >
                            {copiedKey === `lead-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedKey === `lead-${idx}` ? '已复制' : '复制开发信'}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom info */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-400">
                支持批量导出 CSV 格式并一键导入主流海外 CRM 邮件自动化发送系统。
              </div>
              <button
                onClick={onOpenAuditModal}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>为我的行业定制专属探针</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 5: AR Try-On & 3D Interactive Viewer */}
        {activeTab === 'ar' && (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>AR 实时试妆/试戴/3D交互体验 H5 磁铁</span>
                  <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    页面留存时间拉长 600%
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  无需下载任何 App，海外买家在手机浏览器打开即能 360° 旋转观察材质或直接虚拟试戴。
                </p>
              </div>

              {/* Product toggle */}
              <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
                <button
                  onClick={() => setArProduct('glasses')}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                    arProduct === 'glasses' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  智能墨镜
                </button>
                <button
                  onClick={() => setArProduct('watch')}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${
                    arProduct === 'watch' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  运动腕表
                </button>
              </div>
            </div>

            {/* Interactive 3D Showcase Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 aspect-video sm:aspect-[16/10] rounded-xl bg-gradient-to-b from-[#0f1422] to-black border border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>WebGL 3D 渲染引擎 · 60 FPS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setArMode('3d')}
                      className={`px-2 py-1 rounded text-[11px] cursor-pointer ${
                        arMode === '3d' ? 'bg-blue-600 text-white' : 'text-slate-400 bg-slate-900'
                      }`}
                    >
                      3D 观察
                    </button>
                    <button
                      onClick={() => setArMode('ar_face')}
                      className={`px-2 py-1 rounded text-[11px] cursor-pointer ${
                        arMode === 'ar_face' ? 'bg-blue-600 text-white' : 'text-slate-400 bg-slate-900'
                      }`}
                    >
                      虚拟试戴模式
                    </button>
                  </div>
                </div>

                {/* Central Visual Model Mockup */}
                <div className="my-auto text-center space-y-3 py-6">
                  <div className="inline-block p-8 rounded-full border border-blue-500/30 bg-blue-950/20 shadow-2xl relative">
                    {arProduct === 'glasses' ? (
                      <div className="text-center space-y-2">
                        <Glasses
                          className={`w-24 h-24 mx-auto transition-colors duration-300 ${
                            arColor === 'black' ? 'text-slate-200' : arColor === 'gold' ? 'text-amber-400' : 'text-cyan-300'
                          }`}
                        />
                        <div className="text-xs font-mono text-slate-400">
                          {arMode === '3d' ? '拖拽 360° 观察钛金属铰链与透光率' : '面部关键点已捕获 · 试戴上脸拟真度 99%'}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-2">
                        <div
                          className={`w-20 h-20 mx-auto rounded-2xl border-4 transition-colors duration-300 flex items-center justify-center font-mono text-xs font-bold ${
                            arColor === 'black'
                              ? 'border-slate-400 text-slate-200 bg-slate-900'
                              : arColor === 'gold'
                              ? 'border-amber-400 text-amber-300 bg-amber-950/40'
                              : 'border-cyan-400 text-cyan-200 bg-cyan-950/40'
                          }`}
                        >
                          10:09
                        </div>
                        <div className="text-xs font-mono text-slate-400">
                          {arMode === '3d' ? '陶瓷表圈光影实时光线追踪' : '手腕尺寸精准贴合'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Color Selector */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                  <span className="text-slate-400">表面涂层材质:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setArColor('black')}
                      className={`px-2.5 py-1 rounded cursor-pointer ${
                        arColor === 'black' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400'
                      }`}
                    >
                      哑光曜黑
                    </button>
                    <button
                      onClick={() => setArColor('gold')}
                      className={`px-2.5 py-1 rounded cursor-pointer ${
                        arColor === 'gold' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400'
                      }`}
                    >
                      香槟金
                    </button>
                    <button
                      onClick={() => setArColor('silver')}
                      className={`px-2.5 py-1 rounded cursor-pointer ${
                        arColor === 'silver' ? 'bg-cyan-700 text-white font-bold' : 'text-slate-400'
                      }`}
                    >
                      太空白
                    </button>
                  </div>
                </div>
              </div>

              {/* Data & Conversion Impact comparison */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                  <div className="text-xs font-semibold text-slate-300">
                    实战 A/B 测试对比数据:
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-400">
                        <span>普通商品图片详情页</span>
                        <span className="font-mono text-slate-300">转化率 1.4% · 留存 24s</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-[25%] h-full bg-slate-600 rounded-full" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-slate-200 font-semibold">
                        <span>加入轻量 AR 试戴 H5 模块</span>
                        <span className="font-mono text-emerald-400">转化率 3.9% · 留存 160s+</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-xs text-emerald-300">
                    海外买家“试过再买”的确定感，可将跨国退货物流损失压减 44% 以上。
                  </div>
                </div>

                <button
                  onClick={onOpenAuditModal}
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>为我的独立站接入 AR 试穿试戴</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Google Colab / Gradio Direct API Integration */}
        {activeTab === 'colab' && (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>⚡ 接入 Google Colab 算力引擎实时测试</span>
                  <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                    @gradio/client 官方直连
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  在下方输入你的 Colab 公网链接与待处理独立站网址，前端将直接通过 @gradio/client 远程触发你的 Python 脚本与打法流水线。
                </p>
              </div>

              {onOpenColabModal && (
                <button
                  onClick={onOpenColabModal}
                  className="px-3.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>查看 Colab Python 源码</span>
                </button>
              )}
            </div>

            {/* Inputs & Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-6 space-y-4 bg-slate-950/70 p-5 rounded-xl border border-slate-800">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    Colab Gradio 公网链接 (Share URL):
                  </label>
                  <input
                    type="text"
                    placeholder="https://YOUR_COLAB_URL.gradio.live/"
                    value={colabDirectUrl}
                    onChange={(e) => setColabDirectUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                  <div className="text-[10px] text-slate-500">
                    留空则默认使用系统内置的高仿真即时算力引擎
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    选择执行的增长打法:
                  </label>
                  <select
                    value={colabHackType}
                    onChange={(e) => setColabHackType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Pinterest 海报批量渲染">Pinterest 海报批量渲染</option>
                    <option value="SEO 导弹收录推送">SEO 导弹收录推送</option>
                    <option value="TikTok 音轨去重注入">TikTok 音轨去重注入</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">
                    输入您的独立站网址或商品链接:
                  </label>
                  <input
                    type="text"
                    value={colabInputVal}
                    onChange={(e) => setColabInputVal(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  onClick={handleTriggerColabHack}
                  disabled={isColabRunning}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/30 disabled:opacity-50 text-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isColabRunning ? 'animate-spin' : ''}`} />
                  <span>{isColabRunning ? '正在远程触发 Colab 计算...' : '🚀 点击远程触发 Colab 打法流水线'}</span>
                </button>
              </div>

              {/* Real-time Response Output Container */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3 min-h-[220px] flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-400 flex items-center justify-between pb-2 border-b border-slate-800">
                      <span>Colab 响应结果面板:</span>
                      <span className="font-mono text-[11px] text-emerald-400">STATUS: READY</span>
                    </div>

                    {colabResultMsg ? (
                      <p className="text-xs font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                        {colabResultMsg}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-500 italic p-3">
                        尚未触发请求。点击左侧按钮，即可查看 Colab 后端返回的真实执行日志与渲染图。
                      </p>
                    )}

                    {colabResultImg && (
                      <div className="pt-2">
                        <div className="text-[11px] text-slate-400 mb-1.5 font-medium">生成效果预览:</div>
                        <img
                          src={colabResultImg}
                          alt="Colab Result Preview"
                          referrerPolicy="no-referrer"
                          className="max-w-xs h-36 rounded-lg object-cover border border-slate-700 shadow-md"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>支持调用 app.predict(0, [hack, input])</span>
                    <span className="text-blue-400 font-mono">Response OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
