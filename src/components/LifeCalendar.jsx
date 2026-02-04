import { useMemo } from 'react';
import { cn, calculateWeeksLived, COLOR_PRESETS } from '../lib/utils';

/**
 * Life Calendar Component
 * Displays a grid of weeks representing an entire lifespan
 * 
 * @param {string} birthDate - Birth date in YYYY-MM-DD format
 * @param {number} lifespan - Expected lifespan in years (default 80)
 * @param {string} colorScheme - Color preset name
 * @param {string} layout - 'grid' or 'dots'
 */
export function LifeCalendar({
    birthDate,
    lifespan = 80,
    colorScheme = 'green',
    layout = 'grid',
    showLabels = true,
    className
}) {
    const colors = COLOR_PRESETS[colorScheme] || COLOR_PRESETS.green;
    const weeksPerYear = 52;
    const totalWeeks = lifespan * weeksPerYear;
    const weeksLived = useMemo(() => calculateWeeksLived(birthDate), [birthDate]);

    // Generate grid data
    const weeks = useMemo(() => {
        return Array.from({ length: totalWeeks }, (_, index) => {
            const year = Math.floor(index / weeksPerYear);
            const week = index % weeksPerYear;
            let status = 'remaining';

            if (index < weeksLived) {
                status = 'lived';
            } else if (index === weeksLived) {
                status = 'current';
            }

            return { index, year, week, status };
        });
    }, [totalWeeks, weeksLived]);

    const cellSize = layout === 'dots' ? 'w-1.5 h-1.5 rounded-full' : 'w-2 h-2 rounded-sm';
    const gap = layout === 'dots' ? 'gap-0.5' : 'gap-[2px]';

    return (
        <div className={cn('flex flex-col items-center', className)}>
            {showLabels && (
                <div className="mb-4 text-center">
                    <p className="text-sm text-gray-400">
                        Week {weeksLived % 52 + 1} of Year {Math.floor(weeksLived / 52) + 1}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        {weeksLived.toLocaleString()} weeks lived • {(totalWeeks - weeksLived).toLocaleString()} weeks remaining
                    </p>
                </div>
            )}

            <div
                className={cn('grid', gap)}
                style={{
                    gridTemplateColumns: `repeat(${weeksPerYear}, minmax(0, 1fr))`,
                }}
            >
                {weeks.map(({ index, status }) => (
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
                        title={`Year ${Math.floor(index / 52) + 1}, Week ${(index % 52) + 1}`}
                    />
                ))}
            </div>

            {showLabels && (
                <div className="mt-4 flex items-center gap-6 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: colors.lived }} />
                        <span>Lived</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded animate-pulse" style={{ backgroundColor: colors.current }} />
                        <span>Now</span>
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

export default LifeCalendar;
