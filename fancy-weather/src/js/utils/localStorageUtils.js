export default function getLanguageAbbreviation(language) {
  let translateLang = '';
  switch (language) {
    case 'Russian':
      translateLang = 'ru';
      break;
    case 'Belorussian':
      translateLang = 'be';
      break;
    default:
      translateLang = 'en';
      break;
  }
  return translateLang;
}
