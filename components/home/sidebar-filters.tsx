'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { categories } from './categories';

export function SidebarFilters() {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brands: false,
    features: false,
    price: false,
    condition: false,
    ratings: false,
    manufacturer: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const brands = ['Samsung', 'Apple', 'Huawei', 'Poco', 'Lenovo']
  const features = ['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory']
  const ratings = ['5 stars', '4 stars', '3 stars', '2 stars']
  const conditions = ['Any', 'Refurbished', 'Brand new', 'Old items']

  return (
    <div className="w-64 bg-white rounded-lg border border-gray-200 p-4 h-fit sticky top-4">
      {/* Category Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full pb-3 border-b border-gray-200 hover:bg-gray-50 px-2 -mx-2"
        >
          <h3 className="font-semibold text-gray-900 text-sm">Category</h3>
          <ChevronDown 
            size={16} 
            className={`transform transition-transform ${expandedSections.category ? 'rotate-180' : ''}`} 
          />
        </button>
        {expandedSections.category && (
          <ul className="mt-3 space-y-2 ml-1">
            {categories.map((cat, idx) => (
              <li 
                key={idx} 
                className="text-sm text-gray-700 hover:text-blue-500 cursor-pointer py-1"
              >
                {cat}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Brands Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('brands')}
          className="flex items-center justify-between w-full pb-3 border-b border-gray-200 hover:bg-gray-50 px-2 -mx-2"
        >
          <h3 className="font-semibold text-gray-900 text-sm">Brands</h3>
          <ChevronDown 
            size={16}
            className={`transform transition-transform ${expandedSections.brands ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.brands && (
          <ul className="mt-3 space-y-2">
            {brands.map((brand, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded cursor-pointer" />
                <span className="text-sm text-gray-700">{brand}</span>
              </li>
            ))}
            <li className="text-blue-500 text-sm font-medium hover:underline cursor-pointer pt-2">
              See all
            </li>
          </ul>
        )}
      </div>

      {/* Features Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('features')}
          className="flex items-center justify-between w-full pb-3 border-b border-gray-200 hover:bg-gray-50 px-2 -mx-2"
        >
          <h3 className="font-semibold text-gray-900 text-sm">Features</h3>
          <ChevronDown 
            size={16}
            className={`transform transition-transform ${expandedSections.features ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.features && (
          <ul className="mt-3 space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded cursor-pointer" />
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
             <li className="text-blue-500 text-sm font-medium hover:underline cursor-pointer pt-2">
              See all
            </li>
          </ul>
        )}
      </div>

      {/* Price Range Section */}
       <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full pb-3 border-b border-gray-200 hover:bg-gray-50 px-2 -mx-2"
        >
          <h3 className="font-semibold text-gray-900 text-sm">Price range</h3>
          <ChevronDown 
            size={16}
            className={`transform transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.price && (
          <div className="mt-3">
            {/* Slider component would go here */}
            <p className="text-sm text-gray-600">Slider placeholder</p>
          </div>
        )}
      </div>

      {/* Condition Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('condition')}
          className="flex items-center justify-between w-full pb-3 border-b border-gray-200 hover:bg-gray-50 px-2 -mx-2"
        >
          <h3 className="font-semibold text-gray-900 text-sm">Condition</h3>
          <ChevronDown 
            size={16}
            className={`transform transition-transform ${expandedSections.condition ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.condition && (
          <ul className="mt-3 space-y-2">
            {conditions.map((condition, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <input type="radio" name="condition" className="w-4 h-4 cursor-pointer" />
                <span className="text-sm text-gray-700">{condition}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Ratings Section */}
      <div>
        <button
          onClick={() => toggleSection('ratings')}
          className="flex items-center justify-between w-full pb-3 border-b border-gray-200 hover:bg-gray-50 px-2 -mx-2"
        >
          <h3 className="font-semibold text-gray-900 text-sm">Ratings</h3>
          <ChevronDown 
            size={16}
            className={`transform transition-transform ${expandedSections.ratings ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.ratings && (
          <ul className="mt-3 space-y-2">
            {ratings.map((rating, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded cursor-pointer" />
                <span className="text-sm text-gray-700">{rating}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
