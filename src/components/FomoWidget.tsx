import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, X, Sparkles, Flame, ChevronDown, ChevronUp } from 'lucide-react';
import { SOCIAL_NOTIFICATIONS } from '../data/socialProofs';

interface FomoWidgetProps {
  onOpenAuditModal: () => void;
  lang: 'zh' | 'en';
}

export const FomoWidget: React.FC<FomoWidgetProps> = ({ onOpenAuditModal, lang }) => {
  // Anti-refresh countdown (persisted in sessionStorage)
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const saved = sessionStorage.getItem('nexus_fomo_countdown');
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    return 18 * 60 + 45; // 18 mins 45 secs default
  });

  const [isMinimized, setIsMinimized] = useState(false);
  const [toastIndex, setToastIndex] = useState(0);
  const [showToast, setShowToast] = useState(true);

  // Tick timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev > 1 ? prev - 1 : 18 * 60;
        sessionStorage.setItem('nexus_fomo_countdown', next.toString());
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cycle social proof notifications every 7 seconds
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      setShowToast(false);
      setTimeout(() => {
        setToastIndex((prev) => (prev + 1) % SOCIAL_NOTIFICATIONS.length);
        setShowToast(true);
      }, 400);
    }, 7000);
    return () => clearInterval(notificationInterval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentNotification = SOCIAL_NOTIFICATIONS[toastIndex];

  return (
    <>
      {/* Floating Bottom-Left Social Proof Ticker (喜报弹窗模拟) */}
      <div className="fixed bottom-4 left-4 z-30 max-w-sm hidden sm:block pointer-events-none">
        <div
          className={`transition-all duration-300 pointer-events-auto transform ${
            showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="p-3.5 rounded-xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-md flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0 text-xs">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-semibold text-slate-200">{currentNotification.city}客户喜报</span>
                <span className="font-mono">{currentNotification.timeAgo}</span>
              </div>
              <div className="text-slate-300 font-medium mt-0.5 truncate">
                {currentNotification.merchant}
              </div>
              <div className="text-emerald-400 text-[11px] mt-0.5">
                ✦ {currentNotification.result}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom-Right FOMO Countdown Widget (防刷新倒计时 & 剩余名额) */}
      <div className="fixed bottom-4 right-4 z-30 max-w-xs">
        <div className="rounded-xl bg-gradient-to-r from-slate-900/95 to-[#0b101d]/95 border border-amber-500/40 shadow-2xl backdrop-blur-md overflow-hidden">
          {/* Header row */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-amber-950/30 border-b border-amber-900/40 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>本月特惠：仅剩 3 个免费名额</span>
            </div>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
            >
              {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Collapsible Body */}
          {!isMinimized && (
            <div className="p-3.5 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">免费 1v1 独立站 SEO 深度诊断倒计时:</span>
                <span className="font-mono font-bold text-amber-300 tabular-nums text-sm bg-black/60 px-2 py-0.5 rounded border border-amber-500/30">
                  {formatTime(timeLeft)}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                附赠价值 $500 的 AR 试戴 H5 模块源码与 5 国语言信任徽章代码。
              </p>
              <button
                onClick={onOpenAuditModal}
                className="w-full py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all shadow-md shadow-blue-600/30 cursor-pointer text-center"
              >
                立即抢占免费名额
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
