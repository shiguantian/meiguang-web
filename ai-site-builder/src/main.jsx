import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bot,
  CheckCircle2,
  CloudUpload,
  Code2,
  CreditCard,
  Globe2,
  History,
  LayoutDashboard,
  LockKeyhole,
  MessageSquareText,
  MonitorSmartphone,
  Rocket,
  Server,
  Settings2,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";
import "./styles.css";

const initialSite = {
  id: "site-001",
  name: "美光之谷触控科技",
  domain: "www.sonyacf.com",
  industry: "光电制造材料",
  plan: "Pro",
  status: "已发布",
  updatedAt: "2026-09-16 15:42",
  theme: "industrial",
  heroTitle: "ACF 导电胶与触控绑定材料解决方案",
  heroLead:
    "面向触摸屏、显示模组与 FPC/COF 绑定现场，提供 ACF 选型、现货供应、工艺验证与返修配套。",
  accent: "#1f7a8c",
  pages: [
    { name: "首页", path: "/", state: "已发布" },
    { name: "产品中心", path: "/products", state: "已发布" },
    { name: "技术支持", path: "/support", state: "已发布" },
    { name: "现货型号", path: "/inventory", state: "已发布" },
    { name: "关于我们", path: "/about", state: "已发布" },
  ],
  products: ["Sony / dexerials ACF", "Hitachi ACF", "Telephus ACF", "Fuji 感压纸", "ACF 去除液与蓝胶"],
  publishTarget: "深圳云服务器 / nginx",
};

const starterSites = [
  initialSite,
  {
    ...initialSite,
    id: "site-002",
    name: "锐成精密装备",
    domain: "preview.machine.buildpilot.cn",
    industry: "智能装备",
    status: "草稿",
    plan: "Starter",
    heroTitle: "精密设备企业官网",
    heroLead: "适合展示设备能力、案例、参数、售后与询盘转化。",
    updatedAt: "2026-09-15 19:20",
  },
];

const initialMessages = [
  {
    role: "assistant",
    text: "告诉我企业名称、行业、产品、风格和发布目标，我会生成网站结构、页面内容、视觉方向和发布计划。",
  },
  {
    role: "user",
    text: "我要做一个光电材料企业官网，风格专业、可信、高端，发布到自己的 nginx 云服务器。",
  },
  {
    role: "assistant",
    text: "已生成企业官网初版：包含首页、产品中心、技术支持、现货型号、关于我们，并配置 nginx 静态发布流程。",
  },
];

function createStarterMessages(siteName) {
  return [
    {
      role: "assistant",
      text: `已创建「${siteName}」草稿站点。请告诉我企业名称、行业、主营产品、想要的风格、栏目和发布目标，我会生成可预览的网站初版。`,
    },
  ];
}

function createDraftSite(index) {
  return {
    id: `site-${Date.now()}`,
    name: `未命名 AI 站点 ${index}`,
    domain: `draft-${index}.buildpilot.cn`,
    industry: "待配置行业",
    plan: "Starter",
    status: "草稿",
    updatedAt: "刚刚",
    theme: "business",
    heroTitle: "告诉 AI 你的业务，自动生成专业网站",
    heroLead: "输入企业名称、产品服务、目标客户和风格偏好后，平台会生成页面结构、文案、视觉方向和发布计划。",
    accent: "#2563eb",
    pages: [
      { name: "首页", path: "/", state: "草稿" },
      { name: "产品与服务", path: "/products", state: "草稿" },
      { name: "关于我们", path: "/about", state: "草稿" },
      { name: "联系我们", path: "/contact", state: "草稿" },
    ],
    products: ["核心产品", "服务能力", "客户案例", "联系咨询"],
    publishTarget: "未配置云服务",
  };
}

const versionsSeed = [
  { id: "v12", title: "首页文案生产化修正", time: "2026-09-16 15:42", author: "AI + 人工确认", state: "已发布" },
  { id: "v11", title: "产品中心新增分切机分类", time: "2026-09-16 14:18", author: "AI 编辑", state: "可回滚" },
  { id: "v10", title: "重新生成 Hitachi 产品配图", time: "2026-09-16 12:50", author: "AI 视觉", state: "可回滚" },
];

const deploySteps = [
  "生成静态站点产物",
  "压缩并上传到云服务器 releases 目录",
  "健康检查通过后切换 current 软链接",
  "刷新 CDN / nginx 缓存",
];

const quickPrompts = ["首页更高端", "新增产品分类", "替换联系方式", "生成行业案例", "发布到云服务器"];

