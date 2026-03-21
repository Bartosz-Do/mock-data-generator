"use client";
import Link from "next/link";
import Icon from "./ui/icon";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/utilities";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const hideSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const HideSidebarOnClick = (e: MouseEvent) => {
      if (sidebarRef.current && headerRef.current && !sidebarRef.current.contains(e.target as Node) && !headerRef.current.contains(e.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", HideSidebarOnClick);

    return () => {
      document.removeEventListener("click", HideSidebarOnClick);
    }
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="content start">
        <Link className="link-title" href="/" onClick={hideSidebar}><h1>Mock data generator</h1></Link>
      </div>
      <div className="content nav">
        <Link href="/users-generator" onClick={hideSidebar}>users generator</Link>
      </div>
      <div className="content end">
        <Icon name="hamburgerMenu" className="size-m link" onClick={toggleSidebar} />
      </div>

      <div className={cn("nav-sidebar", { "hidden": !isSidebarOpen, "visible": isSidebarOpen })} ref={sidebarRef}>
        <Link href="/users-generator" onClick={hideSidebar}>users generator</Link>
      </div>
    </header>
  )
}
