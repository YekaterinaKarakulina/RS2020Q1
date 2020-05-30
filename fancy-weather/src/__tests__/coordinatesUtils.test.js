import translateCoordinates from '../js/utils/coordinatesUtils';

describe('translateCoordinates', () => {
  it('Should be instance of Function', () => {
    expect(translateCoordinates).toBeInstanceOf(Function);
  });
  it('Should be defined', () => {
    const lat = 24.3964744;
    const lng = 54.5366631;
    const translatedCoordinates = {
      latitude: `24°23'47''N`,
      longitude: `54°32'11''E`
    };
    const coordinates = translateCoordinates(lat, lng);
    expect(coordinates).toBeDefined();
    expect(coordinates).toEqual(translatedCoordinates);
  });
});
