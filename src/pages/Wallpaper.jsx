import { useRef, useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import {
    parseConfigFromURL,
    DEVICE_DIMENSIONS,
    calculateWeeksLived,
    calculateDaysInYear,
    getDaysInYear,
    cn
} from '../lib/utils';
import { getDailyQuote } from '../lib/quotes';
import { GRID_LAYOUTS, FONT_OPTIONS, COLOR_THEMES } from '../lib/config';

/**
 * Wallpaper Page - Generates wallpaper images for both preview and automation
 * 
 * URL Parameters:
 * - type: 'life' | 'year' | 'goal' | 'multi'
 * - device: device key (e.g., 'iphone-15-pro-max')
 * - birth: birth date for life calendar
 * - lifespan: expected lifespan in years
 * - goalName, goalStart, goalEnd: for goal calendar
 * - headless: 'true' for automation (returns raw image)
 * - grid: 'circles' | 'squares' | 'rounded' | 'dots'
 * - font: 'inter' | 'system' | 'mono' | 'serif'
 * - theme: 'minimal' | 'ocean' | 'forest' | 'sunset' | 'rose' | 'purple' | 'gold'
 * - quotes: 'true' | 'false'
 * - streak: number of days active
 */
export function Wallpaper() {
    const [searchParams] = useSearchParams();
    const wallpaperRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const config = parseConfigFromURL(searchParams);
    const isHeadless = searchParams.get('headless') === 'true';

    // Extended config
    const gridLayout = GRID_LAYOUTS[searchParams.get('grid')] || GRID_LAYOUTS.circles;
    const font = FONT_OPTIONS[searchParams.get('font')] || FONT_OPTIONS.inter;
    const colorTheme = COLOR_THEMES[searchParams.get('theme')] || COLOR_THEMES.minimal;
    const showQuotes = searchParams.get('quotes') !== 'false';
    const streak = parseInt(searchParams.get('streak')) || 0;
    const isMultiCalendar = config.type === 'multi';

    // Get device dimensions
    const device = useMemo(() => {
        const customWidth = searchParams.get('width');
        const customHeight = searchParams.get('height');
        
        if (customWidth && customHeight) {
            return { name: 'Custom', width: parseInt(customWidth), height: parseInt(customHeight) };
        }
        
        return DEVICE_DIMENSIONS[config.device] || 
               DEVICE_DIMENSIONS[config.model] || 
               DEVICE_DIMENSIONS['iphone-15-pro-max'];
    }, [config.device, config.model, searchParams]);

    // Daily quote
    const quote = useMemo(() => getDailyQuote(), []);

    // Calculate calendar data for single calendars
    const calendarData = useMemo(() => {
        const now = new Date();
        
        if (config.type === 'life') {
            const weeksLived = calculateWeeksLived(config.birth);
            const totalWeeks = config.lifespan * 52;
            return { 
                total: totalWeeks, 
                elapsed: Math.min(weeksLived, totalWeeks), 
                columns: 52,
                label: 'Life Progress'
            };
        } 
        
        if (config.type === 'year') {
            const year = now.getFullYear();
            const totalDays = getDaysInYear(year);
            const daysElapsed = calculateDaysInYear(year);
            return { 
                total: totalDays, 
                elapsed: daysElapsed, 
                columns: 30,
                label: `${year}`
            };
        }
        
        if (config.type === 'goal') {
            const start = new Date(config.goalStart);
            const end = new Date(config.goalEnd);
            const total = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
            const elapsed = Math.max(0, Math.min(total, Math.ceil((now - start) / (1000 * 60 * 60 * 24))));
            return { 
                total, 
                elapsed, 
                columns: Math.min(20, Math.ceil(Math.sqrt(total))),
                label: config.goalName || 'Goal'
            };
        }

        // Default
        return { total: 365, elapsed: 0, columns: 20, label: 'Calendar' };
    }, [config]);

    // Multi-calendar data
    const multiCalendarData = useMemo(() => {
        if (!isMultiCalendar) return null;
        
        const now = new Date();
        const year = now.getFullYear();
        
        // Life calendar
        const weeksLived = calculateWeeksLived(config.birth);
        const totalWeeks = config.lifespan * 52;
        const lifeData = {
            total: totalWeeks,
            elapsed: Math.min(weeksLived, totalWeeks),
            columns: 26,
            label: 'Life',
            percent: Math.round((Math.min(weeksLived, totalWeeks) / totalWeeks) * 100)
        };

        // Year calendar
        const totalDays = getDaysInYear(year);
        const daysElapsed = calculateDaysInYear(year);
        const yearData = {
            total: totalDays,
            elapsed: daysElapsed,
            columns: 15,
            label: `${year}`,
            percent: Math.round((daysElapsed / totalDays) * 100)
        };

        // Goal calendar
        const start = new Date(config.goalStart);
        const end = new Date(config.goalEnd);
        const goalTotal = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
        const goalElapsed = Math.max(0, Math.min(goalTotal, Math.ceil((now - start) / (1000 * 60 * 60 * 24))));
        const goalData = {
            total: goalTotal,
            elapsed: goalElapsed,
            columns: 10,
            label: config.goalName || 'Goal',
            percent: Math.round((goalElapsed / goalTotal) * 100)
        };

        return { life: lifeData, year: yearData, goal: goalData };
    }, [isMultiCalendar, config]);

    const percentComplete = Math.min(100, Math.max(0, Math.round((calendarData.elapsed / calendarData.total) * 100)));

    // Scale factor for preview
    const scaleFactor = useMemo(() => {
        if (isHeadless || typeof window === 'undefined') return 1;
        const maxWidth = window.innerWidth * 0.85;
        const maxHeight = window.innerHeight * 0.8;
        return Math.min(1, maxWidth / device.width, maxHeight / device.height);
    }, [device, isHeadless]);

    const gridGap = Math.round(6 * (device.width / 1290));

    // Render a single calendar grid
    const renderGrid = (data, scale = 1) => {
        const cellScale = gridLayout.scale || 1;
        const gap = Math.round(gridGap * scale);
        
        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${data.columns}, 1fr)`,
                    gap: `${gap}px`,
                    width: '100%',
                }}
            >
                {Array.from({ length: Math.min(data.total, 2000) }, (_, i) => {
                    const isLived = i < data.elapsed;
                    const isCurrent = i === data.elapsed;
                    
                    return (
                        <div
                            key={i}
                            style={{
                                paddingBottom: `${100 * cellScale}%`,
                                margin: `${(1 - cellScale) * 50}%`,
                                borderRadius: gridLayout.borderRadius,
                                backgroundColor: isLived 
                                    ? colorTheme.lived 
                                    : isCurrent 
                                        ? colorTheme.current 
                                        : colorTheme.remaining,
                                opacity: !isLived && !isCurrent ? 0.3 : 1,
                                boxShadow: isCurrent ? `0 0 ${gap * 2}px ${colorTheme.current}` : 'none',
                            }}
                        />
                    );
                })}
            </div>
        );
    };

    // Download handler
    const handleDownload = async () => {
        if (!wallpaperRef.current || isGenerating) return;
        
        setIsGenerating(true);
        try {
            const dataUrl = await toPng(wallpaperRef.current, {
                width: device.width,
                height: device.height,
                pixelRatio: 1,
                cacheBust: true,
            });
            
            const link = document.createElement('a');
            link.download = `timeledger-${config.type}-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Failed to generate wallpaper:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    // For headless mode
    useEffect(() => {
        if (isHeadless && wallpaperRef.current) {
            const timer = setTimeout(async () => {
                try {
                    const dataUrl = await toPng(wallpaperRef.current, {
                        width: device.width,
                        height: device.height,
                        pixelRatio: 1,
                    });
                    document.body.innerHTML = `<img src="${dataUrl}" style="width:100%;height:auto;" />`;
                } catch (e) {
                    console.error('Headless render failed:', e);
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isHeadless, device]);

    return (
        <div className={cn(
            "min-h-screen bg-black flex items-center justify-center",
            !isHeadless && "p-4"
        )}>
            {/* Wallpaper Canvas */}
            <div
                ref={wallpaperRef}
                className="relative overflow-hidden"
                style={{
                    width: device.width,
                    height: device.height,
                    transform: isHeadless ? 'none' : `scale(${scaleFactor})`,
                    transformOrigin: 'center',
                    fontFamily: font.family,
                    backgroundColor: '#050505',
                }}
            >
                {/* Streak Counter */}
                {streak > 0 && (
                    <div
                        className="absolute flex items-center gap-1 text-white/60"
                        style={{
                            top: device.height * 0.05,
                            right: device.width * 0.06,
                            fontSize: device.width * 0.025,
                        }}
                    >
                        <span>🔥</span>
                        <span>{streak} days</span>
                    </div>
                )}

                {/* Date & Time Header */}
                <div
                    className="absolute w-full text-center"
                    style={{ top: device.height * (isMultiCalendar ? 0.08 : 0.12) }}
                >
                    <div
                        className="font-semibold text-white/80 uppercase tracking-[0.2em]"
                        style={{ fontSize: device.width * 0.028 }}
                    >
                        {new Date().toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'short', 
                            day: 'numeric' 
                        })}
                    </div>
                    <div
                        className="font-bold text-white tracking-tight tabular-nums"
                        style={{ 
                            fontSize: device.width * (isMultiCalendar ? 0.14 : 0.18),
                            marginTop: device.height * 0.005,
                            lineHeight: 1
                        }}
                    >
                        {new Date().toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit', 
                            hour12: false 
                        })}
                    </div>
                </div>

                {/* Single Calendar View */}
                {!isMultiCalendar && (
                    <>
                        <div
                            className="absolute w-full flex justify-center"
                            style={{ 
                                top: '36%',
                                paddingLeft: device.width * 0.06,
                                paddingRight: device.width * 0.06,
                            }}
                        >
                            {renderGrid(calendarData)}
                        </div>

                        {/* Footer with Progress */}
                        <div
                            className="absolute w-full text-center"
                            style={{ bottom: device.height * (showQuotes ? 0.14 : 0.10) }}
                        >
                            <div
                                className="font-semibold uppercase tracking-[0.3em]"
                                style={{ 
                                    fontSize: device.width * 0.022, 
                                    marginBottom: device.height * 0.01,
                                    color: colorTheme.accent,
                                    opacity: 0.6
                                }}
                            >
                                {calendarData.label}
                            </div>
                            <div
                                className="font-bold text-white tracking-tight"
                                style={{ fontSize: device.width * 0.12 }}
                            >
                                {percentComplete}%
                            </div>
                        </div>
                    </>
                )}

                {/* Multi-Calendar View */}
                {isMultiCalendar && multiCalendarData && (
                    <div
                        className="absolute w-full"
                        style={{
                            top: '28%',
                            paddingLeft: device.width * 0.05,
                            paddingRight: device.width * 0.05,
                        }}
                    >
                        {/* Life Calendar */}
                        <div className="mb-4" style={{ marginBottom: device.height * 0.03 }}>
                            <div className="flex justify-between items-center mb-2" style={{ marginBottom: device.height * 0.01 }}>
                                <span 
                                    className="font-semibold uppercase tracking-wider"
                                    style={{ fontSize: device.width * 0.02, color: colorTheme.accent, opacity: 0.7 }}
                                >
                                    {multiCalendarData.life.label}
                                </span>
                                <span 
                                    className="font-bold text-white"
                                    style={{ fontSize: device.width * 0.035 }}
                                >
                                    {multiCalendarData.life.percent}%
                                </span>
                            </div>
                            {renderGrid(multiCalendarData.life, 0.7)}
                        </div>

                        {/* Year Calendar */}
                        <div style={{ marginBottom: device.height * 0.03 }}>
                            <div className="flex justify-between items-center mb-2" style={{ marginBottom: device.height * 0.01 }}>
                                <span 
                                    className="font-semibold uppercase tracking-wider"
                                    style={{ fontSize: device.width * 0.02, color: colorTheme.accent, opacity: 0.7 }}
                                >
                                    {multiCalendarData.year.label}
                                </span>
                                <span 
                                    className="font-bold text-white"
                                    style={{ fontSize: device.width * 0.035 }}
                                >
                                    {multiCalendarData.year.percent}%
                                </span>
                            </div>
                            {renderGrid(multiCalendarData.year, 0.8)}
                        </div>

                        {/* Goal Calendar */}
                        <div>
                            <div className="flex justify-between items-center mb-2" style={{ marginBottom: device.height * 0.01 }}>
                                <span 
                                    className="font-semibold uppercase tracking-wider"
                                    style={{ fontSize: device.width * 0.02, color: colorTheme.accent, opacity: 0.7 }}
                                >
                                    {multiCalendarData.goal.label}
                                </span>
                                <span 
                                    className="font-bold text-white"
                                    style={{ fontSize: device.width * 0.035 }}
                                >
                                    {multiCalendarData.goal.percent}%
                                </span>
                            </div>
                            {renderGrid(multiCalendarData.goal, 0.9)}
                        </div>
                    </div>
                )}

                {/* Daily Quote */}
                {showQuotes && (
                    <div
                        className="absolute w-full text-center px-8"
                        style={{ 
                            bottom: device.height * 0.04,
                            paddingLeft: device.width * 0.08,
                            paddingRight: device.width * 0.08,
                        }}
                    >
                        <p
                            className="text-white/50 italic leading-snug"
                            style={{ fontSize: device.width * 0.022 }}
                        >
                            "{quote.text}"
                        </p>
                        <p
                            className="text-white/30 mt-1"
                            style={{ fontSize: device.width * 0.018 }}
                        >
                            — {quote.author}
                        </p>
                    </div>
                )}
            </div>

            {/* Download Button (only in preview mode) */}
            {!isHeadless && (
                <button
                    onClick={handleDownload}
                    disabled={isGenerating}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white text-black px-8 py-4 rounded-2xl font-semibold text-sm shadow-2xl hover:bg-zinc-100 active:scale-95 transition-all z-50 flex items-center gap-2 disabled:opacity-50"
                >
                    <Download className="w-5 h-5" />
                    {isGenerating ? 'Generating...' : 'Download Wallpaper'}
                </button>
            )}
        </div>
    );
}

export default Wallpaper;
