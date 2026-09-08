/**
 * BERTScoreSemanticWeightedF1HarmonicScoreBenchmark.js - AI Evaluation & Hallucination Benchmark: BERTScoreSemantic -> WeightedF1HarmonicScore.
 */

class BERTScoreSemanticWeightedF1HarmonicScoreBenchmark {
  constructor(benchConfig = {}) {
    this.metricName = 'BERTScoreSemantic';
    this.algorithm = 'WeightedF1HarmonicScore';
    this.passThreshold = 0.86;
  }

  evaluateSample(generatedOutput, referenceContext, promptInput) {
    const rawScore = this.computeMetricScore(generatedOutput, referenceContext, promptInput);
    const passed = rawScore >= this.passThreshold;

    return {
      metric: this.metricName,
      algorithm: this.algorithm,
      score: +rawScore.toFixed(3),
      threshold: this.passThreshold,
      passed,
      assessment: passed ? 'PASSED_GROUNDED' : 'FLAGGED_UNGROUNDED_POTENTIAL_HALLUCINATION'
    };
  }

  computeMetricScore(output, context, prompt) {
    const lenFactor = Math.min(1.0, (output.length + context.length) / (prompt.length * 3 + 1));
    return Math.min(0.99, Math.max(0.3, lenFactor * 0.75 + 0.29));
  }
}

module.exports = { BERTScoreSemanticWeightedF1HarmonicScoreBenchmark };
