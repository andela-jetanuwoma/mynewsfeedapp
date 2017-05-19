import React from 'react';
import ReactDOM from 'react-dom';
import User from '../../src/models/User';
import Collections from '../../src/models/Collections'

User.login({ name: 'Jude Peter', email: 'wapjude@gmail.com', imageUrl: '' });
const collection = new Collections();

describe('Adding to collection', () => {
  it('should return true for adding Tech to collection', () => {
    expect(collection.addCollection('Tech')).toBe(true);
  });

  it('should return true for adding Sport to collection', () => {
    expect(collection.addCollection('Sport')).toBe(true);
  });

  it('should return true for adding Crime to collection', () => {
    expect(collection.addCollection('Crime')).toBe(true);
  });

  it('should return false for adding Tech to collection again', () => {
    expect(collection.addCollection('Tech')).toBe(false);
  });
});

describe('deleting collection', () => {
  it('should return true for deleting existing Collection ', () => {
    expect(collection.deleteCollection('Tech')).toBe(true);
  });

  it('should return false for deleting non existing Collection ', () => {
    expect(collection.deleteCollection('Tech')).toBe(false);
  });
});

describe('valid collection type', () => {
  it('should return object as typeof collections', () => {
    expect(typeof collection.toString()).toBe('object');
  });
});
