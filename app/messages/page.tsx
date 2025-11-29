"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Messages</h1>
        <p className="text-gray-600 mb-6">This is a placeholder messages page.</p>
        <div className="flex gap-2">
          <Input placeholder="Type a message" />
          <Button className="bg-blue-500 hover:bg-blue-600">Send</Button>
        </div>
      </div>
    </div>
  )
}