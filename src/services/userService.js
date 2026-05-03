import { db } from './firebase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs,
  query,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

const USERS_COLLECTION = 'users';

export const userService = {
  // Criar ou atualizar perfil do usuário
  async syncUserProfile(user) {
    if (!user) return null;
    
    const userRef = doc(db, USERS_COLLECTION, user.uid);
    const userSnap = await getDoc(userRef);
    
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Usuário',
      photoURL: user.photoURL || '',
      lastLogin: serverTimestamp(),
    };

    if (!userSnap.exists()) {
      // Novo usuário, define papel como 'user' por padrão
      userData.role = 'user';
      userData.createdAt = serverTimestamp();
      await setDoc(userRef, userData);
    } else {
      // Atualiza apenas campos básicos para usuários existentes
      await setDoc(userRef, userData, { merge: true });
    }

    return userSnap.exists() ? userSnap.data() : userData;
  },

  // Obter perfil de um usuário específico
  async getUserProfile(uid) {
    const userRef = doc(db, USERS_COLLECTION, uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
  },

  // Obter todos os usuários (apenas para admin)
  async getAllUsers() {
    try {
      const q = query(collection(db, USERS_COLLECTION), orderBy('lastLogin', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error("Erro ao buscar usuários: ", error);
      throw error;
    }
  }
};
