import React from 'react';

type LanguageCode = 'EN' | 'FR' | 'ES';

interface LanguageFlagProps {
  languageCode: LanguageCode;
}

// Define a function to get the flag emoji
const getFlagEmoji = (languageCode: LanguageCode): string => {
  switch (languageCode) {
    case 'EN':
      return '🇬🇧'; // Union Jack for English
    case 'FR':
      return '🇫🇷'; // French flag
    case 'ES':
      return '🇪🇸'; // Spanish flag
    default:
      return '';
  }
};

// Create a functional component that takes a language code as a prop
const LanguageFlag: React.FC<LanguageFlagProps> = ({ languageCode }) => {
  return (
    <div className='!text-lg font-semibold'>
      {getFlagEmoji(languageCode)}
    </div>
  );
};

export default LanguageFlag;
