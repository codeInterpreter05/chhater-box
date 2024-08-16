import User from '../models/user.model.js';

export const searchContacts = async (req, res, next) => {
    try {
        const { searchTerm } = req.body;
        if (searchTerm === undefined || searchTerm === null) {
            return res.status(400).json({ message: 'Search term is required' });
        }

        const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        const regex = new RegExp(sanitizedSearchTerm, 'i');

        const contacts = await User.find({
            $and: [{ _id: { $ne: req.userId } }, { username: regex }]
        });

        return res.status(200).json({contacts});

    } catch (error) {
        next(error);
    }
}