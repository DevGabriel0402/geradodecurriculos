import { db } from './firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

const TEMPLATES_COLLECTION = 'templates';

export const templateService = {
  async getTemplates() {
    const q = query(collection(db, TEMPLATES_COLLECTION), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  async saveTemplate(template) {
    const templateRef = doc(db, TEMPLATES_COLLECTION, template.id);
    await setDoc(templateRef, {
      ...template,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return template;
  },

  async deleteTemplate(templateId) {
    const templateRef = doc(db, TEMPLATES_COLLECTION, templateId);
    await deleteDoc(templateRef);
  },

  async initializeTemplates(templates) {
    for (let i = 0; i < templates.length; i++) {
      const template = templates[i];
      await this.saveTemplate({ ...template, order: i });
    }
  }
};
