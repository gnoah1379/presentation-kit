import { chromium as v } from "playwright";
import g, { join as P } from "path";
import { dirname as $, join as E } from "node:path";
import { fileURLToPath as I } from "node:url";
import { packageDirectory as M } from "pkg-dir";
import { readdir as T, access as k } from "fs/promises";
const w = 0.75, m = 96, x = 914400;
async function B(i) {
  const o = await i.evaluate(() => {
    const n = document.body, r = window.getComputedStyle(n);
    return {
      width: parseFloat(r.width),
      height: parseFloat(r.height),
      scrollWidth: n.scrollWidth,
      scrollHeight: n.scrollHeight
    };
  }), a = [], t = Math.max(0, o.scrollWidth - o.width - 1), s = Math.max(0, o.scrollHeight - o.height - 1), e = t * w, c = s * w;
  if (e > 0 || c > 0) {
    const n = [];
    e > 0 && n.push(`${e.toFixed(1)}pt horizontally`), c > 0 && n.push(`${c.toFixed(1)}pt vertically`);
    const r = c > 0 ? ' (Remember: leave 0.5" margin at bottom of slide)' : "";
    a.push(`HTML content overflows body by ${n.join(" and ")}${r}`);
  }
  return { ...o, errors: a };
}
function j(i, o) {
  const a = [], t = i.width / m, s = i.height / m;
  if (o.presLayout) {
    const e = o.presLayout.width / x, c = o.presLayout.height / x;
    (Math.abs(e - t) > 0.1 || Math.abs(c - s) > 0.1) && a.push(
      `HTML dimensions (${t.toFixed(1)}" × ${s.toFixed(1)}") don't match presentation layout (${e.toFixed(1)}" × ${c.toFixed(1)}")`
    );
  }
  return a;
}
function D(i, o) {
  const a = [], t = o.height / m, s = 0.5;
  for (const e of i.elements)
    if (["p", "h1", "h2", "h3", "h4", "h5", "h6", "list"].includes(e.type)) {
      if (e.type === "line" || e.type === "image" || e.type === "shape") continue;
      const c = e.style?.fontSize || 0, n = e.position.y + e.position.h, r = t - n;
      if (c > 12 && r < s) {
        const h = () => e.type === "list" ? e.items.find((p) => p.text)?.text || "" : typeof e.text == "string" ? e.text : Array.isArray(e.text) && e.text.find((p) => p.text)?.text || "", l = h().substring(0, 50) + (h().length > 50 ? "..." : "");
        a.push(
          `Text box "${l}" ends too close to bottom edge (${r.toFixed(2)}" from bottom, minimum ${s}" required)`
        );
      }
    }
  return a;
}
const R = $(I(import.meta.url));
async function F(i) {
  const o = await M({ cwd: R });
  if (!o)
    throw new Error("[@ant/html2pptx] Internal error, cannot find extraction script");
  const a = E(o, "./dist/playwright/index.iife.js");
  return await i.addScriptTag({ path: a }), await i.evaluate(() => {
    const { ExtractSlideData: t } = window;
    return t.extractSlideDataInBrowser();
  });
}
async function W(i, o, a) {
  if (i.background.type === "image" && i.background.path) {
    let t = i.background.path.startsWith("file://") ? i.background.path.replace("file://", "") : i.background.path;
    o.background = { path: t };
  } else i.background.type === "color" && i.background.value && (o.background = { color: i.background.value });
}
function _(i, o, a) {
  for (const t of i.elements)
    if (t.type === "image") {
      let s = t.src.startsWith("file://") ? t.src.replace("file://", "") : t.src;
      o.addImage({
        path: s,
        x: t.position.x,
        y: t.position.y,
        w: t.position.w,
        h: t.position.h
      });
    } else if (t.type === "line")
      o.addShape(a.ShapeType.line, {
        x: t.x1,
        y: t.y1,
        w: t.x2 - t.x1,
        h: t.y2 - t.y1,
        line: { color: t.color, width: t.width }
      });
    else if (t.type === "shape") {
      const s = {
        x: t.position.x,
        y: t.position.y,
        w: t.position.w,
        h: t.position.h
      };
      t.shape.fill && (s.fill = { color: t.shape.fill }, t.shape.transparency != null && (s.fill.transparency = t.shape.transparency)), t.shape.line && (s.line = t.shape.line), t.shape.rectRadius > 0 && (s.rectRadius = t.shape.rectRadius), t.shape.shadow && (s.shadow = t.shape.shadow), o.addText(t.text || "", s);
    } else if (t.type === "list") {
      const s = {
        x: t.position.x,
        y: t.position.y,
        w: t.position.w,
        h: t.position.h,
        fontSize: t.style.fontSize,
        fontFace: t.style.fontFace,
        color: t.style.color,
        align: t.style.align,
        valign: "top",
        paraSpaceBefore: t.style.paraSpaceBefore,
        paraSpaceAfter: t.style.paraSpaceAfter
      };
      t.style.lineSpacing !== null && t.style.lineSpacing !== void 0 && (s.lineSpacing = t.style.lineSpacing), t.style.margin && (s.margin = t.style.margin), o.addText(t.items, s);
    } else {
      const s = t.style.lineSpacing || t.style.fontSize * 1.2, e = t.position.h <= s * 1.5;
      let c = t.position.x, n = t.position.w;
      if (e) {
        const h = t.position.w * 0.02, l = t.style.align;
        l === "center" ? (c = t.position.x - h / 2, n = t.position.w + h) : (l === "right" && (c = t.position.x - h), n = t.position.w + h);
      }
      const r = {
        x: c,
        y: t.position.y,
        w: n,
        h: t.position.h,
        fontSize: t.style.fontSize,
        fontFace: t.style.fontFace,
        color: t.style.color,
        bold: t.style.bold,
        italic: t.style.italic,
        valign: "top",
        paraSpaceBefore: t.style.paraSpaceBefore,
        paraSpaceAfter: t.style.paraSpaceAfter,
        inset: 0
        // Remove default PowerPoint internal padding
      };
      t.style.underline && (r.underline = {
        style: "sng",
        color: t.style.color
      }), t.style.lineSpacing !== null && t.style.lineSpacing !== void 0 && (r.lineSpacing = t.style.lineSpacing), t.style.align && (r.align = t.style.align), t.style.margin && (r.margin = t.style.margin), t.style.rotate !== null && t.style.rotate !== void 0 && (r.rotate = t.style.rotate), t.style.transparency !== null && t.style.transparency !== void 0 && (r.transparency = t.style.transparency), o.addText(t.text, r);
    }
}
async function b(i) {
  try {
    return await k(i), !0;
  } catch {
    return !1;
  }
}
async function z() {
  const i = v.executablePath();
  if (await b(i))
    return i;
  const o = i.split("/"), a = o.findIndex((l) => l.startsWith("chromium-"));
  if (a === -1)
    throw new Error(`Could not find chromium revision in path: ${i}`);
  const t = o[a], s = parseInt(t.replace("chromium-", ""), 10), e = o.slice(0, a).join("/"), c = o.slice(a + 1).join("/");
  let n = [];
  try {
    n = (await T(e)).filter((p) => p.startsWith("chromium-"));
  } catch {
    throw new Error(`Could not read directory: ${e}`);
  }
  if (n.length === 0)
    throw new Error(`No chromium installations found in: ${e}`);
  let r = 1 / 0, h;
  for (const l of n) {
    const p = parseInt(l.replace("chromium-", ""), 10), y = Math.abs(p - s);
    if (y < r) {
      const f = P(e, l, c);
      await b(f) && (r = y, h = f);
    }
  }
  if (!h)
    throw new Error(
      `No valid chromium executable found. Tried ${n.length} alternatives.`
    );
  return h;
}
const X = 5;
async function U(i, o, a = {}) {
  const { tmpDir: t = process.env.TMPDIR || "/tmp", slide: s = null } = a;
  try {
    const e = {
      env: { TMPDIR: t },
      executablePath: await z()
    };
    process.platform === "darwin" && (e.channel = "chrome");
    const c = await v.launch(e);
    let n, r;
    const h = g.isAbsolute(i) ? i : g.join(process.cwd(), i), l = [];
    try {
      const d = await c.newPage();
      d.on("console", (u) => {
        console.log(`Browser console: ${u.text()}`);
      }), await d.goto(`file://${h}`), n = await B(d), await d.setViewportSize({
        width: Math.round(n.width),
        height: Math.round(n.height)
      }), r = await F(d);
    } finally {
      await c.close();
    }
    n.errors && n.errors.length > 0 && l.push(...n.errors);
    const p = j(n, o);
    p.length > 0 && l.push(...p);
    const y = D(r, n);
    if (y.length > 0 && l.push(...y), r.errors && r.errors.length > 0 && l.push(...r.errors), l.length > 0) {
      const d = l.length === 1 ? l[0] : `Multiple validation errors found:
${l.map((u, S) => `  ${S + 1}. ${u}`).join(`
`)}`;
      throw new Error(d);
    }
    const f = s || o.addSlide();
    return await W(r, f, t), _(r, f, o), { slide: f, placeholders: r.placeholders };
  } catch (e) {
    throw e instanceof Error && !e.message.startsWith(i) ? new Error(`${i}: ${e.message}`) : e;
  }
}
export {
  X as Y,
  U as html2pptx
};
//# sourceMappingURL=html2pptx.mjs.map
