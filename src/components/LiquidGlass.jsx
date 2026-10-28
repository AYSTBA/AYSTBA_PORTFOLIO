import { useEffect, useId, useRef, useState } from 'react';
import './LiquidGlass.css';

/**
 * Apple 液态玻璃（Liquid Glass）的 Web 端实现。
 *
 * 和"毛玻璃"的本质区别是**折射**：普通 backdrop blur 是空间不变的均匀卷积，
 * 而液态玻璃是一块透镜 —— 采样坐标本身被"到边界的距离 + 边界法线"扭曲：
 *
 *     P'(x,y) = P(x + strength * (R - 0.5), y + strength * (G - 0.5))
 *
 * 实现分四层（从下到上）：
 *   1. __lens  折射：canvas 生成位移贴图 → SVG feDisplacementMap → backdrop-filter
 *   2. __rim   镜面高光边缘 + 玻璃厚度（纯 CSS，这一层其实是"看起来像玻璃"的大头）
 *   3. __tint  玻璃染色
 *   4. 内容
 *
 * 几个踩过的坑（都是实测踩出来的，别改回去）：
 *  · **必须用胶囊 SDF，不能用圆角矩形 SDF。** nav 的 radius=999 在 50px 高的元素上会被
 *    钳到 r = h/2，圆角矩形的"内核矩形"于是塌成零高度的线，所有像素法线都变成
 *    (0, ±1) —— 左右两端完全没有横向折射。胶囊 SDF 是"到水平线段的距离 - r"，
 *    天然处理 r >= h/2 的胶囊形状。
 *  · **不能用 normalize(uv - 0.5) 这种从中心发散的径向法线。** 在 16:1 的长条上会在
 *    中间鼓出一个椭圆光斑，而 Apple 的是一圈均匀的边。
 *  · **不能用 CSS.supports 检测 `backdrop-filter: url()`。** Safari 能解析这个语法、
 *    返回 true，但什么都不画；而且因为 url() 在 Safari 的 backdrop-filter 里非法，
 *    整条声明会被丢弃 —— 连 blur() 一起没了，玻璃直接消失。只能按引擎判断。
 *  · **必须设 colorInterpolationFilters="sRGB"。** 默认的 linearRGB 会 gamma 扭曲
 *    位移值，折射方向看起来是歪的。
 *
 * Apple 没有公开 Web 版液态玻璃 API，这里是公开资料能还原的近似实现。
 */

// 位移强度（相对元素短边）。研究结论：3~4px 是甜点，多数人一上来就调到 20px+ 变成鱼眼
const STRENGTH_RATIO = 0.07;
// 折射带宽（相对元素短边）。只贴边一点点，重了就像给玻璃描了一圈边
const FLUFF_RATIO = 0.14;

export default function LiquidGlass({
  children,
  className = '',
  radius = 28,
  strength,
  fluff,
  blur = 1.5,
  saturate = 112,
  tint = 'rgba(255, 255, 255, 0.02)',
  tintStrong = 'rgba(10, 13, 11, 0.34)',
  contentClassName = '',
}) {
  const rawId = useId();
  const filterId = 'lg-' + rawId.replace(/[^a-zA-Z0-9-]/g, '');
  const hostRef = useRef(null);
  const [map, setMap] = useState(null);
  const [scale, setScale] = useState(0);
  const [refracts, setRefracts] = useState(false);

  // 尺寸变化时重画位移贴图（贴图和玻璃的像素尺寸必须一致，且只按尺寸重建，
  // 不按位置重建 —— 位置变化重画会白白吃掉主线程）
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const build = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (!w || !h) return;

      const short = Math.min(w, h);
      const fluffPx = fluff ?? short * FLUFF_RATIO;
      const strengthPx = strength ?? short * STRENGTH_RATIO;
      const r = Math.min(radius, w / 2, h / 2);

      setMap(buildCapsuleMap(w, h, r, fluffPx));
      setScale(strengthPx);
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    return () => ro.disconnect();
  }, [radius, fluff, strength]);

  // 高光跟指针走：--lg-spec-x 写的是鼠标相对玻璃的横向比例（-0.6 ~ 1.6，
  // 出界也保留一点，这样从侧面划过时光会从边缘滑出去而不是硬切）。
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    let raf = 0;
    let pending = null;

    const apply = () => {
      raf = 0;
      if (pending == null) return;
      el.style.setProperty('--lg-spec-px', pending.toFixed(3));
    };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const rel = (e.clientX - rect.left) / (rect.width || 1);
      pending = Math.min(Math.max(rel, -0.6), 1.6);
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // 引擎门控：只有 Chromium 系支持 backdrop-filter: url()。
  // 故意偏向"否"—— 判错成支持的代价（玻璃整块消失）远大于判错成不支持（少一点折射）。
  useEffect(() => {
    const ua = navigator.userAgent || '';
    const isChromium = !!navigator.userAgentData?.brands?.some((b) => /Chromium/i.test(b.brand));
    const isSafari = /Safari/i.test(ua) && !/Chromium|Chrome|Edg/i.test(ua);
    const isFirefox = /Firefox|FxiOS/i.test(ua);
    setRefracts(isChromium && !isSafari && !isFirefox);
  }, []);

  const backdrop = map
    ? `blur(${blur}px) saturate(${saturate}%) url(#${filterId})`
    : `blur(${blur + 6}px) saturate(${saturate}%)`;

  return (
    <div
      ref={hostRef}
      className={`liquid-glass ${className}`}
      style={{ '--lg-radius': `${radius}px`, '--lg-tint': tint, '--lg-tint-strong': tintStrong }}
    >
      {map && refracts && (
        <svg className="liquid-glass__defs" aria-hidden="true" focusable="false">
          <filter
            id={filterId}
            x="0"
            y="0"
            width="1"
            height="1"
            filterUnits="objectBoundingBox"
            primitiveUnits="objectBoundingBox"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={map}
              x="0"
              y="0"
              width="1"
              height="1"
              preserveAspectRatio="none"
              result="LG_MAP"
            />
            {/* A 通道 = 到边界的归一化距离 → 转成模糊强度遮罩。
                中心区域 A≈0，用 feFlood 的实色补上，这样"模糊只发生在边缘"：
                中间保持清晰，玻璃看起来才透，而不是整块磨砂。 */}
            <feComponentTransfer in="LG_MAP" result="LG_ALPHA">
              <feFuncA type="linear" slope="0.6" intercept="0" />
            </feComponentTransfer>
            <feFlood floodColor="#000" floodOpacity="1" result="LG_OPAQUE" />
            <feComposite in="LG_OPAQUE" in2="LG_ALPHA" operator="over" result="LG_MASK" />
            <feGaussianBlur in="LG_MASK" stdDeviation="0.02" result="LG_MASK_BLUR" />
            <feComposite in="SourceGraphic" in2="LG_MASK_BLUR" operator="in" result="LG_CONTENT" />
            <feDisplacementMap
              in="LG_CONTENT"
              in2="LG_MAP"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}

      <div
        className="liquid-glass__lens"
        style={{ backdropFilter: backdrop, WebkitBackdropFilter: backdrop }}
      />
      <div className="liquid-glass__sheen" aria-hidden="true" />
      <div className="liquid-glass__rim" aria-hidden="true" />
      <div className="liquid-glass__tint" aria-hidden="true" />
      <div className={`liquid-glass__content ${contentClassName}`}>{children}</div>
    </div>
  );
}

