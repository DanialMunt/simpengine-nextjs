"use client";
import useAuthStore from "@/stores/useAuthStore";

export default function AuthDebugPanel() {
  const { token, user } = useAuthStore();
  return (
    <div className=" text-xs rounded">
      <div>Token: {token ? token.slice(0, 10) + "..." : "null"}</div>
      <div>User: {user ? JSON.stringify(user) : "null"}</div>
    </div>
  );
}
