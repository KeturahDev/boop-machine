"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <Link href={"/the-people"}>
        <div className="btn primary">👤</div>
      </Link>
    </div>
  );
}
