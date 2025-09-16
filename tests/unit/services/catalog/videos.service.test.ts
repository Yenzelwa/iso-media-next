import { getVideosService, getVideoByIdService, likeVideoService, getHeroVideosService } from '@/src/services/catalog/videos';

describe('Catalog Videos Service', () => {
  describe('getVideosService', () => {
    test('returns paginated videos', async () => {
      const query = { page: 1, page_size: 10 };
      const result = await getVideosService(query);

      expect(result).toHaveProperty('items');
      expect(result).toHaveProperty('page');
      expect(result).toHaveProperty('page_size');
      expect(result).toHaveProperty('total');
      expect(Array.isArray(result.items)).toBe(true);
    });

    test('handles empty query', async () => {
      const result = await getVideosService({});

      expect(result).toHaveProperty('items');
      expect(result.items.length).toBeGreaterThan(0);
    });

    test('returns valid video structure', async () => {
      const result = await getVideosService({});
      const video = result.items[0];

      expect(video).toHaveProperty('id');
      expect(video).toHaveProperty('title');
      expect(video).toHaveProperty('rating');
      expect(video).toHaveProperty('likes');
      expect(video).toHaveProperty('type');
    });
  });

  describe('getVideoByIdService', () => {
    test('returns video details', async () => {
      const result = await getVideoByIdService('video_001');

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('image_path');
    });

    test('throws error for non-existent video', async () => {
      await expect(getVideoByIdService('not_found'))
        .rejects.toThrow('Video not found');
    });
  });

  describe('likeVideoService', () => {
    test('likes video successfully', async () => {
      const request = { like: true };
      const result = await likeVideoService('video_001', request);

      expect(result).toHaveProperty('likes');
      expect(result).toHaveProperty('dislikes');
      expect(result).toHaveProperty('user');
      expect(result.user).toHaveProperty('like');
    });

    test('unlikes video successfully', async () => {
      const request = { like: false };
      const result = await likeVideoService('video_001', request);

      expect(result).toHaveProperty('user');
      expect(typeof result.user.like).toBe('boolean');
    });

    test('throws error for non-existent video', async () => {
      const request = { like: true };
      await expect(likeVideoService('not_found', request))
        .rejects.toThrow('Video not found');
    });
  });

  describe('getHeroVideosService', () => {
    test('returns hero videos', async () => {
      const result = await getHeroVideosService();

      expect(result).toHaveProperty('items');
      expect(Array.isArray(result.items)).toBe(true);
      expect(result.items.length).toBeGreaterThan(0);
    });

    test('hero videos have required fields', async () => {
      const result = await getHeroVideosService();
      const video = result.items[0];

      expect(video).toHaveProperty('id');
      expect(video).toHaveProperty('title');
      expect(video).toHaveProperty('image_path');
      expect(video).toHaveProperty('rating');
    });
  });
});