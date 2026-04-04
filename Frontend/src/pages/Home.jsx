const CarSVG = () => (
  <svg viewBox="0 0 380 175" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', overflow: 'visible' }}>
    <defs>
      <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#3b5bdb"/>
        <stop offset="100%" stopColor="#2d4bc4"/>
      </linearGradient>
      <linearGradient id="carCabin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#364fc7"/>
        <stop offset="100%" stopColor="#3451c1"/>
      </linearGradient>
      <linearGradient id="carGlass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#74c0fc" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#4dabf7" stopOpacity="0.85"/>
      </linearGradient>
      <linearGradient id="carBumper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#2c3e8c"/>
        <stop offset="100%" stopColor="#1e2f7a"/>
      </linearGradient>
      <radialGradient id="carHL" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#fffde0"/>
        <stop offset="100%" stopColor="#ffd700" stopOpacity="0.3"/>
      </radialGradient>
      <radialGradient id="carTL" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#ff6b6b" stopOpacity="0.95"/>
        <stop offset="100%" stopColor="#c92a2a" stopOpacity="0.4"/>
      </radialGradient>
      <radialGradient id="carRefl" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stopColor="#6366f1" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
      </radialGradient>
    </defs>

    {/* Ground reflection */}
    <ellipse cx="190" cy="170" rx="145" ry="8" fill="url(#carRefl)"/>

    {/* Body */}
    <rect x="12" y="90" width="356" height="60" rx="10" fill="url(#carBody)"/>

    {/* Cabin */}
    <path d="M68 90 Q76 42 108 34 L264 34 Q296 42 312 90Z" fill="url(#carCabin)"/>

    {/* Roof highlight */}
    <path d="M110 38 Q190 28 264 38"
      stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" strokeLinecap="round"/>

    {/* Body top highlight */}
    <path d="M12 94 Q190 90 368 94"
      stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none"/>

    {/* Windshield */}
    <path d="M110 90 Q115 48 138 38 L246 38 Q270 48 274 90Z"
      fill="url(#carGlass)" opacity="0.9"/>

    {/* Windshield glare */}
    <path d="M126 88 Q130 60 145 46 L175 46 Q162 66 152 88Z"
      fill="rgba(255,255,255,0.1)"/>

    {/* Side window L */}
    <path d="M70 88 Q74 58 94 50 L106 50 Q104 68 102 88Z"
      fill="url(#carGlass)" opacity="0.75"/>

    {/* Side window R */}
    <path d="M278 88 Q280 68 280 50 L294 50 Q312 58 314 88Z"
      fill="url(#carGlass)" opacity="0.75"/>

    {/* Body crease */}
    <path d="M14 116 Q190 112 366 116"
      stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none"/>

    {/* Door splits */}
    <line x1="196" y1="90" x2="192" y2="150"
      stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
    <line x1="136" y1="90" x2="134" y2="150"
      stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>

    {/* Door handles */}
    <rect x="148" y="118" width="28" height="5" rx="2.5" fill="rgba(255,255,255,0.2)"/>
    <rect x="216" y="118" width="28" height="5" rx="2.5" fill="rgba(255,255,255,0.2)"/>

    {/* Front bumper */}
    <rect x="14" y="140" width="70" height="12" rx="5" fill="url(#carBumper)"/>
    {/* Rear bumper */}
    <rect x="296" y="140" width="70" height="12" rx="5" fill="url(#carBumper)"/>

    {/* Headlights */}
    <ellipse cx="48" cy="114" rx="22" ry="9"  fill="url(#carHL)"/>
    <ellipse cx="48" cy="114" rx="14" ry="5.5" fill="rgba(255,255,220,0.95)"/>
    <ellipse cx="48" cy="114" rx="6"  ry="2.5" fill="white"/>
    <rect x="30" y="122" width="36" height="3" rx="1.5" fill="rgba(255,255,200,0.6)"/>
    <ellipse cx="48" cy="114" rx="20" ry="8"
      fill="none" stroke="rgba(255,255,200,0.25)" strokeWidth="1"/>
    {/* Headlight glow on white bg */}
    <ellipse cx="22" cy="114" rx="16" ry="9" fill="rgba(255,255,180,0.15)"/>

    {/* Tail lights */}
    <ellipse cx="330" cy="114" rx="22" ry="9"  fill="url(#carTL)"/>
    <ellipse cx="330" cy="114" rx="12" ry="5"  fill="rgba(255,80,80,0.9)"/>
    <ellipse cx="330" cy="114" rx="5.5" ry="2" fill="rgba(255,120,120,0.95)"/>

    {/* 3D perspective top edge */}
    <path d="M12 98 Q12 90 18 90 L362 90 Q368 90 368 98"
      stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none"/>

    {/* FRONT WHEEL */}
    <circle cx="96"  cy="150" r="28" fill="#1e2a5e"/>
    <circle cx="96"  cy="150" r="22" fill="#2a3a7a"/>
    <circle cx="96"  cy="150" r="15" fill="#1e2a5e"/>
    <circle cx="96"  cy="150" r="8"  fill="#2d3f88"/>
    <circle cx="96"  cy="150" r="4"  fill="#6366f1"/>
    <circle cx="96"  cy="150" r="2"  fill="#a5b4fc"/>
    {[0, 60, 120, 180, 240, 300].map(a => {
      const rad = a * Math.PI / 180;
      return (
        <line key={a}
          x1={96  + 9  * Math.cos(rad)} y1={150 + 9  * Math.sin(rad)}
          x2={96  + 20 * Math.cos(rad)} y2={150 + 20 * Math.sin(rad)}
          stroke="rgba(99,102,241,0.7)" strokeWidth="2.8" strokeLinecap="round"/>
      );
    })}
    <path d="M96 122 A28 28 0 0 1 118 136"
      stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" strokeLinecap="round"/>

    {/* REAR WHEEL */}
    <circle cx="284" cy="150" r="28" fill="#1e2a5e"/>
    <circle cx="284" cy="150" r="22" fill="#2a3a7a"/>
    <circle cx="284" cy="150" r="15" fill="#1e2a5e"/>
    <circle cx="284" cy="150" r="8"  fill="#2d3f88"/>
    <circle cx="284" cy="150" r="4"  fill="#6366f1"/>
    <circle cx="284" cy="150" r="2"  fill="#a5b4fc"/>
    {[0, 60, 120, 180, 240, 300].map(a => {
      const rad = a * Math.PI / 180;
      return (
        <line key={a}
          x1={284 + 9  * Math.cos(rad)} y1={150 + 9  * Math.sin(rad)}
          x2={284 + 20 * Math.cos(rad)} y2={150 + 20 * Math.sin(rad)}
          stroke="rgba(99,102,241,0.7)" strokeWidth="2.8" strokeLinecap="round"/>
      );
    })}
    <path d="M284 122 A28 28 0 0 1 306 136"
      stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" strokeLinecap="round"/>

    {/* Roof rack + antenna */}
    <rect x="164" y="32" width="52" height="3" rx="1.5" fill="rgba(255,255,255,0.12)"/>
    <line x1="190" y1="32" x2="190" y2="23"
      stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
    <circle cx="190" cy="22" r="2.5" fill="#a5b4fc"/>
  </svg>
);

