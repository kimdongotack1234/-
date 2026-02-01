
import React, { useState } from 'react';
import { 
  Instagram, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle2,
  MapPin,
  Mail,
  MessageSquare,
  Truck
} from 'lucide-react';
import { PageType, RequestFormData, ContactFormData } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = (page: PageType) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => navigate('home')}
          >
            <div className="bg-indigo-700 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">바로심부름</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold">
            <button onClick={() => navigate('home')} className={`hover:text-indigo-700 transition-colors ${currentPage === 'home' ? 'text-indigo-700' : 'text-slate-600'}`}>홈</button>
            <button onClick={() => navigate('services')} className={`hover:text-indigo-700 transition-colors ${currentPage === 'services' ? 'text-indigo-700' : 'text-slate-600'}`}>서비스 안내</button>
            <button onClick={() => navigate('contact')} className={`hover:text-indigo-700 transition-colors ${currentPage === 'contact' ? 'text-indigo-700' : 'text-slate-600'}`}>문의하기</button>
            <button 
              onClick={() => navigate('request')} 
              className="bg-indigo-700 text-white px-5 py-2.5 rounded-full hover:bg-indigo-800 transition-all shadow-lg shadow-indigo-100"
            >
              심부름 신청하기
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-6 flex flex-col space-y-4 animate-in slide-in-from-top duration-300">
            <button onClick={() => navigate('home')} className="text-left font-bold text-slate-700">홈</button>
            <button onClick={() => navigate('services')} className="text-left font-bold text-slate-700">서비스 안내</button>
            <button onClick={() => navigate('contact')} className="text-left font-bold text-slate-700">문의하기</button>
            <button onClick={() => navigate('request')} className="w-full bg-indigo-700 text-white py-3 rounded-xl font-bold">심부름 신청하기</button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {currentPage === 'home' && <HomeView navigate={navigate} />}
        {currentPage === 'services' && <ServicesView />}
        {currentPage === 'request' && <RequestView />}
        {currentPage === 'contact' && <ContactView />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Zap className="w-6 h-6 text-indigo-400" />
              <span className="text-xl font-bold text-white">바로심부름</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              신뢰를 최우선으로, 약속을 지키는 심부름 센터.<br />
              작은 일 하나도 정성을 다해 해결해 드립니다.
            </p>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors text-white"
            >
              <Instagram className="w-5 h-5 text-pink-500" />
              <span className="text-sm font-semibold">Instagram 바로가기</span>
            </a>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">빠른 메뉴</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => navigate('home')} className="hover:text-indigo-400">홈으로</button></li>
              <li><button onClick={() => navigate('services')} className="hover:text-indigo-400">서비스 안내</button></li>
              <li><button onClick={() => navigate('request')} className="hover:text-indigo-400">심부름 신청</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-indigo-400">1:1 문의</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">고객센터</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm">
                <Phone className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>010-7303-4022<br /><span className="text-xs text-slate-500">(24시간 상담 가능)</span></span>
              </div>
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>서울특별시 강남구 테헤란로 (지점별 운영)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} 바로심부름. All rights reserved. 
        </div>
      </footer>
    </div>
  );
};

// --- Sub Views ---

