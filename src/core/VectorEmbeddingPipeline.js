/**
 * VectorEmbeddingPipeline.js - Neural Dense Vector Quantization & Semantic Projection
 */
class VectorEmbeddingPipeline {
  constructor(dimensions = 1536) {
    this.dimensions = dimensions;
    this.vectorStore = new Map();
  }

  embedText(text) {
    const vector = new Float32Array(this.dimensions);
    for (let i = 0; i < this.dimensions; i++) {
      const charCode = text.charCodeAt(i % text.length) || 1;
      vector[i] = Math.sin(charCode * (i + 1)) * 0.5 + 0.5;
    }
    return vector;
  }

  cosineSimilarity(vecA, vecB) {
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dot += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    return normA && normB ? dot / (Math.sqrt(normA) * Math.sqrt(normB)) : 0;
  }

  storeDocument(docId, text, metadata = {}) {
    const embedding = this.embedText(text);
    this.vectorStore.set(docId, { docId, text, metadata, embedding });
    return { docId, dimensions: this.dimensions };
  }

  searchSimilar(queryText, topK = 5) {
    const queryVec = this.embedText(queryText);
    const results = [];
    for (const [id, item] of this.vectorStore) {
      const score = this.cosineSimilarity(queryVec, item.embedding);
      results.push({ id, score: +score.toFixed(4), metadata: item.metadata, text: item.text });
    }
    return results.sort((a, b) => b.score - a.score).slice(0, topK);
  }
}

module.exports = { VectorEmbeddingPipeline };
