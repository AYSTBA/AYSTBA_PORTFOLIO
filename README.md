<div align="center">

# 💀 AYSTBA Portfolio

**Designer & Creator — 个人作品集网站**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock)](https://gsap.com)

</div>

---

## 📋 目录

- [简介](#-简介)
- [特性](#-特性)
- [技术栈](#️-技术栈)
- [快速开始](#-快速开始)
- [项目结构](#-项目结构)
- [组件概览](#-组件概览)
- [自定义指南](#-自定义指南)
- [部署](#-部署)
- [许可证](#-许可证)

---

## 📖 简介

这是一个具有**高端创意工作室风格**的个人作品集网站，展示了 AYSTBA 的作品、技能和履历。网站以**暗黑视觉主题**为基调，融合了 WebGL 动态渐变背景、Canvas 粒子场、边缘感知发光效果以及大量基于滚动触发的 GSAP 动画，营造出沉浸式的浏览体验。

> 🌐 **在线预览：** [aystba-portfolio.vercel.app](https://github.com/AYSTBA/AYSTBA_PORTFOLIO)（部署后替换）

---

## ✨ 特性

| 特性 | 说明 |
|------|------|
| 🌙 **暗黑视觉主题** | 以 `#0c0c0c` 为基调，`#C8FF00` 荧光绿为标志色，打造高级感视觉语言 |
| 🎨 **WebGL 动态渐变** | 基于 ogl 库的实时 Shader 渐变背景，支持颜色、扭曲、噪点等参数实时调节 |
| ✨ **Canvas 粒子场** | 自定义鼠标交互粒子系统，支持斥力/引力效果和发光跟随 |
| 🎞️ **丰富滚动动画** | 每个区块独立编排的 GSAP 入场动画，交错、缩放、位移、旋转多种效果 |
| 🔄 **无限轮播画廊** | 首屏双倍数组无缝轮播 + 拖拽交互 + 动量惯性 + 自动播放 |
| 🖱️ **边缘发光卡片** | 鼠标悬停时边缘感知发光效果，附带 HSL 变量驱动的渐变光晕 |
| 🌐 **中英文切换** | 内置 i18n 国际化，支持一键切换 EN / 中文 |
| 📱 **全端响应式** | 768px / 480px 两档断点，移动端专属精简布局和触摸优化 |
| ⚡ **性能优化** | IntersectionObserver 懒加载、页面可见性暂停渲染、Canvas DPR 限制 |

---

## 🛠️ 技术栈

### 核心框架

| 技术 | 用途 |
|------|------|
| **React 19** | UI 框架 |
| **Vite 8** | 构建工具与开发服务器 |
| **JavaScript (JSX)** | 开发语言 |

### 动画 & 图形

| 技术 | 用途 |
|------|------|
| **GSAP 3** | 核心动画引擎（时间线、缓动函数） |
| **ScrollTrigger** | 滚动驱动的动画触发器 |
| **ogl** | WebGL 渲染库（Grainient 背景） |
| **Canvas 2D** | DotField 粒子场渲染 |
| **Framer Motion** | （备选动画库，当前未使用） |

### 其他依赖

| 包 | 用途 |
|----|------|
| **lucide-react** | SVG 图标库 |
| **Matter.js** | 2D 物理引擎（当前未使用） |

### 开发工具

| 工具 | 用途 |
|------|------|
| **Oxlint** | Rust 驱动的超快 lint 工具 |
| **vite-plugin-image-optimizer** | 构建时图片自动优化 |
| **SVGO** | SVG 压缩 |

---

## 🚀 快速开始

### 前置要求

- **Node.js** >= 18
- **npm** >= 9 或 **pnpm** / **yarn**

### 安装

```bash
# 克隆仓库
git clone https://github.com/AYSTBA/AYSTBA_PORTFOLIO.git

# 进入目录
cd AYSTBA_PORTFOLIO

# 安装依赖
npm install
```

### 开发

```bash
npm run dev
```

启动后打开终端显示的本地地址（默认 `http://localhost:5173`），支持 **HMR（热模块替换）**。

### 构建

```bash
npm run build
```

打包产物输出到 `dist/` 目录，可用于静态部署。

### 预览

```bash
npm run preview
```

在本地预览构建后的生产版本。

### 代码检查

```bash
npm run lint
```

使用 Oxlint 进行快速静态分析。

---

## 📂 项目结构

```
AYSTBA_PORTFOLIO/
├── public/                 # 静态资源
│   ├── favicon.svg         # 网站图标
│   ├── icons.svg           # SVG 图标集
│   └── images/             # 公共图片
├── src/
│   ├── assets/             # 构建时处理的图片资源
│   │   ├── A.png           # IdeaButler 截图
│   │   ├── AYSTBAP.png     # Portfolio 项目截图
│   │   ├── SKILL.png       # Encryption Suite 截图
│   │   ├── hero-bg.jpg     # 首屏背景图
│   │   └── mox.png         # moX 项目截图
│   ├── components/         # React 组件
│   │   ├── About.jsx       # 履历区块
│   │   ├── BorderGlow.jsx  # 边缘发光卡片容器
│   │   ├── BorderGlow.css  # 对应样式
│   │   ├── Contact.jsx     # 联系方式区块
│   │   ├── DotField.jsx    # Canvas 粒子场
│   │   ├── DotField.css    # 对应样式
│   │   ├── Grainient.jsx   # WebGL 渐变背景
│   │   ├── Grainient.css   # 对应样式
│   │   ├── Hero.jsx        # 首屏（轮播 + 粒子 + 标题）
│   │   ├── LanguageToggle.jsx  # 语言切换按钮
│   │   ├── Lightfall.jsx   # （未使用）
│   │   ├── Lightfall.css   # （未使用）
│   │   ├── Navbar.jsx      # 导航栏
│   │   ├── NavWrapper.jsx  # 导航栏包装器（滚动感知）
│   │   ├── OpeningAnimation.jsx  # 开场动画
│   │   ├── PlasmaWave.jsx  # （未使用）
│   │   ├── PlasmaWave.css  # （未使用）
│   │   ├── Projects.jsx    # 项目展示区块
│   │   └── Skills.jsx      # 技能区块
│   ├── context/
│   │   └── LanguageContext.jsx  # 国际化上下文
│   ├── App.jsx             # 应用入口组件
│   ├── i18n.js             # 翻译文本定义
│   ├── index.css           # 全局样式（全部手写 CSS）
│   └── main.jsx            # DOM 挂载入口
├── .gitignore
├── .oxlintrc.json          # Oxlint 配置
├── index.html              # HTML 模板
├── package.json
├── vite.config.js          # Vite 配置
└── README.md
```

---

## 🧩 组件概览

### 主要区块（按页面顺序）

| 组件 | 功能描述 |
|------|----------|
| **OpeningAnimation** | 开场黑白遮罩动画，滑出后展示页面（当前未启用） |
| **Navbar** | 顶部导航栏 — 滚动时渐变出现毛玻璃背景，移动端折叠为汉堡菜单 |
| **Hero** | 首屏大标题 + 背景图 + 毛玻璃 + 粒子场 + 无限轮播画廊 + 卡片弹窗 |
| **About** | 履历区块 — GitHub 头像 + 旋转光环动画 + 数据计数器 + 个人信息 + 工作经历时间线 |
| **Projects** | 项目展示 — 4 个项目卡片（懒加载图片 + 视差滚动效果） |
| **Skills** | 技能展示 — 4 个技能类别卡片（交错入场 + 图标回弹动画） |
| **Contact** | 联系方式 — 社交链接列表（B站/GitHub/Outlook/QQ）+ 版权信息 |

### 通用工具组件

| 组件 | 功能描述 |
|------|----------|
| **BorderGlow** | 包裹任意内容的发光边框容器，鼠标移动时边缘亮度随角度和距离变化 |
| **DotField** | Canvas 粒子场，鼠标移入时粒子向外扩散，带光标发光跟随 |
| **Grainient** | WebGL 动态渐变背景，支持 3 色混合、扭曲、噪点、对比度/饱和度/伽马调节 |
| **LanguageToggle** | 中英文切换按钮，在 NavWrapper 中显示 |

---

## 🎨 自定义指南

### 修改主题色

在 `src/index.css` 的 `:root` 中修改变量：

```css
:root {
  --accent: #C8FF00;         /* 主色调 */
  --bg-primary: #0c0c0c;     /* 背景色 */
  --bg-card: #1a1a1a;        /* 卡片背景 */
  --text-secondary: rgba(255,255,255,0.6); /* 次要文本 */
}
```

### 修改 Grainient 背景

在 `src/App.jsx` 中找到 `<Grainient>` 组件，调整颜色和效果参数：

```jsx
<Grainient
  color1="#78cb6e"    /* 主色 */
  color2="#000000"    /* 辅色 */
  color3="#664b7e"    /* 深色 */
  timeSpeed={0.15}    /* 动画速度 */
  warpStrength={1.2}  /* 扭曲强度 */
  // ... 更多参数见组件 Props
/>
```

### 添加新项目

在 `src/components/Projects.jsx` 的 `projects` 数组中新增条目：

```jsx
const projects = [
  // ... 已有项目
  {
    tag: '技术栈标签',
    title: '项目名称',
    descKey: 'projects.项目.desc',    // 对应 i18n.js 中的 key
    color: '#1a2a2a',
    url: 'https://github.com/你的仓库',
    img: 导入的图片,
  },
];
```

### 新增翻译

在 `src/i18n.js` 中添加条目：

```js
export const translations = {
  // ... 已有翻译
  '你的.key': {
    en: 'English text',
    zh: '中文文本',
  },
};
```

---

## 🌐 部署

项目构建后为纯静态文件，可部署到任何静态托管平台：

### Vercel（推荐）

```bash
npm i -g vercel
vercel --prod
```

### GitHub Pages

1. 在仓库 Settings → Pages 中设置 Source 为 GitHub Actions
2. 在根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Nginx / 其他

将 `dist/` 目录内容复制到服务器静态目录即可。

---

## 📄 许可证

本项目基于 **GLT 30** 开源 — 详见 [LICENSE](./LICENSE) 文件。

---

<div align="center">

**Built with ❤️ by AYSTBA**

[![Bilibili](https://img.shields.io/badge/Bilibili-AYSTBA-00A1D6?logo=bilibili)](https://space.bilibili.com/3546948852255258)
[![GitHub](https://img.shields.io/badge/GitHub-AYSTBA-181717?logo=github)](https://github.com/AYSTBA)

</div>
