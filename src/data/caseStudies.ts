import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-01',
    clientType: '跨境 DTC 出海品牌',
    industry: '智能穿戴与 3C 数码',
    location: '深圳南山 · 销往北美与欧洲',
    headline: '从月烧 $45,000 广告陷阱，到自然流量占比 58% 的高毛利闭环',
    description: '通过打法 01（Google 主动秒级索引）与打法 04/05（Pinterest 2:3 海报矩阵 + TikTok 音轨 MD5 去重），用 10 天时间铺开 400+ 差异化社媒节点，同时上线 5 国语言信任徽章，实现流量成本腰斩。',
    appliedHacks: ['24h 爬虫秒级主动收录', 'Pinterest 2:3 爆款海报矩阵', '5国语言 SSL 信任徽章', 'TikTok 音轨去重流水线'],
    metrics: [
      {
        label: '月自然访客',
        before: '3,200',
        after: '38,900',
        improvement: '+1,115%',
      },
      {
        label: '独立站转化率',
        before: '1.4%',
        after: '3.8%',
        improvement: '+171%',
      },
      {
        label: '月节省广告预算',
        before: '$0',
        after: '$18,500/月',
        improvement: '-41% CPC 成本',
      },
    ],
    testimonial: {
      quote: '以前每卖一单都被 Meta 和 Google 抽走 35% 广告费，毛利被吃得一干二净。接入这套自动化闭环后，不仅 Google 每天秒收录我们的长尾词，而且买家看到母语信任徽章后弃单率断崖式下滑。',
      author: '程伟 (David Cheng)',
      role: '联合创始人 & 独立站运营总监',
    },
  },
  {
    id: 'case-02',
    clientType: '外贸工贸一体制造厂',
    industry: '精密汽配与机械五金',
    location: '浙江宁波 · 传统 OEM 转型出海',
    headline: '摆脱广交会与平台内卷，用 Google Maps 探针直连 56 家欧美汽配连锁',
    description: '通过打法 09（Google Maps 线下采购商主动探针）定向扫描德、美、法三大市场的线下汽修汽配批发网络，筛选出 140 家“没有线上订货系统”的目标采购店，利用个性化冷开发信直接签下大单。',
    appliedHacks: ['Google Maps 海外采购商探针', 'GitHub 顶级域名霸屏', 'Reddit 哨兵监听'],
    metrics: [
      {
        label: '有效大宗 B2B 询盘',
        before: '4 封 / 月',
        after: '47 封 / 月',
        improvement: '+1,075%',
      },
      {
        label: '首季沉淀意向订单',
        before: '$40,000',
        after: '$780,000+',
        improvement: '高毛利直客',
      },
      {
        label: '获客周期',
        before: '90 天 (展会)',
        after: '14 天 (冷邮件直通)',
        improvement: '缩短 84%',
      },
    ],
    testimonial: {
      quote: '外贸平台现在的比价内卷让我们快撑不住了。用这套 Google Maps 探针，我们直接拿到了德国法兰克福汽配连锁店老总的 WhatsApp 和采购邮箱，发出的样品转化率惊人。',
      author: '张建国 (Michael Zhang)',
      role: '海外事业部总经理',
    },
  },
  {
    id: 'case-03',
    clientType: '新锐快时尚出海品牌',
    industry: '美妆彩妆与个人护理',
    location: '广州白云 · 销往东南亚与拉美',
    headline: 'AR 实时试妆 H5 磁铁 + FOMO 退出拦截，将弃单流失率从 68% 压至 29%',
    description: '通过打法 06（AR 实时试色 H5）让手机端买家 1 秒看到口红与眼影上脸效果，结合打法 07（防刷新倒计时与临门一脚挽留），极速引爆冲动购买，退货率减少 44%。',
    appliedHacks: ['AR 实时试妆/试戴 H5', 'FOMO 极限防刷新倒计时', '实体回购二维码体系'],
    metrics: [
      {
        label: '手机端平均停留时长',
        before: '26 秒',
        after: '184 秒',
        improvement: '+607%',
      },
      {
        label: '独立站平均客单价',
        before: '$32.5',
        after: '$58.0',
        improvement: '+78%',
      },
      {
        label: '二次复购率 (扫码返券)',
        before: '6.2%',
        after: '28.4%',
        improvement: '+358%',
      },
    ],
    testimonial: {
      quote: '美妆类目最大的痛点就是买家怕色差不敢买，而且加购后很容易弃单。有了网页端轻量 AR 试妆后，买家就像在实体柜台试色一样，配上倒计时挽留，当天转化率翻了一倍以上。',
      author: '林宛如 (Chloe Lin)',
      role: '品牌首席营销官 (CMO)',
    },
  },
];
