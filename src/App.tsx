import { motion } from "motion/react";
import { 
  Ship, 
  Globe, 
  Truck, 
  Leaf, 
  Anchor, 
  ShieldCheck, 
  Menu, 
  X, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Search,
  Loader2,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { useState, useEffect, useCallback, FormEvent } from "react";

// --- Components ---

const TrackingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<any>(null);

  const handleTrack = async (e: FormEvent) => {
    e.preventDefault();
    if (!trackingNumber) return;

    setStatus("loading");
    
    // Simulasi API Call
    setTimeout(() => {
      if (trackingNumber.length < 5) {
        setStatus("error");
        setResult({ message: "Nomor pelacakan tidak valid. Silakan periksa kembali." });
      } else {
        setStatus("success");
        setResult({
          number: trackingNumber,
          currentStatus: "Dalam Perjalanan",
          location: "Pelabuhan Tanjung Priok, Jakarta",
          eta: "05 April 2026",
          history: [
            { date: "30 Mar 2026", event: "Keberangkatan dari Tanjung Priok, Jakarta", status: "completed" },
            { date: "31 Mar 2026", event: "Transit di Terusan Suez, Mesir", status: "completed" },
            { date: "02 Apr 2026", event: "Estimasi Tiba di Jakarta", status: "pending" },
          ]
        });
      }
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-blue/60 backdrop-blur-md"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative bg-white w-full max-w-2xl shadow-2xl overflow-hidden rounded-sm"
      >
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-serif text-brand-blue">Lacak Pengiriman</h2>
            <p className="text-slate-500 text-sm mt-1">Masukkan nomor kontainer atau Bill of Lading Anda</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="p-8">
          <form onSubmit={handleTrack} className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                placeholder="Contoh: CMAU1234567"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-brand-blue transition-all"
              />
            </div>
            <button 
              disabled={status === "loading"}
              className="px-8 py-4 bg-brand-blue text-white font-bold uppercase tracking-widest hover:bg-brand-red transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Lacak"}
            </button>
          </form>

          {status === "loading" && (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
              <p className="animate-pulse">Menghubungkan ke sistem satelit global...</p>
            </div>
          )}

          {status === "error" && (
            <div className="p-6 bg-red-50 border border-red-100 flex gap-4 items-start rounded-sm">
              <AlertCircle className="text-red-500 w-6 h-6 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-red-900">Kesalahan Pelacakan</h4>
                <p className="text-red-700 text-sm">{result.message}</p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 border border-slate-100">
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Status Saat Ini</div>
                  <div className="text-xl font-bold text-brand-blue flex items-center gap-2">
                    <CheckCircle2 className="text-green-500 w-5 h-5" /> {result.currentStatus}
                  </div>
                </div>
                <div className="p-6 bg-slate-50 border border-slate-100">
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Estimasi Tiba</div>
                  <div className="text-xl font-bold text-brand-blue flex items-center gap-2">
                    <Clock className="text-luxury-gold w-5 h-5" /> {result.eta}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-brand-blue uppercase tracking-widest text-xs">Riwayat Perjalanan</h4>
                <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
                  {result.history.map((item: any, idx: number) => (
                    <div key={idx} className="relative pl-10">
                      <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center z-10 ${item.status === 'completed' ? 'bg-brand-blue' : 'bg-slate-200'}`}>
                        {item.status === 'completed' && <CheckCircle2 className="text-white w-3 h-3" />}
                      </div>
                      <div className="text-xs text-slate-400 font-bold">{item.date}</div>
                      <div className={`text-sm ${item.status === 'completed' ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">
            Sistem Pelacakan Real-time PT. OCEAN LINE © 2026
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const Navbar = ({ onTrackClick }: { onTrackClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? "glass-nav py-3 shadow-md" 
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div 
            className={`bg-brand-blue flex items-center justify-center rounded-sm transition-all duration-700 ${
              isScrolled ? "w-9 h-9" : "w-12 h-12"
            }`}
          >
            <Ship className={`text-white transition-all duration-700 ${isScrolled ? "w-5 h-5" : "w-7 h-7"}`} />
          </div>
          <span 
            className={`font-serif font-bold tracking-tighter transition-all duration-700 ${
              isScrolled 
                ? "text-2xl text-brand-blue" 
                : "text-4xl text-white"
            }`}
          >
            PT. OCEAN LINE
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {["Solusi", "Armada", "Keberlanjutan", "Jaringan Global", "Kontak"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className={`text-sm font-medium uppercase tracking-widest hover:text-luxury-gold transition-all duration-700 ${
                isScrolled ? "text-slate-700" : "text-white"
              }`}
            >
              {item}
            </a>
          ))}
          <button 
            onClick={onTrackClick}
            className={`px-6 py-2.5 font-bold uppercase tracking-widest transition-all duration-700 rounded-sm flex items-center gap-2 text-xs ${
              isScrolled 
                ? "bg-brand-blue text-white hover:bg-brand-red shadow-lg shadow-brand-blue/20" 
                : "bg-white text-brand-blue hover:bg-luxury-gold hover:text-white"
            }`}
          >
            <Search className="w-3.5 h-3.5" /> Lacak Pengiriman
          </button>
        </div>

        <button 
          className="md:hidden transition-all duration-700" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={isScrolled ? "text-brand-blue" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-brand-blue" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white shadow-2xl py-10 px-6 flex flex-col gap-8 md:hidden border-t border-slate-100"
        >
          {["Solusi", "Armada", "Keberlanjutan", "Jaringan Global", "Kontak"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-2xl font-serif text-brand-blue border-b border-slate-100 pb-4 hover:text-luxury-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onTrackClick();
            }}
            className="w-full py-5 bg-brand-blue text-white font-bold uppercase tracking-widest rounded-sm flex items-center justify-center gap-3 shadow-xl"
          >
            <Search className="w-5 h-5" /> Lacak Pengiriman
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1494412574743-0194849a60ef?auto=format&fit=crop&q=80&w=2000" 
          alt="Kapal PT. OCEAN LINE" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/80 via-brand-blue/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="text-luxury-gold uppercase tracking-[0.3em] font-bold text-sm mb-4 block">
            Cara Lebih Baik untuk Pengiriman
          </span>
          <h1 className="text-6xl md:text-8xl text-white leading-tight mb-8">
            Menavigasi <br />
            <span className="italic">Masa Depan</span> Logistik
          </h1>
          <p className="text-xl text-slate-200 mb-10 font-light leading-relaxed">
            Pemimpin dalam pelayaran dan logistik, PT. OCEAN LINE melayani lebih dari 420 pelabuhan di seluruh dunia dengan armada 500+ kapal.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-10 py-4 bg-white text-brand-blue font-bold uppercase tracking-widest hover:bg-brand-red hover:text-white transition-all duration-300 flex items-center gap-2 group">
              Jelajahi Solusi <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-4 border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300">
              Armada Kami
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <span className="text-[10px] uppercase tracking-[0.2em]">Gulir</span>
        <div className="w-px h-10 bg-white/30"></div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "Kapal", value: "593" },
    { label: "Pelabuhan Dilayani", value: "420" },
    { label: "Kapasitas TEU", value: "3.3M" },
    { label: "Karyawan", value: "155rb" },
  ];

  return (
    <section className="bg-brand-blue py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-serif text-white mb-2">{stat.value}</div>
              <div className="text-luxury-gold uppercase tracking-widest text-xs font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Transportasi Laut",
      desc: "Bisnis inti kami, menghubungkan benua dengan presisi dan keandalan melalui jaringan global kami yang luas.",
      icon: Ship,
    },
    {
      title: "Solusi Logistik",
      desc: "Manajemen rantai pasok ujung-ke-ujung melalui CEVA Logistics, menyediakan solusi udara, laut, dan darat.",
      icon: Truck,
    },
    {
      title: "Layanan Digital",
      desc: "Alat digital inovatif untuk mengelola pengiriman Anda, melacak kargo secara real-time, dan mengoptimalkan bisnis Anda.",
      icon: Globe,
    },
    {
      title: "Kargo Khusus",
      desc: "Penanganan ahli untuk barang berpendingin, kargo berukuran besar, dan bahan berbahaya dengan peralatan khusus.",
      icon: ShieldCheck,
    }
  ];

  return (
    <section id="solusi" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand-red uppercase tracking-[0.2em] font-bold text-xs mb-4 block">Keahlian Kami</span>
            <h2 className="text-5xl md:text-6xl text-brand-blue leading-tight">
              Solusi Komprehensif untuk Dunia yang <span className="italic">Terhubung</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-md text-lg leading-relaxed">
            Kami menyediakan layanan pengiriman dan logistik yang disesuaikan untuk memenuhi kebutuhan perdagangan global yang kompleks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-10 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-14 h-14 bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-brand-blue transition-colors duration-500">
                <service.icon className="text-brand-blue w-7 h-7 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-2xl text-brand-blue mb-4">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-6">
                {service.desc}
              </p>
              <a href="#" className="text-xs font-bold uppercase tracking-widest text-brand-red flex items-center gap-2 group-hover:gap-4 transition-all">
                Pelajari Lebih Lanjut <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Sustainability = () => {
  return (
    <section id="keberlanjutan" className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/5] overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=1000" 
                alt="Pelayaran Hijau" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 bg-brand-blue p-12 text-white hidden md:block">
              <Leaf className="w-12 h-12 text-luxury-gold mb-4" />
              <div className="text-3xl font-serif mb-2">Nol Karbon Bersih</div>
              <div className="text-white/60 text-sm uppercase tracking-widest">Target Tahun 2050</div>
            </div>
          </div>

          <div>
            <span className="text-brand-red uppercase tracking-[0.2em] font-bold text-xs mb-4 block">Bertindak untuk Planet</span>
            <h2 className="text-5xl md:text-6xl text-brand-blue leading-tight mb-8">
              Mempelopori Pelayaran <span className="italic text-luxury-gold">Berkelanjutan</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              PT. OCEAN LINE berkomitmen pada transisi energi industri maritim. Kami berinvestasi pada kapal bertenaga LNG, bahan bakar nabati, dan teknologi penangkapan karbon untuk melindungi lautan dan atmosfer kita.
            </p>
            
            <div className="space-y-6 mb-10">
              {[
                "Armada bertenaga LNG 'siap e-metana'",
                "Investasi pada bahan bakar nabati generasi ke-2",
                "Reforestasi dan perlindungan keanekaragaman hayati",
                "Perutean yang dioptimalkan untuk efisiensi bahan bakar"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-luxury-gold rounded-full"></div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <button className="px-10 py-4 bg-brand-blue text-white font-bold uppercase tracking-widest hover:bg-brand-red transition-all duration-300">
              Baca Laporan CSR
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Fleet = () => {
  const [activeFilter, setActiveFilter] = useState("Semua");

  const vessels = [
    { 
      name: "OCEAN LINE JACQUES SAADE", 
      type: "Bertenaga LNG", 
      status: "Aktif",
      img: "https://images.unsplash.com/photo-1494412572233-663b7a399bb3?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      name: "OCEAN LINE MARCO POLO", 
      type: "Kontainer Sangat Besar", 
      status: "Aktif",
      img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      name: "OCEAN LINE BOUGAINVILLE", 
      type: "Kelas Explorer", 
      status: "Dalam Perbaikan",
      img: "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      name: "OCEAN LINE TROCADERO", 
      type: "Bertenaga LNG", 
      status: "Aktif",
      img: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      name: "OCEAN LINE ANTOINE DE SAINT EXUPERY", 
      type: "Kontainer Sangat Besar", 
      status: "Aktif",
      img: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800" 
    },
    { 
      name: "OCEAN LINE ZHENG HE", 
      type: "Kelas Explorer", 
      status: "Dipesan",
      img: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=800" 
    },
  ];

  const filters = ["Semua", "Bertenaga LNG", "Kontainer Sangat Besar", "Kelas Explorer", "Aktif", "Dalam Perbaikan"];

  const filteredVessels = activeFilter === "Semua" 
    ? vessels 
    : vessels.filter(v => v.type === activeFilter || v.status === activeFilter);

  return (
    <section id="armada" className="py-32 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-luxury-gold uppercase tracking-[0.3em] font-bold text-xs mb-4 block">Kekuatan Keunggulan</span>
          <h2 className="text-5xl md:text-6xl mb-6">Armada Global Kami</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-12">
            Mengoperasikan salah satu armada termuda dan paling efisien di dunia, dilengkapi dengan teknologi lingkungan terbaru.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold border transition-all duration-300 rounded-sm ${
                  activeFilter === filter 
                    ? "bg-luxury-gold text-brand-blue border-luxury-gold" 
                    : "bg-transparent text-white/60 border-white/10 hover:border-white/40"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4">
          {filteredVessels.map((vessel, idx) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              key={vessel.name} 
              className="relative group overflow-hidden bg-slate-800 rounded-sm"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <img 
                  src={vessel.img} 
                  alt={vessel.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border text-[9px] uppercase tracking-[0.2em] font-bold ${
                    vessel.status === "Aktif" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                    vessel.status === "Dalam Perbaikan" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                    "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      vessel.status === "Aktif" ? "bg-emerald-400 animate-pulse" :
                      vessel.status === "Dalam Perbaikan" ? "bg-amber-400" :
                      "bg-blue-400"
                    }`}></div>
                    {vessel.status}
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
                  <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="text-luxury-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {vessel.type}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif leading-tight mb-6 group-hover:text-luxury-gold transition-colors duration-500">
                      {vessel.name}
                    </h3>
                    
                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      <div className="h-px flex-grow bg-white/20"></div>
                      <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:text-luxury-gold transition-colors flex items-center gap-2">
                        Detail Kapal <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredVessels.length === 0 && (
          <div className="text-center py-20 text-white/40">
            Tidak ada kapal yang ditemukan untuk kategori ini.
          </div>
        )}
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="kontak" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <span className="text-brand-red uppercase tracking-[0.2em] font-bold text-xs mb-4 block">Hubungi Kami</span>
            <h2 className="text-5xl md:text-6xl text-brand-blue leading-tight mb-8">
              Mari Rancang <span className="italic">Kesuksesan</span> Anda
            </h2>
            <p className="text-lg text-slate-600 mb-12">
              Tim ahli global kami siap membantu Anda mengoptimalkan rantai pasok Anda. Hubungi kami untuk solusi yang disesuaikan.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-full flex-shrink-0">
                  <MapPin className="text-brand-blue w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-blue mb-1">Kantor Pusat Global</h4>
                  <p className="text-slate-500">Jl. Jend. Sudirman No. 1, Jakarta Pusat, Indonesia</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-full flex-shrink-0">
                  <Phone className="text-brand-blue w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-blue mb-1">Dukungan Telepon</h4>
                  <p className="text-slate-500">+33 (0)4 88 91 90 00</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-full flex-shrink-0">
                  <Mail className="text-brand-blue w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-blue mb-1">Inkuiri Email</h4>
                  <p className="text-slate-500">contact@cma-cgm.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-12 rounded-sm border border-slate-100">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Nama Lengkap</label>
                  <input type="text" className="w-full bg-white border border-slate-200 px-4 py-3 focus:outline-none focus:border-brand-blue transition-colors" placeholder="Budi Santoso" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Alamat Email</label>
                  <input type="email" className="w-full bg-white border border-slate-200 px-4 py-3 focus:outline-none focus:border-brand-blue transition-colors" placeholder="budi@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Subjek</label>
                <select className="w-full bg-white border border-slate-200 px-4 py-3 focus:outline-none focus:border-brand-blue transition-colors">
                  <option>Penawaran Pengiriman</option>
                  <option>Solusi Logistik</option>
                  <option>Inkuiri Keberlanjutan</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Pesan</label>
                <textarea rows={4} className="w-full bg-white border border-slate-200 px-4 py-3 focus:outline-none focus:border-brand-blue transition-colors" placeholder="Bagaimana kami bisa membantu Anda?"></textarea>
              </div>
              <button className="w-full py-4 bg-brand-blue text-white font-bold uppercase tracking-widest hover:bg-brand-red transition-all duration-300">
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-blue text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-24">
          <div className="space-y-8">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-luxury-gold flex items-center justify-center rounded-sm transition-transform group-hover:scale-110 duration-300">
                <Ship className="text-brand-blue w-6 h-6" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tighter">PT. OCEAN LINE</span>
            </div>
            <p className="text-white/60 leading-relaxed text-sm max-w-xs">
              Pemimpin global dalam pelayaran dan logistik, berkomitmen pada transisi energi dan keunggulan layanan di seluruh dunia.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-luxury-gold hover:text-brand-blue hover:border-luxury-gold transition-all duration-300 rounded-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:pl-10">
            <h4 className="text-luxury-gold uppercase tracking-[0.2em] text-[10px] font-bold mb-10">Solusi</h4>
            <ul className="space-y-5 text-white/60 text-sm">
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Transportasi Laut</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Logistik & Rantai Pasok</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Kargo Udara</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Kargo Khusus</a></li>
            </ul>
          </div>

          <div className="lg:pl-10">
            <h4 className="text-luxury-gold uppercase tracking-[0.2em] text-[10px] font-bold mb-10">Grup</h4>
            <ul className="space-y-5 text-white/60 text-sm">
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Keberlanjutan</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Karir</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Ruang Berita</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-luxury-gold uppercase tracking-[0.2em] text-[10px] font-bold mb-10">Buletin</h4>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              Dapatkan berita terbaru tentang pelayaran global dan inovasi logistik kami.
            </p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                className="bg-white/5 border border-white/10 px-5 py-3 w-full focus:outline-none focus:bg-white/10 focus:border-luxury-gold/50 transition-all text-sm rounded-sm" 
                placeholder="Alamat Email Anda" 
              />
              <button className="bg-luxury-gold text-brand-blue px-6 py-3 font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-white transition-all duration-300 rounded-sm">
                Berlangganan
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-8 text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">
          <div className="text-center lg:text-left">
            © 2026 PT. OCEAN LINE. Seluruh Hak Cipta Dilindungi.
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            <a href="#" className="hover:text-white transition-colors">Pemberitahuan Hukum</a>
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-luxury-gold selection:text-brand-blue">
      <Navbar onTrackClick={() => setIsTrackModalOpen(true)} />
      <Hero />
      <Stats />
      <Services />
      <Sustainability />
      <Fleet />
      <Contact />
      <Footer />

      <TrackingModal 
        isOpen={isTrackModalOpen} 
        onClose={() => setIsTrackModalOpen(false)} 
      />
    </div>
  );
}
