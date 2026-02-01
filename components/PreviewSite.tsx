
import React from 'react';
import { SiteContent } from '../types';
import * as Icons from 'lucide-react';

interface PreviewSiteProps {
  content: SiteContent;
  heroImage: string | null;
}

const PreviewSite: React.FC<PreviewSiteProps> = ({ content, heroImage }) => {
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent className="w-8 h-8 text-indigo-600" />;
  };

  return (
    <div className="w-full min-h-screen bg-white shadow-2xl rounded-xl overflow-hidden animate-in fade-in duration-700">
      {/* Navbar */}
      <nav className="px-6 py-4 flex justify-between items-center border-b border-slate-100">
        <span className="text-2xl font-bold gradient-text">{content.brandName}</span>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
          <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
          <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
          {content.hero.cta}
        </button>
      </nav>

      {/* Hero */}
      <header className="relative py-20 px-6 text-center lg:py-32">
        <div className="max-w-4xl mx-auto z-10 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {content.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {content.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all transform hover:-translate-y-1">
              {content.hero.cta}
            </button>
            <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all">
              Learn More
            </button>
          </div>
        </div>
        {heroImage && (
          <div className="mt-16 mx-auto max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <img src={heroImage} alt="Hero" className="w-full h-auto object-cover max-h-[500px]" />
          </div>
        )}
      </header>

      {/* Features */}
      <section id="features" className="py-24 bg-slate-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Powerful Features</h2>
            <div className="h-1.5 w-20 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {content.features.map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="mb-6 bg-indigo-50 w-16 h-16 rounded-xl flex items-center justify-center">
                  {renderIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">{content.about.title}</h2>
            <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
              {content.about.text}
            </p>
          </div>
          <div className="flex-1">
            <img src={`https://picsum.photos/seed/${content.brandName}/600/400`} alt="About" className="rounded-2xl shadow-lg rotate-1" />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-900 text-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-slate-400">Choose the plan that's right for you</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.pricing.map((plan, i) => (
              <div key={i} className={`p-8 rounded-3xl border ${i === 1 ? 'bg-slate-800 border-indigo-500 scale-105' : 'bg-slate-800/50 border-slate-700'}`}>
                <h3 className="text-xl font-bold mb-2">{plan.plan}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-slate-400 ml-2">/month</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center text-slate-300">
                      <Icons.Check className="w-5 h-5 text-indigo-400 mr-3" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-xl font-bold transition-all ${i === 1 ? 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20' : 'bg-white text-slate-900 hover:bg-slate-100'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-2xl font-bold gradient-text mb-6 inline-block">{content.brandName}</span>
            <p className="text-slate-600 mb-8 max-w-xs">Building the future of the web, one spark at a time.</p>
            <div className="flex space-x-4">
              <Icons.Twitter className="w-6 h-6 text-slate-400 hover:text-indigo-600 cursor-pointer" />
              <Icons.Github className="w-6 h-6 text-slate-400 hover:text-indigo-600 cursor-pointer" />
              <Icons.Linkedin className="w-6 h-6 text-slate-400 hover:text-indigo-600 cursor-pointer" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Contact</h4>
              <p className="text-slate-600 text-sm mb-2">{content.contact.email}</p>
              <p className="text-slate-600 text-sm">{content.contact.address}</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Links</h4>
              <nav className="flex flex-col space-y-3">
                <a href="#" className="text-slate-600 text-sm hover:text-indigo-600">Privacy Policy</a>
                <a href="#" className="text-slate-600 text-sm hover:text-indigo-600">Terms of Service</a>
                <a href="#" className="text-slate-600 text-sm hover:text-indigo-600">Cookie Policy</a>
              </nav>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-slate-200 text-center text-slate-400 text-xs">
          &copy; {new Date().getFullYear()} {content.brandName}. All rights reserved. Powered by SparkSite AI.
        </div>
      </footer>
    </div>
  );
};

export default PreviewSite;
