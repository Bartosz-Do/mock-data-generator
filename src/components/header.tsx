"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="content start">
        <Link className="link-title" href="/"><h1>Mock data generator</h1></Link>
      </div>
      <div className="content nav">
        <Link href="/random-users">random users</Link>
      </div>
      <div className="content end"></div>
    </header>
  )
}
