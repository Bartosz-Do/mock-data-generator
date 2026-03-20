"use client"
import { ReactNode, useState, useEffect, useRef } from "react";
import { cn } from "@/utilities";

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
          <div className={cn("gap-2", "flex-start")}>
            <p className="link" onClick={toggleSidebar}>Settings</p>
          </div>
        </div>
      </div>
      <div className={cn("sidebar", { "visible": isSidebarOpen, "hidden": !isSidebarOpen })} ref={sidebarRef}>
        {children}
      </div>
    </>
  )
}
