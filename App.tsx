import React from 'react';
import { Route, Switch, Link } from 'wouter';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

function App() {
  return (
    <div className="font-sans text-slate-900 bg-white overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600/10 rounded-lg flex items-center justify-center">
                <span className="text-xl">🏡</span>
              </div>
              <div>
                <div className="font-black text-slate-900 uppercase leading-none tracking-tight">The Homeowner's</div>
                <div className="font-black text-amber-700 uppercase leading-none tracking-tight">Handbook</div>
              </div>
            </a>
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/"><a className="font-bold text-sm uppercase tracking-wider text-slate-500 hover:text-blue-600">Home</a></Link>
            <Link href="/blog"><a className="font-bold text-sm uppercase tracking-wider text-slate-500 hover:text-blue-600">Handbook</a></Link>
            <a href="#contact" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-bold text-sm transition-all shadow-md">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      <main>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/blog/:slug" component={BlogPostPage} />
        </Switch>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter">Ready to Build?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto">
            Get a custom quote for your shed or roofing project in minutes.
          </p>
          <a href="mailto:contact@placed.life" className="px-12 py-6 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold text-xl transition-all shadow-xl inline-block">
            Contact Our Team
          </a>
          <div className="mt-20 pt-10 border-t border-slate-800 text-slate-500 text-sm">
            &copy; 2026 PLACED AI. All rights reserved. Licensed in New Brunswick.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;