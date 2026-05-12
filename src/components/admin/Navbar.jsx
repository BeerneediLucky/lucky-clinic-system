import React from 'react';
import { Search, Bell, User, ChevronDown, Menu } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="h-20 bg-white/50 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-40 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="h-6 w-6 text-slate-600" />
        </button>
        
        <div className="relative group hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search patients, records..."
            className="pl-10 pr-4 py-2 bg-slate-100/50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary/20 rounded-xl w-64 transition-all outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all group">
          <Bell className="h-5 w-5 group-hover:scale-110 transition-transform" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 p-1.5 pr-3 hover:bg-slate-100 rounded-xl transition-all outline-none">
            <div className="h-9 w-9 rounded-lg bg-medical text-white flex items-center justify-center font-bold shadow-sm">
              AD
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-bold text-slate-700 leading-none">Admin</p>
              <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-wider">Super Admin</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-slate-100 shadow-xl">
            <DropdownMenuLabel className="font-display text-base">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-xl py-2 cursor-pointer">Profile Settings</DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl py-2 cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50" onClick={() => {
              localStorage.removeItem("auth_token");
              window.location.href = "/login";
            }}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
