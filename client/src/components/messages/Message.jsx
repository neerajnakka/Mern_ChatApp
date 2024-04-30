import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message?.senderId === authUser?._id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const formattedTime = extractTime(message.createdAt);
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : '';
  const shakeClass = message.shouldShake ? 'shake' : '';
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white pb-1  ${bubbleBgColor} ${shakeClass}`}
      >
        {message.message}
      </div>
      <div className="chat-footer text-xs flex gap-1 items-center opacity-50">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
