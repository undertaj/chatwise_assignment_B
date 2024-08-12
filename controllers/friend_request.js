const Request = require("../models/request");
const User = require("../models/user");

async function handleSendFriendRequest(req,res) {
    try {
        const from = req.session.userId;
        const to = req.params.id;

        if(from === to){
            return res.status(400).json({message: "You cannot send friend request to yourself"});
        }

        const user = await User.findOne({_id:from});
        const friend = user.friend.find((item)=> {
            return to === item.toString();
        });
        if(friend) {
            return res.status(400).json({message: "The concerned person is already your friend"});
        }

        const friend_request = new Request({
            from: from,
            to: to
        });
        friend_request.save();
        return res.status(201).json({message: "Friend request sent successfully"});
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({message: "Friend request failed"});
    }
};


async function handleAcceptFriendRequest(req,res) {
    try {
        const from = req.params.id;
        const to = req.session.userId;
        const request = await Request.findOne({from: from,to: to});
        if(request) {
            const result = await Request.findOneAndDelete({from,to});
            const user = await User.findByIdAndUpdate(to,{$push: {friend: from}});
            const friend = await User.findByIdAndUpdate(from,{$push: {friend: to}});
            return res.status(200).json({message: "Friend request accepted successfully"});
        }
        else {
            return res.status(404).json({message: "Friend request not found"});
        }
    }
    catch {
        return res.status(400).json({message: "Friend request could not be accepted"});
    }
};

module.exports = {
    handleSendFriendRequest,
    handleAcceptFriendRequest
}