function applyPromptToSite(site, prompt) {
  const next = { ...site, updatedAt: "刚刚" };
  const lower = prompt.toLowerCase();

  if (prompt.includes("高端") || prompt.includes("专业") || prompt.includes("漂亮")) {
    next.heroTitle = "高可靠 ACF 材料供应与绑定工艺服务平台";
    next.heroLead = "以型号匹配、现货交付、工艺验证和返修配套为核心，帮助制造企业缩短材料确认周期并稳定量产良率。";
    next.accent = "#0f766e";
  }

  if (prompt.includes("产品") || prompt.includes("分类")) {
    next.pages = addPage(next.pages, { name: "解决方案", path: "/solutions", state: "草稿" });
    next.products = Array.from(new Set([...next.products, "第三代 ACF 圆刀分切服务"]));
  }

  if (prompt.includes("案例") || prompt.includes("新闻")) {
    next.pages = addPage(next.pages, { name: "客户案例", path: "/cases", state: "草稿" });
  }

  if (prompt.includes("发布") || prompt.includes("nginx") || lower.includes("cloud")) {
    next.status = "发布中";
  }

  if (prompt.includes("付费") || prompt.includes("套餐")) {
    next.plan = "Business";
  }

  if (prompt.includes("网站") || prompt.includes("建站") || prompt.includes("官网")) {
    next.status = "草稿";
    next.pages = [
      { name: "首页", path: "/", state: "草稿" },
      { name: "产品与服务", path: "/products", state: "草稿" },
      { name: "解决方案", path: "/solutions", state: "草稿" },
      { name: "关于我们", path: "/about", state: "草稿" },
      { name: "联系我们", path: "/contact", state: "草稿" },
    ];
  }

  return next;
}

function addPage(pages, page) {
  return pages.some((item) => item.path === page.path) ? pages : [...pages, page];
}

