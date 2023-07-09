interface RenderOptions
{
    "sitekey": string;
    "theme"?: "light" | "dark";
    "size"?: "normal" | "compact" | "invisible";
    "tabindex"?: number;
    "callback"?: (token: string) => void;
    "expired-callback"?: () => void;
    "chalexpired-callback"?: (...args: unknown[]) => void;
    "error-callback"?: (...args: unknown[]) => void;
    "open-callback"?: (...args: unknown[]) => void;
    "close-callback"?: (...args: unknown[]) => void;
}
interface hCaptcha
{
    close: (...args: unknown[]) => void;
    execute: (widgetId: string) => void;
    execute: (widgetId: string, config?: { async: false; }) => void;
    execute: (widgetId: string, config: { async: true; }) => Promise<void>;
    getRespKey: (widgetId: string) => unknown;
    getResponse: (widgetId: string) => unknown;
    remove: (...args: unknown[]) => void;
    render: (container: string | Element, options: RenderOptions) => string;
    reset: (widgetId: string) => void;
    setData: (...args: unknown[]) => void;
}

declare interface Window
{
    hcaptcha: hCaptcha;
}
