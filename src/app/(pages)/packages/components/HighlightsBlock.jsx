import { useState, useEffect, useCallback, useMemo } from "react";

export const HighlightsBlock = ({ block, idx, swiper }) => {
    const [expanded, setExpanded] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // Debounced swiper height update for better performance
    useEffect(() => {
        if (swiper && swiper.updateAutoHeight) {
            const timeoutId = setTimeout(() => {
                swiper.updateAutoHeight();
                setIsAnimating(false);
            }, 100); // Small delay to allow DOM to update

            return () => clearTimeout(timeoutId);
        }
    }, [expanded, swiper]);

    // Optimized expand handler
    const handleExpand = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setExpanded(true);
    }, [isAnimating]);

    // Optimized collapse handler
    const handleCollapse = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setExpanded(false);
    }, [isAnimating]);

    // Memoize visible items to prevent unnecessary recalculations
    const visibleItems = useMemo(() => {
        return expanded ? block.items : block.items.slice(0, 3);
    }, [expanded, block.items]);

    // Memoize remaining count
    const remainingCount = useMemo(() => {
        return block.items.length - 3;
    }, [block.items.length]);

    return (
        <div key={idx} className="space-y-3">
            <div className={`transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-90' : 'opacity-100'}`}>
                {visibleItems.map((point, pIdx) => (
                    <div key={`${idx}-${pIdx}`} className="flex items-start gap-3 transform-gpu">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5 flex-shrink-0" />
                        <span className="text-gray-600 font-light">{point}</span>
                    </div>
                ))}
            </div>

            {block.items.length > 3 && !expanded && (
                <button
                    onClick={handleExpand}
                    disabled={isAnimating}
                    className={`text-sm text-gray-500 hover:text-gray-700 active:text-gray-800 
                               transition-all duration-200 font-medium mt-2 transform-gpu
                               hover:translate-x-1 active:scale-95
                               ${isAnimating ? 'pointer-events-none opacity-60' : ''}`}
                >
                    +{remainingCount} more highlights
                </button>
            )}

            {expanded && (
                <button
                    onClick={handleCollapse}
                    disabled={isAnimating}
                    className={`text-sm text-gray-500 hover:text-gray-700 active:text-gray-800 
                               transition-all duration-200 font-medium mt-2 transform-gpu
                               hover:translate-x-1 active:scale-95
                               ${isAnimating ? 'pointer-events-none opacity-60' : ''}`}
                >
                    Show less
                </button>
            )}
        </div>
    );
};