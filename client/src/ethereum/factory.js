import web3 from './web3';
import ProjectFactory from 'ethereum/build/ProjectFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(ProjectFactory.interface),
  '0xD4654F74b7987226A3F18E48B974Cb512256dA70'
);

export default instance;
