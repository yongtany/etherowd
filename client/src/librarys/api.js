import factory from 'ethereum/factory';
import Project from 'ethereum/project';

export const getProjectList = async () => {
  const projects = await factory.methods.getDeployedProjects().call();
  return { projects };
};

export const getRecentsList = async () => {
  const projects = await factory.methods.getDeployedProjects().call();
  const recents = projects.slice(0,3);
  return { recents };
};

export const getProject = async (address) => {
  const project = Project(address);
  const summary = await project.methods.getSummary().call();


  return { summary };
}
