import appActions from '../../src/actions/AppActions';

describe('AppActions', () => {
  it('should return false for supplying undefined to Get news', () => {
     expect(appActions.getNews(undefined)).toBe(false);
  })
});
