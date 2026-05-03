'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const PAGES = {
    leftStatic:  '/designs/rome.png',
    rightStatic: '/designs/canada.png',
    flip1Front:  '/designs/istambul.png',
    flip1Back:   '/designs/las_vegas.png',
    flip2Front:  '/designs/las_vegas.png',
    flip2Back:   '/designs/canada.png',
};

const imgStyle = {
    width: '100%', flex: 1, minHeight: 0,
    objectFit: 'cover', borderRadius: '3px', display: 'block',
};

const KorakPoKorak = () => {
    const { t } = useTranslation();

    const sectionRef    = useRef(null);
    const flip1Ref      = useRef(null);
    const flip2Ref      = useRef(null);
    const shadowRef     = useRef(null);
    const shineRef      = useRef(null);
    const ctaBtnRef     = useRef(null);
    const stepRefs      = useRef([]);
    // image element refs for pop-in animations
    const leftImgRef    = useRef(null);
    const flip1ImgRef   = useRef(null);
    const flip2ImgRef   = useRef(null);
    const rightImgRef   = useRef(null);

    useEffect(() => {
        let gsap, ScrollTrigger;

        const init = async () => {
            const gsapModule = await import('gsap');
            const stModule   = await import('gsap/ScrollTrigger');
            gsap = gsapModule.gsap;
            ScrollTrigger = stModule.ScrollTrigger;
            gsap.registerPlugin(ScrollTrigger);

            let current = -1;

            const popIn = (imgRef, delay = 0) => {
                if (!imgRef.current) return;
                gsap.fromTo(imgRef.current,
                    { scale: 0.88, opacity: 0, y: 10 },
                    { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)', delay }
                );
            };

            const resetImg = (imgRef) => {
                if (!imgRef.current) return;
                gsap.set(imgRef.current, { scale: 0.88, opacity: 0, y: 10 });
            };

            const flipPage = (flipRef, revealImgRef) =>
                gsap.timeline()
                    .to(flipRef.current, {
                        keyframes: [
                            { rotateY: -90,  translateZ: 36, duration: 0.38, ease: 'power1.in'  },
                            { rotateY: -180, translateZ: 0,  duration: 0.38, ease: 'power1.out' },
                        ],
                    }, 0)
                    .to(shadowRef.current, { opacity: 1, duration: 0.32, ease: 'power1.in'  }, 0)
                    .to(shadowRef.current, { opacity: 0, duration: 0.38, ease: 'power1.out' }, 0.38)
                    .to(shineRef.current,  { opacity: 0.6, duration: 0.22, ease: 'power1.in'  }, 0.12)
                    .to(shineRef.current,  { opacity: 0,   duration: 0.28, ease: 'power1.out' }, 0.48)
                    .call(() => popIn(revealImgRef), null, 0.58);

            const unflipPage = (flipRef, hideImgRef) =>
                gsap.timeline()
                    .call(() => resetImg(hideImgRef))
                    .to(flipRef.current, {
                        keyframes: [
                            { rotateY: -90, translateZ: 36, duration: 0.38, ease: 'power1.in'  },
                            { rotateY: 0,   translateZ: 0,  duration: 0.38, ease: 'power1.out' },
                        ],
                    }, 0)
                    .to(shadowRef.current, { opacity: 1, duration: 0.32, ease: 'power1.in'  }, 0)
                    .to(shadowRef.current, { opacity: 0, duration: 0.38, ease: 'power1.out' }, 0.38)
                    .call(() => popIn(flip1ImgRef), null, 0.76);

            const setStep = (index) => {
                if (index === current) return;
                const prev = current;
                current = index;

                stepRefs.current.forEach((s, i) => {
                    if (!s) return;
                    gsap.to(s, {
                        opacity: i === index ? 1 : 0.2,
                        x: i === index ? 0 : -8,
                        duration: 0.4,
                        ease: 'power2.out',
                    });
                    s.style.borderLeftColor = i === index ? '#1a1a1a' : 'transparent';
                });

                if (index > prev) {
                    if (index === 1) flipPage(flip1Ref, flip2ImgRef);
                    if (index === 2) flipPage(flip2Ref, rightImgRef);
                } else {
                    if (index === 1) unflipPage(flip2Ref, rightImgRef);
                    if (index === 0) unflipPage(flip1Ref, flip2ImgRef);
                }

                gsap.to(ctaBtnRef.current, {
                    opacity: index === 2 ? 1 : 0,
                    y: index === 2 ? 0 : 8,
                    duration: 0.4,
                });
            };

            // images revealed only after their page is flipped to start hidden
            resetImg(flip2ImgRef);
            resetImg(rightImgRef);

            setStep(0);

            // pop in the two initially visible images with a slight stagger
            popIn(leftImgRef, 0.1);
            popIn(flip1ImgRef, 0.25);

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom bottom',
                onUpdate: (self) => {
                    const p = self.progress;
                    setStep(p < 0.33 ? 0 : p < 0.66 ? 1 : 2);
                },
            });
        };

        init();

        return () => {
            import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
                ScrollTrigger.getAll().forEach(t => t.kill());
            });
        };
    }, []);

    const flipPageStyle = {
        position: 'absolute', top: 0, bottom: 0,
        left: '50%', width: '50%',
        transformOrigin: 'left center',
        transformStyle: 'preserve-3d',
    };

    const faceStyle = (isBack = false) => ({
        position: 'absolute', inset: 0,
        background: isBack
            ? 'linear-gradient(90deg, #fafaf8 0%, #fefefe 100%)'
            : 'linear-gradient(90deg, #fefefe 0%, #fafaf8 100%)',
        padding: '18px 14px 14px',
        display: 'flex', flexDirection: 'column', gap: '8px',
        backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
        borderRadius: '0 8px 8px 0', overflow: 'hidden',
        ...(isBack ? { transform: 'rotateY(180deg) scaleX(-1)' } : {}),
    });

    const textLines = (widths = ['100%', '75%', '50%']) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '4px' }}>
            {widths.map((w, i) => (
                <div key={i} style={{ height: '2.5px', background: '#ede9e3', borderRadius: '2px', width: w }} />
            ))}
        </div>
    );

    const pageNum = (n) => (
        <div style={{ fontSize: '10px', color: '#ccc', textAlign: 'center', fontFamily: 'sans-serif', marginTop: 'auto', paddingTop: '6px' }}>{n}</div>
    );

    return (
        <div ref={sectionRef} style={{ height: '400vh' }} className="relative">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden" style={{ background: '#f9f6f2' }}>

                <div className="text-center px-8 mb-10">
                    <h2 className="text-3xl lg:text-4xl font-semibold mb-3 text-gray-900">
                        {t('koraci.heading')}
                    </h2>
                    <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed font-sans">
                        {t('koraci.paragraf')}
                    </p>
                </div>

                <div className="flex items-center gap-12 px-8 sm:px-16 lg:px-32 max-w-7xl mx-auto w-full">

                    {/* book */}
                    <div className="flex-1 flex justify-center items-center" style={{ perspective: '1600px' }}>
                        <div className="relative" style={{ width: '780px', height: '600px', filter: 'drop-shadow(-10px 14px 36px rgba(0,0,0,0.16))' }}>

                            <div style={{ position: 'absolute', bottom: '-12px', left: '20px', right: '10px', height: '18px', background: 'rgba(0,0,0,0.1)', borderRadius: '50%', filter: 'blur(8px)' }} />

                            <div style={{ position: 'absolute', inset: 0, display: 'flex', borderRadius: '2px 10px 10px 2px', overflow: 'visible' }}>

                                {/* spine */}
                                <div style={{
                                    width: '28px', flexShrink: 0,
                                    background: 'linear-gradient(90deg, #1e2a38 0%, #2d3a4a 40%, #3a4a5c 60%, #2d3a4a 100%)',
                                    borderRadius: '2px 0 0 2px', position: 'relative', zIndex: 10,
                                    boxShadow: 'inset -2px 0 6px rgba(0,0,0,0.3)',
                                }}>
                                    <div style={{ position: 'absolute', top: '20px', bottom: '20px', left: '6px', width: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: '1px' }} />
                                </div>

                                {/* pages area */}
                                <div style={{
                                    flex: 1, display: 'flex', position: 'relative',
                                    background: '#fefefe', borderRadius: '0 8px 8px 0',
                                    boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.06)',
                                }}>
                                    {/* center fold shadow */}
                                    <div style={{
                                        position: 'absolute', top: 0, bottom: 0, left: '50%',
                                        width: '12px', transform: 'translateX(-50%)',
                                        background: 'linear-gradient(90deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.04) 100%)',
                                        zIndex: 5, pointerEvents: 'none',
                                    }} />

                                    {/* left static page */}
                                    <div style={{
                                        position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%',
                                        padding: '18px 14px 14px', display: 'flex', flexDirection: 'column', gap: '8px',
                                        background: 'linear-gradient(90deg, #fafaf8 0%, #fefefe 100%)',
                                    }}>
                                        <img ref={leftImgRef} src={PAGES.leftStatic} alt="" style={imgStyle} />
                                        {textLines(['100%', '70%', '45%'])}
                                        {pageNum(1)}
                                    </div>

                                    {/* right static page — deepest layer, revealed after both flips */}
                                    <div style={{
                                        position: 'absolute', top: 0, bottom: 0, right: 0, width: '50%',
                                        padding: '18px 14px 14px', display: 'flex', flexDirection: 'column', gap: '8px',
                                        background: 'linear-gradient(90deg, #fefefe 0%, #fafaf8 100%)',
                                        zIndex: 6,
                                    }}>
                                        <img ref={rightImgRef} src={PAGES.rightStatic} alt="" style={imgStyle} />
                                        {textLines(['55%', '100%', '80%'])}
                                        {pageNum(4)}
                                    </div>

                                    {/* shadow cast across book during flip */}
                                    <div ref={shadowRef} style={{
                                        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
                                        background: 'linear-gradient(90deg, transparent 20%, rgba(0,0,0,0.04) 40%, rgba(0,0,0,0.16) 50%, rgba(0,0,0,0.04) 60%, transparent 80%)',
                                        opacity: 0, zIndex: 25, pointerEvents: 'none',
                                    }} />

                                    {/* flip page 2 — second to flip */}
                                    <div ref={flip2Ref} style={{ ...flipPageStyle, zIndex: 21 }}>
                                        <div style={faceStyle(false)}>
                                            <img ref={flip2ImgRef} src={PAGES.flip2Front} alt="" style={imgStyle} />
                                            {textLines(['55%', '100%', '75%'])}
                                            {pageNum(3)}
                                            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '10px', background: 'linear-gradient(90deg, rgba(0,0,0,0.07), transparent)', pointerEvents: 'none' }} />
                                        </div>
                                        <div style={faceStyle(true)}>
                                            <img src={PAGES.flip2Back} alt="" style={imgStyle} />
                                            {textLines(['100%', '80%', '50%'])}
                                            {pageNum('3b')}
                                        </div>
                                    </div>

                                    {/* flip page 1 — first to flip */}
                                    <div ref={flip1Ref} style={{ ...flipPageStyle, zIndex: 22 }}>
                                        <div style={faceStyle(false)}>
                                            <img ref={flip1ImgRef} src={PAGES.flip1Front} alt="" style={imgStyle} />
                                            {textLines(['55%', '100%', '75%'])}
                                            {pageNum(2)}
                                            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '10px', background: 'linear-gradient(90deg, rgba(0,0,0,0.07), transparent)', pointerEvents: 'none' }} />
                                            <div ref={shineRef} style={{
                                                position: 'absolute', inset: 0,
                                                background: 'linear-gradient(120deg, transparent 25%, rgba(255,255,255,0.6) 50%, transparent 75%)',
                                                opacity: 0, pointerEvents: 'none',
                                            }} />
                                        </div>
                                        <div style={faceStyle(true)}>
                                            <img src={PAGES.flip1Back} alt="" style={imgStyle} />
                                            {textLines(['100%', '80%', '50%'])}
                                            {pageNum('2b')}
                                        </div>
                                    </div>

                                </div>

                                {/* pages stack edge */}
                                <div style={{
                                    position: 'absolute', top: '2px', bottom: '2px', right: '-4px', width: '8px',
                                    background: 'repeating-linear-gradient(to bottom, #e8e3db, #e8e3db 1px, #f0ece6 1px, #f0ece6 3px)',
                                    borderRadius: '0 4px 4px 0',
                                }} />

                            </div>
                        </div>
                    </div>

                    {/* steps */}
                    <div className="flex-1 flex flex-col gap-10" style={{ maxWidth: '600' }}>
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                ref={el => stepRefs.current[i] = el}
                                style={{
                                    paddingLeft: '22px',
                                    borderLeft: '2px solid transparent',
                                    opacity: i === 0 ? 1 : 0.2,
                                    transform: i === 0 ? 'translateX(0)' : 'translateX(-8px)',
                                    transition: 'border-color 0.3s ease',
                                }}
                            >
                                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: '#bbb', marginBottom: '7px', fontFamily: 'sans-serif' }}>
                                    {`0${i + 1}`}
                                </p>
                                <p style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px', fontFamily: 'sans-serif' }}>
                                    {t(`koraci.korak${i + 1}.naslov`)}
                                </p>
                                <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.75, fontFamily: 'sans-serif' }}>
                                    {t(`koraci.korak${i + 1}.tekst`)}
                                </p>
                            </div>
                        ))}

                        <div ref={ctaBtnRef} style={{ opacity: 0, transform: 'translateY(8px)' }}>
                            <Link href="/create-your-design">
                                <button className="bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition-colors font-sans tracking-wide">
                                    {t('koraci.btn')} →
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default KorakPoKorak;
