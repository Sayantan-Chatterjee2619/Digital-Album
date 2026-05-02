import React, { useState, useRef } from 'react';
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

  const floatingItems = [
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
  ];

  const photoFiles = [
    'DSC08322.jpg', 'DSC08454.jpg', 'DSC08323.jpg', 'DSC08324.jpg',
    'DSC08326.jpg', 'DSC08328.jpg', 'DSC08337.jpg', 'DSC08339.jpg',
    'DSC08353.jpg', 'DSC08357.jpg', 'DSC08362.jpg', 'DSC08364.jpg',
    'DSC08365.jpg', 'DSC08377.jpg', 'DSC08390.jpg', 'DSC08393.jpg',
    'DSC08398.jpg', 'DSC08400.jpg', 'DSC08402.jpg', 'DSC08406.jpg',
    'DSC08408.jpg', 'DSC08411.jpg', 'DSC08415.jpg', 'DSC08426.jpg',
    'DSC08428.jpg', 'DSC08435.jpg', 'DSC08439.jpg', 'DSC08443.jpg',
    'DSC08447.jpg', 'DSC08450.jpg', 'DSC08450 (1).jpg', 'DSC08451.jpg',
    'DSC08460.jpg', 'DSC08465.jpg', 'DSC08466.jpg', 'DSC08467.jpg',
    'DSC08470.jpg', 'DSC08472.jpg', 'DSC08473.jpg', 'DSC08476.jpg',
    'DSC08482.jpg', 'DSC08483.jpg', 'DSC08486.jpg', 'DSC08488.jpg',
    'DSC08489.jpg', 'DSC08491.jpg', 'DSC08495.jpg', 'DSC08499.jpg',
    'DSC08502.jpg', 'DSC08504.jpg', 'DSC08505.jpg', 'DSC08519.jpg',
    'DSC08508.jpg', 'DSC08509.jpg', 'DSC08512 (1).jpg', 'DSC08516.jpg',
  ];

  const getBookDimensions = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return { width: 300, height: 400 };
      if (width < 768) return { width: 400, height: 450 };
      if (width < 1024) return { width: 450, height: 500 };
      return { width: 500, height: 550 };
    }
    return { width: 500, height: 550 };
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
          showCover={false}
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '20px',
            }}>
              <img
                src={`/Photos/${photo}`}
                alt={`${index + 1}`}
                onClick={() => openModal(`/Photos/${photo}`)}
                className="cursor-pointer"
                style={{
                  maxWidth: '80%',
                  maxHeight: '80%',
                  objectFit: 'contain',
                }}
              />
              <div className="absolute bottom-2 right-3 text-xs sm:text-sm" style={{ color: '#000000' }}>
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
