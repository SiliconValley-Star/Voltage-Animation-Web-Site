import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <div className="pt-24 md:pt-32 px-6 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">İletişim</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Projeleriniz için teklif almak veya hizmetlerimiz hakkında detaylı bilgi edinmek için bize ulaşın.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold text-lg mb-1">Genel Merkez</h3>
                            <p className="text-gray-500">Maslak Mah. Büyükdere Cad. No: 123<br />Sarıyer, İstanbul</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">E-posta</h3>
                            <p className="text-gray-500">info@sensoyelektrik.com.tr</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Telefon</h3>
                            <p className="text-gray-500">+90 (212) 555 01 23</p>
                        </div>
                    </div>
                </div>

                <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-500">Adınız</label>
                            <input type="text" className="bg-gray-100 border-none rounded-lg p-4 focus:ring-2 focus:ring-black/5 outline-none" placeholder="Ad Soyad" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-500">E-posta</label>
                            <input type="email" className="bg-gray-100 border-none rounded-lg p-4 focus:ring-2 focus:ring-black/5 outline-none" placeholder="ornek@sirket.com" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-500">Mesajınız</label>
                        <textarea rows={6} className="bg-gray-100 border-none rounded-lg p-4 focus:ring-2 focus:ring-black/5 outline-none resize-none" placeholder="Projenizden bahsedin..."></textarea>
                    </div>
                    <button className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors w-full md:w-auto">
                        Gönder
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
