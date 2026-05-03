import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Page = React.forwardRef(({ children, style, className }, ref) => (
  <div ref={ref} style={style} className={className}>
    {children}
  </div>
));
Page.displayName = 'Page';

const CoverContent = React.memo(() => (
  <div style={{
    width: '100%',
    height: '100%',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px',
  }}>
    <h1 style={{
      fontFamily: 'Brush Script MT, cursive',
      fontSize: 'clamp(1.2rem, 3vw, 2rem)',
      fontWeight: 'bold',
      marginBottom: '1rem',
    }}>
      Happy 25th Marriage Anniversary
    </h1>
    <p style={{
      fontFamily: 'Brush Script MT, cursive',
      fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
      marginBottom: '1.5rem',
      opacity: 0.9,
    }}>
      Mr. &amp; Mrs. Chatterjee
    </p>
    <span style={{
      fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
      fontWeight: 'bold',
      borderTop: '1px solid rgba(255,255,255,0.5)',
      paddingTop: '0.75rem',
    }}>
      25.04.2026
    </span>
  </div>
));
CoverContent.displayName = 'CoverContent';

// ✅ Hover animation via local state
const PhotoContent = React.memo(({ photo, index, onOpen }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <img
        src={`/Photos/${photo}`}
        alt={`${index + 1}`}
        loading="lazy"
        onClick={(e) => {
          e.stopPropagation();
          onOpen(`/Photos/${photo}`);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
        className="cursor-pointer"
        style={{
          maxWidth: '80%',
          maxHeight: '80%',
          objectFit: 'contain',
          objectPosition: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          willChange: 'transform',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-radius 0.3s ease',
          transform: hovered
            ? 'translate(-50%, -53%) scale(1.08)'
            : 'translate(-50%, -50%) scale(1)',
          boxShadow: hovered
            ? '0 16px 40px rgba(0,0,0,0.35)'
            : '0 4px 12px rgba(0,0,0,0.15)',
          borderRadius: hovered ? '6px' : '2px',
        }}
      />
      <div
        className="absolute bottom-2 right-3 text-xs sm:text-sm"
        style={{ color: '#9e9e9e' }}
      >
        {index + 1}
      </div>
    </>
  );
});
PhotoContent.displayName = 'PhotoContent';

const TutorialOverlay = React.memo(({ onDismiss, isMobile }) => (
  <div
    onClick={onDismiss}
    style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.75)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'linear-gradient(135deg, #fff5f5, #ffe4e4)',
        borderRadius: '20px',
        padding: '32px 28px',
        maxWidth: '340px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      }}
    >
      <div style={{ fontSize: '48px', marginBottom: '12px' }}>📖</div>
      <h2 style={{
        color: '#5d4037',
        fontSize: '1.4rem',
        fontWeight: 'bold',
        marginBottom: '8px',
      }}>
        Welcome!
      </h2>
      <p style={{ color: '#795548', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
        Browse through the memories of this special day.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
        {isMobile ? (
          <div style={tipStyle}>
            <span style={{ fontSize: '28px' }}>👆</span>
            <div>
              <strong style={{ color: '#5d4037' }}>Swipe left or right</strong>
              <p style={{ color: '#795548', fontSize: '0.85rem', margin: '2px 0 0' }}>
                on the book to flip pages
              </p>
            </div>
          </div>
        ) : (
          <div style={tipStyle}>
            <span style={{ fontSize: '28px' }}>🖱️</span>
            <div>
              <strong style={{ color: '#5d4037' }}>Click the page edge</strong>
              <p style={{ color: '#795548', fontSize: '0.85rem', margin: '2px 0 0' }}>
                to flip pages naturally
              </p>
            </div>
          </div>
        )}

        <div style={tipStyle}>
          <span style={{ fontSize: '28px' }}>⬅️➡️</span>
          <div>
            <strong style={{ color: '#5d4037' }}>Previous &amp; Next buttons</strong>
            <p style={{ color: '#795548', fontSize: '0.85rem', margin: '2px 0 0' }}>
              below the book to navigate
            </p>
          </div>
        </div>

        <div style={tipStyle}>
          <span style={{ fontSize: '28px' }}>🔍</span>
          <div>
            <strong style={{ color: '#5d4037' }}>Tap any photo</strong>
            <p style={{ color: '#795548', fontSize: '0.85rem', margin: '2px 0 0' }}>
              to view it fullscreen
            </p>
          </div>
        </div>

        <div style={tipStyle}>
          <span style={{ fontSize: '28px' }}>🎵</span>
          <div>
            <strong style={{ color: '#5d4037' }}>Background music</strong>
            <p style={{ color: '#795548', fontSize: '0.85rem', margin: '2px 0 0' }}>
              plays automatically — toggle anytime
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onDismiss}
        style={{
          background: 'linear-gradient(to right, rgb(255,131,131), rgb(88,13,13))',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '12px 36px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(88,13,13,0.3)',
        }}
      >
        Let's Go ❤️
      </button>
    </div>
  </div>
));
TutorialOverlay.displayName = 'TutorialOverlay';

const tipStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '14px',
  background: 'rgba(255,255,255,0.7)',
  borderRadius: '12px',
  padding: '12px 14px',
  textAlign: 'left',
};

