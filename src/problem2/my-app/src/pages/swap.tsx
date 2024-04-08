'use client';

import React, { useEffect, useState } from 'react';
import Button from '@/components/button';
import TokenImage from '@/components/image';
import AutoSuggest from '@/components/autoSuggest';

import { Token } from '@/types';

const SwapPage: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [tokenA, setTokenA] = useState<Token>({
    currency: '',
    price: 0,
    date: new Date(),
  });
  const [tokenB, setTokenB] = useState<Token>({
    currency: '',
    price: 0,
    date: new Date(),
  });

  const [error, setError] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://interview.switcheo.com/prices.json'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch prices');
        }
        const data = await response.json();
        setTokens(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrices();
  }, []);

  const handleTokenSwap = () => {
    setLoading(true);
    if (!isValidToken(tokenA.currency)) {
      setError('Invalid token B');
      setLoading(false);
      return;
    }
    if (!isValidToken(tokenB.currency)) {
      setError('Invalid token B');
      setLoading(false);
      return;
    }
    setError('');

    setTimeout(() => {
      const result = calculateResult(tokenA.price, tokenB.price);
      setResult(result);
      setLoading(false);
    }, 2000);
  };

  const calculateResult = (priceA: number, priceB: number) => {
    if (!priceB) {
      setError('Invalid token B');
      return 0;
    }
    return priceA / priceB;
  };

  const isValidToken = (token: string) => {
    return !!token && token.length > 0;
  };

  return (
    <div className='container mx-auto w-1/2 bg-white mt-10 p-5 text-black'>
      <h1 className='text-3xl font-bold mb-6'>Currency Swap Form</h1>
      <div className='flex flex-wrap '>
        <div className='w-1/2 p-2'>
          <div className='mb-[10px] relative'>
            <AutoSuggest
              list={tokens}
              placeholder='Token A'
              onChange={setTokenA}
              label='Token A'
            />
            {tokenA?.currency ? (
              <TokenImage
                className='absolute right-[5px] bottom-[5px]'
                symbol={tokenA?.currency}
              />
            ) : null}
          </div>
          {error && <p className='text-red-500'>{error}</p>}
        </div>
        <div className='w-1/2 p-2'>
          <div className='mb-[10px] relative'>
            <AutoSuggest
              list={tokens}
              placeholder='Token B'
              onChange={setTokenB}
              label='Token B'
            />
            {tokenB.currency ? (
              <TokenImage
                className='absolute right-[5px] bottom-[5px]'
                symbol={tokenB.currency}
              />
            ) : null}
          </div>
          {error && <p className='text-red-500'>{error}</p>}
        </div>
        <div className='w-full text-center'>
          <Button
            disabled={!tokenA?.currency && !tokenB?.currency && isLoading}
            onClick={handleTokenSwap}>
            {isLoading ? <span className='lds-dual-ring mr-3' /> : null}
            CONFIRM SWAP
          </Button>
        </div>
        {(result && (
          <div className='mt-6 w-full'>
            <table className='w-full text-left'>
              <thead>
                <tr>
                  <th className='w-1/2'>Exchange</th>
                  <th className='w-1/2'>Trading volume</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='inline-flex  gap-3'>
                    <TokenImage
                      className='w-[20px] h-[20px]'
                      symbol={tokenA?.currency}
                    />{' '}
                    {tokenA?.currency}
                  </td>
                  <td>{tokenA.price}</td>
                </tr>
                <tr>
                  <td className='inline-flex gap-3'>
                    <TokenImage
                      className='w-[20px] h-[20px]'
                      symbol={tokenB?.currency}
                    />{' '}
                    {tokenB?.currency}
                  </td>
                  <td>{tokenB.price}</td>
                </tr>
              </tbody>
            </table>
            <p className='flex items-center mt-5'>
              1 <TokenImage className='' symbol={tokenA?.currency} /> = {result}{' '}
              <TokenImage className='' symbol={tokenB?.currency} />
            </p>
          </div>
        )) ||
          null}
      </div>
    </div>
  );
};

export default SwapPage;
