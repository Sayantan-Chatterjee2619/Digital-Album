import React, { useState, useRef, useMemo } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const bookRef = useRef(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToNextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const goToPrevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPhoto(null), 300);
  };

  const floatingItems = useMemo(() => [
    { emoji: '❤️', left: '8%', top: '20%', size: '48px', delay: '0s', duration: '4s' },
    { emoji: '💕', left: '23%', top: '45%', size: '20px', delay: '1s', duration: '5s' },
    { emoji: '♥', left: '42%', top: '70%', size: '40px', delay: '2s', duration: '3s' },
    { emoji: '❤️', left: '67%', top: '30%', size: '56px', delay: '0.5s', duration: '4.5s' },
    { emoji: '💕', left: '15%', top: '60%', size: '24px', delay: '3s', duration: '5.5s' },
    { emoji: '♥', left: '89%', top: '15%', size: '36px', delay: '1.5s', duration: '3.5s' },
    { emoji: '❤️', left: '55%', top: '80%', size: '52px', delay: '2.5s', duration: '4s' },
    { emoji: '💕', left: '33%', top: '35%', size: '18px', delay: '0.8s', duration: '5s' },
    { emoji: '♥', left: '78%', top: '55%', size: '44px', delay: '3.5s', duration: '3s' },
    { emoji: '❤️', left: '91%', top: '75%', size: '28px', delay: '4s', duration: '4.5s' },
    { emoji: '💕', left: '12%', top: '90%', size: '60px', delay: '5s', duration: '5.5s' },
    { emoji: '♥', left: '64%', top: '25%', size: '32px', delay: '6s', duration: '3.5s' },
    { emoji: '❤️', left: '48%', top: '50%', size: '16px', delay: '4.5s', duration: '4s' },
    { emoji: '💕', left: '72%', top: '40%', size: '50px', delay: '5.5s', duration: '5s' },
    { emoji: '♥', left: '18%', top: '65%', size: '38px', delay: '6.5s', duration: '3s' },
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

  const getBookDimensions = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 425) return { width: 150, height: 250 };
      if (width < 768) return { width: 200, height: 250 };
      if (width < 1024) return { width: 350, height: 400 };
      if (width < 1440) return { width: 400, height: 450 };
      return { width: 600, height: 650 };
    }
    return { width: 800, height: 850 };
  };

  const { width: bookWidth, height: bookHeight } = getBookDimensions();

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4" style={{ background: 'linear-gradient(135deg, #e8e8e8 0%, #f4c2c2 50%, #d4d4d4 100%)', position: 'relative', zIndex: 1 }}>
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

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8" style={{ color: '#5d4037', textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)' }}>
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
          use3dEffects={true}
          drawShadow={true}
        >
          {photoFiles.map((photo, index) => (
            <div key={index} className="flip-page" style={{
              width: `${bookWidth}px`,
              height: `${bookHeight}px`,
              borderRadius: '3px',
              overflow: 'hidden',
              boxShadow: '0 3px 5px rgba(0,0,0,0.3)',
              position: 'relative',
            }}>
              {index === 0 ? (
            <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to right, rgb(255, 131, 131), rgb(88, 13, 13))',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '20px'
            }}>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Brush Script MT, cursive' }}>Happy 25th Marriage Anniversary</h1>
                <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 opacity-90" style={{ fontFamily: 'Brush Script MT, cursive' }}>Mr. & Mrs. Chatterjee</p>
                <span className="text-sm sm:text-base font-bold border-t border-white/50 pt-3">
                    25.04.2026
                </span>
            </div>
        ) : (
              <img
                src={`/Photos/${photo}`}
                alt={`${index + 1}`}
                onClick={() => openModal(`/Photos/${photo}`)}
                loading="lazy"
                className="cursor-pointer"
                style={{
                  maxWidth: '80%',
                  maxHeight: '80%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
        )}
              <div className="absolute bottom-2 right-3 text-xs sm:text-sm" style={{ color: '#9e9e9e' }}>
                {index + 1}
              </div>
            </div>
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease-out',
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
            animation: 'slideInFromRight 0.4s ease-out',
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
              alt=""
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '95%',
                maxHeight: '95%',
                objectFit: 'contain',
                borderRadius: '5px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
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
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
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