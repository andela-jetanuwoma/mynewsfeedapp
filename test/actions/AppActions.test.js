import AppActions from '../../src/actions/AppActions';

describe('AppActions', () => {
  it('should return false for supplying undefined to Get news', () => {
     expect(AppActions.getNews(undefined)).toBe(false);
  })
});
