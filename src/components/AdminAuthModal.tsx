import React, { useState, useEffect, useRef } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, X, AlertCircle } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError('');
      setShowPassword(false);
      setShake(false);
      // Auto-focus input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (password === '16071322') {
      setError('');
      onSuccess();
    } else {
      setError('Ghalat password hai! Sahi password darj karein.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-[#0E1E31]/10 transition-transform ${
          shake ? 'animate-shake' : ''
        }`}
      >
        {/* Header */}
        <div className="bg-[#0E1E31] text-white px-6 py-5 flex items-center justify-between relative">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#B87B33]/20 flex items-center justify-center border border-[#B87B33]/40">
              <Lock className="w-5 h-5 text-[#B87B33]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-wide text-white">Admin Security</h3>
              <p className="text-xs text-stone-300">Enter password to unlock dashboard</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
              Dashboard Password
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter password..."
                className={`w-full px-4 py-3 pr-11 bg-stone-50 border rounded-xl text-stone-900 focus:outline-none focus:ring-2 transition-all font-mono tracking-wider ${
                  error 
                    ? 'border-red-400 focus:ring-red-300 bg-red-50/30' 
                    : 'border-stone-200 focus:ring-[#B87B33]/50 focus:border-[#B87B33]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="flex items-center space-x-1.5 mt-2 text-xs font-medium text-red-600">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="bg-[#FAF7F2] p-3 rounded-xl border border-stone-200/60 mb-6 flex items-start space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-[#B87B33] shrink-0 mt-0.5" />
            <p className="text-xs text-stone-600 leading-relaxed">
              Yeh area sirf authorized author ya site administrator ke liye protected hai.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 font-medium text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#0E1E31] hover:bg-[#1A2D44] text-[#B87B33] hover:text-[#D4AF37] font-semibold text-sm shadow-md transition-all flex items-center space-x-2 border border-[#B87B33]/40"
            >
              <Lock className="w-4 h-4" />
              <span>Unlock Dashboard</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
