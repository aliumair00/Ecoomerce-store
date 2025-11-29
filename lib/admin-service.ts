import { Product, mockProducts } from "./mock-data"

export interface User {
    id: string
    name: string
    email: string
    role: "admin" | "user"
    joinedDate: string
}

const STORAGE_KEYS = {
    PRODUCTS: "admin_dashboard_products",
    USERS: "admin_dashboard_users",
}

// Initial mock users
const MOCK_USERS: User[] = [
    {
        id: "u1",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
        joinedDate: "2023-01-01",
    },
    {
        id: "u2",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        joinedDate: "2023-05-15",
    },
    {
        id: "u3",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "user",
        joinedDate: "2023-06-20",
    },
]

export const AdminService = {
    // --- Products ---
    getProducts: (): Product[] => {
        if (typeof window === "undefined") return mockProducts
        const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS)
        if (!stored) {
            // Initialize with mock data if empty
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(mockProducts))
            return mockProducts
        }
        return JSON.parse(stored)
    },

    getProduct: (id: string): Product | undefined => {
        const products = AdminService.getProducts()
        return products.find((p) => p.id === id)
    },

    addProduct: (product: Omit<Product, "id">): Product => {
        const products = AdminService.getProducts()
        const newProduct: Product = {
            ...product,
            id: Math.random().toString(36).substr(2, 9), // Simple ID generation
        }
        const updatedProducts = [newProduct, ...products]
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updatedProducts))
        return newProduct
    },

    updateProduct: (id: string, updates: Partial<Product>): Product | null => {
        const products = AdminService.getProducts()
        const index = products.findIndex((p) => p.id === id)
        if (index === -1) return null

        const updatedProduct = { ...products[index], ...updates }
        products[index] = updatedProduct
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products))
        return updatedProduct
    },

    deleteProduct: (id: string): void => {
        const products = AdminService.getProducts()
        const filtered = products.filter((p) => p.id !== id)
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered))
    },

    // --- Users ---
    getUsers: (): User[] => {
        if (typeof window === "undefined") return MOCK_USERS
        const stored = localStorage.getItem(STORAGE_KEYS.USERS)
        if (!stored) {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(MOCK_USERS))
            return MOCK_USERS
        }
        return JSON.parse(stored)
    },

    toggleUserRole: (userId: string): User | null => {
        const users = AdminService.getUsers()
        const index = users.findIndex((u) => u.id === userId)
        if (index === -1) return null

        const user = users[index]
        const newRole: "admin" | "user" = user.role === "admin" ? "user" : "admin"
        const updatedUser: User = { ...user, role: newRole }

        users[index] = updatedUser
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
        return updatedUser
    },
}
