import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
      //it says that in the document find the participant that contains all sender and receiver id
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    //Socket IO functionality

    // await conversation.save();
    // await newMessage.save();
    //the above will not run parallely but below does run parallelly
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).json(newMessage);
  } catch (error) {
    console.log('error in sendMessage controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatid } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatid] },
    }).populate('messages');
    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log('error in getMessages controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
