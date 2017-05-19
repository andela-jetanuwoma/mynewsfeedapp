import mockData from './mockedData.json';

const mockCall = {
  get() {
    return Promise.resolve(mockData);
  }
};
export default mockCall;
