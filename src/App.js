import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AlbumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #ff1d4e 0%, #ff21a2 100%);
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 40px;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const BookContainer = styled.div`
  perspective: 2000px;
  width: 500px;
  height: 550px;
  position: relative;
  margin-left: calc(50vw - 250px);
`;

const Book = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
`;

const Page = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-origin: left center;
  transform-style: preserve-3d;
  cursor: pointer;
`;

const PageFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
`;

const FrontFace = styled(PageFace)`
  background: rgb(255, 86, 86);
`;

const BackFace = styled(PageFace)`
  background: rgb(255, 86, 86);
  transform: rotateY(180deg);
`;

const Photo = styled.img`
  padding: 40px 40px;
  width: 80%;
  height: 80%;
  object-fit: contain;
`;

const PageNumber = styled.div`
  position: absolute;
  bottom: 10px;
  right: 15px;
  color: #000000;
  font-size: 14px;
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

const photoPairs = [];
for (let i = 0; i < photoFiles.length; i += 2) {
  if (photoFiles[i + 1]) {
    photoPairs.push({
      left: `/Photos/${photoFiles[i]}`,
      right: `/Photos/${photoFiles[i + 1]}`,
    });
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = photoPairs.length;

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
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

  return (
    <AlbumWrapper>
      <Title>Silver Jubilee Anniversary</Title>

      <BookContainer>
        <Book>
          {photoPairs.map((pair, index) => {
            const isFlipped = index < currentPage;

            const zIndex = isFlipped
              ? index + 1
              : totalPages + (totalPages - index);

            return (
              <Page
                key={index}
                initial={false}
                animate={{
                  rotateY: isFlipped ? -180 : 0,
                  zIndex: zIndex,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                style={{ zIndex }}
              >
                <FrontFace>
                  <Photo
                    src={pair.right}
                    alt={`Page ${index * 2 + 1} right`}
                    onClick={() => openModal(pair.right)}
                  />
                  <PageNumber>{index * 2 + 1}</PageNumber>
                </FrontFace>
                <BackFace>
                  <Photo
                    src={pair.left}
                    alt={`Page ${index * 2 + 2} left`}
                    onClick={() => openModal(pair.left)}
                  />
                  <PageNumber>{index * 2 + 2}</PageNumber>
                </BackFace>
              </Page>
            );
          })}
        </Book>
      </BookContainer>

      <NavigationButtons>
        <NavButton onClick={goToPrevPage} disabled={currentPage === 0}>
          Previous
        </NavButton>
        <NavButton onClick={goToNextPage} disabled={currentPage === totalPages}>
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
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
              <motion.img
                src={selectedPhoto}
                alt="Selected"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.5 }}
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
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </AlbumWrapper>
  );
}

export default App;
