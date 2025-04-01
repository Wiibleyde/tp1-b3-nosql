import type { Request, Response } from "express";
import { User } from "./model";

export async function getProfiles(req: Request, res: Response) {
    const profiles = await User.find({ deleted: { $ne: true } })
        .populate('experience', 'titre entreprise dates description')
        .populate('skills', 'skill')
        .populate('information', 'bio localisation website')
        .populate('friends', 'name email _id');
    res.json(profiles);
}

export async function getProfileById(req: Request, res: Response) {
    const profile = await User.findById(req.params.id)
        .where('deleted').ne(true)
        .populate('experience', 'titre entreprise dates description')
        .populate('skills', 'skill')
        .populate('information', 'bio localisation website')
        .populate('friends', 'name email _id');
    if (!profile) {
        res.status(404).send('Profile not found');
        return
    }
    res.json(profile);
}

export async function createProfile(req: Request, res: Response) {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
}

export async function updateProfile(req: Request, res: Response) {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
    if (!updatedUser) {
        res.status(404).send('Profile not found');
        return
    }
    res.json(updatedUser);
}

export async function deleteProfile(req: Request, res: Response) {
    const deletedUser = await User.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
    if (!deletedUser) {
        res.status(404).send('Profile not found');
        return
    }
    res.json(deletedUser);
}

export async function addExperience(req: Request, res: Response) {
    const { titre, entreprise, dates, description } = req.body;
    const newExperience = { titre, entreprise, dates, description };
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $push: { experience: newExperience } }, { new: true }).where('deleted').ne(true);
    if (!updatedUser) {
        res.status(404).send('Profile not found');
        return
    }
    res.json(updatedUser);
}

export async function deleteExperience(req: Request, res: Response) {
    const updated = await User.findByIdAndUpdate(req.params.id, { $pull: { experience: { _id: req.params.exp } } }, { new: true }).where('deleted').ne(true);
    if (!updated) {
        res.status(404).send('Profile not found');
        return
    }

    res.json(updated);
}

export async function addSkill(req: Request, res: Response) {
    const { skill } = req.body;
    const updated = await User.findByIdAndUpdate(req.params.id, { $push: { skills: skill } }, { new: true }).where('deleted').ne(true);
    if (!updated) {
        res.status(404).send('Profile not found');
        return
    }
    res.json(updated);
}

export async function deleteSkill(req: Request, res: Response) {
    const updated = await User.findByIdAndUpdate(req.params.id, { $pull: { skills: req.params.skill } }, { new: true }).where('deleted').ne(true);
    if (!updated) {
        res.status(404).send('Profile not found');
        return
    }

    res.json(updated);
}

export async function updateInformation(req: Request, res: Response) {
    const { bio, localisation, website } = req.body;
    const updated = await User.findByIdAndUpdate(req.params.id, { information: { bio, localisation, website } }, { new: true }).where('deleted').ne(true);
    if (!updated) {
        res.status(404).send('Profile not found');
        return
    }

    res.json(updated);
}

export async function getFriends(req: Request, res: Response) {
    const profile = await User.findById(req.params.id).populate('friends', 'name email _id');
    if (!profile) {
        res.status(404).send('Profile not found');
        return;
    }
    res.json(profile.friends);
}

export async function addFriend(req: Request, res: Response) {
    const { friendId } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { friends: friendId } },
        { new: true }
    ).where('deleted').ne(true).populate('friends', 'name email _id');
    if (!updatedUser) {
        res.status(404).send('Profile not found');
        return;
    }
    res.json(updatedUser.friends);
}

export async function removeFriend(req: Request, res: Response) {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $pull: { friends: req.params.friendId } },
        { new: true }
    ).where('deleted').ne(true).populate('friends', 'name email _id');
    if (!updatedUser) {
        res.status(404).send('Profile not found');
        return;
    }
    res.json(updatedUser.friends);
}