import { useMemo } from 'react';
import { cn, calculateDaysInYear, getDaysInYear, COLOR_PRESETS } from '../lib/utils';

/**
 * Year Calendar Component
 * Displays progress through the current year as a grid of days
 * 
 * @param {number} year - Year to display (default current year)
 * @param {string} colorScheme - Color preset name
 * @param {string} layout - 'grid' or 'dots'
 */
export function YearCalendar({
    year = new Date().getFullYear(),
    colorScheme = 'green',
    layout = 'grid',
    showLabels = true,
    className
}) {
    const colors = COLOR_PRESETS[colorScheme] || COLOR_PRESETS.green;
    const totalDays = getDaysInYear(year);
    const daysElapsed = useMemo(() => calculateDaysInYear(year), [year]);

    // Generate grid data
    const days = useMemo(() => {
        return Array.from({ length: totalDays }, (_, index) => {
            let status = 'remaining';

            if (index < daysElapsed) {
                status = 'lived';
            } else if (index === daysElapsed) {
                status = 'current';
            }

            return { index, status };
        });
    }, [totalDays, daysElapsed]);

    const cellSize = layout === 'dots' ? 'w-1.5 h-1.5 rounded-full' : 'w-2 h-2 rounded-sm';
    const gap = layout === 'dots' ? 'gap-0.5' : 'gap-[2px]';
    const columns = 30; // ~12 rows for a year

    const percentComplete = Math.round((daysElapsed / totalDays) * 100);

    return (
        <div className={cn('flex flex-col items-center', className)}>
            {showLabels && (
                <div className="mb-4 text-center">
                    <p className="text-2xl font-bold gradient-text">{year}</p>
                    <p className="text-sm text-gray-400 mt-1">
                        Day {daysElapsed} of {totalDays}
                    </p>
                    <p className="text-xs text-gray-500">
                        {percentComplete}% complete • {totalDays - daysElapsed} days remaining
                    </p>
                </div>
            )}

            <div
                className={cn('grid', gap)}
                style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                }}
            >
                {days.map(({ index, status }) => (
                    <div
                        key={index}
                        className={cn(
                            cellSize,
                            'transition-all duration-200',
                            status === 'lived' && 'opacity-100',
                            status === 'current' && 'animate-pulse scale-125',
                            status === 'remaining' && 'opacity-30'
                        )}
                        style={{
                            backgroundColor: status === 'current'
                                ? colors.current
                                : status === 'lived'
                                    ? colors.lived
                                    : colors.remaining
                        }}
                        title={`Day ${index + 1}`}
                    />
                ))}
            </div>

            {showLabels && (
                <div className="mt-4 flex items-center gap-6 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: colors.lived }} />
                        <span>Passed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded animate-pulse" style={{ backgroundColor: colors.current }} />
                        <span>Today</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded opacity-30" style={{ backgroundColor: colors.remaining }} />
                        <span>Remaining</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default YearCalendar;
