export enum UserRole {
  User = 'user',
  Manager = 'manager',
  Admin = 'admin',
}

export enum GoalStatus {
  Active = 'active',
  Completed = 'completed',
  Paused = 'paused',
  Archived = 'archived',
}

export enum TaskStatus {
  Pending = 'pending',
  InProgress = 'in_progress',
  Completed = 'completed',
  Missed = 'missed',
  Deferred = 'deferred',
}

export enum RiskLevel {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Critical = 'critical',
}

export enum NotificationType {
  PlanReady = 'plan_ready',
  WeeklyReflection = 'weekly_reflection',
  HighRisk = 'high_risk',
  RecoverySuggested = 'recovery_suggested',
  General = 'general',
}
