// controllers/userController.js

import asyncHandler from "../middlewares/Asynchandler.js";
import { User } from "../Model/User.js";
import { recalculateAllRanks } from "../utility/leaderboardUtils.js";


export const updateProfile = asyncHandler(async (req, res) => {
    const { fullName, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
        req.user.id,
        { fullName, avatar },
        { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, user: { id: user._id, fullName: user.fullName, avatar: user.avatar } });
}
)
export const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select("+password");
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) return res.status(401).json({ success: false, message: "Incorrect current password" });

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password updated" });
}
)
export const deleteMe = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.user.id);
    // Recalculate ranks after user removal
    await recalculateAllRanks();
    res.cookie("jwt", "", { // Correct cookie name
        httpOnly: true,
        expires: new Date(0),

    });
    res.status(200).json({ success: true, message: "Account deleted" });
})

export const getRole = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, role: user.role });
}
)

