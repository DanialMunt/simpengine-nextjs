import Link from "next/link";

export default function SideBar() {
    return <div className="bg-primary h-full">
        <ul>
            <li className="text-white p-4 border-b border-white">
                <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="text-white p-4 border-b border-white"><Link href="/dashboard">Dashboard</Link></li>
            <li className="text-white p-4 border-b border-white"><Link href="/events">Events</Link></li>
            <li className="text-white p-4 border-b border-white"><Link href="/zustand">Zustand</Link></li>

        </ul>
    </div>;
}