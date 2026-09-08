const { CognitiveMatrixEngine } = require('../../src/core/CognitiveMatrixEngine');
describe('Cognitive Matrix Orchestration Engine', () => {
  test('orchestrates multi-agent consensus and converges successfully', async () => {
    const engine = new CognitiveMatrixEngine('test_matrix');
    engine.registerAgent('ag1', {});
    const res = await engine.orchestrateConsensus('Analyze quarterly financial trends', 5);
    expect(res.status).toBe('CONVERGED');
    expect(res.steps.length).toBeGreaterThan(0);
  });
});