import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Compass,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  MoveUpRight,
  Phone,
  X,
} from 'lucide-react';

const images = {
  hero: '/assets/images/projects/865838910_1540909728077700_905553443106587086_n.jpg',
  house: '/assets/images/projects/868158172_1540909841411022_4107801983225586141_n.jpg',
  modern: '/assets/images/projects/914831513_1565625525606120_1465349500506192220_n.jpg',
  team: '/assets/images/projects/917275597_1565625605606112_2121739316673812631_n.jpg',
  logo: '/assets/images/775799254_1474144711420869_3198767164728376226_n-removebg-preview.png',
};

const heroSlides = [
  { image: '/assets/images/projects/868158172_1540909841411022_4107801983225586141_n copy.jpg', alt: 'Contemporary multi-storey building with planted balconies' },
  { image: '/assets/images/projects/865838910_1540909728077700_905553443106587086_n.jpg', alt: 'Modern apartment building with a sculptural facade' },
  { image: '/assets/images/projects/864951693_1540909988077674_7603753511329951763_n copy.jpg', alt: 'Contemporary family home with a landscaped garden' },
  { image: '/assets/images/projects/914831513_1565625525606120_1465349500506192220_n copy.jpg', alt: 'Modern residential facade with strong geometric details' },
];

type Service = { number: string; title: string; bangla: string; description: string; group: string };

const services: Service[] = [
  { number: '01', title: 'Architectural Design', group: 'Design', bangla: 'আধুনিক, নান্দনিক ও ব্যবহারবান্ধব ভবনের স্থাপত্য নকশা।', description: 'Architectural solutions that balance aesthetics, functionality, natural light, ventilation, and thoughtful spatial planning.' },
  { number: '02', title: 'Structural Design', group: 'Engineering', bangla: 'নিরাপদ ও মজবুত ভবনের জন্য সঠিক কাঠামোগত নকশা।', description: 'Structural planning for foundations, columns, beams, slabs, and reinforcement systems with a focus on integrity and safety.' },
  { number: '03', title: 'Building Design · 2D & 3D', group: 'Design', bangla: 'জমি, চাহিদা ও বাজেট অনুযায়ী আপনার স্বপ্নের বাড়ির নকশা।', description: 'Visualize your future building through detailed 2D plans and realistic 3D architectural presentations.' },
  { number: '04', title: 'Interior & Exterior Design', group: 'Design', bangla: 'আপনার পছন্দ অনুযায়ী ভবনের অভ্যন্তরীণ ও বাহ্যিক সৌন্দর্য।', description: 'Thoughtfully designed interiors and exteriors that combine comfort, functionality, and cohesive material choices.' },
  { number: '05', title: 'Digital Survey & Land Measurement', group: 'Engineering', bangla: 'সাইটের সঠিক পরিমাপের মাধ্যমে নির্ভুল নির্মাণ পরিকল্পনা।', description: 'Accurate site measurement, land boundaries, and elevation data to support better design and construction planning.' },
  { number: '06', title: 'Soil Test & Investigation', group: 'Engineering', bangla: 'উপযুক্ত ফাউন্ডেশন ডিজাইনের জন্য মাটির বৈশিষ্ট্য নির্ণয়।', description: 'Soil investigation and site assessment to support informed foundation planning and engineering decisions.' },
  { number: '07', title: 'Electrical Design', group: 'Engineering', bangla: 'নিরাপদ বৈদ্যুতিক ব্যবস্থার জন্য লাইটিং, ওয়্যারিং ও লোড ক্যালকুলেশন।', description: 'Electrical planning for lighting, wiring, load calculation, and power distribution.' },
  { number: '08', title: 'Cost Estimation & BOQ', group: 'Planning', bangla: 'সঠিক বাজেট পরিকল্পনার জন্য নির্মাণসামগ্রীর বিস্তারিত হিসাব।', description: 'Detailed quantity takeoffs, cost estimates, and bills of quantities for clear construction budgeting.' },
  { number: '09', title: 'Site Supervision', group: 'Execution', bangla: 'নির্মাণকাজের অগ্রগতি ও গুণগত মান তদারকি।', description: 'Construction site supervision, progress monitoring, workmanship review, and coordination.' },
  { number: '10', title: 'Construction', group: 'Execution', bangla: 'ফাউন্ডেশন থেকে ফিনিশিং পর্যন্ত পেশাদার নির্মাণসেবা।', description: 'Residential and commercial construction services covering groundwork, structure, and finishing.' },
];

