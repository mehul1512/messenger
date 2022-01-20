const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        activity: {
            type: String,
            required: true,
        },
        old_data: {
            type: Object,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);

ActivityLogSchema.methods.addToActivityLog = async function () {
    return await new ActivityLog({
        userId: this.userId,
        activity: this.activity,
        oldData: this.oldData,
    }).save();
};
