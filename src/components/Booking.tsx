import React, { useState, useId } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Copy, 
  CalendarPlus, 
  Scissors,
  Check,
  AlertCircle
} from 'lucide-react';
import { BARBERSHOP_DATA, ServiceItem } from '../data/barbershopData';

interface BookingProps {
  selectedService: ServiceItem | null;
  onSelectService: (service: ServiceItem) => void;
}

export const Booking: React.FC<BookingProps> = ({ selectedService, onSelectService }) => {
  const serviceSelectId = useId();
  const clientNameId = useId();
  const clientPhoneId = useId();
  const clientNotesId = useId();
  
  // Service selection (defaults to Combo or Corte if null)
  const [activeServiceId, setActiveServiceId] = useState<string>(
    selectedService ? selectedService.id : 'combo-corte-barba'
  );

  // Sync if prop changed
  React.useEffect(() => {
    if (selectedService) {
      setActiveServiceId(selectedService.id);
    }
  }, [selectedService]);

  // Generate next 14 available dates starting from tomorrow or today
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const dayOfWeek = d.getDay(); // 0 is Sunday
      
      // We list Monday to Saturday normally, Sunday marked as Closed / Special
      const isSunday = dayOfWeek === 0;
      const formattedDate = d.toISOString().split('T')[0];
      const weekdayShort = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
      const dayNumber = d.getDate();
      const monthShort = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');

      dates.push({
        dateObj: d,
        isoString: formattedDate,
        weekday: weekdayShort.toUpperCase(),
        dayNumber,
        month: monthShort.toUpperCase(),
        isSunday,
        label: `${weekdayShort}, ${dayNumber} de ${monthShort}`,
      });
    }
    return dates;
  }, []);

  // Pick first non-Sunday as initial date
  const [selectedDate, setSelectedDate] = useState<string>(
    availableDates.find(d => !d.isSunday)?.isoString || availableDates[0].isoString
  );

  // Available slots
  const morningSlots = ['09:00', '09:45', '10:30', '11:15', '12:00'];
  const afternoonSlots = ['13:30', '14:15', '15:00', '15:45', '16:30'];
  const eveningSlots = ['17:15', '18:00', '18:45', '19:30'];

  const [selectedTime, setSelectedTime] = useState<string>('15:00');

  // Customer form info
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});

  // Confirmation modal state
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // Current active service item
  const currentService = BARBERSHOP_DATA.services.find(s => s.id === activeServiceId) || BARBERSHOP_DATA.services[0];
  const currentDateObj = availableDates.find(d => d.isoString === selectedDate);

  const validateForm = () => {
    const errors: { name?: string; phone?: string } = {};
    if (!clientName.trim()) {
      errors.name = 'Por favor, informe seu nome completo.';
    }
    if (!clientPhone.trim() || clientPhone.trim().length < 8) {
      errors.phone = 'Informe seu telefone/WhatsApp para contato.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const constructWhatsAppMessage = () => {
    const dateFormatted = currentDateObj ? currentDateObj.label : selectedDate;
    const msg = 
`Olá, Barbearia Matheus lucian! Gostaria de agendar meu horário:

✂️ *Serviço:* ${currentService.name} (${currentService.price})
📅 *Data:* ${dateFormatted}
⏰ *Horário:* ${selectedTime}
👤 *Cliente:* ${clientName || 'Cliente'}
📱 *WhatsApp:* ${clientPhone || '(61) 99292-0911'}
${clientNotes ? `📝 *Observação:* ${clientNotes}\n` : ''}
📍 *Unidade:* CCSW 6 - St. Sudoeste comércio local - Brasília DF

Aguardo confirmação. Obrigado!`;

    return encodeURIComponent(msg);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const encoded = constructWhatsAppMessage();
    const waUrl = `https://wa.me/${BARBERSHOP_DATA.phoneRaw}?text=${encoded}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');

    // Show on-screen confirmation modal
    setIsSuccessModalOpen(true);
  };

  const getGoogleCalendarUrl = () => {
    if (!currentDateObj) return '#';
    // Format start time YYYYMMDDTHHmmSS
    const [year, month, day] = selectedDate.split('-');
    const [hours, minutes] = selectedTime.split(':');
    
    const startIso = `${year}${month}${day}T${hours}${minutes}00`;
    
    // Duration approx 1 hour
    const endHour = (parseInt(hours, 10) + 1).toString().padStart(2, '0');
    const endIso = `${year}${month}${day}T${endHour}${minutes}00`;

    const title = encodeURIComponent(`Barbearia Matheus lucian - ${currentService.name}`);
    const details = encodeURIComponent(`Agendamento de ${currentService.name} (${currentService.price}) com Matheus Lucian no Sudoeste. Tel: (61) 99292-0911.`);
    const location = encodeURIComponent(BARBERSHOP_DATA.address.full);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  const copyBookingSummary = () => {
    const dateFormatted = currentDateObj ? currentDateObj.label : selectedDate;
    const summary = `Agendamento - Barbearia Matheus lucian\nServiço: ${currentService.name}\nData: ${dateFormatted} às ${selectedTime}\nLocal: ${BARBERSHOP_DATA.address.full}\nWhatsApp: (61) 99292-0911`;
    navigator.clipboard.writeText(summary);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <section id="agendamento" className="py-20 sm:py-28 bg-[#1A1A1A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Agendamento Online Rápido</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5] uppercase tracking-tight mb-4">
            Reserve o Seu Horário
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Sem filas ou espera. Selecione o serviço, o melhor dia e o horário conveniente. 
            Confirmamos instantaneamente via WhatsApp para sua comodidade.
          </p>
        </div>

        {/* Booking Card Form */}
        <div className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
          
          <form onSubmit={handleBookingSubmit} className="p-6 sm:p-10 space-y-10">
            
            {/* Step 1: Select Service */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label htmlFor={serviceSelectId} className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#F5F5F5] uppercase tracking-wide">
                  <span className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 text-xs flex items-center justify-center text-white">
                    1
                  </span>
                  <span>Escolha o Serviço</span>
                </label>
                <span className="text-xs text-neutral-400">
                  {currentService.name} • {currentService.price}
                </span>
              </div>

              {/* Service Cards Radio Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {BARBERSHOP_DATA.services.map((service) => {
                  const isSelected = activeServiceId === service.id;
                  return (
                    <button
                      type="button"
                      key={service.id}
                      onClick={() => {
                        setActiveServiceId(service.id);
                        onSelectService(service);
                      }}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-[#F5F5F5] text-[#1A1A1A] border-white shadow-lg'
                          : 'bg-neutral-800/40 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/80'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-bold text-sm block leading-tight">
                          {service.name}
                        </span>
                        {isSelected && <Check className="w-4 h-4 shrink-0 text-neutral-900" />}
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className={isSelected ? 'text-neutral-700' : 'text-neutral-400'}>
                          {service.duration}
                        </span>
                        <span className={`font-extrabold ${isSelected ? 'text-black' : 'text-white'}`}>
                          {service.price}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Choose Date */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#F5F5F5] uppercase tracking-wide">
                  <span className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 text-xs flex items-center justify-center text-white">
                    2
                  </span>
                  <span>Escolha a Data</span>
                </span>
                <span className="text-xs text-neutral-400">
                  {currentDateObj?.label}
                </span>
              </div>

              {/* Date horizontal scroller */}
              <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-thin">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.isoString;
                  if (item.isSunday) {
                    return (
                      <div
                        key={item.isoString}
                        className="flex flex-col items-center justify-center min-w-[72px] sm:min-w-[80px] py-3 px-2 rounded-xl border border-neutral-800/50 bg-neutral-950/40 opacity-40 cursor-not-allowed text-neutral-600 select-none"
                        title="Domingo: Fechado"
                      >
                        <span className="text-[10px] font-bold tracking-wider">{item.weekday}</span>
                        <span className="text-lg font-black">{item.dayNumber}</span>
                        <span className="text-[9px] uppercase">Fechado</span>
                      </div>
                    );
                  }

                  return (
                    <button
                      type="button"
                      key={item.isoString}
                      onClick={() => setSelectedDate(item.isoString)}
                      className={`flex flex-col items-center justify-center min-w-[72px] sm:min-w-[80px] py-3 px-2 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#F5F5F5] text-[#1A1A1A] border-white shadow-lg scale-102 font-bold'
                          : 'bg-neutral-800/40 text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800'
                      }`}
                    >
                      <span className={`text-[10px] font-bold tracking-wider ${isSelected ? 'text-neutral-700' : 'text-neutral-400'}`}>
                        {item.weekday}
                      </span>
                      <span className="text-lg sm:text-xl font-black">
                        {item.dayNumber}
                      </span>
                      <span className={`text-[10px] uppercase ${isSelected ? 'text-neutral-800' : 'text-neutral-500'}`}>
                        {item.month}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Choose Time Slot */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#F5F5F5] uppercase tracking-wide">
                  <span className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 text-xs flex items-center justify-center text-white">
                    3
                  </span>
                  <span>Escolha o Horário</span>
                </span>
                <span className="text-xs text-neutral-400">
                  Horário de Brasília: {selectedTime}
                </span>
              </div>

              {/* Time slots groups */}
              <div className="space-y-3">
                {/* Manhã */}
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 block">
                    Manhã
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {morningSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#F5F5F5] text-[#1A1A1A] shadow-md scale-105'
                              : 'bg-neutral-800/60 text-neutral-300 border border-neutral-800 hover:border-neutral-600 hover:text-white'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tarde */}
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 block">
                    Tarde
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {afternoonSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#F5F5F5] text-[#1A1A1A] shadow-md scale-105'
                              : 'bg-neutral-800/60 text-neutral-300 border border-neutral-800 hover:border-neutral-600 hover:text-white'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Noite */}
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold mb-1.5 block">
                    Final da Tarde / Noite
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {eveningSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#F5F5F5] text-[#1A1A1A] shadow-md scale-105'
                              : 'bg-neutral-800/60 text-neutral-300 border border-neutral-800 hover:border-neutral-600 hover:text-white'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Client Info */}
            <div className="pt-2">
              <label htmlFor={clientNameId} className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#F5F5F5] uppercase tracking-wide mb-4">
                <span className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 text-xs flex items-center justify-center text-white">
                  4
                </span>
                <span>Seus Dados de Contato</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={clientNameId} className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id={clientNameId}
                      type="text"
                      value={clientName}
                      onChange={(e) => {
                        setClientName(e.target.value);
                        if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                      }}
                      placeholder="Ex: Matheus ou Carlos Silva"
                      className={`w-full bg-neutral-800/80 border rounded-xl py-3 pl-10 pr-4 text-sm text-[#F5F5F5] placeholder-neutral-500 focus:outline-none transition-colors ${
                        formErrors.name ? 'border-red-500 focus:border-red-500' : 'border-neutral-700 focus:border-neutral-400'
                      }`}
                    />
                  </div>
                  {formErrors.name && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={clientPhoneId} className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Seu WhatsApp / Telefone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id={clientPhoneId}
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => {
                        setClientPhone(e.target.value);
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                      }}
                      placeholder="(61) 9XXXX-XXXX"
                      className={`w-full bg-neutral-800/80 border rounded-xl py-3 pl-10 pr-4 text-sm text-[#F5F5F5] placeholder-neutral-500 focus:outline-none transition-colors ${
                        formErrors.phone ? 'border-red-500 focus:border-red-500' : 'border-neutral-700 focus:border-neutral-400'
                      }`}
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor={clientNotesId} className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Observação ou Preferência de Estilo (Opcional)
                  </label>
                  <input
                    id={clientNotesId}
                    type="text"
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="Ex: Primeira vez na barbearia, gosto de fade alto, aparar barba mantendo comprimento..."
                    className="w-full bg-neutral-800/80 border border-neutral-700 focus:border-neutral-400 rounded-xl py-3 px-4 text-sm text-[#F5F5F5] placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Summary & Submit Action */}
            <div className="pt-6 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 bg-neutral-950/60 -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 p-6 sm:p-10">
              
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block">
                  Resumo do Agendamento
                </span>
                <p className="text-base sm:text-lg font-bold text-[#F5F5F5]">
                  {currentService.name} • {currentService.price}
                </p>
                <p className="text-xs text-neutral-400">
                  📅 {currentDateObj?.label} às {selectedTime} | 📍 Sudoeste CCSW 6
                </p>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F5F5F5] hover:bg-white hover:scale-[1.02] active:scale-98 transition-all shadow-xl shadow-white/10 cursor-pointer shrink-0"
              >
                <MessageSquare className="w-5 h-5 text-emerald-600 fill-emerald-600/20" />
                <span>Confirmar via WhatsApp</span>
              </button>

            </div>

          </form>

        </div>

        {/* Small security guarantee */}
        <div className="mt-6 text-center text-xs text-neutral-500">
          Seus dados não são armazenados em banco de dados externo. O agendamento é transmitido diretamente para o WhatsApp oficial (61) 99292-0911.
        </div>

      </div>

      {/* Confirmation Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto mb-5 text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-display text-2xl font-bold text-[#F5F5F5] uppercase mb-2">
              Solicitação Enviada!
            </h3>
            
            <p className="text-sm text-neutral-300 mb-6">
              Abrimos seu WhatsApp para enviar os detalhes à equipe da <strong>Barbearia Matheus lucian</strong>. 
              Confirmaremos sua vaga no horário solicitado.
            </p>

            {/* Ticket Card Details */}
            <div className="bg-neutral-950/80 rounded-xl p-4 border border-neutral-800 text-left text-xs sm:text-sm space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-400">Serviço:</span>
                <span className="font-bold text-white">{currentService.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Investimento:</span>
                <span className="font-bold text-white">{currentService.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Data e Horário:</span>
                <span className="font-bold text-emerald-400">
                  {currentDateObj?.label} às {selectedTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Cliente:</span>
                <span className="font-bold text-white">{clientName}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-800/80 pt-2">
                <span className="text-neutral-400">Localização:</span>
                <span className="font-bold text-white text-right">
                  CCSW 6 - Sudoeste, Brasília DF
                </span>
              </div>
            </div>

            {/* Quick Actions in Modal */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 transition-colors border border-neutral-700"
              >
                <CalendarPlus className="w-4 h-4 text-blue-400" />
                <span>Salvar no Google Agenda</span>
              </a>

              <button
                type="button"
                onClick={copyBookingSummary}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 transition-colors border border-neutral-700 cursor-pointer"
              >
                <Copy className="w-4 h-4 text-amber-400" />
                <span>{copiedText ? 'Copiado!' : 'Copiar Resumo'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F5F5F5] hover:bg-white transition-colors cursor-pointer"
            >
              Concluir
            </button>

          </div>
        </div>
      )}

    </section>
  );
};