const MusicButton = React.memo(({ isPlaying, onToggle }) => (
  <button
    onClick={onToggle}
    title={isPlaying ? 'Pause music' : 'Play music'}
    style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '52px',
      height: '52px',
      borderRadius: '50%',
      background: 'linear-gradient(to right, rgb(255,131,131), rgb(88,13,13))',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '22px',
      boxShadow: '0 4px 20px rgba(88,13,13,0.4)',
      zIndex: 999,
      animation: isPlaying ? 'musicPulse 2s ease-in-out infinite' : 'none',
    }}
  >
    {isPlaying ? '🎵' : '🔇'}
  </button>
));
MusicButton.displayName = 'MusicButton';

function App() {
  const bookRef = useRef(null);
  const audioRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  const isMobile = windowWidth < 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.4;
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  const dismissTutorial = useCallback(() => {
    setShowTutorial(false);
    const audio = audioRef.current;
    if (audio) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, []);

  const goToNextPage = useCallback(() => {
    if (bookRef.current) bookRef.current.pageFlip().flipNext();
  }, []);

  const goToPrevPage = useCallback(() => {
    if (bookRef.current) bookRef.current.pageFlip().flipPrev();
  }, []);

  const openModal = useCallback((photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPhoto(null), 300);
  }, []);

  const handleTouchStart = useCallback((e) => {
    if (isModalOpen) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, [isModalOpen]);

  const handleTouchEnd = useCallback((e) => {
    if (isModalOpen || touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        goToNextPage();
      } else {
        goToPrevPage();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  }, [isModalOpen, goToNextPage, goToPrevPage]);

  const floatingItems = useMemo(() => [
    { emoji: '❤️', left: '8%',  top: '20%', size: '48px', delay: '0s',   duration: '4s'   },
    { emoji: '💕', left: '23%', top: '45%', size: '20px', delay: '1s',   duration: '5s'   },
    { emoji: '♥',  left: '42%', top: '70%', size: '40px', delay: '2s',   duration: '3s'   },
    { emoji: '❤️', left: '67%', top: '30%', size: '56px', delay: '0.5s', duration: '4.5s' },
    { emoji: '💕', left: '15%', top: '60%', size: '24px', delay: '3s',   duration: '5.5s' },
    { emoji: '♥',  left: '89%', top: '15%', size: '36px', delay: '1.5s', duration: '3.5s' },
    { emoji: '❤️', left: '55%', top: '80%', size: '52px', delay: '2.5s', duration: '4s'   },
    { emoji: '💕', left: '33%', top: '35%', size: '18px', delay: '0.8s', duration: '5s'   },
    { emoji: '♥',  left: '78%', top: '55%', size: '44px', delay: '3.5s', duration: '3s'   },
    { emoji: '❤️', left: '91%', top: '75%', size: '28px', delay: '4s',   duration: '4.5s' },
    { emoji: '💕', left: '12%', top: '90%', size: '60px', delay: '5s',   duration: '5.5s' },
    { emoji: '♥',  left: '64%', top: '25%', size: '32px', delay: '6s',   duration: '3.5s' },
    { emoji: '❤️', left: '48%', top: '50%', size: '16px', delay: '4.5s', duration: '4s'   },
    { emoji: '💕', left: '72%', top: '40%', size: '50px', delay: '5.5s', duration: '5s'   },
    { emoji: '♥',  left: '18%', top: '65%', size: '38px', delay: '6.5s', duration: '3s'   },
  ], []);

  const photoFiles = useMemo(() => [
    'DSC08322.webp', 'DSC08454.webp', 'DSC08323.webp', 'DSC08322.webp', 'DSC08324.webp',
    'DSC08326.webp', 'DSC08328.webp', 'DSC08337.webp', 'DSC08339.webp',
    'DSC08353.webp', 'DSC08357.webp', 'DSC08362.webp', 'DSC08364.webp',
    'DSC08365.webp', 'DSC08377.webp', 'DSC08390.webp', 'DSC08393.webp',
    'DSC08398.webp', 'DSC08400.webp', 'DSC08402.webp', 'DSC08406.webp',
    'DSC08408.webp', 'DSC08411.webp', 'DSC08415.webp', 'DSC08426.webp',
    'DSC08428.webp', 'DSC08435.webp', 'DSC08439.webp', 'DSC08443.webp',
    'DSC08447.webp', 'DSC08450.webp', 'DSC08450 (1).webp', 'DSC08451.webp',
    'DSC08460.webp', 'DSC08465.webp', 'DSC08466.webp', 'DSC08467.webp',
    'DSC08470.webp', 'DSC08472.webp', 'DSC08473.webp', 'DSC08476.webp',
    'DSC08482.webp', 'DSC08483.webp', 'DSC08486.webp', 'DSC08488.webp',
    'DSC08489.webp', 'DSC08491.webp', 'DSC08495.webp', 'DSC08499.webp',
    'DSC08502.webp', 'DSC08504.webp', 'DSC08505.webp', 'DSC08519.webp',
    'DSC08508.webp', 'DSC08509.webp', 'DSC08512 (1).webp', 'DSC08516.webp', 'DSC08357.webp',
  ], []);

  const getBookDimensions = useCallback((width) => {
    if (width < 425)  return { width: 150, height: 250, use3d: true };
    if (width < 768)  return { width: 200, height: 250, use3d: true };
    if (width < 1024) return { width: 350, height: 400, use3d: true  };
    if (width < 1440) return { width: 400, height: 450, use3d: true  };
    return                   { width: 600, height: 650, use3d: true  };
  }, []);

  const { width: bookWidth, height: bookHeight, use3d } = getBookDimensions(windowWidth);

  const pageStyle = useMemo(() => ({
    width: `${bookWidth}px`,
    height: `${bookHeight}px`,
    borderRadius: '3px',
    overflow: 'hidden',
    boxShadow: '0 3px 5px rgba(0,0,0,0.3)',
    position: 'relative',
  }), [bookWidth, bookHeight]);

  return (
    <div
      className="min-h-screen flex flex-col items-center py-8 px-4"
      style={{
        background: 'linear-gradient(135deg, #e8e8e8 0%, #f4c2c2 50%, #d4d4d4 100%)',
        position: 'relative',
        zIndex: 1,
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <audio ref={audioRef} src="/music/Background.mp3" preload="auto" />

      {showTutorial && (
        <TutorialOverlay onDismiss={dismissTutorial} isMobile={isMobile} />
      )}

      {floatingItems.map((item, index) => (
        <div
          key={index}
          style={{
            position: 'fixed',
            left: item.left,
            top: item.top,
            fontSize: item.size,
            opacity: 0.7,
            pointerEvents: 'none',
            zIndex: 0,
            animation: `spin ${item.duration} linear infinite`,
            animationDelay: item.delay,
          }}
        >
          {item.emoji}
        </div>
      ))}

      <h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8"
        style={{ color: '#5d4037', textShadow: '2px 2px 4px rgba(255,255,255,0.5)' }}
      >
        Silver Jubilee Anniversary
      </h1>

      <div className="perspective-[2000px] flex justify-center w-full">
        <HTMLFlipBook
          width={bookWidth}
          height={bookHeight}
          ref={bookRef}
          style={{ margin: '0 auto' }}
          flippingTime={800}
          showCover={true}
          usePortrait={false}
          startZIndex={0}
          use3dEffects={use3d}
          drawShadow={true}
          swipeDistance={30}
          clickEventForward={true}
          useMouseEvents={true}
        >
          {photoFiles.map((photo, index) => (
            <Page key={index} className="flip-page" style={pageStyle}>
              {index === 0
                ? <CoverContent />
                : <PhotoContent photo={photo} index={index} onOpen={openModal} />
              }
            </Page>
          ))}
        </HTMLFlipBook>
      </div>

      <div className="flex gap-4 sm:gap-5 mt-6 sm:mt-8">
        <button
          onClick={goToPrevPage}
          className="px-6 sm:px-8 py-3 rounded-full bg-white font-bold shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          style={{ color: '#667eea' }}
        >
          Previous
        </button>
        <button
          onClick={goToNextPage}
          className="px-6 sm:px-8 py-3 rounded-full bg-white font-bold shadow-lg hover:transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          style={{ color: '#667eea' }}
        >
          Next
        </button>
      </div>

      <MusicButton isPlaying={isPlaying} onToggle={toggleMusic} />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 1000,
          },
          content: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: 'none',
            borderRadius: 0,
            background: 'transparent',
            overflow: 'hidden',
            padding: 0,
          },
        }}
      >
        {selectedPhoto && (
          <div
            onClick={closeModal}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={selectedPhoto}
              alt={selectedPhoto}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '95%',
                maxHeight: '95%',
                objectFit: 'contain',
                borderRadius: '5px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              }}
            />
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '45px',
                height: '45px',
                fontSize: '24px',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
