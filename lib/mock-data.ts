export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  sold: number
  category: string
  description: string
  material: string
  design: string
  customization: string
  protection: string
  warranty: string
  stock: number
  supplier: {
    name: string
    location: string
    verified: boolean
    shipping: string
  }
  specifications: {
    model: string
    style: string
    certificate: string
    size: string
    memory: string
  }
  features: string[]
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
}

export const mockCategories = [
  "Mobile accessory",
  "Electronics",
  "Smartphones",
  "Modern tech",
  "Clothing",
  "Home interiors",
  "Sports and outdoor",
]

export const mockBrands = ["Samsung", "Apple", "Huawei", "Poco", "Lenovo"]

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
    price: 98.0,
    originalPrice: 128.0,
    image: "/mens-long-sleeve-t-shirt-cotton.jpg",
    rating: 4.3,
    reviews: 32,
    sold: 154,
    category: "Clothing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    material: "Plastic material",
    design: "Modern nice",
    customization: "Customized logo and design custom packages",
    protection: "Refund Policy",
    warranty: "2 years full warranty",
    stock: 150,
    supplier: {
      name: "Guarigi Trading LLC",
      location: "Germany, Berlin",
      verified: true,
      shipping: "Worldwide shipping",
    },
    specifications: {
      model: "#8788887",
      style: "Classic style",
      certificate: "ISO-898921212",
      size: "34mm x 450mm x 19mm",
      memory: "36GB RAM",
    },
    features: [
      "Some great feature name here",
      "Lorem ipsum dolor sit amet, consectetur",
      "Duis aute irure dolor in reprehenderit",
      "Some great feature name here",
    ],
  },
  {
    id: "2",
    name: "Canon Camera EOS 2000, Black 10x zoom",
    price: 998.0,
    originalPrice: 1128.0,
    image: "/canon-camera-red.jpg",
    rating: 4.5,
    reviews: 154,
    sold: 89,
    category: "Electronics",
    description: "Professional camera with 10x zoom capability.",
    material: "Plastic material",
    design: "Professional",
    customization: "Standard",
    protection: "Refund Policy",
    warranty: "2 years full warranty",
    stock: 45,
    supplier: {
      name: "Tech Supplies Inc",
      location: "USA, New York",
      verified: true,
      shipping: "Free Shipping",
    },
    specifications: {
      model: "EOS2000",
      style: "Professional",
      certificate: "ISO-123456",
      size: "145 x 105 x 73mm",
      memory: "64GB Buffer",
    },
    features: [
      "4K video recording",
      "45 autofocus points",
      "Weather resistant body",
      "Excellent low light performance",
    ],
  },
  {
    id: "3",
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 998.0,
    originalPrice: 1128.0,
    image: "/gopro-action-camera-black.jpg",
    rating: 4.5,
    reviews: 154,
    sold: 256,
    category: "Electronics",
    description: "Compact action camera perfect for adventures.",
    material: "Plastic material",
    design: "Rugged",
    customization: "Standard",
    protection: "Refund Policy",
    warranty: "1 year warranty",
    stock: 200,
    supplier: {
      name: "Action Gear Store",
      location: "Canada, Vancouver",
      verified: true,
      shipping: "Free Shipping",
    },
    specifications: {
      model: "HERO6",
      style: "Action",
      certificate: "CE",
      size: "62.3 x 44.9 x 33mm",
      memory: "32GB RAM",
    },
    features: ["4K video at 60fps", "Voice control", "Waterproof to 10m", "Electronic image stabilization"],
  },
  {
    id: "4",
    name: "Smart watches",
    price: 99.5,
    originalPrice: 128.0,
    image: "/smart-watch-silver.jpg",
    rating: 4.5,
    reviews: 154,
    sold: 342,
    category: "Electronics",
    description: "Advanced smartwatch with health monitoring.",
    material: "Stainless Steel",
    design: "Modern",
    customization: "Standard",
    protection: "Refund Policy",
    warranty: "2 years warranty",
    stock: 320,
    supplier: {
      name: "Smart Devices Co",
      location: "China, Shenzhen",
      verified: true,
      shipping: "Free Shipping",
    },
    specifications: {
      model: "SW-2024",
      style: "Modern",
      certificate: "CE-FCC",
      size: "45 x 45 x 10mm",
      memory: "1GB RAM",
    },
    features: ["Heart rate monitor", "Sleep tracking", "GPS enabled", "7-day battery life"],
  },
  {
    id: "5",
    name: "Headphones Pro Max",
    price: 99.5,
    originalPrice: 128.0,
    image: "/headphones-white.jpg",
    rating: 4.5,
    reviews: 154,
    sold: 521,
    category: "Electronics",
    description: "Premium wireless headphones with noise cancellation.",
    material: "Aluminum & Plastic",
    design: "Premium",
    customization: "Standard",
    protection: "Refund Policy",
    warranty: "1 year warranty",
    stock: 180,
    supplier: {
      name: "Audio Solutions",
      location: "Germany, Berlin",
      verified: true,
      shipping: "Free Shipping",
    },
    specifications: {
      model: "HP-PRO-MAX",
      style: "Premium",
      certificate: "CE",
      size: "195 x 175 x 85mm",
      memory: "N/A",
    },
    features: ["Active noise cancellation", "Bluetooth 5.3", "40-hour battery life", "Spatial audio support"],
  },
  {
    id: "6",
    name: "Laptop Pro 15",
    price: 99.5,
    originalPrice: 128.0,
    image: "/laptop-pro-gold.jpg",
    rating: 4.5,
    reviews: 154,
    sold: 89,
    category: "Electronics",
    description: "High-performance laptop for professionals.",
    material: "Aluminum",
    design: "Ultra-thin",
    customization: "Standard",
    protection: "Refund Policy",
    warranty: "2 years warranty",
    stock: 45,
    supplier: {
      name: "Tech Hub",
      location: "Singapore",
      verified: true,
      shipping: "Free Shipping",
    },
    specifications: {
      model: "LP-PRO-15",
      style: "Professional",
      certificate: "CE-FCC",
      size: "359 x 249 x 16mm",
      memory: "16GB RAM",
    },
    features: ["M2 Pro chip", "15-inch display", "512GB SSD", "All-day battery"],
  },
]

