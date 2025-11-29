"use client"

import { Button } from "@/components/ui/button"
import { Package, Truck, CheckCircle, Clock } from "lucide-react"

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-2024-1001",
      date: "Mar 20, 2024",
      items: 3,
      total: 199.99,
      status: "delivered",
      statusLabel: "Delivered on Mar 25, 2024",
    },
    {
      id: "ORD-2024-1002",
      date: "Mar 18, 2024",
      items: 2,
      total: 149.99,
      status: "shipped",
      statusLabel: "In Transit - Arriving Mar 28",
    },
    {
      id: "ORD-2024-1003",
      date: "Mar 15, 2024",
      items: 5,
      total: 349.99,
      status: "processing",
      statusLabel: "Processing - Ships tomorrow",
    },
    {
      id: "ORD-2024-1004",
      date: "Mar 10, 2024",
      items: 1,
      total: 99.99,
      status: "delivered",
      statusLabel: "Delivered on Mar 15, 2024",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="text-green-600" size={20} />
      case "shipped":
        return <Truck className="text-blue-600" size={20} />
      case "processing":
        return <Clock className="text-yellow-600" size={20} />
      default:
        return <Package className="text-gray-600" size={20} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700"
      case "shipped":
        return "bg-blue-100 text-blue-700"
      case "processing":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-gray-600 mb-8">Track and manage your orders</p>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{order.id}</h3>
                  <p className="text-sm text-gray-600">Ordered on {order.date}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{order.statusLabel}</p>

              <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-t border-b">
                <div>
                  <p className="text-sm text-gray-600">Items</p>
                  <p className="font-semibold">{order.items} items</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-semibold">${order.total}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tracking</p>
                  <Button size="sm" variant="link" className="text-blue-600 p-0">
                    Track Order
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  Reorder
                </Button>
                <Button variant="outline" size="sm">
                  Return/Exchange
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
