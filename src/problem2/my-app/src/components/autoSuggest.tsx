import Autosuggest from 'react-autosuggest';
import { useState } from 'react';
import TokenImage from '@/components/image';

import { Token } from '@/types';

interface InputFieldProps {
  label: string;
  onChange: (value: Token) => void;
  placeholder?: string;
  list: Token[];
}

const AutoSuggest: React.FC<InputFieldProps> = ({
  label,
  onChange,
  placeholder,
  list,
}) => {
  const [suggestions, setSuggestions] = useState<Token[]>([]);
  const [value, setValue] = useState<string>('');

  const getSuggestions = (value: string) => {
    const inputValue = value?.trim()?.toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : list.filter((token) =>
          token.currency.toLowerCase().includes(inputValue)
        );
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (
    _: React.FormEvent<HTMLInputElement>,
    { suggestion, ...rest }: { suggestion: Token }
  ) => {
    onChange(suggestion);
  };

  const onRenderSuggestion = (suggestion: Token) => (
    <div className='flex justify-between whitespace-nowrap'>
      <span className='flex gap-2'>
        <TokenImage
          symbol={suggestion.currency}
          className='w-[20px] h-[20px]'
        />
        {suggestion.currency}
      </span>
      <span>{Math.round(suggestion.price * 1000) / 1000}</span>
    </div>
  );

  return (
    <div className='mb-4'>
      <label className='block text-gray-700 text-sm font-bold mb-2'>
        {label}
      </label>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionSelected={onSuggestionSelected}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.currency}
        renderSuggestion={onRenderSuggestion}
        inputProps={{
          placeholder,
          value: value,
          onChange: (_, { newValue }) => {
            setValue(newValue);
          },
        }}
        highlightFirstSuggestion={true}
      />
    </div>
  );
};

export default AutoSuggest;
