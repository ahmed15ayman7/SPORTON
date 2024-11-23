import { useCallback, useRef, useState } from 'react';

// Type for the parameters in the hook
interface UseLongPressOptions {
    shouldPreventDefault?: boolean;
    delay?: number;
}

const useLongPress = (
    onLongPress: () => void,
    onClick: () => void,
    { shouldPreventDefault = true, delay = 300 }: UseLongPressOptions = {}
) => {
    const [longPressTriggered, setLongPressTriggered] = useState(false);
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const target = useRef<HTMLElement | null>(null);

    // Start the long press action
    const start = useCallback(
        (event: React.TouchEvent | React.MouseEvent) => {
            if (shouldPreventDefault && event.target) {
                event.target.addEventListener('touchend', (e) => e.preventDefault(), {
                    passive: false
                });
                target.current = event.target as HTMLElement;
            }
            timeout.current = setTimeout(() => {
                onLongPress();
                setLongPressTriggered(true);
            }, delay);
        },
        [onLongPress, delay, shouldPreventDefault]
    );

    // Clear the long press timeout
    const clear = useCallback(
        (event: React.TouchEvent | React.MouseEvent, shouldTriggerClick = true) => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            if (shouldTriggerClick && !longPressTriggered) {
                onClick();
            }
            setLongPressTriggered(false);

            // Remove the event listener for touchend if necessary
            if (shouldPreventDefault && target.current) {
                target.current.removeEventListener('touchend', (e) => e.preventDefault());
            }
        },
        [shouldPreventDefault, onClick, longPressTriggered]
    );

    return {
        onMouseDown: (e: React.MouseEvent) => start(e),
        onTouchStart: (e: React.TouchEvent) => start(e),
        onMouseUp: (e: React.MouseEvent) => clear(e),
        onMouseLeave: (e: React.MouseEvent) => clear(e, false),
        onTouchEnd: (e: React.TouchEvent) => clear(e)
    };
};

// Helper function to check if it's a touch event
const isTouchEvent = (event: React.TouchEvent | React.MouseEvent): event is React.TouchEvent => {
    return 'touches' in event;
};

// Prevent the default behavior for touch events
const preventDefault = (event: React.TouchEvent) => {
    if (!isTouchEvent(event)) return;

    if (event.touches.length < 2 && event.preventDefault) {
        event.preventDefault();
    }
};

export default useLongPress;
