"use client";

import { useRef, useEffect } from "react";

type WavesProps = {
  lineColor?: string;
  backgroundColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
  xGap?: number;
  yGap?: number;
};

const Waves: React.FC<WavesProps> = ({
  lineColor = "rgba(255, 255, 255, 0.3)",
  backgroundColor = "transparent",
  waveSpeedX = 0.02,
  waveSpeedY = 0.01,
  waveAmpX = 40,
  waveAmpY = 20,
  friction = 0.9,
  tension = 0.01,
  maxCursorMove = 120,
  xGap = 12,
  yGap = 36,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let points: any[] = [];
    let lastMousePos = { x: 0, y: 0 };

    const init = () => {
      points = [];
      for (let x = -xGap; x < width + xGap; x += xGap) {
        for (let y = -yGap; y < height + yGap; y += yGap) {
          points.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = lineColor;
      ctx.beginPath();

      points.forEach((p) => {
        const dx = lastMousePos.x - p.x;
        const dy = lastMousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxCursorMove) {
          const force = (maxCursorMove - dist) / maxCursorMove;
          p.vx += dx * force * tension;
          p.vy += dy * force * tension;
        }

        p.vx *= friction; p.vy *= friction;
        p.x += p.vx + Math.sin(Date.now() * waveSpeedX + p.ox) * waveAmpX * 0.01;
        p.y += p.vy + Math.cos(Date.now() * waveSpeedY + p.oy) * waveAmpY * 0.01;
        ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
      requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => { lastMousePos = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", handleMouseMove);
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener("resize", handleResize);

    init(); render();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [lineColor, backgroundColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

export default Waves;
