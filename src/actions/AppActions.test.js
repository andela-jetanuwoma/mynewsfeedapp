import appActions from './AppActions';

describe('AppActions', () => {
  it('should return false for supplying undefined to Get news', () => {
     expect(appActions.getNews(undefined)).toBe(false);
  })
});
