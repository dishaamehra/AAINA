"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.RiskLevel = exports.TaskStatus = exports.GoalStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["User"] = "user";
    UserRole["Manager"] = "manager";
    UserRole["Admin"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
var GoalStatus;
(function (GoalStatus) {
    GoalStatus["Active"] = "active";
    GoalStatus["Completed"] = "completed";
    GoalStatus["Paused"] = "paused";
    GoalStatus["Archived"] = "archived";
})(GoalStatus || (exports.GoalStatus = GoalStatus = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["Pending"] = "pending";
    TaskStatus["InProgress"] = "in_progress";
    TaskStatus["Completed"] = "completed";
    TaskStatus["Missed"] = "missed";
    TaskStatus["Deferred"] = "deferred";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
var RiskLevel;
(function (RiskLevel) {
    RiskLevel["Low"] = "low";
    RiskLevel["Medium"] = "medium";
    RiskLevel["High"] = "high";
    RiskLevel["Critical"] = "critical";
})(RiskLevel || (exports.RiskLevel = RiskLevel = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["PlanReady"] = "plan_ready";
    NotificationType["WeeklyReflection"] = "weekly_reflection";
    NotificationType["HighRisk"] = "high_risk";
    NotificationType["RecoverySuggested"] = "recovery_suggested";
    NotificationType["General"] = "general";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
//# sourceMappingURL=enums.js.map