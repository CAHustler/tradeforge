"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { 
  TrendingUp, Wallet, BrainCircuit, History, 
  Play, Pause, ShieldAlert, Zap, BarChart3, 
  Target, Info, ChevronRight, Share2, Rocket,
  ArrowUpRight, ArrowDownRight, Activity
} from 'lucide-react';

export default function TradeForgePro() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'terminal' | 'strategy' | 'portfolio'>('terminal');
  const [showWaitlist, setShowWaitlist] = useState(false);
  
  // Portfolio State
  const [balance, setBalance] = useState(100000);
  const [trades, setTrades] = useState<any[]>([]);
  const [pnl, setPnl] = useState(0);
  
  // Refs
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  // Initialize Professional Chart
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: { background: { type: ColorType.Solid, color: '#09090b' }, textColor: '#71717a' },
      grid: { vertLines: { color: '#18181b' }, horzLines: { color: '#18181b' } },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#10b981', downColor: '#ef4444', borderVisible: false,
      wickUpColor: '#10b981', wickDownColor: '#ef4444',
    });

    const mockData = [
      { time: '2024-05-01', open: 150.00, high: 155.20, low: 149.50, close: 153.40 },
      { time: '2024-05-02', open: 153.40, high: 158.00, low: 152.10, close: 156.20 },
      { time: '2024-05-03', open: 156.20, high: 157.50, low: 150.20, close: 151.10 },
      { time: '2024-05-04', open: 151.10, high: 154.00, low: 150.80, close: 153.20 },
      { time: '2024-05-05', open: 153.20, high: 159.00, low: 153.00, close: 158.40 },
      { time: '2024-05-06', open: 158.40, high: 162.00, low: 157.00, close: 160.10 },
    ];
    candleSeries.setData(mockData as any);
    
    chartRef.current = chart;
    const handleResize = () => chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab]);

  const handleTrade = (type: 'BUY' | 'SELL') => {
    const price = 160.10;
    const amount = 10;
    const total = price * amount;
    
    const newTrade = {
      id: Date.now(),
      type,
      symbol: 'AAPL',
      price,
      amount,
      time: new Date().toLocaleTimeString(),
    };

    setTrades([newTrade, ...trades]);
    setBalance(prev => type === 'BUY' ? prev - total : prev + total);
    setPnl(prev => prev + (type === 'SELL' ? 450 : -120)); // Simulated P&L
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-400 font-sans selection:bg-indigo-500/30">
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-20 border-r border-zinc-900 bg-black flex flex-col items-center py-8 z-50">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-10 shadow-lg shadow-indigo-500/20">
          <Zap size={24} className="text-white fill-current" />
        </div>
        <div className="flex flex-col gap-6">
          <NavIcon icon={<BarChart3 size={22}/>} active={activeTab === 'terminal'} onClick={() => setActiveTab('terminal')} />
          <NavIcon icon={<BrainCircuit size={22}/>} active={activeTab === 'strategy'} onClick={() => setActiveTab('strategy')} />
          <NavIcon icon={<Activity size={22}/>} active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} />
        </div>
      </aside>

      {/* Main Container */}
      <main className="pl-20">
        {/* Header */}
        <header className="h-20 border-b border-zinc-900 flex items-center justify-between px-10 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-8">
            <h1 className="text-white font-bold tracking-tight text-xl">TRADEFORGE <span className="text-indigo-500 text-xs ml-1 px-2 py-0.5 bg-indigo-500/10 rounded-full border border-indigo-500/20">BETA</span></h1>
            <div className="flex items-center gap-4 text-sm font-medium border-l border-zinc-800 pl-8">
              <span className="text-zinc-500 uppercase tracking-widest text-[10px]">Symbol</span>
              <span className="text-white">AAPL / USD</span>
              <span className="text-emerald-500">+1.24%</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Available Balance</p>
              <p className="text-xl font-mono font-bold text-white">${balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </div>
            <button onClick={() => setShowWaitlist(true)} className="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:scale-105 transition-all active:scale-95">
              Join Waitlist
            </button>
          </div>
        </header>

        <div className="p-10 max-w-[1600px] mx-auto">
          {activeTab === 'terminal' && (
            <div className="grid grid-cols-12 gap-8">
              
              {/* Left Column: Chart & Analytics */}
              <div className="col-span-12 xl:col-span-8 space-y-8">
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-[2rem] p-8 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-4 items-center">
                      <div className="flex bg-black rounded-xl p-1 border border-zinc-800">
                        <button className="px-4 py-1.5 text-xs font-bold bg-zinc-800 text-white rounded-lg shadow-xl">Chart</button>
                        <button className="px-4 py-1.5 text-xs font-bold text-zinc-500">Depth</button>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"><Play size={18}/></button>
                      <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"><Pause size={18}/></button>
                    </div>
                  </div>
                  <div ref={chartContainerRef} className="w-full" />
                </div>

                {/* SWOT & AI Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-zinc-900/30 border border-zinc-800 rounded-[2rem] p-8">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2 underline decoration-indigo-500 underline-offset-8">
                      <Target size={20} className="text-indigo-500" /> Portfolio SWOT
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-[10px] font-black uppercase text-emerald-500 mb-2 tracking-tighter">Strengths</p>
                        <p className="text-sm text-zinc-300">High win rate on mean reversion trades.</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-amber-500 mb-2 tracking-tighter">Weaknesses</p>
                        <p className="text-sm text-zinc-300">Emotional exit patterns during volatility.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-zinc-900/30 border border-zinc-800 rounded-[2rem] p-8">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2 underline decoration-emerald-500 underline-offset-8">
                      <TrendingUp size={20} className="text-emerald-500" /> Growth Analysis
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-mono font-bold text-white">+{pnl > 0 ? ((pnl/100000)*100).toFixed(2) : '0.00'}%</div>
                      <div className="text-xs text-zinc-500">Alpha generated vs S&P 500</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Execution */}
              <div className="col-span-12 xl:col-span-4 space-y-8">
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-[2rem] p-8">
                  <h3 className="text-white font-bold mb-8">Execute Trade</h3>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <button onClick={() => handleTrade('BUY')} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-5 rounded-2xl transition-all shadow-lg shadow-emerald-500/10 active:scale-95">
                      BUY / LONG
                    </button>
                    <button onClick={() => handleTrade('SELL')} className="bg-red-600 hover:bg-red-500 text-white font-bold py-5 rounded-2xl transition-all shadow-lg shadow-red-500/10 active:scale-95">
                      SELL / SHORT
                    </button>
                  </div>
                  <div className="space-y-4">
                    <InputBox label="Stop Loss" value="158.20" />
                    <InputBox label="Take Profit" value="165.50" />
                  </div>
                </div>

                <div className="bg-black border border-zinc-900 rounded-[2rem] p-8 h-[400px] flex flex-col shadow-inner">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Recent Activity</p>
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    {trades.length === 0 && <p className="text-zinc-700 italic text-sm text-center mt-10">No trades executed yet.</p>}
                    {trades.map(t => (
                      <div key={t.id} className="flex justify-between items-center p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                        <div className="flex items-center gap-3">
                          {t.type === 'BUY' ? <ArrowUpRight className="text-emerald-500" size={16}/> : <ArrowDownRight className="text-red-500" size={16}/>}
                          <div>
                            <p className="text-xs font-bold text-white">{t.type} {t.symbol}</p>
                            <p className="text-[10px] text-zinc-500">{t.time}</p>
                          </div>
                        </div>
                        <p className="text-xs font-mono font-bold text-zinc-300">${t.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'strategy' && (
            <div className="max-w-4xl mx-auto pt-10">
              <div className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <BrainCircuit size={200} className="text-indigo-500" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-5xl font-black text-white mb-4 tracking-tighter italic">AI STRATEGY FORGE</h2>
                  <p className="text-xl text-zinc-400 mb-10 max-w-xl">Describe your trading logic in plain English. We'll turn it into a backtestable algorithm.</p>
                  <textarea 
                    placeholder="e.g. 'Buy when the 14-day RSI crosses below 30 and the price is above the 200-day SMA. Exit when profit hits 5%.'"
                    className="w-full h-48 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-white focus:border-indigo-500 outline-none text-lg transition-all shadow-inner"
                  />
                  <button className="mt-8 bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 text-lg transition-all active:scale-95 shadow-xl shadow-indigo-600/20">
                    Generate & Backtest <Rocket size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Waitlist Modal */}
      {showWaitlist && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md p-10 rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-300">
            <h2 className="text-3xl font-bold text-white mb-3">Early Access</h2>
            <p className="text-zinc-400 mb-8 text-sm">Join the alpha to start trading with AI-powered strategy generation.</p>
            <input type="email" placeholder="Email address" className="w-full bg-black border border-zinc-800 rounded-2xl p-4 text-white mb-4 focus:border-indigo-500 outline-none" />
            <button onClick={() => setShowWaitlist(false)} className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-zinc-200 transition-all">Submit Request</button>
            <button onClick={() => setShowWaitlist(false)} className="w-full text-zinc-500 mt-4 text-sm font-medium">Close</button>
          </div>
        </div>
      )}

    </div>
  );
}

// --- Components ---

function NavIcon({ icon, active, onClick }: { icon: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`p-4 rounded-2xl transition-all duration-300 ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-110' : 'text-zinc-600 hover:text-zinc-400 hover:bg-zinc-900'}`}
    >
      {icon}
    </button>
  );
}

function InputBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.2em]">{label}</label>
      <div className="bg-black border border-zinc-800 p-4 rounded-2xl flex justify-between items-center group focus-within:border-zinc-600 transition-all">
        <span className="font-mono text-white text-sm tracking-widest">{value}</span>
        <span className="text-[10px] font-bold text-zinc-700 uppercase">USD</span>
      </div>
    </div>
  );
}
