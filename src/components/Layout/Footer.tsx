import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🚌</span>
              <h3 className="text-xl font-bold">BusGo</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Hệ thống đặt vé xe khách trực tuyến hàng đầu Việt Nam. Di chuyển an toàn, tiện lợi và
              nhanh chóng.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên Kết</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/routes" className="text-gray-400 hover:text-white transition">
                  Tìm tuyến xe
                </Link>
              </li>
              <li>
                <Link to="/stations" className="text-gray-400 hover:text-white transition">
                  Bến xe
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="text-gray-400 hover:text-white transition">
                  Khuyến mãi
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hỗ Trợ</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-gray-400 hover:text-white transition">
                  Hướng dẫn đặt vé
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên Hệ</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-lg">📍</span>
                <span>123 Đường 3/2, Q.10, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">📞</span>
                <span>Hotline: 1900 6789</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">📧</span>
                <span>support@busgo.vn</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">⏰</span>
                <span>24/7 - Hỗ trợ mọi lúc</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition text-2xl"
                title="Facebook"
              >
                📘
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-400 transition text-2xl"
                title="Instagram"
              >
                📷
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-300 transition text-2xl"
                title="Twitter"
              >
                🐦
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-400 transition text-2xl"
                title="YouTube"
              >
                ▶️
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; 2025 BusGo. All rights reserved.
            </p>
            <div className="flex gap-6 text-gray-400 text-sm">
              <Link to="/terms" className="hover:text-white transition">
                Điều khoản
              </Link>
              <Link to="/privacy" className="hover:text-white transition">
                Bảo mật
              </Link>
              <Link to="/sitemap" className="hover:text-white transition">
                Sơ đồ trang
              </Link>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            Phát triển bởi BusGo Team 🚀 Made with ❤️ in Vietnam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
