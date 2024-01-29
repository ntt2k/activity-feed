// filename: validator.test.js
import { ActivityCreateInput } from '../src/validator';

describe('ActivityCreateInput validation', () => {
  it('validates a correct input', () => {
    const input = {
      username: 'testuser',
      profileImage: 'http://example.com/image.jpg',
      postContent: 'This is a test post'
    };

    expect(() => ActivityCreateInput.parse(input)).not.toThrow();
  });

  it('throws an error for invalid username', () => {
    const input = {
      username: '', // invalid username
      profileImage: 'http://example.com/image.jpg',
      postContent: 'This is a test post'
    };

    expect(() => ActivityCreateInput.parse(input)).toThrow();
  });

  it('throws an error for postContent longer than 200 characters', () => {
    const input = {
      username: 'testuser',
      profileImage: 'http://example.com/image.jpg',
      // Generating a string longer than 200 characters
      postContent: 'a'.repeat(201)
    };

    expect(() => ActivityCreateInput.parse(input)).toThrow();
  });
});