const projects = [
  { image: images.hero, title: 'Contemporary Residence', category: 'Residential Architecture', size: 'large' },
  { image: images.house, title: 'Family Home', category: 'Building Design · 2D / 3D', size: 'tall' },
  { image: images.modern, title: 'Urban Living', category: 'Architectural Design', size: 'wide' },
  { image: images.team, title: 'NEXUS in Practice', category: 'Project Coordination', size: 'portrait' },
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (heroPaused) return undefined;
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % heroSlides.length), 5500);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  const changeHeroSlide = (direction: number) => {
    setHeroSlide((current) => (current + direction + heroSlides.length) % heroSlides.length);
    setHeroPaused(true);
  };

  const closeMenu = () => setMenuOpen(false);
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#top" onClick={closeMenu} aria-label="NEXUS Engineering & Builders home">
          <img src={images.logo} alt="NEXUS Engineering & Builders" />
        </a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {['About', 'Services', 'Projects', 'Testimonials', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
          ))}
          <a className="nav-phone" href="tel:01354677761"><Phone size={15} /> 01354-677761</a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="top">
        
<section className="hero" aria-label="NEXUS introduction" onMouseEnter={() => setHeroPaused(true)} onMouseLeave={() => setHeroPaused(false)} onTouchStart={() => setHeroPaused(true)}>
          {heroSlides.map((slide, index) => <img className={`hero-image ${heroSlide === index ? 'is-active' : ''}`} key={slide.image} src={slide.image} alt={slide.alt} />)}
          <div className="hero-shade" />
          <div className="hero-content page-width">
            <p className="eyebrow light"><span /> Architecture · Engineering · Construction</p>
            <h1 className="text-[clamp(64px,7.2vw,112px)] font-medium leading-[0.96] tracking-[-0.065em] text-white">
  Engineering
  <br />
  vision.
  <br />
  <em className="not-italic font-normal text-[#6FA3D5]">
    Building what's
  </em>
  <br />
    next.
</h1>
            <div className="hero-bottom">
              <p>Architectural design, structural engineering, and construction solutions built around precision, functionality, and your vision.</p>
              <div className="hero-actions"><a className="button button-light" href="#contact">Start your project <ArrowUpRight size={17} /></a><a className="hero-project-link" href="#projects">Explore our projects <ArrowRight size={16} /></a></div>
            </div>
          </div>
          <div className="hero-meta"><span>EST. / NATURE OF WORK</span><strong>NATORE · BD</strong></div>
          <div className="hero-controls" aria-label="Hero image controls"><button aria-label="Previous hero image" onClick={() => changeHeroSlide(-1)}><ArrowLeft size={17} /></button><div className="hero-dots">{heroSlides.map((slide, index) => <button className={heroSlide === index ? 'active' : ''} key={slide.image} aria-label={`Show hero image ${index + 1}`} onClick={() => { setHeroSlide(index); setHeroPaused(true); }} />)}</div><button aria-label="Next hero image" onClick={() => changeHeroSlide(1)}><ArrowRight size={17} /></button></div>
          <a className="scroll-cue" href="#about"><span>Scroll to explore</span><ArrowDownRight size={18} /></a>
        </section>


        <section id="about" className="about section page-width">
          <div className="section-marker"><span className="h-px w-8 bg-[#6F9FCB]" /> <span>ABOUT NEXUS</span></div>
          <div className="about-grid">
            <h2>Where design<br /><em>meets engineering.</em></h2>
            <div className="about-copy">
              <p className="lead">We bring architectural vision, engineering precision, and practical construction expertise together to help turn ideas into thoughtfully designed buildings.</p>
              <p>From initial planning and land measurement to architectural design, structural engineering, construction supervision, and project execution, we provide solutions that prioritize functionality, safety, quality, and long-term value.</p>
              <a className="text-link" href="#services">Discover NEXUS <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="about-caption">

<div className="grid grid-cols-1 gap-8 border-t border-[#d8e0e9] py-10 sm:grid-cols-2 lg:grid-cols-3">

  <div className="border-l-2 border-[var(--line)] pl-10">
    <h3 className="text-5xl font-light tracking-tight text-[#142d49] sm:text-6xl">
      5<span className="text-[#5b8fbd]">+</span>
    </h3>
    <p className="mt-3 text-sm font-medium text-[#142d49] pt-4">
      Years of Experience
    </p>
    <p className="mt-2 text-sm leading-6 text-[#7b8998] pt-4">
      Expertise built through years of design, engineering, and construction.
    </p>
  </div>

  <div className="border-l-2 border-[var(--line)] pl-10">
    <h3 className="text-5xl font-light tracking-tight text-[#142d49] sm:text-6xl">
      40<span className="text-[#5b8fbd]">+</span>
    </h3>
    <p className="mt-3 text-sm font-medium text-[#142d49] pt-4">
      Projects Completed
    </p>
    <p className="mt-2 text-sm leading-6 text-[#7b8998] pt-4">
      Building solutions shaped around clients' needs and vision.
    </p>
  </div>

  <div className="border-l-2 border-[var(--line)] pl-10">
    <h3 className="text-5xl font-light tracking-tight text-[#142d49] sm:text-6xl">
      10<span className="text-[#5b8fbd]">+</span>
    </h3>
    <p className="mt-3 text-sm font-medium text-[#142d49] pt-4">
      Professional Services
    </p>
    <p className="mt-2 text-sm leading-6 text-[#7b8998] pt-4">
      From architectural design and engineering to planning and construction.
    </p>
  </div>

