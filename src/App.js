import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import HTMLFlipBook from 'react-pageflip';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const FloatingItem = styled.div`
  position: fixed;
  font-size: ${(props) => props.size || '24px'};
  opacity: 0.7;
  pointer-events: none;
  z-index: 0;
  animation: spin ${(props) => props.duration || '8s'} linear infinite;
  animation-delay: ${(props) => props.delay || '0s'};
  left: ${(props) => props.left || '10%'};
  top: ${(props) => props.top || '50%'};

  @keyframes spin {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(360deg);
    }
  }
`;

const AlbumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #e8e8e8 0%, #f4c2c2 50%, #d4d4d4 100%);
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  color: #5d4037;
  margin-bottom: 40px;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const NavButton = styled.button`
  padding: 12px 30px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  background: white;
  color: #667eea;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

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

  return (
    <AlbumWrapper>
      {floatingItems.map((item, index) => (
        <FloatingItem
          key={index}
          left={item.left}
          top={item.top}
          size={item.size}
          delay={item.delay}
          duration={item.duration}
        >
          {item.emoji}
        </FloatingItem>
      ))}
      <Title>Silver Jubilee Anniversary</Title>

      <div style={{ perspective: '2000px', display: 'flex', justifyContent: 'center' }}>
        <HTMLFlipBook
          width={500}
          height={550}
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
              width: '500px',
              height: '550px',
              borderRadius: '3px',
              overflow: 'hidden',
              boxShadow: '0 3px 5px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              padding: '40px'
            }}>
              {index === 0 ? (
            <div style={{
                width: '420px',
                height: '470px',
                borderRadius: '3px',
                overflow: 'hidden',
                boxShadow: '0 3px 5px rgba(0,0,0,0.3)',
                background: 'linear-gradient(135deg, #ff8282, #ff0000)',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                padding: '40px'
            }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>My Photo Book</h1>
                <p style={{ fontSize: '1.2rem', marginBottom: '25px', opacity: '0.9' }}>A collection of my favorite memories</p>
                <span style={{ fontStyle: 'italic', fontSize: '0.9rem', borderTop: '1px solid rgba(255, 255, 255, 0.5)', paddingTop: '5px' }}>
                    Personal Collection
                </span>
            </div>
        ) : (
              <img
                src={`/Photos/${photo}`}
                alt={`${index + 1}`}
                onClick={() => openModal(`/Photos/${photo}`)}
                style={{
                  maxWidth: '70%',
                  maxHeight: '70%',
                  objectFit: 'contain',
                  cursor: 'pointer',
                }}
              />
        )}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '15px',
                color: '#c1c1c1',
                fontSize: '14px'
              }}>{index + 1}</div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      <NavigationButtons>
        <NavButton onClick={goToPrevPage}>
          Previous
        </NavButton>
        <NavButton onClick={goToNextPage}>
          Next
        </NavButton>
      </NavigationButtons>

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
    </AlbumWrapper>
  );
}

export default App;
