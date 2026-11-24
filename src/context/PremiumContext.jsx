import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import QrisModal from '../components/QrisModal';

const PremiumContext = createContext(null);

/**
 * Menyediakan satu QrisModal global supaya gembok materi di halaman mana pun
 * bisa membuka pop-up pembayaran yang sama.
 */
export function PremiumProvider({ children }) {
  const [state, setState] = useState({ open: false, reason: '' });

  const openUpgradeModal = useCallback((reason = '') => setState({ open: true, reason }), []);
  const closeUpgradeModal = useCallback(() => setState((current) => ({ ...current, open: false })), []);

  const value = useMemo(() => ({ openUpgradeModal, closeUpgradeModal }), [openUpgradeModal, closeUpgradeModal]);

  return (
    <PremiumContext.Provider value={value}>
      {children}
      <QrisModal open={state.open} reason={state.reason} onClose={closeUpgradeModal} />
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  const context = useContext(PremiumContext);
  if (!context) throw new Error('usePremium harus dipakai di dalam <PremiumProvider>.');
  return context;
}
