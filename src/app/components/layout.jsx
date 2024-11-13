import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Heart, MessageCircle, History, User, LogOut } from "lucide-react";
import { AuthProvider, useAuth } from "@/app/components/auth-provider";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (!user) return children;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-red-500" />
            <span className="text-xl font-bold">Heartful</span>
          </div>
        </div>
        <nav className="mt-8">
          <button
            onClick={() => router.push("/chat")}
            className={`w-full p-3 flex items-center space-x-3 ${pathname === "/chat" ? "bg-red-50 text-red-600" : "hover:bg-gray-50"}`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat</span>
          </button>
          <button
            onClick={() => router.push("/history")}
            className={`w-full p-3 flex items-center space-x-3 ${pathname === "/history" ? "bg-red-50 text-red-600" : "hover:bg-gray-50"}`}
          >
            <History className="w-5 h-5" />
            <span>History</span>
          </button>
          <button
            onClick={() => router.push("/profile")}
            className={`w-full p-3 flex items-center space-x-3 ${pathname === "/profile" ? "bg-red-50 text-red-600" : "hover:bg-gray-50"}`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
          <button onClick={logout} className="w-full p-3 flex items-center space-x-3 hover:bg-gray-50 text-gray-600">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <Layout>{children}</Layout>
    </AuthProvider>
  );
}