function App() {
  const [sites, setSites] = useState(starterSites);
  const [activeId, setActiveId] = useState(initialSite.id);
  const [messagesBySite, setMessagesBySite] = useState({
    [initialSite.id]: initialMessages,
    "site-002": createStarterMessages("锐成精密装备"),
  });
  const [draft, setDraft] = useState("");
  const [device, setDevice] = useState("desktop");
  const [tab, setTab] = useState("build");
  const [versionsBySite, setVersionsBySite] = useState({
    [initialSite.id]: versionsSeed,
    "site-002": [{ id: "v1", title: "创建站点草稿", time: "2026-09-15 19:20", author: "AI 建站", state: "草稿" }],
  });
  const [deploying, setDeploying] = useState(false);
  const [generating, setGenerating] = useState(false);
  const messagesEndRef = useRef(null);

  const site = useMemo(() => sites.find((item) => item.id === activeId) ?? sites[0], [activeId, sites]);
  const messages = messagesBySite[site.id] ?? createStarterMessages(site.name);
  const versions = versionsBySite[site.id] ?? [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages.length, site.id, generating]);

  function updateSite(nextSite) {
    setSites((current) => current.map((item) => (item.id === nextSite.id ? nextSite : item)));
  }

  function appendMessage(siteId, message) {
    setMessagesBySite((current) => ({
      ...current,
      [siteId]: [...(current[siteId] ?? []), message],
    }));
  }

  function setSiteMessages(siteId, nextMessages) {
    setMessagesBySite((current) => ({
      ...current,
      [siteId]: nextMessages,
    }));
  }

  function addVersion(siteId, version) {
    setVersionsBySite((current) => ({
      ...current,
      [siteId]: [version, ...(current[siteId] ?? [])],
    }));
  }

  function createNewSite() {
    const nextSite = createDraftSite(sites.length + 1);
    setSites((current) => [nextSite, ...current]);
    setActiveId(nextSite.id);
    setTab("build");
    setDraft("");
    setDeploying(false);
    setGenerating(false);
    setSiteMessages(nextSite.id, createStarterMessages(nextSite.name));
    setVersionsBySite((current) => ({
      ...current,
      [nextSite.id]: [{ id: "v1", title: "创建站点草稿", time: "刚刚", author: "AI 建站", state: "草稿" }],
    }));
  }

  function sendPrompt(prompt = draft) {
    const clean = prompt.trim();
    if (!clean || generating) return;

    setMessagesBySite((current) => ({
      ...current,
      [site.id]: [
        ...(current[site.id] ?? []),
        { role: "user", text: clean },
      ],
    }));
    setDraft("");
    setGenerating(true);

    window.setTimeout(() => {
      const nextSite = applyPromptToSite(site, clean);
      updateSite(nextSite);
      appendMessage(site.id, {
        role: "assistant",
        text: buildAssistantReply(clean, nextSite),
      });
      addVersion(site.id, {
        id: `v${versions.length + 13}`,
        title: clean.length > 18 ? `${clean.slice(0, 18)}...` : clean,
        time: "刚刚",
        author: "AI 编辑",
        state: "草稿",
      });
      setGenerating(false);
    }, 420);
  }

  function handleComposerKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendPrompt();
    }
  }

  function buildAssistantReply(prompt, nextSite) {
    if (prompt.includes("发布") || prompt.includes("nginx")) {
      return `已准备发布任务，目标为 ${nextSite.publishTarget}。发布前会生成新版本、上传到 releases 目录，并保留可回滚版本。`;
    }
    if (prompt.includes("付费") || prompt.includes("套餐")) {
      return "已切换到 Business 能力视图：后续可以接入套餐、额度、发票、团队成员和自动续费。";
    }
    return "已根据你的要求更新站点结构、首页表达和视觉方向。右侧预览已同步刷新，可以继续用自然语言细化。";
  }

  function startPublish() {
    setDeploying(true);
    updateSite({ ...site, status: "发布中", updatedAt: "刚刚" });
    appendMessage(site.id, { role: "assistant", text: "发布任务已启动：正在构建静态站点并准备上传到 nginx 云服务器。" });

    window.setTimeout(() => {
      updateSite({ ...site, status: "已发布", updatedAt: "刚刚" });
      setDeploying(false);
      addVersion(site.id, { id: `v${versions.length + 20}`, title: "云服务器自动发布", time: "刚刚", author: "发布流水线", state: "已发布" });
    }, 1200);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Sparkles size={22} />
          </div>
          <div>
            <strong>BuildPilot</strong>
            <span>AI Site Builder</span>
          </div>
        </div>

        <button className="new-site" onClick={createNewSite}>
          <Wand2 size={18} />
          新建 AI 站点
        </button>

        <div className="side-section">
          <p>站点</p>
          {sites.map((item) => (
            <button
              className={`site-item ${item.id === activeId ? "active" : ""}`}
              key={item.id}
              onClick={() => setActiveId(item.id)}
            >
              <Globe2 size={18} />
              <span>
                <strong>{item.name}</strong>
                <small>{item.domain}</small>
              </span>
            </button>
          ))}
        </div>

        <nav className="main-nav">
          {[
            ["build", "建站工作台", LayoutDashboard],
            ["deploy", "发布中心", CloudUpload],
            ["billing", "套餐与计费", CreditCard],
            ["settings", "云服务配置", Settings2],
          ].map(([key, label, Icon]) => (
            <button className={tab === key ? "active" : ""} key={key} onClick={() => setTab(key)}>
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div>
            <p>{site.industry}</p>
            <h1>{site.name}</h1>
          </div>
          <div className="top-actions">
            <span className={`status ${site.status === "已发布" ? "live" : ""}`}>{site.status}</span>
            <span className="plan">{site.plan}</span>
            <button className="ghost">
              <History size={17} />
              回滚
            </button>
            <button className="primary" onClick={startPublish} disabled={deploying}>
              <Rocket size={18} />
              {deploying ? "发布中" : "发布"}
            </button>
          </div>
        </header>

        {tab === "build" && (
          <section className="builder-grid">
            <section className="chat-panel">
              <div className="panel-head">
                <div>
                  <p>AI Copilot</p>
                  <h2>聊天修改站点</h2>
                </div>
                <Bot size={22} />
              </div>

              <div className="messages">
                {messages.map((message, index) => (
                  <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
                    <span>{message.role === "assistant" ? "AI" : "你"}</span>
                    <p>{message.text}</p>
                  </div>
                ))}
                {generating && (
                  <div className="message assistant thinking">
                    <span>AI</span>
                    <p>正在分析需求并更新站点...</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="quick-prompts">
                {quickPrompts.map((prompt) => (
                  <button type="button" key={prompt} onClick={() => sendPrompt(prompt)}>
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="composer">
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={handleComposerKeyDown}
                  placeholder="例如：把首页做得更高端，新增产品分类，并发布到 nginx 云服务器"
                />
                <button type="button" onClick={() => sendPrompt()} disabled={!draft.trim() || generating}>
                  <MessageSquareText size={18} />
                  {generating ? "生成中" : "发送"}
                </button>
              </div>
            </section>

            <section className="preview-panel">
              <div className="preview-toolbar">
                <div>
                  <p>Live Preview</p>
                  <strong>{site.domain}</strong>
                </div>
                <div className="device-toggle">
                  <button className={device === "desktop" ? "active" : ""} onClick={() => setDevice("desktop")}>
                    <MonitorSmartphone size={17} />
                    桌面
                  </button>
                  <button className={device === "mobile" ? "active" : ""} onClick={() => setDevice("mobile")}>
                    手机
                  </button>
                </div>
              </div>
              <SitePreview site={site} device={device} />
            </section>

            <section className="inspector">
              <Block title="页面结构" icon={Code2}>
                <div className="page-list">
                  {site.pages.map((page) => (
                    <div key={page.path}>
                      <span>{page.name}</span>
                      <small>{page.state}</small>
                    </div>
                  ))}
                </div>
              </Block>

              <Block title="版本记录" icon={History}>
                <div className="version-list">
                  {versions.slice(0, 4).map((version) => (
                    <div key={version.id}>
                      <strong>{version.title}</strong>
                      <span>{version.time} / {version.state}</span>
                    </div>
                  ))}
                </div>
              </Block>
            </section>
          </section>
        )}

        {tab === "deploy" && (
          <DeployCenter site={site} deploying={deploying} startPublish={startPublish} />
        )}

        {tab === "billing" && <BillingPanel />}

        {tab === "settings" && <CloudSettings />}
      </main>
    </div>
  );
}

function SitePreview({ site, device }) {
  return (
    <div className={`site-preview ${device}`} style={{ "--accent": site.accent }}>
      <div className="preview-nav">
        <strong>{site.name}</strong>
        <span>产品</span>
        <span>技术</span>
        <span>案例</span>
        <span>联系</span>
      </div>
      <section className="preview-hero">
        <div>
          <span>{site.industry}</span>
          <h2>{site.heroTitle}</h2>
          <p>{site.heroLead}</p>
          <div className="preview-actions">
            <button>查询现货</button>
            <button>获取方案</button>
          </div>
        </div>
        <div className="visual">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
      <section className="preview-products">
        {site.products.slice(0, 4).map((product) => (
          <article key={product}>
            <span></span>
            <h3>{product}</h3>
            <p>型号匹配、交付确认、工艺参数与返修建议。</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function Block({ title, icon: Icon, children }) {
  return (
    <div className="block">
      <div className="block-title">
        <Icon size={18} />
        <strong>{title}</strong>
      </div>
      {children}
    </div>
  );
}

function DeployCenter({ site, deploying, startPublish }) {
  return (
    <section className="wide-panel">
      <div className="section-title">
        <p>Deployment Pipeline</p>
        <h2>自动发布到客户自己的云服务</h2>
      </div>
      <div className="deploy-grid">
        <div className="deploy-card main">
          <Server size={24} />
          <h3>{site.publishTarget}</h3>
          <p>支持通过 SSH key 发布到 nginx 静态目录，采用 releases + current 软链接结构，保留历史版本并支持失败回滚。</p>
          <button className="primary" onClick={startPublish} disabled={deploying}>
            <Rocket size={18} />
            {deploying ? "正在发布" : "立即发布"}
          </button>
        </div>
        <div className="deploy-card">
          <ShieldCheck size={24} />
          <h3>发布安全</h3>
          <p>部署密钥加密保存，发布任务隔离执行，敏感配置不进入前端构建产物。</p>
        </div>
        <div className="deploy-card">
          <LockKeyhole size={24} />
          <h3>版本回滚</h3>
          <p>每次 AI 修改都会生成站点版本，发布失败保持线上版本不变。</p>
        </div>
      </div>
      <div className="pipeline">
        {deploySteps.map((step, index) => (
          <div className={deploying && index < 2 ? "running" : ""} key={step}>
            <CheckCircle2 size={18} />
            <span>{step}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function BillingPanel() {
  const plans = [
    ["Starter", "¥99/月", "适合单站点、小型企业官网、基础 AI 修改次数"],
    ["Pro", "¥299/月", "支持多站点、自动发布、版本回滚、图片生成"],
    ["Business", "¥999/月", "团队协作、私有云部署、白标、发票与 SLA"],
  ];

  return (
    <section className="wide-panel">
      <div className="section-title">
        <p>Billing Ready</p>
        <h2>为后续付费功能预留套餐体系</h2>
      </div>
      <div className="pricing-grid">
        {plans.map(([name, price, desc]) => (
          <article className={name === "Pro" ? "featured" : ""} key={name}>
            <h3>{name}</h3>
            <strong>{price}</strong>
            <p>{desc}</p>
            <button>{name === "Pro" ? "当前推荐" : "选择套餐"}</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function CloudSettings() {
  return (
    <section className="wide-panel">
      <div className="section-title">
        <p>Cloud Connection</p>
        <h2>客户云服务配置</h2>
      </div>
      <div className="settings-grid">
        {[
          ["服务器 IP", "47.***.***.21"],
          ["部署目录", "/var/www/customer-site"],
          ["nginx 站点", "customer-site.conf"],
          ["SSH 用户", "deploy"],
        ].map(([label, value]) => (
          <label key={label}>
            <span>{label}</span>
            <input value={value} readOnly />
          </label>
        ))}
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
