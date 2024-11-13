"use client";

import React from "react";
import { Heart, FileText, Code, Lightbulb, HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            <span className="font-semibold text-xl">Heartful</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" className="text-gray-600" onClick={() => router.push("/login")}>
              Log in
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={() => router.push("/register")}>
              Sign up
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-bold text-gray-900">How can I support you today?</h1>

          {/* Message Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Message Heartful..."
              className="w-full p-4 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push("/chat");
                }
              }}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600" onClick={() => router.push("/chat")}>
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-2">
            <Button variant="outline" className="bg-white" size="lg">
              <FileText className="w-4 h-4 mr-2" />
              Share your thoughts
            </Button>
            <Button variant="outline" className="bg-white" size="lg">
              <Code className="w-4 h-4 mr-2" />
              Coping strategies
            </Button>
            <Button variant="outline" className="bg-white" size="lg">
              <Lightbulb className="w-4 h-4 mr-2" />
              Get support
            </Button>
            <Button variant="outline" className="bg-white" size="lg">
              <HelpCircle className="w-4 h-4 mr-2" />
              Find resources
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              By using Heartful, you agree to our <button className="underline hover:text-gray-700">Terms</button> and have read our{" "}
              <button className="underline hover:text-gray-700">Privacy Policy</button>
            </p>
            <Alert variant="warning" className="py-1 px-2 text-xs bg-yellow-50">
              <span className="flex items-center gap-1">Not for emergency use. If in crisis, call 988</span>
            </Alert>
          </div>
        </div>
      </footer>
    </div>
  );
}
