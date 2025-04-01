import { Router } from "express";
import { getProfiles, getProfileById, createProfile, updateProfile, deleteProfile, addExperience, deleteExperience, addSkill, deleteSkill, updateInformation, getFriends, addFriend, removeFriend } from "./api/profiles/controller";

export const router = Router();

// GET /profiles: Récupérer tous les profils
router.get('/profiles', getProfiles);

// GET /profiles/:id: Récupérer un profil par ID
router.get('/profiles/:id', getProfileById);

// POST /profiles: Créer un nouveau profil (uniquement nom et email)
router.post('/profiles', createProfile);

// PUT /profiles/:id: Mettre à jour un profil par ID (uniquement nom et email)
router.put('/profiles/:id', updateProfile);

// DELETE /profiles/:id: Supprimer un profil par ID (soft-delete)
router.delete('/profiles/:id', deleteProfile);

// POST /profiles/:id/experience : Ajouter une expérience à un profil
router.post('/profiles/:id/experience', addExperience);

// DELETE /profiles/:id/experience/:exp : Supprimer une expérience d'un profil par ID d'expérience
router.delete('/profiles/:id/experience/:exp', deleteExperience);

// POST /profiles/:id/skills : Ajouter une compétence à un profil
router.post('/profiles/:id/skills', addSkill);

// DELETE /profiles/:id/skills/:skill : Supprimer une compétence d'un profil
router.delete('/profiles/:id/skills/:skill', deleteSkill);

// PUT /profiles/:id/information : Mettre à jour les informations d'un profil
router.put('/profiles/:id/information', updateInformation);

// GET /profiles/:id/friends: Récupérer la liste des amis d'un profil
router.get('/profiles/:id/friends', getFriends);

// POST /profiles/:id/friends: Ajouter un ami à un profil
router.post('/profiles/:id/friends', addFriend);

// DELETE /profiles/:id/friends/:friendId: Supprimer un ami d'un profil
router.delete('/profiles/:id/friends/:friendId', removeFriend);