import { useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { cn, DEVICE_DIMENSIONS, COLOR_PRESETS } from '../lib/utils';
import { LifeCalendar } from './LifeCalendar';
import { YearCalendar } from './YearCalendar';
import { GoalCalendar } from './GoalCalendar';

/**
 * Wallpaper Preview Component
 * Shows a preview of the wallpaper and handles export
 */
export function WallpaperPreview({
    config,
    showDownload = true,
    className
}) {
    const previewRef = useRef(null);
    const device = DEVICE_DIMENSIONS[config.device] || DEVICE_DIMENSIONS.iphone14;
    const colors = COLOR_PRESETS[config.color] || COLOR_PRESETS.green;

    // Calculate aspect ratio for preview
    const aspectRatio = device.height / device.width;
    const previewWidth = 280;
    const previewHeight = previewWidth * aspectRatio;

    // Background styles based on theme
    const getBackgroundStyle = () => {
        switch (config.theme) {
            case 'light':
                return { background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)' };
            case 'gradient':
                return {
                    background: `linear-gradient(135deg, ${colors.lived}22 0%, #0a0a0a 50%, ${colors.lived}11 100%)`
                };
            case 'dark':
            default:
                return { background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)' };
        }
    };

    // Download wallpaper as PNG
    const handleDownload = useCallback(async () => {
        if (!previewRef.current) return;

        try {
            // Create a hidden element at full resolution for export
            const exportContainer = document.createElement('div');
            exportContainer.style.position = 'absolute';
            exportContainer.style.left = '-9999px';
            exportContainer.style.width = `${device.width}px`;
            exportContainer.style.height = `${device.height}px`;
            document.body.appendChild(exportContainer);

            // Clone the preview content
            const clone = previewRef.current.cloneNode(true);
            clone.style.width = '100%';
            clone.style.height = '100%';
            clone.style.transform = 'none';
            exportContainer.appendChild(clone);

            // Generate image
            const dataUrl = await toPng(exportContainer, {
                width: device.width,
                height: device.height,
                pixelRatio: 1,
            });

            // Cleanup
            document.body.removeChild(exportContainer);

            // Download
            const link = document.createElement('a');
            link.download = `timeledger-${config.type}-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Failed to generate wallpaper:', error);
        }
    }, [config, device]);

    // Copy URL for iOS Shortcuts
    const handleCopyURL = useCallback(() => {
        const params = new URLSearchParams();
        Object.entries(config).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params.set(key, value.toString());
            }
        });

        const url = `${window.location.origin}/wallpaper?${params.toString()}`;
        navigator.clipboard.writeText(url);

        // Show toast or feedback
        alert('URL copied! Use this in iOS Shortcuts with "Get Contents of URL" action.');
    }, [config]);

    const renderCalendar = () => {
        const commonProps = {
            colorScheme: config.color,
            layout: config.layout,
            showLabels: false,
        };

        // Pre-compute default dates to avoid impure function calls during render
        const today = new Date();
        const defaultEnd = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
        const todayStr = today.toISOString().split('T')[0];
        const defaultEndStr = defaultEnd.toISOString().split('T')[0];

        switch (config.type) {
            case 'year':
                return <YearCalendar {...commonProps} />;
            case 'goal':
                return (
                    <GoalCalendar
                        {...commonProps}
                        startDate={config.goalStart || todayStr}
                        endDate={config.goalEnd || defaultEndStr}
                        goalName={config.goalName || 'My Goal'}
                    />
                );
            case 'life':
            default:
                return (
                    <LifeCalendar
                        {...commonProps}
                        birthDate={config.birth || '1995-01-01'}
                        lifespan={config.lifespan || 80}
                    />
                );
        }
    };

    return (
        <div className={cn('flex flex-col items-center', className)}>
            {/* Device Frame */}
            <div className="relative">
                {/* Phone frame */}
                <div
                    className="rounded-[3rem] p-3 bg-gray-800 shadow-2xl"
                    style={{ width: previewWidth + 24 }}
                >
                    {/* Screen */}
                    <div
                        ref={previewRef}
                        className="rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center"
                        style={{
                            width: previewWidth,
                            height: previewHeight,
                            ...getBackgroundStyle(),
                        }}
                    >
                        {/* Time display (mock) */}
                        <div className="absolute top-8 left-0 right-0 text-center">
                            <p className={cn(
                                'text-4xl font-light',
                                config.theme === 'light' ? 'text-gray-800' : 'text-white'
                            )}>
                                {new Date().toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true
                                }).replace(' ', '')}
                            </p>
                            <p className={cn(
                                'text-sm mt-1',
                                config.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                            )}>
                                {new Date().toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>

                        {/* Calendar */}
                        <div className="mt-16 scale-[0.4] origin-center">
                            {renderCalendar()}
                        </div>

                        {/* Label */}
                        <div className={cn(
                            'absolute bottom-12 text-center',
                            config.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                        )}>
                            <p className="text-xs font-medium tracking-wide uppercase">
                                {config.type === 'life' ? 'Life in Weeks' :
                                    config.type === 'year' ? 'Year Progress' :
                                        config.goalName || 'Goal Progress'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Dynamic Island (for newer iPhones) */}
                {config.device?.includes('14pro') || config.device?.includes('15') ? (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full" />
                ) : null}
            </div>

            {/* Device name */}
            <p className="mt-4 text-sm text-gray-500">
                {device.name} • {device.width}×{device.height}
            </p>

            {/* Actions */}
            {showDownload && (
                <div className="mt-6 flex gap-3">
                    <button
                        onClick={handleDownload}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
                    >
                        ⬇️ Download Wallpaper
                    </button>
                    <button
                        onClick={handleCopyURL}
                        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all"
                    >
                        📋 Copy URL
                    </button>
                </div>
            )}
        </div>
    );
}

export default WallpaperPreview;
