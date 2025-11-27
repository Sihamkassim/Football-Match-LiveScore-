import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 text-white p-4 mb-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
          ⚽ Football Live
        </Link>
        
        <div className="flex gap-4">
          <Link 
            to="/" 
            className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
          >
            Matches
          </Link>
          <Link 
            to="/admin" 
            className="px-4 py-2 bg-white text-primary rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-md"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
