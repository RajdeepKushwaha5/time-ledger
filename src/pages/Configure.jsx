import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfigForm } from '../components/ConfigForm';
import { WallpaperPreview } from '../components/WallpaperPreview';

/**
 * Configure Page - Main configuration interface
 */
export function Configure() {
    const [config, setConfig] = useState({
        type: 'life',
        birth: '1995-01-01',
        lifespan: 80,
        device: 'iphone14',
        theme: 'dark',
        color: 'green',
        layout: 'grid',
        goalName: '',
        goalStart: '',
        goalEnd: '',
    });

    return (
        <div className="min-h-screen py-12 px-6">
            {/* Header */}
            <header className="max-w-6xl mx-auto mb-12">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
                >
                    ← Back to Home
                </Link>
                <h1 className="text-4xl font-bold gradient-text">
                    Configure Your Wallpaper
                </h1>
                <p className="text-gray-400 mt-2">
                    Customize your life calendar and generate a dynamic wallpaper
                </p>
            </header>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Configuration Form */}
                    <div className="glass rounded-3xl p-8">
                        <h2 className="text-xl font-semibold text-white mb-6">
                            Calendar Settings
                        </h2>
                        <ConfigForm
                            config={config}
                            onConfigChange={setConfig}
                        />
                    </div>

                    {/* Preview */}
                    <div className="lg:sticky lg:top-8">
                        <div className="glass rounded-3xl p-8">
                            <h2 className="text-xl font-semibold text-white mb-6 text-center">
                                Live Preview
                            </h2>
                            <WallpaperPreview config={config} />
                        </div>

                        {/* iOS Shortcut Instructions */}
                        <div className="mt-6 glass rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-3">
                                📱 iOS Shortcut Setup
                            </h3>
                            <ol className="text-sm text-gray-400 space-y-2">
                                <li>1. Click "Copy URL" above</li>
                                <li>2. Open Shortcuts app → Automation → New</li>
                                <li>3. Choose "Time of Day" → 6:00 AM → Run Immediately</li>
                                <li>4. Add "Get Contents of URL" → Paste URL</li>
                                <li>5. Add "Set Wallpaper" → Lock Screen only</li>
                                <li>6. Done! Your wallpaper updates daily</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Configure;
