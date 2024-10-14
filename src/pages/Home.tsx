import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import { Property } from '../types';
import { Search } from 'lucide-react';

const properties: Property[] = [
  {
    id: '1',
    title: 'Modern City Apartment',
    description: 'Luxurious 2-bedroom apartment in the heart of downtown.',
    price: 500000,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    location: 'New York, NY',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
  },
  {
    id: '2',
    title: 'Suburban Family Home',
    description: 'Spacious 4-bedroom house with a large backyard in a quiet neighborhood.',
    price: 750000,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    location: 'Los Angeles, CA',
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
  },
  {
    id: '3',
    title: 'Beachfront Villa',
    description: 'Stunning 3-bedroom villa with direct access to a private beach.',
    price: 1200000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    location: 'Miami, FL',
    bedrooms: 3,
    bathrooms: 3.5,
    area: 3000,
  },
  {
    id: '4',
    title: 'Mountain Retreat',
    description: 'Cozy 2-bedroom cabin with breathtaking mountain views.',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    location: 'Aspen, CO',
    bedrooms: 2,
    bathrooms: 1,
    area: 1000,
  },
  {
    id: '5',
    title: 'Urban Loft',
    description: 'Stylish 1-bedroom loft in a converted industrial building.',
    price: 425000,
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    location: 'Chicago, IL',
    bedrooms: 1,
    bathrooms: 1,
    area: 900,
  },
  {
    id: '6',
    title: 'Countryside Estate',
    description: 'Elegant 5-bedroom estate on 10 acres of lush countryside.',
    price: 1800000,
    image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    location: 'Napa Valley, CA',
    bedrooms: 5,
    bathrooms: 4.5,
    area: 5000,
  },
  {
    id: '7',
    title: 'Downtown Penthouse',
    description: 'Luxurious 3-bedroom penthouse with panoramic city views.',
    price: 2200000,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    location: 'San Francisco, CA',
    bedrooms: 3,
    bathrooms: 3,
    area: 2800,
  },
  {
    id: '8',
    title: 'Lakeside Cottage',
    description: 'Charming 2-bedroom cottage with private dock on a serene lake.',
    price: 550000,
    image: 'https://images.unsplash.com/photo-1475087542963-13ab5e611954?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    location: 'Lake Tahoe, NV',
    bedrooms: 2,
    bathrooms: 1,
    area: 1100,
  },
  {
    id: '9',
    title: 'Historic Brownstone',
    description: 'Beautifully restored 4-bedroom brownstone in a historic district.',
    price: 1650000,
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    location: 'Boston, MA',
    bedrooms: 4,
    bathrooms: 2.5,
    area: 3200,
  },
];

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Find Your Dream Home</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by property name or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md pr-10"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Home;