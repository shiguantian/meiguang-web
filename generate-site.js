const fs = require("fs");
const path = require("path");

const ROOT = __dirname;

const nav = [
  { label: "首页", href: "index.html" },
  {
    label: "产品中心",
    href: "products.html",
    children: [
      { label: "Sony索尼（迪睿合dexerials）ACF导电胶", href: "sony.html" },
      { label: "Hitachi日立ACF导电胶", href: "hitachi.html" },
      { label: "Telephus特来福思ACF导电胶", href: "telephus.html" },
      { label: "Fuji富士感压纸/硅胶皮", href: "fuli.html" },
      { label: "导电胶ACF去除液/IC清洗剂/蓝胶", href: "acf-cleaner.html" },
      { label: "第三代ACF导电胶圆刀技术分切机", href: "acf-slitting.html" },
    ],
  },
  {
    label: "技术支持",
    href: "acf-method.html",
    children: [
      { label: "ACF 使用方法", href: "acf-method.html" },
      { label: "什么是 ACF", href: "acf.html" },
    ],
  },
  { label: "现货型号", href: "sales.html" },
  { label: "关于我们", href: "about.html" },
];

const contact = {
  phone: "137 9829 6474",
  phoneCompact: "13798296474",
  tel: "13798296474",
  person: "黄工",
  address: "广东省深圳市光明区玉塘街道田寮社区融汇路与同观路交汇瑞丰光电大厦1栋10楼1015",
  icp: "粤ICP备19051037号",
};

const productCards = [
  {
    title: "Sony索尼（迪睿合dexerials）ACF导电胶",
    href: "sony.html",
    tag: "Fine pitch / COG / FOG",
    summary: "覆盖 CP、PAF 等系列，适用于中小型 FPD、触摸面板、相机模块、COF/OLED 绑定等精密连接。",
  },
  {
    title: "Hitachi日立ACF导电胶",
    href: "hitachi.html",
    tag: "TP / 模组 / 量产验证",
    summary: "常用 AC、MF 系列现货与型号匹配，适用于触摸屏 TP、GF/GFF、模组和多类绑定搭接。",
  },
  {
    title: "Telephus特来福思ACF导电胶",
    href: "telephus.html",
    tag: "Korea ACF / OLB",
    summary: "提供 TOU、TSC、TCH、TCP、TGP 等系列，适用于细间距互连、COF、FPC 和塑料基材。",
  },
  {
    title: "Fuji富士感压纸/硅胶皮",
    href: "fuli.html",
    tag: "Pressure / Cushion",
    summary: "用于压接压力分布验证、热压缓冲、导热隔离和防静电保护，辅助产线快速排查工艺问题。",
  },
  {
    title: "导电胶ACF去除液/IC清洗剂/蓝胶",
    href: "acf-cleaner.html",
    tag: "Rework / Clean",
    summary: "面向 TP、模组返工和 IC 固化 ACF 清洁，配套日立蓝胶等返修耗材。",
  },
  {
    title: "第三代ACF导电胶圆刀技术分切机",
    href: "acf-slitting.html",
    tag: "Slitting / 0.4mm",
    summary: "精准分切索尼、日立、特来福思等品牌 ACF，极限精度可达 0.4mm*100m，快速稳定、良率高。",
  },
];

const serviceCategories = [
  {
    id: "acf",
    title: "ACF 导电胶主材",
    lead: "围绕显示屏、触摸屏、FPC、COF、COG、FOG、FOB 等绑定结构，提供 Sony、Hitachi、Telephus 等品牌 ACF 型号匹配。",
    links: [
      ["Sony索尼（迪睿合dexerials）ACF", "sony.html", "CP / PAF 系列，适合细间距、COG、FOG、FOB、触摸面板与模组 IC 绑定。"],
      ["Hitachi 日立 ACF", "hitachi.html", "AC / MF 系列，覆盖 TP、GF/GFF、模组和多类触控显示结构。"],
      ["Telephus 特来福思 ACF", "telephus.html", "TOU / TSC / TCH / TCP / TGP 系列，适用于细间距互连、COF、FPC。"],
    ],
  },
  {
    id: "process-materials",
    title: "制程辅助材料",
    lead: "用于压接验证、热压缓冲、导热隔离、防静电保护和工艺窗口调试，帮助现场更快发现压力、温度和对位问题。",
    links: [
      ["Fuji 富士感压纸", "fuli.html", "可视化压力分布，辅助设备调机、压头均匀性检查和异常定位。"],
      ["热压硅胶皮", "fuli.html", "作为 FOG 等热压绑定工艺中的缓冲、导热垫片，提升压力一致性。"],
    ],
  },
  {
    id: "rework",
    title: "返修清洁材料",
    lead: "服务 TP、模组和 IC 返修流程，配合 ACF 去除液、IC 清洗剂、蓝胶等材料提升残胶处理效率。",
    links: [
      ["ACF 去除液", "acf-cleaner.html", "适合触摸屏产品返工，使用时需做好防护和通风。"],
      ["IC 清洗剂 / 蓝胶", "acf-cleaner.html", "用于 IC 固化 ACF 清洁和返修制程耗材配套。"],
    ],
  },
  {
    id: "slitting",
    title: "第三代 ACF 导电胶圆刀技术分切机",
    lead: "用于索尼（迪睿合）、日立、特来福思等各大品牌 ACF 导电胶精准分切，适合小宽幅、高稳定性和快速交付的材料加工需求。",
    links: [
      ["极限精度", "acf-slitting.html", "可做到 0.4mm*100m、0.5mm*100m、0.6mm*100m 等精密规格。"],
      ["效率与良率", "acf-slitting.html", "快速稳定分切，良率 100%，效率是常规机的数倍。"],
      ["设备能力", "acf-slitting.html", "设备技术领先，远超国产其他分切设备商。"],
    ],
  },
];

