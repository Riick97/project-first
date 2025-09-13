import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type AsideType = 'search' | 'cart' | 'mobile' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

/**
 * A side bar component with Overlay styled for Neovibe brand
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  children,
  heading,
  type,
}: {
  children?: React.ReactNode;
  type: AsideType;
  heading: React.ReactNode;
}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;

  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        'keydown',
        function handler(event: KeyboardEvent) {
          if (event.key === 'Escape') {
            close();
          }
        },
        {signal: abortController.signal},
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);

  return (
    <div
      aria-modal
      className={`overlay ${expanded ? 'expanded' : ''}`}
      role="dialog"
      style={{
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: expanded ? 'auto' : 'none',
        visibility: expanded ? 'visible' : 'hidden',
      }}
    >
      <button
        className="close-outside"
        onClick={close}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          background: expanded ? 'rgba(0, 0, 0, 0.7)' : 'transparent',
          border: 'none',
          zIndex: 9998,
          backdropFilter: expanded ? 'blur(3px)' : 'none',
          transition: 'background 0.3s ease-in-out',
        }}
      />
      <aside
        style={{
          height: '100%',
          maxWidth: '450px',
          width: '100%',
          background: '#121212', // Matte Black from brand guide
          color: '#F9F9F9', // Bright White from brand guide
          zIndex: 9999,
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          transform: expanded ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: expanded
            ? '-5px 0 20px rgba(0, 224, 255, 0.2), 0 0 40px rgba(192, 132, 252, 0.15)'
            : 'none',
          fontFamily: "'Space Grotesk', 'Montserrat', sans-serif",
        }}
      >
        <header
          style={{
            padding: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(249, 249, 249, 0.1)',
            position: 'relative',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontWeight: 'bold',
              fontSize: '1.25rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: 'linear-gradient(90deg, #00E0FF, #C084FC)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {heading}
          </h3>
          <button
            className="close reset"
            onClick={close}
            aria-label="Close"
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              padding: '0.5rem',
              color: '#00E0FF', // Neon Blue from brand guide
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#C084FC'; // Violet Glow on hover
              e.currentTarget.style.boxShadow =
                '0 0 10px rgba(192, 132, 252, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#00E0FF';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            &times;
          </button>
        </header>
        <main
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: '1rem',
            fontFamily: "'Poppins', 'Inter', sans-serif",
            scrollbarWidth: 'thin',
            scrollbarColor: '#00E0FF #121212',
          }}
        >
          {children}
        </main>
        <footer
          style={{
            padding: '1rem',
            borderTop: '1px solid rgba(249, 249, 249, 0.1)',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: 'rgba(249, 249, 249, 0.7)',
          }}
        >
          <span style={{fontSize: '0.75rem'}}>Neovibe — Light the Future</span>
        </footer>
      </aside>
    </div>
  );
}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}
