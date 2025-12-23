import React, { useState, useCallback } from 'react';

export interface WindowState {
    id: string;
    title: string;
    content: React.ReactNode;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    icon?: string;
}

export const useWindowManager = () => {
    const [windows, setWindows] = useState<WindowState[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [nextZIndex, setNextZIndex] = useState(100);

    const openWindow = useCallback((id: string, title: string, content: React.ReactNode, icon?: string) => {
        setWindows((prev) => {
            const existingWindow = prev.find((w) => w.id === id);
            if (existingWindow) {
                // If window exists, just bring it to front and ensure it's open/restored
                return prev.map((w) =>
                    w.id === id
                        ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZIndex }
                        : w
                );
            }
            // Create new window
            return [
                ...prev,
                {
                    id,
                    title,
                    content,
                    isOpen: true,
                    isMinimized: false,
                    isMaximized: false,
                    zIndex: nextZIndex,
                    icon,
                },
            ];
        });
        setNextZIndex((prev) => prev + 1);
        setActiveWindowId(id);
    }, [nextZIndex]);

    const closeWindow = useCallback((id: string) => {
        setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w)));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const minimizeWindow = useCallback((id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
        );
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const maximizeWindow = useCallback((id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
        );
        focusWindow(id);
    }, []);

    const focusWindow = useCallback((id: string) => {
        setWindows((prev) =>
            prev.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w))
        );
        setNextZIndex((prev) => prev + 1);
        setActiveWindowId(id);
    }, [nextZIndex]);

    return {
        windows,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
    };
};
