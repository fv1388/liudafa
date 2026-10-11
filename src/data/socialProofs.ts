import { SocialProofNotification } from '../types';

export const SOCIAL_NOTIFICATIONS: SocialProofNotification[] = [
  {
    id: 'sp-1',
    timeAgo: '1 分钟前',
    merchant: '深圳某 3C 智能穿戴品牌',
    city: '深圳',
    action: '完成 200 个核心关键词 Google 秒级收录',
    result: 'Google 爬虫耗时仅 18 分钟',
  },
  {
    id: 'sp-2',
    timeAgo: '4 分钟前',
    merchant: '宁波工贸一体汽配出口商',
    city: '宁波',
    action: '通过 Google Maps 探针批量捕获德国汽修连锁',
    result: '捕获 42 家高意向 B2B 批发商',
  },
  {
    id: 'sp-3',
    timeAgo: '9 分钟前',
    merchant: '广州快时尚女装独立站',
    city: '广州',
    action: '批量渲染并发布 60 张 Pinterest 2:3 海报',
    result: '首小时获得 1,420 次外链保存',
  },
  {
    id: 'sp-4',
    timeAgo: '14 分钟前',
    merchant: '苏州智能家居出口工厂',
    city: '苏州',
    action: '上线 5 国语言 SSL 银行级信任徽章',
    result: '欧洲结账流失率骤降 39%',
  },
  {
    id: 'sp-5',
    timeAgo: '18 分钟前',
    merchant: '杭州户外运动出海独立站',
    city: '杭州',
    action: '部署 TikTok 音视频 MD5 去重流水线',
    result: '新账号首批 8 条样片全部过审突破万播',
  },
];

export interface OutreachStrategyItem {
  number: string;
  channel: string;
  targetAudience: string;
  stepName: string;
  actionDetails: string;
  templateLabel: string;
  templateContent: string;
}

export const OUTREACH_STRATEGIES: OutreachStrategyItem[] = [
  {
    number: '01',
    channel: '冷邮件 / LinkedIn 深度定向开发 (Cold Outreach)',
    targetAudience: '海外本土批发商、零售门店、无线上独立站的传统采购商',
    stepName: '利用 Google Maps 探针排查无站或体验差的商家，附带测算器直击痛点',
    actionDetails: '扫描目标国家城市后，过滤出“没有独立站”或“网站非响应式、评分低”的商户，通过个性化邮件指出其线上流失的潜在销售额，并附带本站的“独立站成本与利润计算器”链接。',
    templateLabel: '高回复率 B2B 英文冷邮件模板 (点击直接复制)',
    templateContent: `Subject: Quick question regarding [Company Name]'s digital ordering pipeline / potential growth

Hi [First Name],

I came across [Company Name] while reviewing top specialty retailers in [City/Region]. Your offline reputation and product catalog look fantastic.

However, I noticed that when potential European/US buyers search for your catalog online, they currently have no self-service ordering or digital quote portal, which likely means you're leaking 20-30% of high-intent wholesale inquiries to competitors every month.

We recently helped an industrial supplier in your sector automate their B2B inquiry capture and cut customer acquisition costs by 41%. 

I ran a quick projection for businesses of your scale using our interactive ROI & Cost Calculator here: [Your Landing Page URL]

Would you be open to a 7-minute visual breakdown of how to capture these lost accounts this quarter? No pitch, just pure data.

Best regards,
[Your Name]
Director of Growth, NexusGrowth`,
  },
  {
    number: '02',
    channel: '跨境垂类社群高价值干货引流 (Value Drops)',
    targetAudience: 'Reddit (r/dropshipping, r/ecommerce), 微信跨境电商群, Facebook 卖家小组',
    stepName: '分享《2026 独立站流量闭环全景架构图》，引导体验 AR 试戴与 SEO 秒级收录 Demo',
    actionDetails: '发布实战干货贴拆解“为什么烧 Meta 广告必亏”，公开 11 大自动化打法的底层逻辑图。在帖子文末不放硬广，而是放置“免费开放的 5 国信任徽章生成器 & 爬虫收录沙盒体验”。',
    templateLabel: 'Reddit / 社群高点赞实战干货帖架构 (点击直接复制)',
    templateContent: `Title: We stopped burning $30k/mo on Meta ads: How we built a 24h automated indexing & 2:3 Pinterest viral loop (Case Breakdown + Free Tools)

Hey everyone,

If you run a Shopify/independent DTC store in 2026, you already know the brutal truth: Meta and Google CPMs are at an all-time high, and standard product pages convert at an abysmal 1.2%.

Over the past 6 months, our team tested 11 non-traditional growth hacks across 14 cross-border stores:
1. Google Indexing API push instead of waiting 60 days for crawlers
2. Automated 2:3 ratio Pinterest batch graphics (Pinterest search has 3x longer intent)
3. Zero-app AR 3D preview widgets to destroy return rates
4. Native 5-language SSL bank-grade badges that slashed checkout abandonment by 41%

I built a completely interactive live demo where you can test the 5-language trust badge generator and calculate your exact store cost-savings for free:
👉 [Your Landing Page URL]

Drop your niche below and I'll analyze your current site's indexing health for free in the comments!`,
  },
  {
    number: '03',
    channel: '1 分钟短视频实操对比爆破 (Short-form Video)',
    targetAudience: 'TikTok, YouTube Shorts, 小红书, 视频号出海卖家群体',
    stepName: '录制“5 秒批量生成 10 张 Pinterest 2:3 高清爆款海报”的震撼实操对比',
    actionDetails: '画面分屏展示：左边是传统美工吭哧吭哧切图 2 小时才做出一张海报；右边是你的系统输入一个品类，5 秒瞬间渲染出 10 张带有欧美留白排版与信任标的高清海报。并在 Bio (个人简介) 挂上专属测算器与工具箱链接。',
    templateLabel: '爆款实操短视频脚本分镜 (点击直接复制)',
    templateContent: `【0-3秒 痛点黄金钩子】:
“还在花 $2000 招美工做图、每天焦头烂额做社媒矩阵？看好了，这是 2026 年聪明独立站卖家玩的内容流水线……”

【4-15秒 震撼实操演示】:
[录屏画面] 打开 NexusGrowth 的 Pinterest 2:3 渲染工作台，输入产品词“Titanium EDC Pen”，点击生成。
音效：叮！5秒内 3 张符合欧美审美黄金分割比例、自带折扣勋章的高转化海报批量生成完毕！

【16-35秒 痛点对比】:
“传统方式：做图 3 小时，发一条被 TikTok 查重限流；
我们的系统：自带音频 MD5 散列去重与多语言银行级信任标，让过审率直冲 99.4%。”

【36-50秒 强力 CTA】:
“把这个工具的在线体验版放在主页链接了，点击即可免费使用 5 国语言信任徽章生成器，并测算你的站点能省多少广告费！”`,
  },
];
