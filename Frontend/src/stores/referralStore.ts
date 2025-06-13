
import { create } from 'zustand';

interface ReferralState {
  referralCode: string;
  credits: number;
  referrals: Array<{
    id: string;
    referredUser: string;
    status: 'pending' | 'completed';
    creditsEarned: number;
    date: Date;
  }>;
  
  // Actions
  setReferralCode: (code: string) => void;
  setCredits: (credits: number) => void;
  addReferral: (referral: any) => void;
  generateReferralCode: () => string;
}

export const useReferralStore = create<ReferralState>((set, get) => ({
  referralCode: '',
  credits: 0,
  referrals: [],

  setReferralCode: (code) => set({ referralCode: code }),
  setCredits: (credits) => set({ credits }),
  addReferral: (referral) => set((state) => ({ 
    referrals: [...state.referrals, referral] 
  })),
  
  generateReferralCode: () => {
    const code = 'REF' + Math.random().toString(36).substr(2, 9).toUpperCase();
    set({ referralCode: code });
    return code;
  },
}));
