import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

interface PopularRoute {
  id: string;
  origin: string;
  destination: string;
  price: number;
  duration: string;
  trips: number;
}

const Home: React.FC = () => {
  const [popularRoutes, setPopularRoutes] = useState<PopularRoute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState({
    origin: '',
    destination: '',
    date: '',
  });

  useEffect(() => {
    // TODO: Gọi API để lấy danh sách tuyến phổ biến
    setTimeout(() => {
      setPopularRoutes([
        {
          id: '1',
          origin: 'Hà Nội',
          destination: 'Hải Phòng',
          price: 150000,
          duration: '2h 30m',
          trips: 24,
        },
        {
          id: '2',
          origin: 'TP.HCM',
          destination: 'Vũng Tàu',
          price: 120000,
          duration: '2h',
          trips: 30,
        },
        {
          id: '3',
          origin: 'Đà Nẵng',
          destination: 'Hội An',
          price: 50000,
          duration: '45m',
          trips: 40,
        },
        {
          id: '4',
          origin: 'TP.HCM',
          destination: 'Đà Lạt',
          price: 250000,
          duration: '7h',
          trips: 15,
        },
        {
          id: '5',
          origin: 'Hà Nội',
          destination: 'Sapa',
          price: 300000,
          duration: '6h',
          trips: 12,
        },
        {
          id: '6',
          origin: 'TP.HCM',
          destination: 'Nha Trang',
          price: 280000,
          duration: '8h',
          trips: 18,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Redirect to search results with query params
    console.log('Searching:', searchData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Hero Section with Search */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Đặt Vé Xe Khách Trực Tuyến</h1>
            <p className="text-xl opacity-90">Nhanh chóng - An toàn - Tiện lợi</p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <span className="text-lg">📍</span> Điểm đi
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Hà Nội"
                    value={searchData.origin}
                    onChange={(e) => setSearchData({ ...searchData, origin: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <span className="text-lg">📍</span> Điểm đến
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Hải Phòng"
                    value={searchData.destination}
                    onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <span className="text-lg">📅</span> Ngày đi
                  </label>
                  <input
                    type="date"
                    value={searchData.date}
                    onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
              >
                🔍 Tìm chuyến xe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tuyến Xe Phổ Biến</h2>
          <p className="text-gray-600 text-lg">Các tuyến đường được đặt nhiều nhất</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-48"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route) => (
              <Link
                key={route.id}
                to={`/route/${route.id}`}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🚌</span>
                      <span className="text-gray-500 text-sm">{route.trips} chuyến/ngày</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        <span className="font-semibold text-gray-900">{route.origin}</span>
                      </div>
                      <div className="ml-1 border-l-2 border-dashed border-gray-300 h-6"></div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        <span className="font-semibold text-gray-900">{route.destination}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-gray-500 text-sm">Thời gian</p>
                    <p className="font-semibold text-gray-900">⏱️ {route.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">Giá từ</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {route.price.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                </div>

                <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                  Xem chi tiết
                </button>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tại Sao Chọn BusGo?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition">
              <div className="text-6xl mb-4">🎫</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Đặt Vé Dễ Dàng</h3>
              <p className="text-gray-600">
                Chọn tuyến, chọn ghế, thanh toán nhanh chóng chỉ trong vài phút
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition">
              <div className="text-6xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Thanh Toán An Toàn</h3>
              <p className="text-gray-600">
                Hỗ trợ đa dạng phương thức: Thẻ, ví điện tử, chuyển khoản
              </p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition">
              <div className="text-6xl mb-4">🚌</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Xe Chất Lượng</h3>
              <p className="text-gray-600">Đội xe hiện đại, tiện nghi, lái xe chuyên nghiệp</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition">
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Ưu Đãi Hấp Dẫn</h3>
              <p className="text-gray-600">Nhiều chương trình khuyến mãi, tích điểm thành viên</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">500+</p>
              <p className="text-blue-100">Tuyến đường</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">1M+</p>
              <p className="text-blue-100">Khách hàng</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">100+</p>
              <p className="text-blue-100">Nhà xe</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">4.8★</p>
              <p className="text-blue-100">Đánh giá</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
