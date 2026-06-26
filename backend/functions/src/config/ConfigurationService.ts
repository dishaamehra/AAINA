import defaults from './defaults.json';

export interface DecisionEngineConfig {
  engineVersion: string;
  riskModel: string;
  priorityModel: string;
  confidenceThreshold: number;
  retryCount: number;
  geminiModel: string;
  promptVersion: string;
  riskWeights: Record<string, number>;
  probabilityWeights: Record<string, number>;
  priorityWeights: Record<string, number>;
  focusWeights: Record<string, number>;
  burnoutWeights: Record<string, number>;
  defaultFocusDNA: {
    planningAccuracy: number;
    averageEstimationError: number;
    deepWorkCapacityMinutes: number;
    bestFocusHours: string[];
  };
}

let cachedConfig: DecisionEngineConfig | null = null;

export function getConfiguration(): DecisionEngineConfig {
  if (!cachedConfig) {
    cachedConfig = {
      engineVersion: process.env.ENGINE_VERSION ?? defaults.engineVersion,
      riskModel: defaults.riskModel,
      priorityModel: defaults.priorityModel,
      confidenceThreshold: defaults.confidenceThreshold,
      retryCount: Number(process.env.RETRY_COUNT ?? defaults.retryCount),
      geminiModel: process.env.GEMINI_MODEL ?? defaults.geminiModel,
      promptVersion: process.env.PROMPT_VERSION ?? defaults.promptVersion,
      riskWeights: defaults.riskWeights,
      probabilityWeights: defaults.probabilityWeights,
      priorityWeights: defaults.priorityWeights,
      focusWeights: defaults.focusWeights,
      burnoutWeights: defaults.burnoutWeights,
      defaultFocusDNA: defaults.defaultFocusDNA,
    };
  }
  return cachedConfig;
}

export function resetConfigurationCache(): void {
  cachedConfig = null;
}
