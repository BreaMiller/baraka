import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface SubscriptionState {
  subscription: any;
  loading: boolean;
  fetchSubscription: () => Promise<void>;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: null,
  loading: true,
  fetchSubscription: async () => {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .single();
    
    if (!error) {
      set({ subscription: data, loading: false });
    } else {
      set({ subscription: null, loading: false });
    }
  },
}));