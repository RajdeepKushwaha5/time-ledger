import { Link } from 'react-router-dom';
import { LifeCalendar } from '../components/LifeCalendar';

/**
 * Home Page - Landing page with hero section
 */
export function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
                {/* Background glow effects */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    {/* Logo/Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                        <span className="text-2xl">⏳</span>
                        <span className="text-sm font-medium text-gray-300">TimeLedger</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        <span className="gradient-text">Visualize Your Life</span>
                        <br />
                        <span className="text-white">One Week at a Time</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Transform your lock screen into a powerful reminder of time's passage.
                        Beautiful, minimalist wallpapers that update daily through iOS Shortcuts.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link
                            to="/configure"
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold text-lg transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1"
                        >
                            Create Your Wallpaper →
                        </Link>
                        <a
                            href="#features"
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-semibold text-lg transition-all border border-white/10"
                        >
                            Learn More
                        </a>
                    </div>

                    {/* Preview Calendar */}
                    <div className="glass rounded-3xl p-8 max-w-2xl mx-auto animate-fade-in">
                        <LifeCalendar
                            birthDate="1995-05-15"
                            lifespan={80}
                            colorScheme="green"
                            layout="grid"
                            showLabels={true}
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
                        Three Ways to Visualize Time
                    </h2>
                    <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
                        Choose the calendar that resonates with your goals and mindset
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Life Calendar */}
                        <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-all group">
                            <div className="text-4xl mb-4">🗓️</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Life Calendar</h3>
                            <p className="text-gray-400 mb-4">
                                See your entire life as a grid of weeks. A humbling perspective on
                                the finite nature of time.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-2">
                                <li>• 52 weeks × 80 years</li>
                                <li>• Track weeks lived vs remaining</li>
                                <li>• Customizable lifespan</li>
                            </ul>
                        </div>

                        {/* Year Calendar */}
                        <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-all group">
                            <div className="text-4xl mb-4">📅</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Year Calendar</h3>
                            <p className="text-gray-400 mb-4">
                                Track your progress through the current year. Perfect for
                                annual goals and resolutions.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-2">
                                <li>• 365/366 days visualization</li>
                                <li>• Daily progress updates</li>
                                <li>• Percentage complete</li>
                            </ul>
                        </div>

                        {/* Goal Calendar */}
                        <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-all group">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Goal Calendar</h3>
                            <p className="text-gray-400 mb-4">
                                Custom timeline for any goal. Set start and end dates for
                                projects, challenges, or milestones.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-2">
                                <li>• Custom date ranges</li>
                                <li>• Named goals</li>
                                <li>• Progress bar</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 px-6 bg-white/[0.02]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
                        How It Works
                    </h2>
                    <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
                        Set up your dynamic wallpaper in just a few steps
                    </p>

                    <div className="space-y-8">
                        {[
                            {
                                step: 1,
                                title: 'Configure Your Calendar',
                                desc: 'Choose your calendar type, colors, and device. Enter your birth date for life calendar.'
                            },
                            {
                                step: 2,
                                title: 'Copy the Wallpaper URL',
                                desc: 'We generate a unique URL that returns your wallpaper image, updated in real-time.'
                            },
                            {
                                step: 3,
                                title: 'Create iOS Shortcut',
                                desc: 'Set up an automation to fetch the URL daily and set it as your lock screen wallpaper.'
                            },
                            {
                                step: 4,
                                title: 'Watch Time Flow',
                                desc: 'Your wallpaper updates automatically every day, keeping you mindful of time.'
                            }
                        ].map(({ step, title, desc }) => (
                            <div key={step} className="flex gap-6 items-start">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                                    {step}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
                                    <p className="text-gray-400">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/configure"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold text-lg transition-all"
                        >
                            Get Started <span>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Device Support */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4 gradient-text">
                        Works on All Devices
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                        Perfectly sized wallpapers for every major smartphone
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        {['iPhone 15 Pro', 'iPhone 14', 'Pixel 8', 'Samsung S24', 'OnePlus 12'].map((device) => (
                            <span
                                key={device}
                                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
                            >
                                {device}
                            </span>
                        ))}
                        <span className="px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-sm text-blue-400">
                            + 15 more devices
                        </span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/10">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">⏳</span>
                        <span className="font-semibold text-white">TimeLedger</span>
                    </div>
                    <p className="text-sm text-gray-500">
                        Made with ♥ • Inspired by "Your Life in Weeks"
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