const pages = {
  "index.html": {
    title: "深圳市美光之谷触控科技有限公司 | ACF 导电胶与触控绑定材料",
    description: "深圳市美光之谷触控科技有限公司提供 Sony、Hitachi、Telephus ACF 导电胶、富士感压纸、硅胶皮、ACF 去除液与触控屏绑定材料技术支持。",
    body: homePage,
  },
  "about.html": {
    title: "关于我们 | 深圳市美光之谷触控科技有限公司",
    description: "了解美光之谷在平板显示、触摸屏、摄像头模组与电子辅助材料领域的服务能力。",
    body: () => pageShell({
      eyebrow: "About Meiguang",
      title: "专注光电与触控制造辅助材料",
      lead: "深圳市美光之谷触控科技有限公司成立于 2015 年 5 月，长期服务平板显示、触摸屏、摄像头模组、医疗设备、光伏与节能产品相关制造企业。",
      image: "assets/product-acf.png",
      content: `
        <section class="content-block">
          <h2>公司定位</h2>
          <p>公司产品以销售日本、韩国进口 ACF 导电胶、ACF 胶去除液、热压硅胶带、特氟龙、感压纸、电子专用密封胶、绝缘薄膜、设备配件等为主，为客户提供从原材料采购、型号确认到现场应用的配套支持。</p>
          <p>在光电产品和消费类电子产品快速发展的背景下，公司建立了覆盖珠三角、长三角、环渤海等地区的销售与服务网络，强调快速响应、稳定品质与实用工艺建议。</p>
        </section>
        <section class="feature-row">
          ${feature("质量体系", "从采购到品质确认遵循规范流程，关注 ISO9001、ISO14001 与 RoHS 环保要求。")}
          ${feature("技术响应", "围绕绑定、压接、返修、清洁等生产问题，提供材料选型和异常排查建议。")}
          ${feature("供应效率", "常用型号现货匹配，帮助客户缩短打样、验证和补料周期。")}
        </section>
        ${contactBlock()}`,
    }),
  },
  "products.html": {
    title: "产品与服务 | ACF 导电胶、感压纸、清洗剂、分切设备",
    description: "美光之谷提供 Sony索尼（迪睿合dexerials）、Hitachi、Telephus ACF 导电胶，Fuji 感压纸、硅胶皮、ACF 去除液、IC 清洗剂和第三代 ACF 圆刀技术分切机。",
    body: () => pageShell({
      eyebrow: "Product Portfolio",
      title: "产品与服务",
      lead: "围绕 ACF 导电胶、制程辅助材料、返修清洁材料与精密分切设备，提供 6 个核心产品服务入口。",
      image: "assets/product-acf.png",
      content: `
        <section class="section product-showcase product-catalog" id="products">
          <div class="section-head">
            <p class="eyebrow">Catalog</p>
            <h2>六大产品服务</h2>
          </div>
          <div class="product-list">${productCards.map(productCard).join("")}</div>
        </section>`,
    }),
  },
  "sony.html": {
    title: "Sony索尼（迪睿合dexerials）ACF导电胶 | 产品型号与应用",
    description: "Sony索尼（迪睿合dexerials）ACF导电胶 CP、PAF 等系列，适用于 COG、FOG、FOB、触摸面板、COF/OLED 与相机模块。",
    body: () => productPage({
      brand: "Sony索尼（迪睿合dexerials）ACF导电胶",
      eyebrow: "Sony ACF",
      lead: "适用于中小型 FPD、触摸面板、相机模块、COF/OLED 绑定与细间距连接。",
      image: "assets/product-sony-dexerials.png",
      highlights: ["细间距连接", "端子间绝缘", "COG / FOG / FOB", "触控与显示模组"],
      groups: [
        ["Chip On Glass", "CP540 系列、CP692 系列、CP345 系列。适用于驱动 IC 直接邦定在平板显示面板玻璃基板上。"],
        ["Film On Glass", "PAF700 系列、CP133 系列；适用于中小型 FPD 与薄膜材料连接，包含粒子排列型 ACF。"],
        ["大型 FPD FOG / FOB", "CP10000 系列适用于大型 FPD 玻璃基板与 COF 电极连接；CP20000 系列适用于 COF 与输入基板连接。"],
        ["车载与板膜连接", "CP881AM 系列主要用于中型 FOB；CP850CG-35AJ、CP801AM-35AC 适用于刚性基板与薄膜材料连接。"],
        ["触摸面板与 COF 工艺", "CP806AM-16AC、CP923CM-25AC、CP923AM-18AC、CP920AM、CP920CM、CP9731SB、CP712T、CP1220IS、PAF300C、PAF300B、PAF420B、PAF412、PAF705D、PAF303B。"],
        ["模组 IC 与其他型号", "CP6920F、CP6920F3、CP34531、CP34532、CP34533、CP13941、CP1733B、CP525SA、CP518SC、PAF1000、CP35231-20YA、CP718SA、CP908V3、CP50131-14YA、CP37131-20YB。"],
      ],
    }),
  },
  "hitachi.html": {
    title: "Hitachi 日立 ACF 导电胶 | 产品型号与应用",
    description: "Hitachi 日立 ACF 导电胶 AC、MF 系列，适用于触摸屏 TP、GF/GFF、模组与绑定搭接。",
    body: () => productPage({
      brand: "Hitachi 日立 ACF 导电胶",
      eyebrow: "Hitachi ACF",
      lead: "常用 AC、MF 系列现货与型号匹配，覆盖 TP、GF/GFF、模组与多类显示绑定场景。",
      image: "assets/product-hitachi-acf.png",
      highlights: ["TP 结构", "GF / GFF", "模组绑定", "常用型号现货"],
      groups: [
        ["触摸屏 TP：GG / PG / OGS", "AC7106U-25、AC7206U-18、AC7813KM-25、AC7813YM-25、AC3818J-18。"],
        ["TP：GF / GFF", "MF331、MF332、MF334、MF347、AC3514。"],
        ["模组应用", "AC832L、AC823CY-20、AC8955YW、AC805A、AC4255CU-16、AC868GE、AC8412KZ-18、AC835A、AC860A、AC841A、AC827A-16。"],
        ["其他型号", "AC11100Z、AC11400、AC11800、AC4325、AC2056R、AC9865AR、AC9855RM-40、AC17338BL-10、AC4255CU、AC17358M-10。"],
      ],
    }),
  },
  "telephus.html": {
    title: "Telephus 特来福思 ACF 导电胶 | 产品型号与应用",
    description: "Telephus 特来福思 ACF 导电胶，适用于细间距互连、COF、FPC、塑料基材与 OLB 绑定。",
    body: () => productPage({
      brand: "Telephus 特来福思 ACF 导电胶",
      eyebrow: "Telephus ACF",
      lead: "韩国 ACF 材料，适用于细间距互连、COF、FPC、塑料基材和较短粘结时间的 OLB 场景。",
      image: "assets/product-telephus-acf.png",
      highlights: ["韩国 ACF", "细间距互连", "COF / FPC", "高粘附可靠性"],
      groups: [
        ["主型号", "TOU3010CP-25、TCH8020MP-25、TOU5000ZY1-25、TOU4000AP、TCP7610-25、TSC3050BP、TCH8010MP-25、TSB21001F-35、TGP5552UB-35、TCP7050V、TCP7010V、TGP20520AG、EMA8888ECD-37、TOU2051SA-25。"],
        ["2 / 3 系列", "TSB21001F-35、TGP20520AG、TOU2050、TSB20522F、TGP20500、TSC22000、TFA22000、TSB2000、TOU3010CP-25、TSC3050BP、TSC3000、TOU3000。"],
        ["4 / 5 / 7 / 8 系列", "TSC4330AY-18B、TOU5000ZY1-25、TGP5552UB-35、TSC5300、TOU500、TGP5000、TCM5000、TSC5340、TSC5330、TCP7050V、TCP7010V、EMA7870、TCF7040、TCH8020MP-25、TCH8010MP-25、TOU8000、EMA8888ECD-37。"],
        ["材料特点", "适用于 TFT-LCD 细间距、彩色 STN、EL、COF 和 FPC；具有高粘附性、可靠接触电阻、较好的耐腐蚀性，可用于普通溶剂修复场景。"],
      ],
    }),
  },
  "fuli.html": {
    title: "Fuji 富士感压纸 / 热压硅胶皮 | 制程辅助材料",
    description: "Fuji 富士 Prescale 感压纸、热压硅胶皮，用于压力分布验证、热压缓冲、导热隔离和防静电保护。",
    body: () => productPage({
      brand: "Fuji 富士感压纸 / 热压硅胶皮",
      eyebrow: "Process Materials",
      lead: "用于热压绑定过程中的压力验证、温度缓冲、导热隔离与防静电保护。",
      image: "assets/legacy/感压纸.jpg",
      highlights: ["压力分布可视化", "热压缓冲", "导热隔离", "防静电保护"],
      groups: [
        ["富士 Prescale 感压纸", "相比仅凭试产结果评价压力，Prescale 胶片可更直观地检查压力分布，帮助快速调整机械设置。"],
        ["产品特性", "提升质量、缩短调机时间；出现质量缺陷时，可通过压力与压力分布检查机械状态，辅助定位问题原因。"],
        ["常见规格", "超高压 HHS 270*12 单片型；高压 HS 270*12 单片型；中压 MS 270*12 单片型；低压 LW 270*12 双片型；超低压 LLW 270*6 双片型；特超低压 LLLW 270*5 双片型；微压 4LW 310*3 双片型。"],
        ["操作环境", "推荐温度 20℃-35℃，推荐湿度 35%-80%RH；精度通常为 ±10% 或更小，具体以产品类型和使用条件为准。"],
        ["热压硅胶皮", "以特殊硅胶为基材并加入高导热材料制成，表面光滑、厚度均匀，适合作为 FOG 等热压绑定工艺中的缓冲、导热垫片。"],
        ["用途", "适用于显示屏热压邦定、绝缘半导体热传导、电热调节器和温度传感器，具备传热、耐热、抗静电和压力一致性优势。"],
      ],
    }),
  },
  "acf-cleaner.html": {
    title: "导电胶ACF去除液/IC清洗剂/蓝胶 | 返修清洁材料",
    description: "导电胶 ACF 去除液、IC 清洗剂、日立蓝胶 TF4200EB-75，用于 TP、模组返工、IC 固化 ACF 清洁和返修耗材配套。",
    body: () => productPage({
      brand: "导电胶ACF去除液/IC清洗剂/蓝胶",
      eyebrow: "Rework Materials",
      lead: "用于 TP 产品返工、模组 IC 固化 ACF 清洁、残胶处理和蓝胶制程耗材配套，适合绑定异常后的返修清洁场景。",
      image: "assets/product-cleaner-blueglue.png",
      highlights: ["ACF 残胶去除", "IC 清洗", "TP 返工", "蓝胶配套"],
      groups: [
        ["ACF 去除液", "适合 TP 触摸屏产品返工，用于处理绑定后残留 ACF 胶和局部返修清洁。材料具有一定腐蚀性，操作时需要穿戴手套等防护用具，避免与皮肤和眼睛接触。"],
        ["应急与防护", "如皮肤不小心接触，请用清水清洗；如进入眼睛应立即用水清洗并到医院处理。夏天打开盖子时需慢慢开启，避免内部气体突出现象。"],
        ["使用与保管", "使用后应密封，并保管在黑暗阴凉处；使用场所应保持局部换气。药剂上不含有害物质，但含 BOD、SS、PH 等指标，废液不要直接向水排放。"],
        ["IC 清洗剂", "模组厂用于去除 IC 上沾粘的固化 ACF，需要在专门制定的仪器内使用，同样具有一定腐蚀性，应按照现场安全规范操作。"],
        ["蓝胶配套", "可提供日立 Hitachi 蓝胶 TF4200EB-75 等材料咨询，用于相关制程保护、辅助固定或返修配套场景。"],
      ],
      extra: `
        <section class="gallery product-gallery">
          ${imageFigure("assets/legacy/IC清洗剂.jpg", "IC 清洗剂")}
          ${imageFigure("assets/legacy/蓝胶.jpg", "日立 Hitachi 蓝胶 TF4200EB-75")}
        </section>`,
    }),
  },
  "acf-slitting.html": {
    title: "第三代 ACF 导电胶圆刀技术分切机 | 精密分切服务",
    description: "第三代 ACF 导电胶圆刀技术分切机，精准分切索尼（迪睿合）、日立、特来福思等品牌 ACF 导电胶，极限精度可做到 0.4mm*100m、0.5mm*100m、0.6mm*100m。",
    body: () => productPage({
      brand: "第三代 ACF 导电胶圆刀技术分切机",
      eyebrow: "ACF Slitting",
      lead: "精准分切索尼（迪睿合）、日立、特来福思等各大品牌 ACF 导电胶，面向小宽幅、高稳定性和快速交付场景。",
      image: "assets/product-slitting-machine.png",
      highlights: ["0.4mm*100m", "0.5mm*100m", "0.6mm*100m", "良率 100%"],
      groups: [
        ["精准分切能力", "可对索尼（迪睿合）、日立、特来福思等各大品牌 ACF 导电胶进行精准分切，极限精度可以做到 0.4mm*100m、0.5mm*100m、0.6mm*100m。"],
        ["快速稳定", "设备面向稳定连续分切设计，适合常用型号快速加工和交付，减少常规分切方式带来的波动。"],
        ["效率与良率", "快速稳定分切，良率 100%，效率是常规机的数倍，适合对交期和一致性要求较高的客户。"],
        ["技术优势", "设备技术遥遥领先，远超国产其他分切设备商，可作为 ACF 现货供应和定制宽幅服务的重要配套能力。"],
      ],
    }),
  },
  "acf-method.html": {
    title: "ACF 导电胶的使用方法 | 绑定工艺参考",
    description: "ACF 导电胶贴附、预压、本压、检测与返修的工艺参考，覆盖作业流程、参数控制和运输保管不良案例。",
    body: () => pageShell({
      eyebrow: "ACF Process",
      title: "ACF 导电胶的使用方法",
      lead: "从冷藏回温、裁切预贴，到预压、本压、检测和返修，ACF 使用需要同时控制温度、压力、时间、对位和材料状态。",
      image: "assets/acf-process.png",
      content: `
        <section class="method-intro">
          <div>
            <p class="eyebrow">Before bonding</p>
            <h2>使用前先确认 5 个关键条件</h2>
          </div>
          <div class="check-list">
            <span>型号与应用结构匹配</span>
            <span>胶宽、卷长、批次、有效期确认</span>
            <span>冷藏材料充分回温，避免冷凝</span>
            <span>绑定设备温度、压力、时间可控</span>
            <span>压头、硅胶皮、治具和电极表面清洁</span>
          </div>
        </section>
        <section class="process-grid">
          ${step("01", "材料回温与裁切", "按材料储存要求回温，确认胶宽、卷长、批次和有效期，避免冷凝水影响贴附。")}
          ${step("02", "预贴定位", "将 ACF 按对位基准贴附在玻璃、FPC 或目标电极区域，确保平整无褶皱。")}
          ${step("03", "预压", "先进行临时贴附和初步定位，常见参考范围为 60℃-100℃、2s-10s；实际以规格书和设备条件为准。")}
          ${step("04", "本压", "搭载部品后完成最终压接和固化，常见参考范围为约 150℃-200℃、10s-20s；需重点检查压痕、溢胶、导通与短路风险。")}
          ${step("05", "检测", "完成外观、对位、导通电阻、绝缘和可靠性检查。导通异常通常需要回看压力分布、温度曲线、贴附清洁度和材料有效期。")}
          ${step("06", "返修清洁", "异常返修时配合 ACF 去除液、IC 清洗剂、蓝胶等材料处理残胶，并做好防护、通风和废液管理。")}
        </section>
        <section class="method-visual">
          <img src="assets/acf-process.png" alt="ACF 导电胶绑定工艺示意">
          <div>
            <h2>工艺判断重点</h2>
            <p>ACF 不是简单贴胶，核心是让导电粒子在 Z 轴方向形成稳定接触，同时保持 XY 平面绝缘。生产现场应重点关注粒子压缩状态、压痕均匀性、热压头状态、硅胶皮老化、FPC 与玻璃电极清洁度。</p>
          </div>
        </section>
        <section class="gallery">
          ${imageFigure("assets/legacy/ACF使用方法1.jpg", "ACF 贴附流程")}
          ${imageFigure("assets/legacy/ACF使用方法2.jpg", "ACF 压接流程")}
          ${imageFigure("assets/legacy/ACF3.jpg", "ACF 检查流程")}
          <figure class="wide-figure"><img src="assets/acf-defects-transport.svg" alt="各种作业不良的详细说明"><figcaption>各种作业不良的详细说明</figcaption></figure>
        </section>`,
    }),
  },
  "sales.html": {
    title: "现货发售 | ACF 导电胶常用型号",
    description: "美光之谷 ACF 导电胶常用现货型号，Sony、Hitachi、Telephus 等系列，电话 13798296474 黄工。",
    body: () => pageShell({
      eyebrow: "In Stock",
      title: "常用 ACF 型号现货咨询",
      lead: `现货以实时库存为准，请联系 ${contact.person} ${contact.phone} 提供目标型号、胶宽、卷长和应用结构。`,
      image: "assets/product-acf.png",
      content: `
        <section class="stock-layout">
          ${stock("MF 系列", "MF331、MF332S、MF307、MF347、MF334，常见胶宽 0.6 / 1.0 / 1.2 / 1.5 / 2.0mm，卷长 100m。")}
          ${stock("AC8 系列", "AC805A、AC8955YW、AC832L、AC823CY-20、AC868GE、AC8632AJ-20、AC8412KZ-18、AC835A、AC860A、AC841A-14、AC827A-16。")}
          ${stock("AC7 / 其他系列", "AC7106U-25、AC7206U-18、AC7813KM-25、AC7813YM-30、AC7661KU-10、AC3818J-18、AC3514、AC11100Z、AC11400、AC11800Y-16、AC4325Z-25、AC2056R-35、AC9865AR、AC9845RM、AC9855RM-40、AC17338BL-10、AC4051R-45、AC4255CU、AC17358M-10。")}
          ${stock("Sony索尼（迪睿合dexerials）其他型号", "CP1733B、CP525SA、CP518SC、PAF1000、CP35231-20YA、CP718SA、CP908V3、CP50131-14YA、CP37131-20YB、CP920CM、CP920AM、CP712TA-18AJ、CP788SA-14YA、PAF307B、CP13342-25XA、CP72841-16XA、DP3342MS、CP923CM-25AC、CP9731SB、CP786TA-20YA、CP37031-18YC、PAF705D-10AJ、PAF300C-18YA、PAF412M-10VB、CP755SA-18RB、CP961CM-25YD、CP12941-20YA、PAF700D-10AJ、RX965CM-25YD、CP1733B、CP560SA-14YB、CP570SA-18AL、CP34531-18AB、PAF420B-12YA、CP540SA-18A、PAF450B-14BJ。")}
          ${stock("Telephus 系列", "TSB21001F-35、TGP20520AG、TOU2050、TSC22000、TOU3010CP-25、TSC3050BP、TSC4330AY-18B、TOU5000ZY1-25、TGP5552UB-35、TSC5300、TCP7050V、TCP7010V、TCH8020MP-25、TCH8010MP-25、TOU8000、EMA8888ECD-37。")}
        </section>`,
    }),
  },
  "contact.html": {
    title: "联系我们 | 深圳市美光之谷触控科技有限公司",
    description: "联系深圳市美光之谷触控科技有限公司，电话 13798296474，地址广东省深圳市光明区玉塘街道田寮社区融汇路与同观路交汇瑞丰光电大厦1栋10楼1015。",
    body: () => pageShell({
      eyebrow: "Contact",
      title: "获取报价、型号匹配与工艺建议",
      lead: "请提供绑定方式、产品结构、目标型号、现用材料或异常现象，我们会尽快协助确认方案。",
      image: "assets/hero-industrial.png",
      content: `
        <section class="contact-panel">
          <div>
            <h2>深圳市美光之谷触控科技有限公司</h2>
            <dl>
              <div><dt>联系人</dt><dd>${contact.person}</dd></div>
              <div><dt>移动电话</dt><dd><a href="tel:${contact.tel}">${contact.phone}</a></dd></div>
              <div><dt>工作时间</dt><dd>9:00 AM - 18:00 PM，Monday - Sunday</dd></div>
              <div><dt>公司地址</dt><dd>${contact.address}</dd></div>
            </dl>
          </div>
          <div class="map-card">
            <iframe title="深圳市美光之谷触控科技有限公司地图" src="https://j.map.baidu.com/b3/QY7i"></iframe>
          </div>
        </section>`,
    }),
  },
  "acf.html": {
    title: "什么是 ACF？| 异方性导电胶膜基础知识",
    description: "ACF 异方性导电胶膜的组成、导通原理、贴合工艺、品牌差异与保存方式说明。",
    body: () => pageShell({
      eyebrow: "Knowledge",
      title: "什么是 ACF？",
      lead: "ACF 即 Anisotropic Conductive Film，中文常称异方性导电胶膜，广泛用于显示面板、触控屏、FPC、COF、COG 等精密连接。",
      image: "assets/hero-industrial.png",
      content: `
        <section class="article">
          <h2>导通原理</h2>
          <p>ACF 的特点是 Z 轴方向导通、XY 平面方向绝缘。通过加热和加压，导电粒子在电极位置被压缩并形成电气连接，同时避免相邻电极短路。</p>
          <h2>主要组成</h2>
          <p>ACF 主要由树脂黏着剂和导电粒子组成。树脂提供接着、耐热、防湿和绝缘功能，并在固化后保持电极相对位置；导电粒子的粒径、分布和表面结构会影响导通电阻和短路风险。</p>
          <h2>典型工艺窗口</h2>
          <p>常见流程包含预贴、预压、本压与检测。预贴可在 60℃-100℃、2s-10s 量级范围内进行，本压可在约 150℃-200℃、10s-20s 量级范围内进行；实际参数必须以具体材料规格书和设备条件为准。</p>
          <h2>品牌与结构差异</h2>
          <p>Sony、Hitachi、Telephus 等品牌在导电粒子、树脂体系、单层/双层结构、细间距可靠性等方面各有特点。选型时应结合 pitch、基材、电极结构、可靠性要求、储存条件和量产窗口综合判断。</p>
          <h2>保存方式</h2>
          <p>ACF 通常需要低温保存。未开封 ACF 常见保存条件为 -10℃-5℃，开封后使用期限会明显缩短。请以所购材料标签和规格书为准，避免超期或高温存放影响性能。</p>
        </section>`,
    }),
  },
};

