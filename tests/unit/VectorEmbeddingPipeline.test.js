const { VectorEmbeddingPipeline } = require('../../src/core/VectorEmbeddingPipeline');
describe('Neural Vector Embedding Pipeline', () => {
  test('stores documents and computes cosine similarity ranking', () => {
    const pipeline = new VectorEmbeddingPipeline(256);
    pipeline.storeDocument('doc1', 'Neural network agent optimization');
    pipeline.storeDocument('doc2', 'Cooking pasta recipe');
    const search = pipeline.searchSimilar('Neural agent reasoning', 2);
    expect(search.length).toBe(2);
    expect(search[0].score).toBeGreaterThan(0);
  });
});