export const mockFilteredProducts = mockProducts

export const mockCartItems: CartItem[] = [
  {
    id: "cart-1",
    productId: "1",
    product: mockProducts[0],
    quantity: 9,
    price: 78.0,
  },
  {
    id: "cart-2",
    productId: "2",
    product: mockProducts[1],
    quantity: 3,
    price: 39.0,
  },
  {
    id: "cart-3",
    productId: "3",
    product: mockProducts[2],
    quantity: 1,
    price: 170.5,
  },
]

export const mockSavedItems: Product[] = [mockProducts[4], mockProducts[2], mockProducts[5], mockProducts[0]]

export const mockCategoryBanners = [
  {
    id: 1,
    title: "Latest trending",
    subtitle: "Electronic Items",
    image: "/laptop-with-headphones.jpg",
    buttonText: "Learn more",
    bgColor: "bg-teal-200",
  },
  {
    id: 2,
    title: "Hi user",
    subtitle: "let's get started",
    buttonText: "Join now",
    bgColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "Get US $10 off",
    subtitle: "with a new coupon",
    bgColor: "bg-orange-400",
    textColor: "text-white",
  },
  {
    id: 4,
    title: "Send quotes with",
    subtitle: "supplier preferences",
    bgColor: "bg-cyan-300",
  },
]

export const mockDeals = [
  { id: 1, discount: "-35%" },
  { id: 2, discount: "-15%" },
  { id: 3, discount: "-40%" },
  { id: 4, discount: "-50%" },
]

export const mockServices = [
  {
    id: 1,
    title: "Source from Industry Hubs",
    image: "/warehouse-factory.jpg",
    icon: "🔍",
  },
  {
    id: 2,
    title: "Customize Your Products",
    image: "/product-customization-design.jpg",
    icon: "✏️",
  },
  {
    id: 3,
    title: "Fast, reliable shipping by ocean or air",
    image: "/shipping-container-plane.jpg",
    icon: "✈️",
  },
  {
    id: 4,
    title: "Product monitoring and inspection",
    image: "/quality-inspection-inspection.jpg",
    icon: "📊",
  },
]

export const mockSuppliersByRegion = [
  { country: "Arab Emirates", flag: "🇦🇪", code: "AE" },
  { country: "Denmark", flag: "🇩🇰", code: "DK" },
  { country: "Australia", flag: "🇦🇺", code: "AU" },
  { country: "France", flag: "🇫🇷", code: "FR" },
  { country: "United States", flag: "🇺🇸", code: "US" },
  { country: "Arab Emirates", flag: "🇦🇪", code: "AE" },
  { country: "Russia", flag: "🇷🇺", code: "RU" },
  { country: "China", flag: "🇨🇳", code: "CN" },
  { country: "Italy", flag: "🇮🇹", code: "IT" },
  { country: "Great Britain", flag: "🇬🇧", code: "GB" },
]