function renderNav(current) {
  return nav.map((item) => {
    const active = item.href === current || item.children?.some((child) => child.href === current) ? " active" : "";
    const children = item.children ? `<div class="sub-menu">${item.children.map((child) => `<a href="${child.href}">${child.label}</a>`).join("")}</div>` : "";
    const cls = item.children ? `nav-item has-sub${active}` : `nav-item${active}`;
    return `<div class="${cls}"><a href="${item.href}">${item.label}</a>${children}</div>`;
  }).join("");
}

function layout(pageName, config) {
  const body = typeof config.body === "function" ? config.body() : config.body;
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeHtml(config.description)}">
    <title>${escapeHtml(config.title)}</title>
    <link rel="icon" href="assets/logo-mark.svg" type="image/svg+xml">
    <link rel="preload" href="assets/hero-industrial.png" as="image">
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header class="site-header" id="top">
      <a class="brand" href="index.html" aria-label="深圳市美光之谷触控科技有限公司">
        <img src="assets/logo-meiguang.svg" alt="深圳市美光之谷触控科技有限公司">
      </a>
      <button class="menu-toggle" type="button" aria-label="打开导航" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav" aria-label="主导航">${renderNav(pageName)}</nav>
      <a class="header-call" href="tel:${contact.tel}">${contact.phone}</a>
    </header>
    <main>${body}</main>
    ${cta()}
    <footer class="site-footer">
      <div>
        <strong>深圳市美光之谷触控科技有限公司</strong>
        <span>${contact.address}</span>
      </div>
      <div>
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener">${contact.icp}</a>
        <a href="#top">返回顶部</a>
      </div>
    </footer>
    <script src="script.js"></script>
  </body>
