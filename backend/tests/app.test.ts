import request from 'supertest';
import app from './../src/index';


interface NewActivity {
  username: string;
  profileImage: string;
  postContent: string;
}

describe('GET /activity', () => {
  it('responds with json', async () => {
    const response = await request(app)
      .get('/activity')
      .query({ user: 'testuser' })
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('POST /activity', () => {
  it('creates a new activity', async () => {
    const newActivity: NewActivity = {
      username: 'testuser',
      profileImage: 'http://example.com/image.jpg',
      postContent: 'This is a test post'
    };

    const response = await request(app)
      .post('/activity')
      .send(newActivity)
      .expect('Content-Type', /json/)
      .expect(201);
  });
});