const Home = () => (
  <div style={{
    minHeight: '100vh',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px 72px',
    position: 'relative',
    overflow: 'hidden',
  }}>

    {/* Subtle background tint */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'radial-gradient(ellipse 60% 50% at 15% 50%, rgba(99,102,241,0.06) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 85% 40%, rgba(139,92,246,0.05) 0%, transparent 60%)',
    }}/>

    {/* RIGHT LARGE CAR */}
    <div style={{
      position: 'absolute', right: '-20px', top: '50%', marginTop: '-110px',
      width: '480px', height: '220px', zIndex: 1,
      perspective: '900px',
    }}>
      <div className="car-float-wrap" style={{
        width: '480px', height: '220px',
        transform: 'perspective(900px) rotateY(-16deg) rotateX(5deg)',
        transformStyle: 'preserve-3d',
        opacity: 0.9,
      }}>
        <CarSVG />
      </div>
      <div className="car-shadow" style={{
        width: '320px', height: '20px', bottom: '-6px', left: '80px',
      }}/>
    </div>

    {/* LEFT SMALL CAR (mirrored) */}
    <div style={{
      position: 'absolute', left: '-60px', top: '50%', marginTop: '40px',
      width: '280px', height: '130px', zIndex: 1,
      transform: 'scaleX(-1)',
      perspective: '700px',
    }}>
      <div className="car-float-wrap" style={{
        width: '280px', height: '130px',
        animationDelay: '-2.5s',
        transform: 'perspective(700px) rotateY(-14deg) rotateX(4deg)',
        transformStyle: 'preserve-3d',
        opacity: 0.5,
      }}>
        <CarSVG />
      </div>
      <div className="car-shadow" style={{
        width: '190px', height: '14px', bottom: '-5px', left: '45px',
        animationDelay: '-2.5s',
      }}/>
    </div>

    {/* HERO CONTENT */}
    <div style={{
      position: 'relative', zIndex: 5,
      maxWidth: '480px', width: '100%', textAlign: 'center',
    }}>

      {/* Chip */}
      <div className="fade-up" style={{ marginBottom: '18px', display: 'flex', justifyContent: 'center' }}>
        <span className="chip">
          <span className="chip-dot"/>
          India's carpooling network
        </span>
      </div>

      {/* Logo — "Cab" dark, "Share" indigo */}
      <h1 className="fade-up fade-up-1" style={{
        fontSize: 'clamp(50px, 10vw, 80px)',
        fontWeight: 900,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        marginBottom: '14px',
        color: '#1e1b4b',
      }}>
        Cab<span style={{ color: '#6366f1' }}>Share</span>
      </h1>

      {/* Tagline */}
      <p className="fade-up fade-up-2" style={{
        fontSize: 'clamp(15px, 2.5vw, 18px)',
        color: '#64748b',
        lineHeight: 1.65,
        marginBottom: '28px',
      }}>
        Carpooling made simple.{' '}
        <strong style={{ color: '#1e1b4b', fontWeight: 600 }}>Split the fare,</strong>{' '}
        reduce traffic.
      </p>

      {/* Stats */}
      <div className="stat-row">
        {[
          { val: '', lbl: 'Travel smarter' },
          { val: '', lbl: 'Split costs' },
          { val: '', lbl: 'New people. New stories.' },
        ].map((s, i) => (
          <div
            key={s.lbl}
            className="stat-cell fade-up"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="stat-val">{s.val}</div>
            <div className="stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      <hr className="divider fade-up fade-up-3"/>

      {/* Buttons */}
      <div className="fade-up fade-up-3" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <a href="/login" className="btn-primary">Login</a>

        <a href="/signup" className="btn-ghost">Get started</a>

        <a href="/passenger-dashboard" style={{
          display: 'block', width: '100%',
          padding: '13px 24px',
          borderRadius: 'var(--radius)',
          background: 'rgba(99,102,241,0.07)',
          border: '1px solid rgba(99,102,241,0.2)',
          color: '#4338ca',
          fontWeight: 600, fontSize: '15px',
          textAlign: 'center', textDecoration: 'none',
          transition: 'all 0.2s ease',
          fontFamily: 'Inter, sans-serif',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(99,102,241,0.12)';
            e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(99,102,241,0.07)';
            e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)';
          }}
        >
          View Rides
        </a>
      </div>

      {/* Fine print */}
      <p className="fade-up fade-up-4" style={{
        fontSize: '11px', color: '#94a3b8',
        letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '22px',
      }}>
        No surge pricing · No hidden fees · Real people
      </p>
    </div>
  </div>
);

export default Home;