</html>`;
}

function homePage() {
  return `
    <section class="hero">
      <div class="hero-bg" aria-hidden="true"></div>
      <div class="hero-shade" aria-hidden="true"></div>
      <div class="hero-inner">
        <p class="eyebrow">ACF materials for display bonding</p>
        <h1>把 ACF 选型、现货和绑定工艺一次对齐</h1>
        <p>美光之谷面向触控屏、显示模组和 FPC/COF 绑定现场，提供 Sony索尼（迪睿合dexerials）、Hitachi、Telephus ACF 导电胶，以及感压纸、硅胶皮、去除液、清洗剂和精密分切等制程配套能力。</p>
        <div class="hero-actions">
          <a class="btn primary" href="sales.html">查询现货型号</a>
          <a class="btn secondary" href="products.html">查看产品体系</a>
        </div>
      </div>
      <div class="hero-metrics" aria-label="核心服务能力">
        ${metric("3 大类", "主材 / 辅材 / 返修")}
        ${metric("5 场景", "FOG / COG / COF / COB / FOB")}
        ${metric("当天响应", "型号与库存咨询")}
      </div>
    </section>
    <section class="home-command">
      <a href="products.html#acf"><strong>ACF 导电胶</strong><span>Sony/dexerials / Hitachi / Telephus</span></a>
      <a href="products.html#process-materials"><strong>制程辅助</strong><span>感压纸 / 硅胶皮</span></a>
      <a href="products.html#rework"><strong>返修清洁</strong><span>去除液 / 清洗剂 / 蓝胶</span></a>
      <a href="sales.html"><strong>现货型号</strong><span>胶宽 / 卷长 / 替代咨询</span></a>
    </section>
    <section class="application-strip">
      ${["FOG", "COG", "COF", "COB", "FOB"].map((item) => `<a href="products.html"><strong>${item}</strong><span>绑定搭接材料</span></a>`).join("")}
    </section>
    <section class="section internet-split">
      <div>
        <p class="eyebrow">Decision path</p>
        <h2>客户真正需要的不是一卷胶，而是能稳定导通的方案</h2>
      </div>
      <div class="lead-stack">
        <p>ACF 选型牵涉基材、电极 pitch、压接条件、储存期限、可靠性和返修方式。首页将入口按“买什么、用在哪里、怎么用、有没有货”重新组织，减少客户查找成本。</p>
        <div class="flow-cards">
          ${flow("01", "确认结构", "FOG、COG、COF、COB、FOB，确认基材、电极和 pitch。")}
          ${flow("02", "匹配材料", "按品牌、型号、胶宽、卷长、储存条件和工艺窗口确认。")}
          ${flow("03", "验证制程", "用感压纸、硅胶皮、清洗材料配合调机和返修。")}
          ${flow("04", "交付现货", "常用型号先确认库存，再推进样品、批量和替代方案。")}
        </div>
      </div>
    </section>
    <section class="section product-showcase">
      <div class="section-head">
        <p class="eyebrow">Product architecture</p>
        <h2>产品与服务</h2>
        <a href="products.html">全部产品</a>
      </div>
      <div class="product-list">${productCards.map(productCard).join("")}</div>
    </section>
    <section class="section media-section">
      <div class="media-copy">
        <p class="eyebrow">Technical support</p>
        <h2>把“什么是 ACF”和“怎么使用”合并成技术支持</h2>
        <p>ACF 基础原理、预贴、本压、检测、保存和返修注意事项统一放入技术支持，避免顶部菜单过长，也让客户按实际问题进入。</p>
        <a class="btn secondary dark" href="acf-method.html">了解使用方法</a>
      </div>
      <img src="assets/acf-process.png" alt="ACF 导电胶绑定工艺示意">
    </section>`;
}

function pageShell({ eyebrow, title, lead, image, content }) {
  return `
    <section class="page-hero">
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h1>${title}</h1>
        <p>${lead}</p>
      </div>
      <img src="${image}" alt="${title}">
    </section>
    ${content}`;
}

function productPage({ brand, eyebrow, lead, image, highlights, groups, extra = "" }) {
  return pageShell({
    eyebrow,
    title: brand,
    lead,
    image,
    content: `
      <section class="highlights">${highlights.map((item) => `<span>${item}</span>`).join("")}</section>
      <section class="detail-grid">
        ${groups.map(([title, body]) => `<article><h2>${title}</h2><p>${body}</p></article>`).join("")}
      </section>
      ${extra}`,
  });
}

function productCard(item) {
  return `<article class="product-card">
    <span>${item.tag}</span>
    <h3>${item.title}</h3>
    <p>${item.summary}</p>
    <a href="${item.href}">查看详情</a>
  </article>`;
}

function serviceCategory(item) {
  return `<article class="service-category" id="${item.id}">
    <div>
      <p class="eyebrow">${item.id.replace("-", " ")}</p>
      <h2>${item.title}</h2>
      <p>${item.lead}</p>
    </div>
    <div class="service-links">
      ${item.links.map(([title, href, text]) => `<a href="${href}"><strong>${title}</strong><span>${text}</span></a>`).join("")}
    </div>
  </article>`;
}

function feature(title, text) {
  return `<article class="feature-card"><h3>${title}</h3><p>${text}</p></article>`;
}

function flow(num, title, text) {
  return `<article><span>${num}</span><h3>${title}</h3><p>${text}</p></article>`;
}

function metric(value, label) {
  return `<div><strong>${value}</strong><span>${label}</span></div>`;
}

function step(num, title, text) {
  return `<article><span>${num}</span><h2>${title}</h2><p>${text}</p></article>`;
}

function imageFigure(src, alt) {
  return `<figure><img src="${src}" alt="${alt}"><figcaption>${alt}</figcaption></figure>`;
}

function stock(title, body) {
  return `<article><h2>${title}</h2><p>${body}</p></article>`;
}

function contactBlock() {
  return `<section class="contact-panel embedded">
    <div>
      <h2>联系与报价</h2>
      <dl>
        <div><dt>联系人</dt><dd>${contact.person}</dd></div>
        <div><dt>移动电话</dt><dd><a href="tel:${contact.tel}">${contact.phone}</a></dd></div>
        <div><dt>公司地址</dt><dd>${contact.address}</dd></div>
      </dl>
    </div>
    <div class="contact-note">
      <h2>咨询时建议提供</h2>
      <p>目标型号、现用品牌、胶宽卷长、绑定方式、基材结构、设备压接条件、是否需要返修清洁材料。信息越完整，匹配越快。</p>
    </div>
  </section>`;
}

function cta() {
  return `<section class="cta">
    <div>
      <p class="eyebrow">Ready to quote</p>
      <h2>需要确认 ACF 型号、现货或替代方案？</h2>
      <p>联系 ${contact.person}，提供结构、型号、胶宽、卷长和应用场景，我们会尽快协助确认。</p>
    </div>
    <div class="cta-actions">
      <a class="btn primary" href="tel:${contact.tel}">${contact.phone}</a>
      <a class="btn secondary light" href="contact.html">联系地址</a>
    </div>
  </section>`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char]));
}

for (const [fileName, config] of Object.entries(pages)) {
  fs.writeFileSync(path.join(ROOT, fileName), layout(fileName, config));
}

const redirects = {
  about: "about.html",
  products: "products.html",
  sony: "sony.html",
  hitachi: "hitachi.html",
  telephus: "telephus.html",
  fuli: "fuli.html",
  "acf-slitting": "acf-slitting.html",
  sales: "sales.html",
  contact: "contact.html",
  "acf导电胶的使用方法": "acf-method.html",
  "导电胶acf去除液-ic清洗剂": "acf-cleaner.html",
  "什么是acf？": "acf.html",
};

for (const [dir, target] of Object.entries(redirects)) {
  const fullDir = path.join(ROOT, dir);
  fs.mkdirSync(fullDir, { recursive: true });
  fs.writeFileSync(path.join(fullDir, "index.html"), redirectPage(target));
}

function redirectPage(target) {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url=../${target}">
    <link rel="canonical" href="../${target}">
    <title>页面跳转中</title>
  </head>
  <body>
    <p>页面跳转中：<a href="../${target}">继续访问</a></p>
  </body>
</html>`;
}
