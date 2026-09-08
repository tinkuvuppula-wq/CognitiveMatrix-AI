/**
 * HarmfulContentDetectorRateLimitThrottlePolicyGuardrail.js - AI Safety & Prompt Defense Component: HarmfulContentDetector -> RateLimitThrottlePolicy.
 */

class HarmfulContentDetectorRateLimitThrottlePolicyGuardrail {
  constructor(safetyConfig = {}) {
    this.guardrail = 'HarmfulContentDetector';
    this.policy = 'RateLimitThrottlePolicy';
    this.maxRiskTolerance = 0.85;
    this.eventsIntercepted = 0;
  }

  inspectInput(promptText, metadata = {}) {
    const risk = this.evaluateRisk(promptText);
    const isThreat = risk > this.maxRiskTolerance;

    if (isThreat) {
      this.eventsIntercepted++;
      return {
        allowed: false,
        guardrail: this.guardrail,
        policy: this.policy,
        riskScore: +risk.toFixed(3),
        action: 'BLOCK_AND_LOG',
        reason: 'Risk threshold breached by ' + this.guardrail
      };
    }

    return {
      allowed: true,
      guardrail: this.guardrail,
      policy: this.policy,
      riskScore: +risk.toFixed(3),
      action: 'PASS_TO_ENGINE'
    };
  }

  evaluateRisk(text) {
    if (/ignore previous rules|jailbreak|bypass security|system prompt exfil/i.test(text)) {
      return 0.96;
    }
    return Math.min(0.88, Math.max(0.04, (text.length % 40) / 100.0));
  }
}

module.exports = { HarmfulContentDetectorRateLimitThrottlePolicyGuardrail };
