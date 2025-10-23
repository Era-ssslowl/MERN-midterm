export type Pagination = {
  limit?: number;
  offset?: number;
};

export type ProjectFilter = {
  q?: string | null;
  status?: string | null;
  limit?: number;
  offset?: number;
};

export type TaskFilter = {
  projectId?: string | null;
  status?: string | null;
  assigneeId?: string | null;
  dueFrom?: string | null;
  dueTo?: string | null;
  limit?: number;
  offset?: number;
};
