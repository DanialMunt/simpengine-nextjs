"use client"

import { useGetRomanticEvent } from "@/modules/romantic-event/hooks/useRomanticEvent";
export default function EventsPage() {
    const {data: events, isLoading} = useGetRomanticEvent();
    return <div>
        {isLoading && <div>Loading...</div>}
        {events?.map((event) => (
            <div key={event.id} className="p-4 mb-4 border rounded">
                <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                <p className="text-gray-700">{event.description}</p>
            </div> 
        ))}
    </div>;
}