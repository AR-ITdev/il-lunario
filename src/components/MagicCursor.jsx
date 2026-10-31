"use client";

import { useEffect, useRef } from "react";

export default function MagicCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const pointerMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!pointerMedia.matches) return;

    const cursor = cursorRef.current;
    const updateCursor = (event) => {
      if (event.pointerType === "touch" || !cursor) return;
      cursor.style.setProperty("--wand-x", `${event.clientX}px`);
      cursor.style.setProperty("--wand-y", `${event.clientY - 7}px`);
      cursor.classList.add("is-visible");
      document.body.classList.add("magic-cursor-enabled");

      const target = event.target instanceof Element ? event.target : null;
      cursor.classList.toggle(
        "is-hovering",
        Boolean(target?.closest("a, button, [role='button'], select, summary")),
      );
      cursor.classList.toggle(
        "is-text-entry",
        Boolean(target?.closest("input:not([type='button']):not([type='submit']):not([type='checkbox']):not([type='radio']), textarea, [contenteditable='true']")),
      );
    };
    const hideCursor = () => {
      cursor?.classList.remove("is-visible", "is-hovering", "is-text-entry");
      document.body.classList.remove("magic-cursor-enabled");
    };
    const hideOnPointerExit = (event) => {
      if (!event.relatedTarget) hideCursor();
    };

    document.addEventListener("pointermove", updateCursor);
    document.addEventListener("pointerout", hideOnPointerExit);
    window.addEventListener("blur", hideCursor);
    return () => {
      document.removeEventListener("pointermove", updateCursor);
      document.removeEventListener("pointerout", hideOnPointerExit);
      window.removeEventListener("blur", hideCursor);
      hideCursor();
    };
  }, []);

  return (
    <div className="magic-wand-cursor" ref={cursorRef} aria-hidden="true">
      <svg viewBox="0 0 32 32" focusable="false">
        <path d="M6 8 25 27" fill="none" stroke="#362115" strokeWidth="5" strokeLinecap="round" />
        <path d="M6 8 25 27" fill="none" stroke="#9a6337" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M9 11 22 24" fill="none" stroke="#e4c18b" strokeWidth=".8" strokeLinecap="round" />
        <defs>
          <radialGradient id="wand-tip-glow">
            <stop offset="0%" stopColor="#fff4cf" stopOpacity=".62" />
            <stop offset="48%" stopColor="#e6c781" stopOpacity=".28" />
            <stop offset="100%" stopColor="#e6c781" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className="wand-star">
          <circle cx="7" cy="7" r="7" fill="url(#wand-tip-glow)" />
          <path d="m7 .5 1.5 5L13.5 7 8.5 8.5 7 13.5 5.5 8.5.5 7l5-1.5z" fill="#fff5d5" stroke="#d4bc87" strokeWidth=".6" />
          <circle cx="11.5" cy="3" r=".8" fill="#fff7df" />
        </g>
      </svg>
      <span className="wand-dust wand-dust--one" />
      <span className="wand-dust wand-dust--two" />
      <span className="wand-dust wand-dust--three" />
    </div>
  );
}
