import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const img = (file: string) => new URL(`../imports/${file}`, import.meta.url).href;

// 전체 29개 포트폴리오 아이템
const FEATURED = [
  { id: 1,  title: "웹 디자인",        subtitle: "Web Design",       category: "Digital",  src: img("07.png")    },
  { id: 2,  title: "웹 디자인",        subtitle: "Web Design",       category: "Digital",  src: img("08.png")    },
  { id: 3,  title: "브랜드 아이덴티티", subtitle: "Brand Identity",   category: "Branding", src: img("18.png")    },
  { id: 5,  title: "웹 디자인",        subtitle: "Web Design",       category: "Digital",  src: img("27.png")    },
  { id: 6,  title: "웹 디자인",        subtitle: "Web Design",       category: "Digital",  src: img("10.png")    },
  { id: 7,  title: "편집 디자인",      subtitle: "Editorial Design", category: "Print",    src: img("03.png")    },
  { id: 8,  title: "인포그래픽",       subtitle: "Infographic",      category: "Visual",   src: img("06.png")    },
];

const ALL_WORKS = [
  { id: 9,  title: "UI 디자인",        subtitle: "UI Design",        category: "Digital",  src: img("24.png"),   wide: true  },
  { id: 10, title: "대시보드",          subtitle: "Dashboard",        category: "Digital",  src: img("21.png"),   wide: false },
  { id: 11, title: "웹 디자인",        subtitle: "Web Design",       category: "Digital",  src: img("28.png"),   wide: false },
  { id: 12, title: "모니터링 시스템",   subtitle: "System UI",        category: "Digital",  src: img("26.png"),   wide: true  },
  { id: 13, title: "웹 디자인",        subtitle: "Web Design",       category: "Digital",  src: img("29.png"),   wide: true  },
  { id: 14, title: "데이터 분석 UI",   subtitle: "Data UI",          category: "Digital",  src: img("22.png"),   wide: false },
  { id: 15, title: "편집 디자인",      subtitle: "Editorial Design", category: "Print",    src: img("20.png"),   wide: false },
  { id: 16, title: "인쇄물",           subtitle: "Print Design",     category: "Print",    src: img("01..png"),  wide: false },
  { id: 17, title: "인쇄물",           subtitle: "Print Design",     category: "Print",    src: img("02.png"),   wide: false },
  { id: 18, title: "인쇄물",           subtitle: "Print Design",     category: "Print",    src: img("04.png"),   wide: false },
  { id: 19, title: "인포그래픽",       subtitle: "Infographic",      category: "Visual",   src: img("05.png"),   wide: false },
  { id: 20, title: "시스템 UI",        subtitle: "System UI",        category: "Digital",  src: img("09.png"),   wide: true  },
  { id: 21, title: "AI 챗봇",          subtitle: "AI Chatbot",       category: "Digital",  src: img("11.png"),   wide: false },
  { id: 22, title: "AI 챗봇 상세",     subtitle: "AI Chatbot",       category: "Digital",  src: img("12.png"),   wide: false },
  { id: 23, title: "대시보드",          subtitle: "Dashboard",        category: "Digital",  src: img("13.png"),   wide: true  },
  { id: 24, title: "시스템 UI",        subtitle: "System UI",        category: "Digital",  src: img("14.png"),   wide: false },
  { id: 25, title: "모니터링",          subtitle: "Monitoring",       category: "Digital",  src: img("15.png"),   wide: false },
  { id: 26, title: "조직도 관리",      subtitle: "System UI",        category: "Digital",  src: img("16.png"),   wide: false },
  { id: 27, title: "알림 시스템",      subtitle: "System UI",        category: "Digital",  src: img("17.png"),   wide: false },
  { id: 28, title: "검색 UI",          subtitle: "Search UI",        category: "Digital",  src: img("23.png"),   wide: false },
  { id: 29, title: "문서 뷰어",        subtitle: "Document Viewer",  category: "Digital",  src: img("25.png"),   wide: true  },
];

const HERO_SLIDES = [
  { en: "CREATIVE", ko: "창의적인 디자인 경험",    sub: "감각에서 나오는 새로운 시각" },
  { en: "EDITORIAL", ko: "편집적 시각 언어",       sub: "브랜드의 본질을 담아냅니다" },
  { en: "VISUAL",   ko: "비주얼 커뮤니케이션",     sub: "디자인으로 연결하는 세계"   },
];

function SphereCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth, h = mount.clientHeight;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080808);

    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 조명
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(6, 6, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x4466aa, 1.2);
    rim.position.set(-6, -4, -4);
    scene.add(rim);
    const fill = new THREE.PointLight(0xffffff, 0.5, 20);
    fill.position.set(0, 3, 3);
    scene.add(fill);

    // 구체 데이터
    const data = [
      { p: [-3.2,  1.0,  0.0] as [number,number,number], r: 1.8, metal: 0.95, rough: 0.05 },
      { p: [ 3.0, -0.8, -2.0] as [number,number,number], r: 1.4, metal: 0.9,  rough: 0.1  },
      { p: [ 0.5,  2.5, -1.5] as [number,number,number], r: 0.9, metal: 0.85, rough: 0.15 },
      { p: [-1.0, -2.5,  0.5] as [number,number,number], r: 1.1, metal: 0.9,  rough: 0.08 },
      { p: [ 4.5,  1.5, -3.0] as [number,number,number], r: 0.7, metal: 0.95, rough: 0.05 },
      { p: [-4.0, -0.5, -2.5] as [number,number,number], r: 1.0, metal: 0.88, rough: 0.12 },
      { p: [ 1.5, -1.5,  1.0] as [number,number,number], r: 0.6, metal: 0.92, rough: 0.08 },
    ];

    const group = new THREE.Group();
    const meshes: THREE.Mesh[] = [];
    const origins = data.map(d => ({ ...d }));
    const offsets = data.map(() => Math.random() * Math.PI * 2);

    data.forEach(d => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(d.r, 128, 128),
        new THREE.MeshStandardMaterial({
          color: 0x1a1a1a,
          metalness: d.metal,
          roughness: d.rough,
          envMapIntensity: 1.2,
        })
      );
      mesh.position.set(...d.p);
      group.add(mesh);
      meshes.push(mesh);
    });
    scene.add(group);

    // 마우스
    const mouse = { x: 0, y: 0 };
    const rot = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let id: number;
    const animate = () => {
      id = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      rot.y += (mouse.x * 0.25 - rot.y) * 0.04;
      rot.x += (mouse.y * 0.15 - rot.x) * 0.04;
      group.rotation.y = rot.y;
      group.rotation.x = rot.x;

      meshes.forEach((m, i) => {
        m.position.y = origins[i].p[1] + Math.sin(t * 0.4 + offsets[i]) * 0.25;
        m.rotation.y += 0.004;
        m.rotation.x += 0.002;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}

function useIntersection(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-sm border-b border-black/10" : "bg-transparent"
      }`}
    >
      <div className="px-8 md:px-16 py-5" />
    </header>
  );
}

function Hero() {
  const [slide, setSlide] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setSlide((s) => (s + 1) % HERO_SLIDES.length);
        setFading(false);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_SLIDES[slide];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#080808] flex flex-col justify-end">
      <SphereCanvas />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="relative z-10 px-8 md:px-16 pb-20">
        <div
          className={`transition-all duration-500 ${fading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
        >
          <p className="font-['Noto_Sans_KR'] text-white/50 text-base tracking-[0.4em] uppercase mb-4">
            {current.sub}
          </p>
          <h1 className="font-['Archivo_Black'] text-white text-[clamp(4rem,14vw,13rem)] leading-none tracking-tight mb-2">
            {current.en}
          </h1>
          <p className="font-['Noto_Sans_KR'] text-white/70 text-lg md:text-2xl font-light tracking-widest">
            {current.ko}
          </p>
        </div>
        <div className="flex gap-2 mt-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-[2px] transition-all duration-300 ${i === slide ? "w-8 bg-white" : "w-4 bg-white/30"}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2 z-10">
        <span className="font-['Archivo'] text-white/40 text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center mb-4">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 w-full h-full bg-white/60 animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}

type PortfolioItem = { title: string; subtitle: string; category: string; src: string };

function PortfolioCard({
  item,
  aspectClass,
  maskHalf,
  onClick,
}: {
  item: PortfolioItem;
  aspectClass: string;
  maskHalf?: boolean;
  onClick?: (item: PortfolioItem) => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative overflow-hidden bg-gray-100 cursor-pointer ${aspectClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick?.(item)}
      style={maskHalf ? { WebkitMaskImage: "linear-gradient(to right, black 50%, transparent 50%)", maskImage: "linear-gradient(to right, black 50%, transparent 50%)" } : undefined}
    >
      <img
        src={item.src}
        alt={item.subtitle}
        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
          hovered ? "scale-105" : "scale-100"
        }`}
      />
      <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${hovered ? "opacity-60" : "opacity-0"}`} />
      <div className={`absolute inset-0 flex flex-col justify-end p-4 md:p-5 transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <span className="font-['Archivo'] text-white/60 text-[10px] tracking-[0.3em] uppercase mb-1">{item.category}</span>
        <h3 className="font-['Noto_Sans_KR'] text-white text-sm md:text-base font-medium leading-snug">{item.title}</h3>
        <p className="font-['Archivo'] text-white/70 text-xs tracking-wider mt-0.5">{item.subtitle}</p>
      </div>
    </div>
  );
}

function ImageModal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-8 font-['Archivo'] text-white/50 hover:text-white text-sm tracking-[0.2em] uppercase transition-colors"
        onClick={onClose}
      >
        Close ✕
      </button>
      <div
        className="relative max-w-[90vw] max-h-[88vh] flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.subtitle}
          className="max-w-full max-h-[80vh] object-contain"
        />
        <div className="text-center">
          <p className="font-['Archivo'] text-white/40 text-[10px] tracking-[0.3em] uppercase">{item.category}</p>
          <p className="font-['Noto_Sans_KR'] text-white text-sm mt-1">{item.title}</p>
        </div>
      </div>
    </div>
  );
}

function PortfolioSection() {
  const { ref: ref1, visible: v1 } = useIntersection();
  const { ref: ref2, visible: v2 } = useIntersection();
  const [modalItem, setModalItem] = useState<PortfolioItem | null>(null);

  const fadeIn = (visible: boolean, delay: number) =>
    `transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} delay-[${delay}ms]`;

  const open = (item: PortfolioItem) => setModalItem(item);
  const close = () => setModalItem(null);

  return (
    <section className="bg-white pt-24 pb-20">
      {/* 섹션 헤더 */}
      <div className="px-8 md:px-16 mb-16">
        <div className="flex items-end justify-between border-b border-black pb-6">
          <div>
            <p className="font-['Archivo'] text-black/40 text-xs tracking-[0.4em] uppercase mb-3">Portfolio</p>
            <h2 className="font-['Archivo_Black'] text-[clamp(4rem,12vw,11rem)] leading-none tracking-tight text-black">
              Visual
              <br />
              <span className="text-black/20">Archive</span>
            </h2>
          </div>
          <p className="font-['Noto_Sans_KR'] text-black/40 text-sm leading-relaxed text-right hidden md:block max-w-xs">
            브랜딩부터 웹까지
            <br />
            다양한 분야의 디자인 작업물입니다
          </p>
        </div>
      </div>

      {/* ── Featured Grid (7개) ── */}
      <div ref={ref1} className="px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        {/* 07 — wide 2col */}
        <div className={`col-span-2 ${fadeIn(v1, 0)}`}>
          <PortfolioCard item={FEATURED[0]} aspectClass="aspect-[16/9]" onClick={open} />
        </div>
        {/* 08 */}
        <div className={fadeIn(v1, 80)}>
          <PortfolioCard item={FEATURED[1]} aspectClass="aspect-[4/3]" onClick={open} />
        </div>
        {/* 18 */}
        <div className={fadeIn(v1, 120)}>
          <PortfolioCard item={FEATURED[2]} aspectClass="aspect-[4/3]" onClick={open} />
        </div>
        {/* 27 */}
        <div className={fadeIn(v1, 160)}>
          <PortfolioCard item={FEATURED[3]} aspectClass="aspect-[4/3]" onClick={open} />
        </div>
        {/* 10 — masked, 세로 줄임 */}
        <div className={fadeIn(v1, 200)}>
          <PortfolioCard item={FEATURED[4]} aspectClass="aspect-[4/3]" maskHalf onClick={open} />
        </div>
        {/* 03 */}
        <div className={fadeIn(v1, 240)}>
          <PortfolioCard item={FEATURED[5]} aspectClass="aspect-[4/3]" onClick={open} />
        </div>
        {/* 06 */}
        <div className={fadeIn(v1, 280)}>
          <PortfolioCard item={FEATURED[6]} aspectClass="aspect-[4/3]" onClick={open} />
        </div>
      </div>

      {/* ── All Works (21개) ── */}
      <div className="px-8 md:px-16 mb-10 mt-16 flex items-center gap-6">
        <p className="font-['Archivo'] text-black/30 text-xs tracking-[0.4em] uppercase whitespace-nowrap">All Works</p>
        <div className="flex-1 h-[1px] bg-black/10" />
        <p className="font-['Noto_Sans_KR'] text-black/30 text-xs whitespace-nowrap">총 29개 작업물</p>
      </div>

      <div ref={ref2} className="px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-3">
        {ALL_WORKS.map((item, i) => (
          <div
            key={item.id}
            className={`${item.wide ? "col-span-2" : "col-span-1"} ${fadeIn(v2, Math.min(i * 60, 600))}`}
          >
            <PortfolioCard
              item={item}
              aspectClass={item.wide ? "aspect-[16/7]" : "aspect-[4/3]"}
              onClick={open}
            />
          </div>
        ))}
      </div>

      {modalItem && <ImageModal item={modalItem} onClose={close} />}
    </section>
  );
}

function StatementSection() {
  const { ref, visible } = useIntersection(0.2);
  return (
    <section ref={ref} className="bg-black py-28 px-8 md:px-16 overflow-hidden">
      <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <p className="font-['Archivo'] text-white/30 text-xs tracking-[0.4em] uppercase mb-8">About Design</p>
        <h2 className="font-['Archivo_Black'] text-white text-[clamp(2.5rem,8vw,7rem)] leading-[1.05] tracking-tight max-w-5xl">
          MAKE CREATIVE
          <br />
          <span className="text-white/20">DESIGN</span>
          <br />
          EXPERIENCE
        </h2>
        <div className="mt-16 flex flex-col md:flex-row gap-8 md:gap-24">
          <p className="font-['Noto_Sans_KR'] text-white/50 text-sm leading-loose max-w-xs">
            젊은 감각에서 나오는 창의적인 디자인 경험을 설계합니다. 브랜드의 본질을 시각 언어로 번역하여
            사람과 세계를 연결합니다.
          </p>
          <div className="flex gap-16">
            {[{ num: "120+", label: "Projects" }, { num: "15", label: "Years" }, { num: "60+", label: "Clients" }].map((stat) => (
              <div key={stat.label}>
                <div className="font-['Archivo_Black'] text-white text-4xl md:text-5xl">{stat.num}</div>
                <div className="font-['Archivo'] text-white/30 text-xs tracking-[0.3em] uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black px-8 md:px-16 py-16">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        {/* 이메일 + 카피라이트 */}
        <div className="flex flex-col items-start gap-4">
          <a
            href="mailto:dnjsqls70@naver.com"
            className="font-['Archivo'] text-white/40 text-sm tracking-wider hover:text-white transition-colors duration-300"
          >
            dnjsqls70@naver.com
          </a>
          <div className="h-[1px] w-full bg-white/10" />
          <p className="font-['Archivo'] text-white/20 text-[11px] tracking-[0.2em]">
            © {new Date().getFullYear()} 슬비디자인. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    fetch("https://hnlfdtiuxapjyyhotxzq.supabase.co/rest/v1/rpc/increment_daily_visits", {
      method: "POST",
      headers: {
        "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhubGZkdGl1eGFwanl5aG90eHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1ODk0ODQsImV4cCI6MjA5NzE2NTQ4NH0.U3GCqb3EN18oPf31yr9P0cRzMCzIEUghp_0od1Sz810",
        "Content-Type": "application/json",
      },
    }).catch(() => {});
  }, []);

  return (
    <>
      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scroll-line { animation: scroll-line 1.8s ease-in-out infinite; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
      `}</style>
      <Header />
      <main>
        <Hero />
        <PortfolioSection />
        <StatementSection />
      </main>
      <Footer />
    </>
  );
}
