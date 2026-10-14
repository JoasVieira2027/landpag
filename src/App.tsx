import React, { useState } from 'react';
import './App.css';
import { SiteProvider } from './context/SiteContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Plans } from './components/Plans';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { AdminModal } from './components/AdminPanel/AdminModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';

const MainAppContent: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const handleOpenQuoteModal = (serviceName?: string) => {
    setPreselectedService(serviceName);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setPreselectedService(undefined);
  };

  return (
    <div className="app-root">
      <Navbar onOpenQuoteModal={() => handleOpenQuoteModal()} />

      <main id="main-content">
        <Hero onOpenQuoteModal={() => handleOpenQuoteModal()} />
        <Plans />
        <CtaSection onOpenQuoteModal={() => handleOpenQuoteModal()} />
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppFloat />

      {/* Quote & Calculator Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
        preselectedService={preselectedService}
      />

      {/* Admin Management System Modal */}
      <AdminModal />
    </div>
  );
};

export function App() {
  return (
    <SiteProvider>
      <MainAppContent />
    </SiteProvider>
  );
}

export default App;
