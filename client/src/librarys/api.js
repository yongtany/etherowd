import axios from 'axios';
import factory from 'ethereum/factory';
import Project from 'ethereum/project';
import queryString from 'query-string';

// About User
export const signUp = (formData) => axios.post('/users/signup/', formData, {headers: {'Content-type': 'multipart/form-data'}});
export const signIn = (jsonObject) => axios.post('/users/signin/', jsonObject, {headers: { 'Content-Type': 'application/json' }});


// About Project with Server
export const createProject = (formData, token) => axios.post('/projects/', formData, {headers: {'Authorization': `${token}`, 'content-type': 'multipart/form-data'}});
export const getPostList = ({ tag, page }) => axios.get(`/proojects/?${queryString.stringify({ tag, page })}`);


// About Prooject with Block Chain
export const getProjectListBlockChain = async () => {
  const list = await factory.methods.getDeployedProjects().call();
  const projects = list.reverse();
  return { projects };
};

export const getRecentsListBlockChain = async () => {
  const projects = await factory.methods.getDeployedProjects().call();
  const recents = projects.slice(-3).reverse();
  return { recents };
};

export const getProjectBlockChain = async address => {
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


export const getRequestListBlockChain = async address => {
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
