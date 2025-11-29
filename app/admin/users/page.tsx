"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { API_BASE } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Shield, ShieldOff } from "lucide-react"

type User = { id: string; name?: string; email?: string; role: "admin" | "user"; joinedDate?: string }

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const run = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/users`, { headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` } })
                const j = await res.json()
                setUsers(j.map((u: any) => ({ id: u._id, name: u.name, email: u.email, role: u.role, joinedDate: u.createdAt?.slice(0, 10) })))
            } catch { }
            setIsLoading(false)
        }
        run()
    }, [])

    const toggleRole = async (id: string) => {
        const current = users.find((u) => u.id === id)
        if (!current) return
        const next = current.role === "admin" ? "user" : "admin"
        const res = await fetch(`${API_BASE}/api/users/${id}/role`, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token") || ""}` }, body: JSON.stringify({ role: next }) })
        if (res.ok) {
            const j = await res.json()
            setUsers(users.map((u) => (u.id === id ? { ...u, role: j.role } : u)))
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                <p className="text-muted-foreground">Manage user roles and permissions</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8">
                                        Loading users...
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{user.joinedDate}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleRole(user.id)}
                                                title={user.role === "admin" ? "Remove Admin" : "Make Admin"}
                                            >
                                                {user.role === "admin" ? (
                                                    <ShieldOff className="h-4 w-4 text-red-500" />
                                                ) : (
                                                    <Shield className="h-4 w-4 text-green-600" />
                                                )}
                                                <span className="sr-only">Toggle Role</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
