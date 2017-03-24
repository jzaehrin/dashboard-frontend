export default function formatProjects (project) {
  let clone_project = Object.assign({}, project);
  switch (clone_project.status) {
    case 'in_progress' :
      clone_project.status = 'En cours';
      break;
    case 'canceled' :
      clone_project.status = 'Annulé';
      break;
    case 'finished' :
      clone_project.status = 'Terminé';
      break;
  }

  clone_project.status = `Status : ${clone_project.status}`;

  return clone_project;
}