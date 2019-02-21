export default class Suffixer {
  constructor() {
    console.log('New class constructed');
  }


  addSuffix(innerText : string) : string {
    console.log('Add suffix to incoming argument');
    return innerText + ' - beta';
  }
}
