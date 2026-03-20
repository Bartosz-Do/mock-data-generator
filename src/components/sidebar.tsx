"use client"
import { ReactNode, useState, useEffect, useRef } from "react";
import { cn } from "@/utilities";
import Icon from "./ui/icon";

export default function Sidebar({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarToggleRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const HideSidebarOnClick = (e: MouseEvent) => {
      if (sidebarRef.current && sidebarToggleRef.current && !sidebarRef.current.contains(e.target as Node) && !sidebarToggleRef.current.contains(e.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", HideSidebarOnClick);

    return () => {
      document.removeEventListener("click", HideSidebarOnClick);
    }
  }, []);

  return (
    <>
      <div className="sidebar-toggle" ref={sidebarToggleRef}>
        <div className="content">
          <div className={cn("gap-1", "flex-start", "link")} onClick={toggleSidebar}>
            <Icon name="settings" className="link" />
            <p>Settings</p>
          </div>
        </div>
      </div>
      <div className={cn("sidebar", { "visible": isSidebarOpen, "hidden": !isSidebarOpen })} ref={sidebarRef}>
        {children}
      </div>
    </>
  )
}
