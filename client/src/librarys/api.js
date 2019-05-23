import factory from 'ethereum/factory';
import Project from 'ethereum/project';

export const getProjectList = async () => {
  const list = await factory.methods.getDeployedProjects().call();
  const projects = list.reverse();
  return { projects };
};

export const getRecentsList = async () => {
  const projects = await factory.methods.getDeployedProjects().call();
  const recents = projects.slice(-3).reverse();
  return { recents };
};

export const getProject = async address => {
  const project = Project(address);

  const summary = await project.methods.getSummary().call();

  return {
    address: address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4]
   };
}

export const getRequestList = async address => {
  const project = Project(address);
  const requestCount = await project.methods.getRequestCount().call();
  const approversCount = await project.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return project.methods.requests(index).call();
      })
  );


  return {
    address,
    requests,
    requestCount,
    approversCount
  };
}
