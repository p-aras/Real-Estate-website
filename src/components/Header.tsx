import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Home, Phone, Info, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { cart } = useCart();

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">House & Property</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="flex items-center"><Home size={18} className="mr-1" /> Home</Link></li>
            <li><Link to="/contact" className="flex items-center"><Phone size={18} className="mr-1" /> Contact</Link></li>
            <li><Link to="/about" className="flex items-center"><Info size={18} className="mr-1" /> About</Link></li>
            <li><Link to="/feedback" className="flex items-center"><MessageSquare size={18} className="mr-1" /> Feedback</Link></li>
            <li>
              <Link to="/cart" className="flex items-center">
                <ShoppingCart size={18} className="mr-1" />
                Cart ({cart.length})
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;