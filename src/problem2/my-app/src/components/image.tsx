import React from 'react';
import Image from 'next/image';

interface TokenImageProps {
  symbol: string;
  className?: string
}

const TokenImage: React.FC<TokenImageProps> = ({ symbol, className }) => {
  return <Image className={className} src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${symbol}.svg`} alt={symbol} width={30} height={30} />;
};

export default TokenImage;