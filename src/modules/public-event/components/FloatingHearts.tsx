"use client";

import { useEffect, useRef } from "react";

export function FloatingHearts() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        window.addEventListener("resize", resize);

        const currentCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        const HEART_COUNT = window.innerWidth < 768 ? 60 : 100;
        const BASE_RADIUS_FACTOR = 0.5;
        const RADIUS_BREATH = 0.18;
        const MAX_ALPHA = 0.38;
        const FADE_SPEED = 0.012;
        const SPIN_SPEED_MIN = 0.0006;
        const SPIN_SPEED_MAX = 0.0016;
        const CURSOR_LERP = 0.05; // Slightly smoother

        const hearts = Array.from({ length: HEART_COUNT }, (_, i) => ({
            angle: (Math.PI * 2 * i) / HEART_COUNT,
            spin: SPIN_SPEED_MIN + Math.random() * (SPIN_SPEED_MAX - SPIN_SPEED_MIN),
            size: 5 + Math.random() * 2,
            radiusPhase: Math.random() * Math.PI * 2,
            fadePhase: Math.random() * Math.PI * 2,
        }));

        const drawHeart = (x: number, y: number, s: number) => {
            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x - s, y - s, x - s * 2, y + s / 2, x, y + s * 2);
            ctx.bezierCurveTo(x + s * 2, y + s / 2, x + s, y - s, x, y);
        };

        let raf: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Time-based LERP for smooth movement even when mouse stops
            currentCenter.x += (targetMouse.x - currentCenter.x) * CURSOR_LERP;
            currentCenter.y += (targetMouse.y - currentCenter.y) * CURSOR_LERP;

            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const BASE_RADIUS = Math.min(vw, vh) * BASE_RADIUS_FACTOR;

            ctx.beginPath(); // Start one path (actually we need separate opacity so we can't batch perfectly unless we group by alpha)
            // But for distinct alpha we must loop.

            for (const h of hearts) {
                h.angle += h.spin;
                h.radiusPhase += 0.01;
                h.fadePhase += FADE_SPEED;

                const radius = BASE_RADIUS + Math.sin(h.radiusPhase) * BASE_RADIUS * RADIUS_BREATH;

                const x = currentCenter.x + Math.cos(h.angle) * radius;
                const y = currentCenter.y + Math.sin(h.angle) * radius;

                const alpha = Math.max(0, Math.sin(h.fadePhase)) * MAX_ALPHA;

                if (alpha < 0.01) continue;

                ctx.fillStyle = `rgba(220, 38, 38, ${alpha})`;

                // Draw single heart
                ctx.beginPath();
                drawHeart(x, y, h.size);
                ctx.fill();
            }

            raf = requestAnimationFrame(animate);
        };

        animate();

        const onMove = (e: MouseEvent) => {
            targetMouse.x = e.clientX;
            targetMouse.y = e.clientY;
        };

        window.addEventListener("mousemove", onMove);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
}
