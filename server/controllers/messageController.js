import Message from '../models/Message.js';
import Chat from '../models/Chat.js';

export const sendMessage = async (req, res) => {
  try {
    const { chatId, content, type = 'text', replyTo } = req.body;
    const message = new Message({
      chatId,
      sender: req.user._id,
      content,
      type,
      replyTo
    });
    
    await message.save();
    await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });
    
    // Socket.IO will handle real-time delivery
    req.io.to(chatId).emit('new_message', message);
    
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId })
      .populate('sender', 'name avatar')
      .populate('replyTo');
    
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};