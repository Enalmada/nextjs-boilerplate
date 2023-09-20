/// <reference types="react" />
interface SidebarContext {
    collapsed: boolean;
    setCollapsed: () => void;
}
export declare const SidebarContext: import("react").Context<SidebarContext>;
export declare const useSidebarContext: () => SidebarContext;
export {};
