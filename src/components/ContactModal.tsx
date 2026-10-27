import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail, MessageSquare, User } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Speaking & Book Inquiries');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-[#FAF7F2] rounded-md max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E4DCD0] text-left">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 p-1 rounded-sm focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-[#B87B33] mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-[#0E1E31] mb-2">
              Message Sent
            </h3>
            <p className="text-sm text-[#5B544A] max-w-sm mx-auto mb-6">
              Thank you, <span className="font-semibold text-[#0E1E31]">{name}</span>. Andy and the team will get back to you shortly.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-[#B87B33] hover:bg-[#A56D2B] text-white text-sm font-medium rounded-sm cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#B87B33] mb-1">
              GET IN TOUCH
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E1E31] mb-2">
              Contact Andy Mahoney
            </h3>
            <p className="text-xs sm:text-sm text-[#665F55] mb-6">
              Have questions about the books, speaking engagements, or bulk orders for your community? Send a direct note.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#443E36] uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Robert Jensen"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DDD3C2] rounded-sm text-sm text-stone-900 focus:outline-none focus:border-[#B87B33]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#443E36] uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. robert@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DDD3C2] rounded-sm text-sm text-stone-900 focus:outline-none focus:border-[#B87B33]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#443E36] uppercase tracking-wider mb-1">
                  Topic / Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#DDD3C2] rounded-sm text-sm text-stone-900 focus:outline-none focus:border-[#B87B33]"
                >
                  <option value="Speaking & Book Inquiries">Speaking & Workshop Inquiries</option>
                  <option value="Reader Question / Feedback">Reader Question or Feedback</option>
                  <option value="Bulk Order for Organizations">Bulk Order for Organizations / Clubs</option>
                  <option value="Media & Press Interview">Media & Press Interview</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#443E36] uppercase tracking-wider mb-1">
                  Your Message *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your note here..."
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DDD3C2] rounded-sm text-sm text-stone-900 focus:outline-none focus:border-[#B87B33]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#B87B33] hover:bg-[#A56D2B] text-white text-xs sm:text-sm font-medium rounded-sm shadow-xs transition-colors disabled:opacity-70 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
