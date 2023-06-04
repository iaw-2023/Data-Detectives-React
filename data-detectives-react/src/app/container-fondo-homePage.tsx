import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive'

interface ContainerHomePageProps {
  children?: ReactNode;
}

const ContainerHomePage: React.FC<ContainerHomePageProps> = ({ children }) => {
  const backgroundImageUrl = '/imgs/fondo-homePage.jpg';
  
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  const containerStyle : React.CSSProperties = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '100vh',
  };
  
  if (isDesktopOrLaptop) {
    containerStyle.backgroundSize = 'contain';
  }
  
  if (isBigScreen) {
    containerStyle.backgroundPosition = 'top';
  }
  
  if (isTabletOrMobile) {
    containerStyle.backgroundSize = 'cover';
    containerStyle.justifyContent = 'flex-start';
    containerStyle.padding = '20px';
  }
  
  if (isPortrait) {
    containerStyle.backgroundPosition = 'center';
  }
  
  if (isRetina) {
    containerStyle.backgroundSize = '100%';
  }
  
  return <div style={containerStyle}>{children}</div>;
};

export default ContainerHomePage;
