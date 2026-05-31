'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LAUNCH = new Date('2026-06-18T10:00:00Z').getTime();

function getVals() {
  let delta = Math.max(0, LAUNCH - Date.now());
  const d = Math.floor(delta / 86400000); delta -= d * 86400000;
  const h = Math.floor(delta / 3600000); delta -= h * 3600000;
  const m = Math.floor(delta / 60000); delta -= m * 60000;
  const s = Math.floor(delta / 1000);
  return {
    d: String(d).padStart(2,'0'),
    h: String(h).padStart(2,'0'),
    m: String(m).padStart(2,'0'),
    s: String(s).padStart(2,'0'),
  };
}

interface Props {
  color?: string;
}

export default function Countdown({ color }: Props) {
  const dRef = useRef<HTMLSpanElement>(null);
  const hRef = useRef<HTMLSpanElement>(null);
  const mRef = useRef<HTMLSpanElement>(null);
  const sRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tick = () => {
      const v = getVals();
      if (dRef.current) dRef.current.textContent = v.d;
      if (hRef.current) hRef.current.textContent = v.h;
      if (mRef.current) mRef.current.textContent = v.m;
      if (sRef.current) sRef.current.textContent = v.s;
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const style = color ? { color, borderColor: color } : undefined;
  const cellBorder = color ? { borderRightColor: color } : undefined;

  return (
    <div className="countdown" style={style}>
      <div className="cell" data-cd-cell="d" style={cellBorder}>
        <span className="num" ref={dRef}>--</span>
        <div className="lab" style={color ? { color: `${color}b0` } : undefined}>Days</div>
      </div>
      <div className="cell" data-cd-cell="h" style={cellBorder}>
        <span className="num" ref={hRef}>--</span>
        <div className="lab" style={color ? { color: `${color}b0` } : undefined}>Hours</div>
      </div>
      <div className="cell" data-cd-cell="m" style={cellBorder}>
        <span className="num" ref={mRef}>--</span>
        <div className="lab" style={color ? { color: `${color}b0` } : undefined}>Minutes</div>
      </div>
      <div className="cell" data-cd-cell="s">
        <span className="num" ref={sRef}>--</span>
        <div className="lab" style={color ? { color: `${color}b0` } : undefined}>Seconds</div>
      </div>
    </div>
  );
}
