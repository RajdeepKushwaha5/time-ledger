import { useMemo } from 'react';
import { cn, COLOR_PRESETS } from '../lib/utils';

/**
 * Goal Calendar Component
 * Displays progress towards a specific goal between two dates
 * 
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @param {string} goalName - Name of the goal
 * @param {string} colorScheme - Color preset name
 * @param {string} layout - 'grid' or 'dots'
 */
export function GoalCalendar({
    startDate,
    endDate,
    goalName = 'My Goal',
    colorScheme = 'purple',
    layout = 'grid',
    showLabels = true,
    className
}) {
    const colors = COLOR_PRESETS[colorScheme] || COLOR_PRESETS.purple;

    // Calculate total days and elapsed days
    const { totalDays, daysElapsed, percentComplete } = useMemo(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const now = new Date();

        const total = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        let elapsed = Math.ceil((now - start) / (1000 * 60 * 60 * 24));

        // Clamp elapsed to valid range
        elapsed = Math.max(0, Math.min(elapsed, total));

        const percent = Math.round((elapsed / total) * 100);

        return { totalDays: total, daysElapsed: elapsed, percentComplete: percent };
    }, [startDate, endDate]);

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

    const cellSize = layout === 'dots' ? 'w-2 h-2 rounded-full' : 'w-2.5 h-2.5 rounded-sm';
    const gap = layout === 'dots' ? 'gap-1' : 'gap-[3px]';

    // Adjust columns based on total days for better layout
    const columns = totalDays <= 30 ? 7 : totalDays <= 100 ? 10 : 15;

    const formatDisplayDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className={cn('flex flex-col items-center', className)}>
            {showLabels && (
                <div className="mb-4 text-center">
                    <p className="text-xl font-bold gradient-text">{goalName}</p>
                    <p className="text-sm text-gray-400 mt-1">
                        {formatDisplayDate(startDate)} → {formatDisplayDate(endDate)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Day {daysElapsed} of {totalDays} • {percentComplete}% complete
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
                <div className="mt-4 w-full max-w-xs">
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                                width: `${percentComplete}%`,
                                backgroundColor: colors.lived
                            }}
                        />
                    </div>
                    <p className="text-center text-xs text-gray-500 mt-2">
                        {totalDays - daysElapsed} days remaining
                    </p>
                </div>
            )}
        </div>
    );
}

export default GoalCalendar;
