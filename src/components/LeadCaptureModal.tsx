import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Download, 
  RefreshCw,
  Building,
  Mail,
  Phone,
  Globe
} from 'lucide-react';
import { LeadSubmission } from '../types';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillData?: {
    gmv?: number;
    adSaving?: number;
    profitBoost?: number;
    category?: string;
  } | null;
  lang: 'zh' | 'en';
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  prefillData,
  lang,
}) => {
  const [formData, setFormData] = useState<LeadSubmission>({
    name: '',
    email: '',
    contact: '',
    websiteUrl: '',
    businessCategory: prefillData?.category || '3C 数码与智能硬件',
    monthlyRevenueTier: prefillData?.gmv ? `$${prefillData.gmv.toLocaleString()}/月` : '$30,000 - $100,000/月',
    primaryPainPoint: 'Meta/Google 广告费过高，自然流量极少',
  });

  const [step, setStep] = useState<'form' | 'generating' | 'report'>('form');
  const [diagnosticScore, setDiagnosticScore] = useState(62);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('generating');
    setTimeout(() => {
      setStep('report');
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0 bg-slate-950/60">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              NexusGrowth 增长策略诊断局
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              {step === 'report' ? '您的专属出海独立站增长诊断评估书已就绪' : '预约 1 对 1 策略诊断 · 领取专属增长方案'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {prefillData?.profitBoost && (
                <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-900/50 text-xs text-blue-300 flex items-center justify-between">
                  <span>已载入您测算的预期月新增净利:</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    +${prefillData.profitBoost.toLocaleString()} / 月
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <span>联系人姓名 / 称呼</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="例如：王总 / David"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <span>企业邮箱</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <span>WhatsApp 或 微信 (用于接收诊断报告)</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+86 / WeChat ID / Phone"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <span>现有网站网址 / 独立站链接</span>
                    <span className="text-slate-500">(选填，用于技术探针检测)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="https://yourstore.com"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">当前最阻碍增长的瓶颈痛点</label>
                <select
                  value={formData.primaryPainPoint}
                  onChange={(e) => setFormData({ ...formData, primaryPainPoint: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Meta/Google 广告费过高，自然流量极少">Meta/Google 广告费过高，自然流量极少</option>
                  <option value="新上产品页面 Google 爬虫 2 个月不收录">新上产品页面 Google 爬虫 2 个月不收录</option>
                  <option value="Pinterest 与 TikTok 做图发视频太慢，易被判定重复限流">Pinterest 与 TikTok 做图发视频太慢，易被判定重复限流</option>
                  <option value="进站买家加购弃单率超 70%，缺乏信任感">进站买家加购弃单率超 70%，缺乏信任感</option>
                  <option value="工厂缺乏海外本地 B2B 线下批发商与大宗采购商资源">工厂缺乏海外本地 B2B 线下批发商与大宗采购商资源</option>
                </select>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>隐私与保密承诺:</span>
                </div>
                <p>
                  我们严格遵守跨境商业保密协议，绝不向第三方透露您的网址、品类与经营数据。
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>立即生成 1v1 技术诊断报告并预约顾问</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'generating' && (
            <div className="py-12 text-center space-y-4">
              <RefreshCw className="w-10 h-10 text-blue-500 animate-spin mx-auto" />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">
                  正在调取 11 大增长流水线针对您的站点进行自动化推演...
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  [1/3] 模拟 Google Indexing 爬虫抓取节点... OK<br />
                  [2/3] 计算 Pinterest 2:3 视觉覆盖率模型... OK<br />
                  [3/3] 匹配 Google Maps 海外目标采购商雷达... OK
                </p>
              </div>
            </div>
          )}

          {step === 'report' && (
            <div className="space-y-6">
              {/* Report Header Card */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-800/50 space-y-3">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
                  <span className="font-semibold text-white">诊断客户: {formData.name} ({formData.websiteUrl || '待填独立站'})</span>
                  <span className="font-mono text-emerald-400">诊断状态: 已归档</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-2 rounded bg-black/40 border border-slate-800">
                    <div className="text-[10px] text-slate-400">当前健康度评分</div>
                    <div className="text-lg font-bold font-mono text-amber-400">{diagnosticScore} / 100</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800">
                    <div className="text-[10px] text-slate-400">预计可节省广告费</div>
                    <div className="text-lg font-bold font-mono text-emerald-400">
                      ${prefillData?.adSaving ? prefillData.adSaving.toLocaleString() : '6,800'} / 月
                    </div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800">
                    <div className="text-[10px] text-slate-400">建议首发打法组合</div>
                    <div className="text-lg font-bold font-mono text-blue-400">01 + 04 + 10</div>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800">
                    <div className="text-[10px] text-slate-400">预计见效周期</div>
                    <div className="text-lg font-bold font-mono text-white">24 - 48 小时</div>
                  </div>
                </div>
              </div>

              {/* 3-Phase Action Roadmap */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-300">
                  为您定制的 3 阶段自动化闭环落地排期:
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between font-semibold text-white">
                      <span>阶段 1: 止血与信任重建 (第 1 - 3 天)</span>
                      <span className="text-blue-400 font-mono text-[11px]">打法 01 & 10</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      接入 5 国语言 SSL 银行级信任徽章（防卡欺诈心理），配置 Google Indexing API 强制爬虫 24h 内秒级收录历史未抓取页面。
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between font-semibold text-white">
                      <span>阶段 2: 矩阵式免费流量爆破 (第 4 - 10 天)</span>
                      <span className="text-blue-400 font-mono text-[11px]">打法 04 & 05</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      为核心 100 个 SKU 批量生成 1,000 张 Pinterest 2:3 爆款海报并自动定时发布；开启 TikTok 音视频 MD5 去重流水线铺设外链。
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between font-semibold text-white">
                      <span>阶段 3: 沉淀海外高净值直客 (第 11 - 20 天)</span>
                      <span className="text-blue-400 font-mono text-[11px]">打法 06 & 09</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      部署零 App 门槛 WebGL AR 虚拟试戴模块，并启动 Google Maps 海外实体采购商雷达探针，每周输出 200+ 欧美真实批发商精准线索。
                    </p>
                  </div>
                </div>
              </div>

              {/* Consultation Confirmation Box */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-300 space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>专属出海增长顾问已为您分配</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  我们已将完整的交互式诊断参数及排期推送到您的联系方式 ({formData.contact})。技术团队将在 30 分钟内与您联系，确认免费接入支持。
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>打印 / 导出 PDF 诊断书</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
                >
                  完成并返回网站
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
