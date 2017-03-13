export default function formatProjects (project) {
  let clone_project = Object.assign({}, project);
  switch (clone_project.status) {
    case 'in_progress' :
      clone_project.status = 'In progress';
      break;
    case 'canceled' :
      clone_project.status = 'Canceled';
      break;
    case 'finished' :
      clone_project.status = 'Finish';
      break;
  }

  clone_project.status = `Status : ${clone_project.status}`;

  return clone_project;
}