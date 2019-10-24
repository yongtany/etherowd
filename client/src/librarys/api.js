import axios from 'axios';
import factory from 'ethereum/factory';
import Project from 'ethereum/project';
import queryString from 'query-string';
import * as services from 'librarys/services';

// About User
export const signUp = (formData) => axios.post('/users/signup/', formData, { headers: {'Content-type': 'multipart/form-data'}});
export const signIn = (jsonObject) => axios.post('/users/signin/', jsonObject, { headers: { 'Content-Type': 'application/json' }});

// About Project with Server
export const createProject = (formData, token) => axios.post('/projects/', formData, { headers: {'Authorization': `${token}`, 'Content-type': 'multipart/form-data'}});
export const getProjectList = ({ tag, page }) => axios.get(`/projects/?${queryString.stringify({ tag, page })}`);
export const getRecentList = () => axios.get('/projects/recent');
export const getProject = (address) => axios.get(`/projects/${address}`);
export const getRequestList = (address, token) => axios.get(`/projects/${address}/requests`, { headers: {'Authorization': `${token}` }});
export const requestOnProject = (address, formData, token) => axios.post(`/projects/${address}/request`, formData, { headers: {'Authorization': `${token}`, 'Content-type': 'multipart/form-data'}});
export const investToProject = (address, jsonObject) => axios.post(`/projects/${address}/invest`, jsonObject, { headers: { 'Content-Type': 'application/json' }});

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
  const { data } = await getProject(address);
  const summary = await project.methods.getSummary().call();

  return {
    address: address,
    user: data.user,
    title: data.title,
    project_image: data.project_image,
    body: data.body,
    tags: data.tags,
    publishedDate: data.publishedDate,
    favoriteCount: data.favoriteCount,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
    investors: data.investors
   };
}



export const getRequestListBlockChain = async address => {
  const project = Project(address);
  const requestCount = await project.methods.getRequestCount().call();
  const approversCount = await project.methods.approversCount().call();
  const token = localStorage.getItem('jwt');

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return project.methods.requests(index).call();
      })
  );

  const requestsOnServer = await getRequestList(address, token);
  // console.log(requests);
  // console.log(requestsOnServer.data);
  services.deepMerge(requests, requestsOnServer.data);

  return {
    address,
    requests,
    requestCount,
    approversCount
  };
}

export const getInvestorsByrank = async address => {
  const project = Project(address);
  const investors = [];
  const approversCount = await project.methods.approversCount().call();

  for(var i = 0; i < approversCount; i++)
    investors.push(await project.methods.investors(i).call());

  return {
    investors
  }
}

