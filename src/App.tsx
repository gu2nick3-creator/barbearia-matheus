/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Booking } from './components/Booking';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { LocationContact } from './components/LocationContact';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { ServiceItem, BARBERSHOP_DATA } from './data/barbershopData';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleBookClick = () => {
    // If no service selected, default to combo
    if (!selectedService) {
      const combo = BARBERSHOP_DATA.services.find((s) => s.id === 'combo-corte-barba');
      if (combo) setSelectedService(combo);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#F5F5F5] flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      {/* Fixed Navigation Bar */}
      <Navbar onBookClick={handleBookClick} />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onBookClick={handleBookClick} />

        {/* 2. About & Philosophy */}
        <About onBookClick={handleBookClick} />

        {/* 3. Services & Pricing */}
        <Services onSelectService={handleSelectService} />

        {/* 4. Responsive Photo Gallery with Lightbox */}
        <Gallery />

        {/* 5. Online Booking System */}
        <Booking
          selectedService={selectedService}
          onSelectService={handleSelectService}
        />

        {/* 6. Testimonials & Social Proof */}
        <Testimonials />

        {/* 7. FAQ Accordion */}
        <FAQ />

        {/* 8. Location & Contact Details */}
        <LocationContact />
      </main>

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer />
    </div>
  );
}
