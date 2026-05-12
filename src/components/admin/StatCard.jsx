import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-6 rounded-[2rem] flex flex-col justify-between h-full group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl bg-medical text-white shadow-lg shadow-medical/20`}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
            trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trendValue}
          </div>
        )}
      </div>
      
      <div>
        <p className="text-slate-500 font-medium text-sm mb-1">{title}</p>
        <h3 className="text-3xl font-black text-slate-800 tracking-tight">{value}</h3>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">View Details</span>
        <div className="h-2 w-12 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '70%' }}
            className="h-full bg-medical"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
