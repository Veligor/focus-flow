export interface FocusSession {
  id: string;
  startedAt: number;
  completedAt: number;
  duration: number;
  taskId?: string;
}
