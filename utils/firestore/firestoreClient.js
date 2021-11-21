const Firestore = require('@google-cloud/firestore');
const path = require('path');

class FirestoreClient {
  constructor() {
    this.Firestore = new Firestore({
      projectId: 'hybrox-329818',
      keyFilename: path.join(__dirname, './utils/firestore/service-account.js')
    })
  }

  async save(collection, data) {
    const docRef = this.firestore.collection(collection).doc(data.docName);
    await docRef.set(data);
  }

  async saveSubCollection(rootCol, rootDocName, subCol, subColData) {
    const docRef = this.firestore.collection(rootCol).doc(rootDocName).collection(subCol).doc(subColData.docName)
    await docRef.set(subColData);
  }

  async saveByPath(path, data) {
    const docRef = this.firestore.doc(path);
    await docRef.set(data);
  }
}