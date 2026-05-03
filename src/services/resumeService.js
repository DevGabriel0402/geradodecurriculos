import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';

const RESUMES_COLLECTION = 'resumes';

export const resumeService = {
  // Criar um novo currículo
  async createResume(userId, data) {
    try {
      const docRef = await addDoc(collection(db, RESUMES_COLLECTION), {
        userId,
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error("Erro ao criar currículo: ", error);
      throw error;
    }
  },

  // Obter todos os currículos de um usuário
  async getUserResumes(userId) {
    try {
      const q = query(collection(db, RESUMES_COLLECTION), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const resumes = [];
      querySnapshot.forEach((doc) => {
        resumes.push({ id: doc.id, ...doc.data() });
      });
      return resumes;
    } catch (error) {
      console.error("Erro ao buscar currículos: ", error);
      throw error;
    }
  },

  // Obter um currículo específico
  async getResumeById(id) {
    try {
      const docRef = doc(db, RESUMES_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("Currículo não encontrado!");
      }
    } catch (error) {
      console.error("Erro ao buscar currículo específico: ", error);
      throw error;
    }
  },

  // Atualizar currículo
  async updateResume(id, data) {
    try {
      const docRef = doc(db, RESUMES_COLLECTION, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Erro ao atualizar currículo: ", error);
      throw error;
    }
  },

  // Deletar currículo
  async deleteResume(id) {
    try {
      await deleteDoc(doc(db, RESUMES_COLLECTION, id));
    } catch (error) {
      console.error("Erro ao deletar currículo: ", error);
      throw error;
    }
  }
};
