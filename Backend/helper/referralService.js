// Function to apply referral code logic for a given userId and referralCode
export const applyReferralCode = async (userId, referralCode) => {
    if (!referralCode || referralCode.trim() === "") {
        throw new Error("Referral code is required");
    }

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("Unauthorized user");
    }

    // Check if user already used a referral code
    if (user.referredBy) {
        throw new Error("Referral code already used");
    }

    // Find the referrer by referral code
    const referrer = await User.findOne({ referralCode });
    if (!referrer) {
        throw new Error("Invalid referral code");
    }

    // Prevent user from using their own referral code
    if (referrer._id.toString() === user._id.toString()) {
        throw new Error("You cannot use your own referral code");
    }

    // Update the referred user
    user.referredBy = referrer._id;
    user.totalCredits = (user.totalCredits || 0) + 10;
    await user.save();

    // Update the referrer user
    referrer.totalCredits = (referrer.totalCredits || 0) + 20;
    referrer.referralCount = (referrer.referralCount || 0) + 1;
    await referrer.save();

    // Additional referral update logic (if any)
    await updateOnReferral(referrer._id);

    // Return some info about successful referral application
    return {
        message: "Referral code applied successfully",
        referredBy: {
            _id: referrer._id,
            referralCode: referrer.referralCode,
            totalCredits: referrer.totalCredits,
            referralCount: referrer.referralCount,
        },
    };
};
