import React from 'react';

const GeneratedLandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <h1 className="text-5xl font-bold text-white mb-6">
            [店舗名]へようこそ
          </h1>
          <p className="text-xl text-white mb-8">
            伝統と革新が織りなす、至福の味わい
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors">
            ご予約はこちら
          </button>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">お品書き</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 rounded-lg p-6 shadow-md">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4" />
                <h3 className="text-xl font-semibold mb-2">メニュー {item}</h3>
                <p className="text-gray-600 mb-4">
                  厳選された食材を使用した自慢の一品です。
                </p>
                <p className="text-primary font-bold">¥2,800</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">店舗情報</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 mb-8 text-center">
              当店は、伝統的な和食の技法と現代的なエッセンスを融合させた
              新しい食の体験をご提供いたします。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">営業時間</h3>
                <p className="text-gray-600">
                  ランチ 11:30 - 14:00<br />
                  ディナー 17:30 - 22:00
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">アクセス</h3>
                <p className="text-gray-600">
                  〒000-0000<br />
                  東京都○○区○○1-1-1<br />
                  ○○駅から徒歩5分
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">ご予約・お問い合わせ</h2>
          <div className="max-w-xl mx-auto">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  お名前
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  メールアドレス
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  メッセージ
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors"
              >
                送信する
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GeneratedLandingPage;