</div>

</div>
</section>

        {/* Services */}

<section
  id="services"
  className="relative overflow-hidden bg-[#F5F5F3] py-24 sm:py-32"
>
  <div className="page-width mx-auto">

    {/* Section heading */}
    <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">

      <div className="lg:col-span-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[#6F9FCB]" />
          <span className="text-[10px] tracking-[0.25em] text-[#7A8490] sm:text-xs">
            OUR EXPERTISE
          </span>
        </div>

        <h2 className="text-[clamp(48px,7vw,88px)] font-normal leading-[0.98] tracking-[-0.06em] text-[#142B45]">
          Services that shape
          <br />
          <em className="font-normal text-[#6F9FCB]">
            better buildings.
          </em>
        </h2>
      </div>

      <div className="lg:col-span-4 lg:pb-2">
        <p className="max-w-md text-sm leading-7 text-[#7B8998]">
          From architectural concepts to on-site execution, explore
          the expertise that brings every building project together.
        </p>

        <div className="mt-6 flex items-center gap-3 text-xs tracking-wider text-[#142B45]">
          <span className="h-px w-8 bg-[#6F9FCB]" />
          10 PROFESSIONAL SERVICES
        </div>
      </div>
    </div>

    {/* Service grid */}
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">

      {services.map((service, index) => {
        const isActive = activeService === index;

        return (
          <article
            key={service.number}
            className={`
              group relative overflow-hidden border transition-all duration-500
              ${isActive
                ? 'border-[#142B45] bg-[#142B45] text-white lg:col-span-2'
                : 'border-[#DCE2E8] bg-white text-[#142B45] hover:border-[#6F9FCB]'
              }
            `}
          >
            <button
              type="button"
              onClick={() => setActiveService(index)}
              aria-expanded={isActive}
              className="flex w-full items-center justify-between gap-5 p-6 text-left sm:p-8"
            >
              <div className="flex min-w-0 items-center gap-5 sm:gap-8">

                <span
                  className={`
                    text-xs tabular-nums tracking-widest
                    ${isActive ? 'text-[#8FB5DC]' : 'text-[#8A98A7]'}
                  `}
                >
                  / {service.number}
                </span>

                <div>
                  <span
                    className={`
                      mb-2 block text-[9px] uppercase tracking-[0.2em]
                      ${isActive ? 'text-[#8FB5DC]' : 'text-[#8995A2]'}
                    `}
                  >
                    {service.group}
                  </span>

                  <h3
                    className={`
                      text-lg font-medium tracking-tight sm:text-2xl
                      ${isActive ? 'text-white' : 'text-[#142B45]'}
                    `}
                  >
                    {service.title}
                  </h3>
                </div>
              </div>

              <span
                className={`
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-full border transition-all duration-300
                  ${isActive
                    ? 'rotate-45 border-[#6F9FCB] bg-[#6F9FCB] text-white'
                    : 'border-[#DCE2E8] text-[#142B45] group-hover:border-[#6F9FCB]'
                  }
                `}
              >
                <ArrowUpRight size={19} />
              </span>
            </button>

            {/* Expanded service information */}
            {isActive && (
              <div
                key={service.number}
                className="grid grid-cols-1 gap-8 border-t border-white/15 px-6 pb-8 pt-7 sm:px-8 lg:grid-cols-12 lg:gap-12"
              >
                <div className="lg:col-span-5">
                  <span className="text-[10px] tracking-[0.2em] text-[#8FB5DC]">
                    SERVICE OVERVIEW
                  </span>

                  <p className="mt-4 text-lg leading-9 text-white sm:text-xl">
                    {service.bangla}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-sm leading-7 text-[#C0CAD5]">
                    {service.description}
                  </p>

                  <a
                    href="#contact"
                    className="mt-7 inline-flex items-center gap-3 text-xs tracking-wider text-white transition-colors hover:text-[#8FB5DC]"
                  >
                    DISCUSS THIS SERVICE
                    <ArrowUpRight size={16} />
                  </a>
                </div>

                <div className="hidden items-end justify-end lg:col-span-2 lg:flex">
                  <span className="text-7xl font-light tracking-[-0.08em] text-white/10">
                    {service.number}
                  </span>
                </div>
              </div>
            )}
          </article>
        );
      })}

    </div>

    {/* Bottom note */}
    <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[#D8E0E9] pt-6 sm:flex-row sm:items-center">
      <p className="text-xs text-[#8995A2]">
        ONE TEAM. COMPLETE BUILDING SOLUTIONS.
      </p>

      <a
        href="#contact"
        className="inline-flex items-center gap-2 text-xs tracking-wider text-[#142B45] transition-colors hover:text-[#6F9FCB]"
      >
        HAVE A PROJECT IN MIND?
        <ArrowUpRight size={16} />
      </a>
    </div>

  </div>
</section>



        <section id="projects" className="projects section page-width">
          <div className="section-heading projects-heading"><div><div className="section-marker"><span className="h-px w-8 bg-[#6F9FCB] mb-[40px]" /><span className='mb-[40px]'>SELECTED WORK</span></div><h2>Designed with intention.<br /><em>Built with precision.</em></h2></div><a className="text-link" href="#contact">Start a conversation <ArrowUpRight size={16} /></a></div>
          <div className="project-grid">
            {projects.map((project) => <button className={`project-card ${project.size}`} key={project.title} onClick={() => setLightbox(project.image)}><img src={project.image} alt={project.title} loading="lazy" /><span className="project-overlay"><span><small>{project.category}</small><strong>{project.title}</strong></span><span className="project-arrow"><ArrowUpRight size={20} /></span></span></button>)}
          </div>
        </section>

{/* FROM IDEA TO BUILDING */}
<section className="relative overflow-hidden bg-[#F5F5F3] py-24 sm:py-32">

  <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">

    {/* Top Label */}
    <div className="mb-12 flex items-center">
      <span className="h-px w-8 bg-[#6F9FCB] mr-[15px]" />
      <span className="text-[10px] tracking-[0.25em] text-[#7A8490] sm:text-xs">
        THE NEXUS APPROACH
      </span>
    </div>

    {/* Editorial Layout */}
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">

      {/* Heading */}
      <div className="relative z-10 lg:col-span-7">

        <h2 className="font-serif text-[clamp(54px,8vw,118px)] font-normal leading-[0.92] tracking-[-0.055em] text-[#142B45]">
          From idea
          <br />
          to <span className="italic text-[#6F9FCB]">building.</span>
        </h2>

      </div>

      {/* Main Image */}
      <div className="relative mt-4 h-[360px] overflow-hidden lg:col-span-5 lg:mt-0 lg:h-[520px]">

        <img
          src="/assets/images/projects/planning.jpg"
          alt="NEXUS architectural vision"
          loading="lazy"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#142B45]/10" />

        <div className="absolute bottom-5 left-5 flex items-center gap-3">
          <span className="h-px w-8 bg-white/80" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-white">
            Architecture in perspective
          </span>
        </div>

      </div>

      {/* Lower Left Content */}
      <div className="flex flex-col  lg:col-span-5 justify-between lg:mt-[-100px] lg:pb-8">

        <div className="max-w-[280px]">
          <span className="mb-5 block text-[10px] tracking-[0.2em] text-[#8A929B]">
            OUR PHILOSOPHY
          </span>

          <p className="text-sm leading-7 text-[#687585]">
            Every structure begins with an idea.
            We turn vision into spaces built
            with purpose.
          </p>

          <a
            href="#projects"
            className="group mt-7 inline-flex items-center gap-3 border-b border-[#142B45]/30 pb-2 text-[11px] tracking-[0.12em] text-[#142B45]"
          >
            EXPLORE OUR WORK
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>

        {/* Small Secondary Image */}
        <div className="hidden h-[460px] w-[75%] overflow-hidden lg:block">
          <img
            src={images.house}
            alt="Architectural detail"
            loading="lazy"
            className="h-full w-full object-cover grayscale-[25%]"
          />
        </div>

      </div>

      {/* Process Steps */}
      <div className="flex flex-col justify-end lg:col-span-6 lg:pb-8 mt-20">

        <div className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4 lg:grid-cols-2 lg:gap-x-12">

          {[
            { number: "01", title: "Understand", description: "Understand the land, client requirements, budget, vision, and project goals." },
            { number: "02", title: "Plan & Design", description: "Develop the architectural concept, technical plans, and necessary design documentation."},
            { number: "03", title: "Engineer & Coordinate", description: "Work through structural planning, technical requirements, estimation, and construction coordination." },
            { number: "04", title: "Execute & Supervise", description: "Support construction execution, site supervision, quality monitoring, and project progress." },
          ].map((step) => (
            <div
              key={step.number}
              className="border-t border-[#D9DDE1] pt-4"
            >
              <p className="mb-4 block text-[10px] tracking-[0.15em] text-[#6F9FCB]">
                {step.number}
              </p>

              <h3 className="text-lg font-medium tracking-[-0.03em] text-[#142B45] sm:text-xl">
                {step.title}
              </h3>

              <p className="text-sm leading-7 text-[#687585]">
                {step.description}
              </p>
            </div>
          ))}

        </div>

        {/* Bottom Detail */}
        <div className="mt-12 flex items-center justify-between border-t border-[#D9DDE1] pt-5">

          <span className="text-[9px] tracking-[0.2em] text-[#7A8490]">
            DESIGN / STRUCTURE / EXECUTION
          </span>

          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C9D0D8] font-serif text-2xl text-[#142B45]">
            N.
          </div>

        </div>

      </div>

    </div>
  </div>
</section>

        {/* Principles of dark section */}

        <section className="principles dark-section">
          <div className="page-width principles-grid"><div><div className="section-marker light-marker"><span className="h-px w-8 bg-[#6F9FCB]" /><span>WHY NEXUS</span></div><h2>Precision in planning.<br /><em>Confidence in execution.</em></h2></div><div className="principle-list">{[['01','Integrated Expertise','Architectural design, engineering, planning, and construction connected through one coordinated approach.'],['02','Thoughtful Design','Solutions shaped around site conditions, client needs, functionality, aesthetics, and practical considerations.'],['03','Engineering Focus','Technical planning that places importance on structural integrity, construction practicality, and building safety.'],['04','Project Coordination','Attention to planning, execution, material usage, and construction progress throughout project stages.']].map(([num,title,text]) => <div className="principle" key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div>
        </section>

        {/* CONSTRUCTION IN PROGRESS */}
<section
  id="construction"
  className="overflow-hidden bg-[#F5F5F3] py-24 sm:py-32"
>
  <div className="mx-auto max-w-[1340px] px-6 sm:px-10 lg:px-16">

    {/* Section Header */}
    <div className="mb-12 flex items-end justify-between gap-6 sm:mb-16">

      <div>
        <div className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-[#7A8490] sm:text-xs">
          <span className="h-px w-8 bg-[#6F9FCB]" />
          BEYOND THE DRAWINGS
        </div>

        <h2 className="font-serif text-[clamp(42px,6vw,82px)] font-normal leading-[0.98] tracking-[-0.05em] text-[#142B45]">
          Construction
          <br />
          <span className="italic text-[#6F9FCB]">in progress.</span>
        </h2>
      </div>

      <p className="hidden max-w-[330px] pb-2 text-sm leading-7 text-[#687585] md:block">
        From plans on paper to progress on site.
        A closer look at the work taking shape
        across our projects.
      </p>

    </div>


    {/* Visual Grid */}
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5 w-full h-[450px] overflow-hidden lg:col-span-8">

      {/* Featured Video */}
      <div className="group relative overflow-hidden lg:col-span-8">

        <iframe
  src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1690556802689130%2F&show_text=false&width=560&t=0"
  className='w-full h-full'
  style={{ border: "none", overflow: "hidden" }}
  scrolling="no"
  frameBorder={0}
  allowFullScreen= {true}
  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
/>


        {/* Video Label */}
        <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 sm:left-7 sm:top-7">
          <span className="h-2 w-2 rounded-full bg-[#8CB8E0]" />

          <span className="bg-[#142B45]/70 px-3 py-2 text-[9px] tracking-[0.18em] text-white backdrop-blur-md sm:text-[10px]">
            ON SITE · LIVE PROGRESS
          </span>
        </div>

      </div>


      {/* Side Images */}
      <div className="grid grid-cols-2 gap-4 lg:col-span-4 lg:grid-cols-1">

        {/* Image 01 */}
        <div className="group relative min-h-[200px] overflow-hidden bg-[#E3E5E6] lg:min-h-0 lg:flex-1">

          <img
            src="/assets/images/projects/running-project-03.jpg"
            alt="NEXUS construction site progress"
            loading="lazy"
            className="h-full min-h-[200px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] lg:h-[80px]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#142B45]/50 to-transparent opacity-70" />

          <span className="absolute bottom-4 left-4 text-[9px] tracking-[0.18em] text-white sm:bottom-5 sm:left-5">
            SITE PROGRESS / 01
          </span>

        </div>


        {/* Image 02 */}
        <div className="group relative min-h-[200px] overflow-hidden bg-[#E3E5E6] lg:min-h-0 lg:flex-1">

          <img
            src="/assets/images/projects/running-project-02.jpg"
            alt="Building construction and engineering work"
            loading="lazy"
            className="h-full min-h-[200px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] lg:min-h-[275px]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#142B45]/50 to-transparent opacity-70" />

          <span className="absolute bottom-4 left-4 text-[9px] tracking-[0.18em] text-white sm:bottom-5 sm:left-5">
            SITE PROGRESS / 02
          </span>

        </div>

      </div>

    </div>


    {/* Bottom Information */}
    <div className="mt-7 flex flex-col gap-5 border-t border-[#D9DDE1] pt-5 sm:flex-row sm:items-center sm:justify-between">

      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-[#6F9FCB]" />

        <span className="text-[10px] tracking-[0.16em] text-[#687585]">
          REAL PROJECTS · REAL PROGRESS
        </span>
      </div>

      <p className="text-xs text-[#89929C]">
        Every detail brings the vision closer to reality.
      </p>

    </div>

  </div>
</section>

{/* Process section */}

        {/* <section className="process section page-width"><div className="section-heading"><div><div className="section-marker">05 <span>THE PROCESS</span></div><h2>From your first idea<br /><em>to a complete building.</em></h2></div></div><div className="process-grid">{[['01','Understand','Understand the land, client requirements, budget, vision, and project goals.'],['02','Plan & Design','Develop the architectural concept, technical plans, and necessary design documentation.'],['03','Engineer & Coordinate','Work through structural planning, technical requirements, estimation, and construction coordination.'],['04','Execute & Supervise','Support construction execution, site supervision, quality monitoring, and project progress.']].map(([num,title,text]) => <div className="process-step" key={num}><span className="step-number">{num}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight size={18} /></div>)}</div></section> */}

{/* CTA */}

<section className="showcase"><div className="showcase-image"><img src={images.house} alt="Modern family home visualization" loading="lazy" /><div className="drawing-label">BUILDING DESIGN / 02—03</div></div><div className="showcase-copy"><div className="section-marker">06 <span>VISUALIZE THE POSSIBLE</span></div><h2>See your future home<br /><em>before it’s built.</em></h2><p>Explore your building through carefully developed plans and three-dimensional architectural visualization, helping you understand spaces, proportions, and design possibilities before construction begins.</p><a className="button button-dark" href="#contact">Explore your project <ArrowUpRight size={17} /></a></div></section>

{/* Client Testimonials */}

<section className="bg-[#F7F7F5] px-6 py-24 md:px-12 lg:px-2 mt-10" id='testimonials'>
  <div className="mx-auto max-w-7xl">

    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

      {/* Left Title */}
      <div className="lg:col-span-3">
         <h2 className="font-serif text-[clamp(42px,6vw,52px)] font-normal leading-[0.98] tracking-[-0.05em] text-[#142B45]">
          Client
          <br />
          <span className="italic text-[#6F9FCB]">experiences</span>
        </h2>

        <p className="mt-5 max-w-[220px] text-[15px] leading-6 text-[#687585]">
          Stories and experiences shared by the people we've worked with.
        </p>
      </div>

      {/* Video Gallery */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:col-span-9">

        {/* Video 01 */}
        <div className="group">
          <div className="relative aspect-video overflow-hidden bg-[#E5E5E2]">
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID_1"
              title="Client Testimonial 1"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="mt-4">
            <h3 className="text-[17px] font-medium text-[#142B45]">
              Michael Anderson
              <span className="ml-1.5 font-normal text-[#687585]">
                Homeowner
              </span>
            </h3>

            <div className="mt-2 h-px w-7 bg-[#142B45]" />

            <p className="mt-3 text-[15px] leading-5 text-[#687585]">
              Residential construction & custom home building
            </p>

            <p className="mt-1 text-[13px] text-[#A0A0A0]">
              Rajshahi, Bangladesh
            </p>
          </div>
        </div>

        {/* Video 02 */}
        <div className="group">
          <div className="relative aspect-video overflow-hidden bg-[#E5E5E2]">
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID_2"
              title="Client Testimonial 2"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="mt-4">
            <h3 className="text-[17px] font-medium text-[#142B45]">
              James Wilson
              <span className="ml-1.5 font-normal text-[#687585]">
                Property Owner
              </span>
            </h3>

            <div className="mt-2 h-px w-7 bg-[#142B45]" />

            <p className="mt-3 text-[15px] leading-5 text-[#687585]">
              Residential renovation & interior development
            </p>

            <p className="mt-1 text-[13px] text-[#A0A0A0]">
              Dhaka, Bangladesh
            </p>
          </div>
        </div>

        {/* Video 03 */}
        <div className="group">
          <div className="relative aspect-video overflow-hidden bg-[#E5E5E2]">
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID_3"
              title="Client Testimonial 3"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="mt-4">
            <h3 className="text-[17px] font-medium text-[#142B45]">
              David Thompson
              <span className="ml-1.5 font-normal text-[#687585]">
                Business Owner
              </span>
            </h3>

            <div className="mt-2 h-px w-7 bg-[#142B45]" />

            <p className="mt-3 text-[15px] leading-5 text-[#687585]">
              Commercial construction & building solutions
            </p>

            <p className="mt-1 text-[13px] text-[#A0A0A0]">
              Chattogram, Bangladesh
            </p>
          </div>
        </div>

        {/* Video 04 */}
        <div className="group">
          <div className="relative aspect-video overflow-hidden bg-[#E5E5E2]">
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID_4"
              title="Client Testimonial 4"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="mt-4">
            <h3 className="text-[17px] font-medium text-[#142B45]">
              Robert Miller
              <span className="ml-1.5 font-normal text-[#687585]">
                Residential Client
              </span>
            </h3>

            <div className="mt-2 h-px w-7 bg-[#142B45]" />

            <p className="mt-3 text-[15px] leading-5 text-[#687585]">
              Full home construction & project management
            </p>

            <p className="mt-1 text-[13px] text-[#A0A0A0]">
              Sylhet, Bangladesh
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

        <section className="location section page-width"><div className="map-card"><div className="map-grid" /><div className="map-pin"><MapPin size={22} /></div><div className="map-label"><small>LOCATION / 24.41473° N, 88.98477° E</small><strong>Nichabazer, Natore</strong></div><Compass className="compass" size={24} /></div><div className="location-copy"><div className="section-marker">07 <span>LOCAL PRESENCE</span></div><h2>Rooted in Natore.<br /><em>Building for the future.</em></h2><p>Located in Nichabazer, Natore, Bangladesh, NEXUS serves clients looking for professional architectural design, engineering consultancy, construction planning, and building solutions.</p><div className="address"><MapPin size={17} /><span>Nichabazer, Natore,<br />Bangladesh</span></div><a className="text-link" href="https://share.google/kwoiHJZtT8nsLzIfa" target="_blank" rel="noreferrer">Open in maps <ExternalLink size={15} /></a></div></section>

        {/* <section id="contact" className="contact dark-section"><div className="page-width contact-grid"><div className="contact-intro"><div className="section-marker light-marker">08 <span>LET’S TALK</span></div><h2>Let’s build something<br /><em>meaningful.</em></h2><p>Planning a new home, building, renovation, or architectural project? Tell us about your vision. Our team can help you take the next step.</p><div className="contact-details"><a href="tel:01354677761"><Phone size={17} />01354-677761</a><a href="mailto:nexusengineeringbuilders@gmail.com"><Mail size={17} />nexusengineeringbuilders@gmail.com</a></div></div><div className="contact-form-wrap">{submitted ? <div className="form-success"><div><Check size={24} /></div><h3>Thank you for reaching out.</h3><p>Your enquiry is ready to be reviewed by the NEXUS team. We’ll be in touch using the details you provided.</p><button className="text-link light-link" onClick={() => setSubmitted(false)}>Send another enquiry <ArrowUpRight size={16} /></button></div> : <form className="contact-form" onSubmit={submitForm}><div className="form-row"><label>Full name<input required type="text" placeholder="Your name" /></label><label>Phone number<input required type="tel" placeholder="01XXX-XXXXXX" /></label></div><div className="form-row"><label>Email address<input required type="email" placeholder="you@email.com" /></label><label>Project type<select required defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.number}>{service.title}</option>)}<option>Other</option></select></label></div><label>Project location<input type="text" placeholder="Where is your project located?" /></label><label>Tell us about your project<textarea required rows={4} placeholder="A few details about your vision, requirements, or timeline..." /></label><button className="button button-light form-submit" type="submit">Submit project enquiry <ArrowUpRight size={17} /></button></form>}</div></div></section> */}

          <section id="contact" className="bg-[#F5F5F3] px-6 py-24 md:px-12 lg:px-20">
  <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">

    {/* Contact Intro */}
    <div className="lg:col-span-5">
      <div className="mb-10 flex items-center gap-4 text-[11px] tracking-[0.2em] text-[#6F9FCB]">
        <span>08</span>
        <span className="h-px w-8 bg-[#6F9FCB]/50" />
        <span>LET'S TALK</span>
      </div>

      <h2 className="max-w-xl text-4xl font-medium leading-[1.12] tracking-tight text-[#142B45] md:text-6xl">
        Let’s build something
        <br />
        <span className="text-[#6F9FCB]">meaningful.</span>
      </h2>

      <p className="mt-7 max-w-md text-sm leading-7 text-[#687585] md:text-base">
        Planning a new home, building, renovation, or architectural project?
        Tell us about your vision. Our team can help you take the next step.
      </p>

      {/* Contact Details */}
      <div className="mt-12 space-y-5">
        <a
          href="tel:01354677761"
          className="group flex w-fit items-center gap-3 text-sm text-[#142B45] transition-colors hover:text-[#6F9FCB]"
        >
          <Phone size={17} strokeWidth={1.5} />
          01354-677761
        </a>

        <a
          href="mailto:nexusengineeringbuilders@gmail.com"
          className="group flex w-fit items-center gap-3 text-sm text-[#142B45] transition-colors hover:text-[#6F9FCB]"
        >
          <Mail size={17} strokeWidth={1.5} />
          nexusengineeringbuilders@gmail.com
        </a>
      </div>

      {/* Additional Info */}
      <div className="mt-16 border-t border-[#142B45]/10 pt-5">
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#9A9A9A]">
          Residential · Commercial · Renovation
        </p>
      </div>
    </div>

    {/* Contact Form */}
    <div className="lg:col-span-7">
      {submitted ? (
        <div className="flex min-h-[500px] flex-col items-start justify-center border border-[#142B45]/10 bg-white p-8 md:p-12">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F5F3] text-[#142B45]">
            <Check size={24} strokeWidth={1.5} />
          </div>

          <h3 className="text-2xl font-medium tracking-tight text-[#142B45] md:text-3xl">
            Thank you for reaching out.
          </h3>

          <p className="mt-4 max-w-md text-sm leading-7 text-[#687585]">
            Your enquiry is ready to be reviewed by the NEXUS team.
            We’ll be in touch using the details you provided.
          </p>

          <button
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#142B45] transition hover:text-[#6F9FCB]"
            onClick={() => setSubmitted(false)}
          >
            Send another enquiry
            <ArrowUpRight size={16} />
          </button>
        </div>
      ) : (
        <form
          className="border border-[#142B45]/10 bg-white p-7 md:p-10"
          onSubmit={submitForm}
        >
          <div className="mb-9">
            <h3 className="text-xl font-medium tracking-tight text-[#142B45]">
              Tell us about your project
            </h3>
            <p className="mt-2 text-sm text-[#929292]">
              Fill in the details below and our team will get back to you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            <label className="mb-7 block text-sm text-[#687585]">
              Full name *
              <input
                required
                type="text"
                placeholder="Your name"
                className="mt-3 w-full border-0 border-b border-[#142B45]/15 bg-transparent pb-3 text-sm text-[#142B45] outline-none transition placeholder:text-[#B0B0B0] focus:border-[#6F9FCB]"
              />
            </label>

            <label className="mb-7 block text-sm text-[#687585]">
              Phone number *
              <input
                required
                type="tel"
                placeholder="01XXX-XXXXXX"
                className="mt-3 w-full border-0 border-b border-[#142B45]/15 bg-transparent pb-3 text-sm text-[#142B45] outline-none transition placeholder:text-[#B0B0B0] focus:border-[#6F9FCB]"
              />
            </label>

            <label className="mb-7 block text-sm text-[#687585]">
              Email address *
              <input
                required
                type="email"
                placeholder="you@email.com"
                className="mt-3 w-full border-0 border-b border-[#142B45]/15 bg-transparent pb-3 text-sm text-[#142B45] outline-none transition placeholder:text-[#B0B0B0] focus:border-[#6F9FCB]"
              />
            </label>

            <label className="mb-7 block text-sm text-[#687585]">
              Project type *
              <select
                required
                defaultValue=""
                className="mt-3 w-full border-0 border-b border-[#142B45]/15 bg-transparent pb-3 text-sm text-[#142B45] outline-none transition focus:border-[#6F9FCB]"
              >
                <option value="" disabled>Select a service</option>
                {services.map((service) => (
                  <option key={service.number} value={service.title}>
                    {service.title}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <label className="mb-7 block text-sm text-[#687585]">
            Project location
            <input
              type="text"
              placeholder="Where is your project located?"
              className="mt-3 w-full border-0 border-b border-[#142B45]/15 bg-transparent pb-3 text-sm text-[#142B45] outline-none transition placeholder:text-[#B0B0B0] focus:border-[#6F9FCB]"
            />
          </label>

          <label className="block text-sm text-[#687585]">
            Tell us about your project *
            <textarea
              required
              rows={4}
              placeholder="A few details about your vision, requirements, or timeline..."
              className="mt-3 w-full resize-y border-0 border-b border-[#142B45]/15 bg-transparent pb-3 text-sm leading-6 text-[#142B45] outline-none transition placeholder:text-[#B0B0B0] focus:border-[#6F9FCB]"
            />
          </label>

          <button
            className="group mt-9 flex w-full items-center justify-between bg-[#142B45] px-6 py-4 text-sm text-white transition-colors hover:bg-[#244768]"
            type="submit"
          >
            <span>Submit project enquiry</span>
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </form>
      )}
    </div>

  </div>
</section>

      </main>

      <footer className="footer dark-section"><div className="page-width footer-top"><div className="footer-brand"><img src={images.logo} alt="NEXUS Engineering & Builders" /><p>Thoughtfully designed.<br />Structurally engineered.<br />Built with confidence.</p></div><div className="footer-column"><small>EXPLORE</small><a href="#about">About NEXUS</a><a href="#services">Our services</a><a href="#projects">Selected work</a><a href="#contact">Contact</a></div><div className="footer-column"><small>CONTACT</small><a href="tel:01354677761">01354-677761</a><a href="mailto:nexusengineeringbuilders@gmail.com">nexusengineeringbuilders@gmail.com</a><span>Nichabazer, Natore,<br />Bangladesh</span></div></div><div className="page-width footer-bottom"><span>© 2026 NEXUS Engineering & Builders</span><span>Architecture · Engineering · Construction</span><a href="#top">Back to top <MoveUpRight size={14} /></a></div></footer>

      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}><button aria-label="Close image view" onClick={() => setLightbox(null)}><X size={24} /></button><img src={lightbox} alt="Expanded project view" onClick={(event) => event.stopPropagation()} /></div>}
    </div>
  );
}

export default App;
