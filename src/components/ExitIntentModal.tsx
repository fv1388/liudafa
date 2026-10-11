import React, { useState, useEffect } from 'react';
import { X, Download, BookOpen, Check, ArrowRight } from 'lucide-react';

interface ExitIntentModalProps {
  onOpenAuditModal: () => void;
  lang: 'zh' | 'en';
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ onOpenAuditModal, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    // Only bind on desktop
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasTriggered) {
        const dismissed = sessionStorage.getItem('nexus_exit_dismissed');
        if (!dismissed) {
          setIsOpen(true);
          setHasTriggered(true);
          sessionStorage.setItem('nexus_exit_dismissed', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriggered]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>在您离开前 · 独家出海实战福利</span>
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
            免费带走《2026 跨境出海 11 大自动化增长流水线 SOP 完整版》
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            内含：Google Indexing API 秒级收录对接脚本、5国语言 SSL 信任徽章完整代码、Pinterest 2:3 爆款模板参数表及 50 家欧美采购商雷达名单。
          </p>
        </div>

        {/* Feature inclusions */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>11 大打法底层代码配置与 Webhook 调度文档</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>欧美采购商高回复率英文冷开发信 (Cold Email) 模板 5 套</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>AR 虚拟试戴 H5 模块原生 WebGL 源码包</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleDownload}
            className="w-full sm:flex-1 py-3 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>已开始下载 SOP 蓝皮书</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>立即一键免费下载 (PDF)</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              onOpenAuditModal();
            }}
            className="w-full sm:w-auto py-3 px-4 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            直接预约 1v1 诊断
          </button>
        </div>
      </div>
    </div>
  );
};
