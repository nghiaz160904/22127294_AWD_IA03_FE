import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl">🚌</span>
          <span className="text-2xl font-bold text-blue-600">BusGo</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition font-medium">
            Trang chủ
          </Link>
          <Link to="/routes" className="text-gray-700 hover:text-blue-600 transition font-medium">
            Tuyến xe
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/my-tickets"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Vé của tôi
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-gray-700">👤 {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
                >
                  Đăng xuất
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Đăng ký
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
