import React, { useState, useEffect } from 'react';
import { 
  X, 
  Terminal, 
  Copy, 
  Check, 
  Sparkles, 
  Play, 
  Globe, 
  ExternalLink,
  Cpu,
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  getSavedGradioEndpoint, 
  saveGradioEndpoint, 
  testGradioConnection,
  runGrowthHackViaGradio,
  GradioExecutionResult 
} from '../services/gradioClient';

interface ColabBackendModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'zh' | 'en';
}

const COLAB_CODE_SNIPPET = `# 1. 安装 Gradio
!pip install gradio --quiet

import gradio as gr
import time

# 2. 定义核心增长打法处理函数
def run_growth_hack(hack_type, input_text):
    print(f"收到前端网站请求，正在执行打法: {hack_type}, 参数: {input_text}")
    time.sleep(2) 
    
    if hack_type == "Pinterest 海报批量渲染":
        result_msg = f"✅ 成功将 '{input_text}' 转化为 1000x1500 黄金画幅海报，MD5 基因已重置！"
        output_url = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600"
    elif hack_type == "SEO 导弹收录推送":
        result_msg = f"✅ 站点 {input_text} 已通过 XML Sitemap 成功推送至 Google & Bing 边缘网关！"
        output_url = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600"
    else:
        result_msg = f"✅ 打法 [{hack_type}] 执行完毕！处理目标: {input_text}"
        output_url = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600"
        
    return result_msg, output_url

# 3. 构建 Gradio API 接口并启动公开公网穿透
with gr.Blocks(title="NexusGrowth Colab Engine") as demo:
    gr.Markdown("# 🚀 NexusGrowth 21大打法 - Colab 算力后端")
    with gr.Row():
        hack_input = gr.Dropdown(
            choices=["Pinterest 海报批量渲染", "SEO 导弹收录推送", "TikTok 音轨去重注入"], 
            label="选择增长打法"
        )
        text_input = gr.Textbox(label="输入目标网址或商品关键词", value="https://get100shop.com")
    btn = gr.Button("立即在云端执行打法", variant="primary")
    with gr.Row():
        status_output = gr.Textbox(label="执行日志结果")
        image_output = gr.Image(label="生成效果预览")
        
    btn.click(fn=run_growth_hack, inputs=[hack_input, text_input], outputs=[status_output, image_output])

# 启动公网链接，并将生成的 https://xxxx.gradio.live 填入前端
demo.launch(share=True, server_name="0.0.0.0", server_port=7860)`;

