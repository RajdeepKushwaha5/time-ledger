import { useState } from 'react';
import { cn, DEVICE_DIMENSIONS, COLOR_PRESETS } from '../lib/utils';

/**
 * Configuration Form Component
 * Allows users to customize their calendar wallpaper
 */
export function ConfigForm({
    config,
    onConfigChange,
    className
}) {
    const [activeTab, setActiveTab] = useState(config.type || 'life');

    const handleChange = (key, value) => {
        onConfigChange({ ...config, [key]: value });
    };

    const tabs = [
        { id: 'life', label: 'Life Calendar', icon: '🗓️' },
        { id: 'year', label: 'Year Calendar', icon: '📅' },
        { id: 'goal', label: 'Goal Calendar', icon: '🎯' },
    ];

    // Group devices by OS
    const deviceGroups = {
        iOS: Object.entries(DEVICE_DIMENSIONS).filter(([key]) => key.startsWith('iphone')),
        Android: Object.entries(DEVICE_DIMENSIONS).filter(([key]) =>
            key.startsWith('pixel') || key.startsWith('samsung') || key.startsWith('oneplus')
        ),
        Generic: Object.entries(DEVICE_DIMENSIONS).filter(([key]) => key.startsWith('generic')),
    };

    return (
        <div className={cn('w-full max-w-md mx-auto', className)}>
            {/* Calendar Type Tabs */}
            <div className="flex gap-2 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => {
                            setActiveTab(tab.id);
                            handleChange('type', tab.id);
                        }}
                        className={cn(
                            'flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all',
                            activeTab === tab.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        )}
                    >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
                {/* Life Calendar specific fields */}
                {activeTab === 'life' && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Birth Date
                            </label>
                            <input
                                type="date"
                                value={config.birth || ''}
                                onChange={(e) => handleChange('birth', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Expected Lifespan (years)
                            </label>
                            <input
                                type="range"
                                min="60"
                                max="100"
                                value={config.lifespan || 80}
                                onChange={(e) => handleChange('lifespan', parseInt(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>60</span>
                                <span className="text-blue-400 font-medium">{config.lifespan || 80} years</span>
                                <span>100</span>
                            </div>
                        </div>
                    </>
                )}

                {/* Goal Calendar specific fields */}
                {activeTab === 'goal' && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Goal Name
                            </label>
                            <input
                                type="text"
                                value={config.goalName || ''}
                                onChange={(e) => handleChange('goalName', e.target.value)}
                                placeholder="e.g., Project Deadline"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={config.goalStart || ''}
                                    onChange={(e) => handleChange('goalStart', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={config.goalEnd || ''}
                                    onChange={(e) => handleChange('goalEnd', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* Device Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Device
                    </label>
                    <select
                        value={config.device || 'iphone14'}
                        onChange={(e) => handleChange('device', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {Object.entries(deviceGroups).map(([group, devices]) => (
                            <optgroup key={group} label={group}>
                                {devices.map(([key, dim]) => (
                                    <option key={key} value={key}>
                                        {dim.name} ({dim.width}×{dim.height})
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>

                {/* Color Scheme */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Color Scheme
                    </label>
                    <div className="flex gap-3">
                        {Object.entries(COLOR_PRESETS).map(([name, colors]) => (
                            <button
                                key={name}
                                onClick={() => handleChange('color', name)}
                                className={cn(
                                    'w-10 h-10 rounded-full transition-all',
                                    config.color === name
                                        ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-110'
                                        : 'hover:scale-105'
                                )}
                                style={{ backgroundColor: colors.lived }}
                                title={name.charAt(0).toUpperCase() + name.slice(1)}
                            />
                        ))}
                    </div>
                </div>

                {/* Layout Style */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Layout Style
                    </label>
                    <div className="flex gap-3">
                        {['grid', 'dots'].map((style) => (
                            <button
                                key={style}
                                onClick={() => handleChange('layout', style)}
                                className={cn(
                                    'flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all capitalize',
                                    config.layout === style
                                        ? 'bg-white/20 text-white'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                )}
                            >
                                {style === 'grid' ? '▪️ Grid' : '⚫ Dots'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Theme */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Background Theme
                    </label>
                    <div className="flex gap-3">
                        {['dark', 'light', 'gradient'].map((theme) => (
                            <button
                                key={theme}
                                onClick={() => handleChange('theme', theme)}
                                className={cn(
                                    'flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all capitalize',
                                    config.theme === theme
                                        ? 'bg-white/20 text-white'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                )}
                            >
                                {theme}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfigForm;
