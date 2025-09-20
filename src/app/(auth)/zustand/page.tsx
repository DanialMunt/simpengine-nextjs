"use client";
import useAuthStore from "@/stores/useAuthStore";

export default function DebugAuth() {
  const { user, accessToken } = useAuthStore();

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="font-bold">Auth Debug Panel</h2>
      <pre>User: {JSON.stringify(user, null, 2)}</pre>
      <pre>AccessToken: {accessToken}</pre>
    </div>
  );
}