const HomeView: React.FC<{ navigate: (p: PageType) => void }> = ({ navigate }) => (
  <div className="fade-in">
    {/* Hero Section */}
    <section className="hero-gradient text-white py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-white/20">
          <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span>신속 배정 시스템 운영 중</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight tracking-tight">
          어떤 일이든<br />
          <span className="text-indigo-300">정확하고 신속하게.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          작은 심부름부터 중요한 요청까지, 바로심부름이 책임집니다.
          우리의 목표는 고객님의 소중한 시간을 찾아드리는 것입니다.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => navigate('request')}
            className="bg-white text-indigo-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all flex items-center justify-center space-x-2"
          >
            <span>지금 신청하기</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigate('services')}
            className="bg-transparent border border-white/30 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
          >
            서비스 안내
          </button>
        </div>
      </div>
    </section>

    {/* Core Values Section */}
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">왜 바로심부름인가요?</h2>
        <p className="text-slate-500">신뢰를 최우선으로, 약속을 지키는 심부름 센터</p>
        <div className="h-1.5 w-20 bg-indigo-700 mx-auto mt-6 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          { icon: Zap, title: "신속성", desc: "요청 즉시 근처 매니저가 배정되어 가장 빠른 길로 달려갑니다." },
          { icon: ShieldCheck, title: "정확성", desc: "요구사항을 꼼꼼히 체크하여 실수 없는 완벽한 처리를 약속합니다." },
          { icon: CheckCircle2, title: "신뢰성", desc: "검증된 전문 매니저들이 고객님의 프라이버시를 철저히 보호합니다." }
        ].map((item, i) => (
          <div key={i} className="p-10 rounded-3xl border border-slate-100 bg-slate-50 hover:shadow-xl transition-all group">
            <div className="bg-indigo-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
              <item.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
            <p className="text-slate-600 leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA Banner */}
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto bg-indigo-50 rounded-[40px] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Truck className="w-96 h-96 -mr-20 -mt-20 rotate-12" />
        </div>
        <div className="relative z-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            고민하지 마세요.<br />
            바로심부름이 도와드립니다.
          </h2>
          <p className="text-indigo-700 font-semibold text-lg mb-8 md:mb-0">
            상담부터 완료까지 1:1 맞춤 관리 시스템
          </p>
        </div>
        <button 
          onClick={() => navigate('request')}
          className="relative z-10 bg-indigo-700 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-indigo-800 transition-all shadow-xl shadow-indigo-200"
        >
          무료 견적 문의하기
        </button>
      </div>
    </section>
  </div>
);

const ServicesView: React.FC = () => (
  <div className="fade-in py-20 px-6 max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6">서비스 안내</h1>
      <p className="text-slate-600 max-w-2xl mx-auto text-lg">
        고객님의 불편함을 해결해 드리는 바로심부름의 대표적인 서비스들입니다.<br />
        리스트에 없는 서비스도 상담을 통해 신청 가능합니다.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { title: "구매 대행", desc: "음식 배달부터 한정판 굿즈 대기, 마트 장보기까지 무엇이든 대신 구매해 드립니다.", icon: "🛍️" },
        { title: "배달 및 전달", desc: "급하게 전달해야 하는 서류, 깜빡하고 두고 온 열쇠 등을 신속하게 배송합니다.", icon: "🚚" },
        { title: "예약 및 줄서기", desc: "맛집 오픈런, 병원 접수, 공연 티켓팅 등 시간 소모가 큰 업무를 대신합니다.", icon: "🎟️" },
        { title: "반려동물 케어", desc: "바쁜 주인님을 대신해 소중한 아이들의 산책과 간식을 챙겨 드립니다.", icon: "🐾" },
        { title: "가사 업무 지원", desc: "쓰레기 분리수거, 간단한 가구 옮기기, 전등 교체 등 손길이 필요한 곳을 돕습니다.", icon: "🏠" },
        { title: "기타 맞춤 서비스", desc: "고객님의 상황에 맞는 특별한 요청도 유연하게 대응합니다.", icon: "✨" }
      ].map((service, i) => (
        <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-500 transition-all">
          <div className="text-4xl mb-6">{service.icon}</div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
          <p className="text-slate-600 leading-relaxed text-sm font-medium">{service.desc}</p>
        </div>
      ))}
    </div>

    <div className="mt-20 p-12 bg-slate-900 rounded-[40px] text-white text-center">
      <h2 className="text-3xl font-bold mb-8">안전하고 투명한 서비스 운영</h2>
      <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
        <div>
          <h4 className="text-indigo-400 font-bold mb-2">실시간 위치 확인</h4>
          <p className="text-sm text-slate-400">배정된 매니저의 위치를 실시간으로 확인 가능합니다.</p>
        </div>
        <div>
          <h4 className="text-indigo-400 font-bold mb-2">투명한 비용 산정</h4>
          <p className="text-sm text-slate-400">거리에 따른 명확한 기준에 의해 비용을 산정합니다.</p>
        </div>
        <div>
          <h4 className="text-indigo-400 font-bold mb-2">안전 보상 제도</h4>
          <p className="text-sm text-slate-400">서비스 과정에서 발생하는 문제에 대해 책임지고 대응합니다.</p>
        </div>
      </div>
    </div>
  </div>
);

const RequestView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fade-in py-32 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-green-100 p-6 rounded-full mb-8">
          <CheckCircle2 className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">신청이 완료되었습니다!</h1>
        <p className="text-slate-600 mb-10">매니저가 내용을 확인 후 10분 이내로 연락드릴 예정입니다.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold"
        >
          확인
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in py-20 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">심부름 신청하기</h1>
        <p className="text-slate-600">내용을 입력해 주시면 가장 가까운 매니저를 찾아드립니다.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[32px] shadow-xl border border-slate-100 space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">성함</label>
            <input 
              required
              type="text" 
              className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="홍길동"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">연락처</label>
            <input 
              required
              type="tel" 
              className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="010-7303-4022"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">심부름 내용</label>
          <textarea 
            required
            rows={5}
            className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            placeholder="상세한 위치와 요청 사항을 적어주세요. (예: 강남역 10번 출구 앞에서 꽃다발 수령 후 서초동 XX아파트로 전달)"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">희망 완료 시간</label>
          <div className="flex items-center space-x-3 bg-slate-50 px-5 py-4 rounded-xl border border-slate-200">
            <Clock className="w-5 h-5 text-indigo-500" />
            <input 
              required
              type="text" 
              className="bg-transparent w-full outline-none"
              placeholder="예: 1시간 이내, 오후 3시까지 등"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-5 bg-indigo-700 text-white rounded-2xl font-bold text-lg hover:bg-indigo-800 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center space-x-2"
        >
          <span>심부름 신청 완료</span>
          <Zap className="w-5 h-5 fill-white" />
        </button>
        <p className="text-center text-xs text-slate-400">신청 버튼을 누르면 개인정보 처리방침에 동의하는 것으로 간주됩니다.</p>
      </form>
    </div>
  );
};

const ContactView: React.FC = () => {
  return (
    <div className="fade-in py-20 px-6 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-8 leading-tight">문의하기</h1>
          <p className="text-slate-600 mb-12 text-lg">
            사이트 이용 방법, 대량 계약 문의, 매니저 지원 등 궁금하신 점이 있다면 언제든 메시지를 남겨주세요.
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <div className="bg-indigo-100 p-3 rounded-xl text-indigo-700"><Mail className="w-6 h-6" /></div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">이메일 문의</p>
                <p className="font-semibold">kimdongotack1234@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <div className="bg-indigo-100 p-3 rounded-xl text-indigo-700"><MessageSquare className="w-6 h-6" /></div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">카카오톡 채널</p>
                <p className="font-semibold">@바로심부름_공식</p>
              </div>
            </div>
          </div>
        </div>

        <form className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">이름</label>
            <input type="text" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">이메일</label>
            <input type="email" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">문의 메시지</label>
            <textarea rows={4} className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none resize-none" />
          </div>
          <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
            메시지 보내기
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