/**
 * 胶囊位移贴图。
 *
 * 编码约定：R/G = 位移方向（128 = 不位移），B = 镜面高光的亮度遮罩，
 * A = 到边界的归一化距离（被 feComponentTransfer 映射成模糊强度的遮罩）。
 *
 * 法线用**解析 SDF 推导**，不是"到中轴线的方向"：
 *   for 长直边段（qx 被钳住）：法线 = (0, ±1)，只有纵向分量
 *   for 两端圆弧：             法线 = normalize(p - 圆心)
 * 关键点：横向分量 nx 在直边段必须是 0。之前用"到整条线段的距离方向"，
 * 结果边缘 11px 带内的所有点都被整体向上/下推一个常量 —— 视觉上就是把边界
 * 糊成一条线，也就是"圆角有一道线 / 上下各一道边"。
 *
 * fluff：法线在多宽的带内生效（相对短边）。贴边 1px 用满法线，越往里越弱。
 */
function buildCapsuleMap(w, h, r, fluff) {
  const cw = Math.max(2, Math.round(w));
  const ch = Math.max(2, Math.round(h));
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const img = ctx.createImageData(cw, ch);
  const data = img.data;

  const cy = h / 2;
  const radius = Math.min(r, cw / 2, ch / 2);
  const coreX0 = radius;
  const coreX1 = cw - radius;
  const span = coreX1 - coreX0 || 1;
  const fl = Math.max(fluff, 1);

  // 位移强度沿边缘的分布：贴边最强，往里迅速衰减。
  // A 通道存这个值 = 1 - pow(edge/radius, 3)，让模糊也一起衰减。
  const falloff = (d) => 1 - Math.pow(Math.max(1 - d / fl, 0), 3);

  for (let y = 0; y < ch; y++) {
    const uy = y + 0.5;
    for (let x = 0; x < cw; x++) {
      const ux = x + 0.5;

      const qx = Math.min(Math.max(ux, coreX0), coreX1);
      const qy = Math.min(Math.max(uy, radius), ch - radius);
      const dx = ux - qx;
      const dy = uy - qy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const edge = dist - radius;

      // 解析法线：在直边段 dx 恒为 0 → nx = 0（只有纵向位移）
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = dx / len;
      const ny = dy / len;

      const smoothstep = (t) => t * t * (3 - 2 * t);
      let edgeFactor = 0;
      let alpha = 0;
      if (edge <= 0) {
        alpha = falloff(-edge);
        edgeFactor = smoothstep(Math.min(Math.max(-edge / fl, 0), 1));
        edgeFactor = Math.max(edgeFactor, 0.2);
      }

      const fall = edgeFactor * alpha;
      const i = (y * cw + x) * 4;
      // 128 = 中性。128/255 与 0.5 的极小偏差在这个尺度下远小于 1px，忽略。
      data[i] = Math.round((nx * fall * 0.5 + 0.5) * 255);
      data[i + 1] = Math.round((ny * fall * 0.5 + 0.5) * 255);
      data[i + 2] = 128;
      data[i + 3] = Math.round(alpha * 255);
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL('image/png');
}
