import ChatModel from "../model/ChatSchema";

export const message = async(req:any,res:any) => {
    try {

        const currentUserId = req.user.id;
        const { userId } = req.params;

        const chat = await ChatModel.find({
            $or: [
                { sender: currentUserId, receiver: userId },
                { sender: userId, receiver: currentUserId }
            ],
        }).sort({ timestamp: 1 });
        return res.status(200).json({ message: "Fetch the messages" }, { data: chat });
            
    } catch (e:any) {
        console.error(e.message);
        return res.status(500).json({message:"Internal server error while fetching message"})
    }
}