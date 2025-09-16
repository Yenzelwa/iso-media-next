import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import VideoSchema from '@/schemas/catalog/Video.schema.json';
import PaginatedVideosSchema from '@/schemas/catalog/PaginatedVideos.schema.json';
import LikeRequestSchema from '@/schemas/catalog/LikeRequest.schema.json';
import LikeResponseSchema from '@/schemas/catalog/LikeResponse.schema.json';
import videosPagedMock from '@/mocks/catalog/videos.paginated.json';
import videoDetailsMock from '@/mocks/catalog/video.details.json';
import likeResponseMock from '@/mocks/catalog/like.response.json';
import heroItemsMock from '@/mocks/catalog/hero.items.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Add the Video schema to ajv so it can resolve the reference
ajv.addSchema(VideoSchema, 'https://isolakwamuntu.com/schemas/catalog/Video.schema.json');

describe('Catalog Videos Contract Tests', () => {
  test('paginated videos response matches schema', () => {
    const valid = ajv.validate(PaginatedVideosSchema, videosPagedMock);
    expect(valid).toBe(true);
    if (!valid) {
      console.log('Validation errors:', ajv.errors);
    }
  });

  test('individual video matches schema', () => {
    const valid = ajv.validate(VideoSchema, videoDetailsMock);
    expect(valid).toBe(true);
    if (!valid) {
      console.log('Video validation errors:', ajv.errors);
    }
  });

  test('like response matches schema', () => {
    const valid = ajv.validate(LikeResponseSchema, likeResponseMock);
    expect(valid).toBe(true);
  });

  test('like request validates correctly', () => {
    const validRequests = [
      { like: true },
      { like: false }
    ];

    validRequests.forEach(request => {
      const valid = ajv.validate(LikeRequestSchema, request);
      expect(valid).toBe(true);
    });
  });

  test('like request rejects invalid data', () => {
    const invalidRequests = [
      {},
      { like: 'true' },
      { like: 1 },
      { like: null }
    ];

    invalidRequests.forEach(request => {
      const valid = ajv.validate(LikeRequestSchema, request);
      expect(valid).toBe(false);
    });
  });

  test('hero items match video schema', () => {
    heroItemsMock.items.forEach(item => {
      const valid = ajv.validate(VideoSchema, item);
      expect(valid).toBe(true);
      if (!valid) {
        console.log(`Hero item ${item.id} validation errors:`, ajv.errors);
      }
    });
  });
});