export const ColabBackendModal: React.FC<ColabBackendModalProps> = ({ isOpen, onClose, lang }) => {
  const [endpointInput, setEndpointInput] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'connected' | 'disconnected'>('idle');
  const [copiedCode, setCopiedCode] = useState(false);

  // Test execution state
  const [testHack, setTestHack] = useState('Pinterest 海报批量渲染');
  const [testInput, setTestInput] = useState('https://get100shop.com');
  const [isExecuting, setIsExecuting] = useState(false);
  const [testResult, setTestResult] = useState<GradioExecutionResult | null>(null);

  useEffect(() => {
    const saved = getSavedGradioEndpoint();
    if (saved) {
      setEndpointInput(saved);
      setConnectionStatus('connected');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveAndTest = async () => {
    if (!endpointInput.trim()) {
      saveGradioEndpoint('');
      setConnectionStatus('idle');
      return;
    }

    setConnectionStatus('testing');
    saveGradioEndpoint(endpointInput);

    const ok = await testGradioConnection(endpointInput);
    if (ok) {
      setConnectionStatus('connected');
    } else {
      setConnectionStatus('disconnected');
    }
  };

  const handleRunTest = async () => {
    setIsExecuting(true);
    setTestResult(null);
    try {
      const res = await runGrowthHackViaGradio(testHack, testInput, endpointInput);
      setTestResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(COLAB_CODE_SNIPPET);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 shrink-0 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-mono">
                NexusGrowth Colab / Gradio Compute Engine
              </div>
              <h3 className="text-lg font-bold text-white">
                Google Colab 云端 Python 算力直连控制台
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

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Step 1: Endpoint Input */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-200 text-xs sm:text-sm flex items-center gap-2">
                <span>Gradio 公网服务链接 (Share URL)</span>
                {connectionStatus === 'connected' && (
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    已直连 Colab 算力
                  </span>
                )}
              </label>
              <a
                href="https://colab.research.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
              >
                <span>打开 Google Colab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <input
                type="text"
                placeholder="例如: https://xxxx.gradio.live 或 http://localhost:7860"
                value={endpointInput}
                onChange={(e) => setEndpointInput(e.target.value)}
                className="w-full sm:flex-1 px-3.5 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSaveAndTest}
                disabled={connectionStatus === 'testing'}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                {connectionStatus === 'testing' ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                <span>保存并测试连通</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              若未输入或 Colab 尚未启动，系统将自动使用前端内置的即时仿真引擎，确保 Demo 体验 100% 顺畅。
            </p>
          </div>

          {/* Step 2: Live Test Runner */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="font-semibold text-slate-200 text-xs sm:text-sm flex items-center justify-between">
              <span>在线发送请求测试打法执行:</span>
              <span className="text-[11px] text-slate-500">API: /api/predict</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">选择打法 (hack_type)</label>
                <select
                  value={testHack}
                  onChange={(e) => setTestHack(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                >
                  <option value="Pinterest 海报批量渲染">Pinterest 海报批量渲染</option>
                  <option value="SEO 导弹收录推送">SEO 导弹收录推送</option>
                  <option value="TikTok 音轨去重注入">TikTok 音轨去重注入</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">输入参数 (input_text)</label>
                <input
                  type="text"
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleRunTest}
              disabled={isExecuting}
              className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 ${isExecuting ? 'animate-spin' : ''}`} />
              <span>{isExecuting ? '正在向云端算力调度执行...' : '发送请求执行打法'}</span>
            </button>

            {testResult && (
              <div className="p-3.5 rounded-lg bg-black/60 border border-slate-800 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">执行结果状态:</span>
                  <span className="font-mono text-emerald-400">
                    耗时 {testResult.executionTimeMs}ms · {testResult.isLiveColab ? '来自真实 Colab 算力' : '本地仿真引擎'}
                  </span>
                </div>
                <div className="p-2.5 rounded bg-slate-900 text-xs text-white font-mono leading-relaxed">
                  {testResult.message}
                </div>
                {testResult.outputImageUrl && (
                  <div className="pt-1">
                    <div className="text-[10px] text-slate-500 mb-1">后端返回的生成预览:</div>
                    <img
                      src={testResult.outputImageUrl}
                      alt="Output Preview"
                      referrerPolicy="no-referrer"
                      className="h-28 rounded-md object-cover border border-slate-800"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Step 3: Google Colab Python Script */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-200 text-xs sm:text-sm flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Colab 端运行脚本 (Python / Gradio)</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? '代码已复制' : '复制 Python 代码'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-lg bg-black/80 border border-slate-800 font-mono text-[11px] text-slate-300 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
              {COLAB_CODE_SNIPPET}
            </div>

            <div className="text-[11px] text-slate-400 space-y-1">
              <p>💡 <span className="text-slate-300 font-medium">使用步骤:</span></p>
              <p>1. 在 Google Colab 新建笔记本，粘贴上方代码并点击【运行】。</p>
              <p>2. 运行完毕后终端会输出公网链接：<code className="text-emerald-400 bg-black/50 px-1 py-0.5 rounded">Running on public URL: https://xxxx.gradio.live</code>。</p>
              <p>3. 将该链接复制粘贴到上方输入框并点击【保存】，本网站的所有打法测试将直通你的 Colab 算力！</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>支持将后端逻辑无缝替换为真实 FFmpeg 去重、Gemini 批量海报或自动化爬虫</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            完成并关闭
          </button>
        </div>
      </div>
    </div>
  );
};
