// import { create } from 'zustand';
// //create is used to create store and set is used to update store and set state
// const useConversation = create((set) => ({
//   selectConversation: null,
//   setSelectConversation: (selectConversation) => set({ selectConversation }),
//   //same as useState const[messages, setMessages] = useState([]);
//   messages: [],
//   settMessages: (messages) => set({ messages }),
//   //const[messages, setMessages] = useState([]); and updating setMessages with messages
// }));
// export default useConversation;

import { create } from 'zustand';

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
