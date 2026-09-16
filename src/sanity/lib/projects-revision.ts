type ProjectsRevisionData = {
  section: { _id: string; _rev: string } | null;
  projects: { id: string; _rev: string }[];
};

// Track individual project edits, additions, removals and reordering as well as section text.
export function projectsRevision(data: ProjectsRevisionData) {
  return JSON.stringify({
    section: data.section ? data.section._id + ":" + data.section._rev : null,
    projects: data.projects.map((project) => project.id + ":" + project._rev),
  });
}
