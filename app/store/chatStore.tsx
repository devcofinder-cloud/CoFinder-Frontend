import { create } from "zustand";

import {
  Conversation,
  Message,
  Participant,
  getConversation,
  getConversationId,
  getMessages,
  createConversation,
  sendMessage,
  getMessageById,
  editMessage,
  deleteMessage,
  markMessageAsRead,
  markConversationAsRead,
  getUnreadCount,
  getTotalUnreadCount,
  searchMessages,
  clearConversation,
} from "@/app/services/chat.service";

/*
|--------------------------------------------------------------------------
| CHAT STATE
|--------------------------------------------------------------------------
*/

interface ChatState {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];

  loadingConversations: boolean;
  loadingMessages: boolean;
  sendingMessage: boolean;
  editingMessage: boolean;
  deletingMessage: boolean;

  unreadCounts: Record<string, number>;
  totalUnreadCount: number;
  fetchConversations: () => Promise<void>;

  fetchConversation: (id: string) => Promise<void>;

  fetchMessages: (
    conversationId: string,
    page?: number,
    limit?: number,
  ) => Promise<void>;

  createNewConversation: (
    participantId: string | string[],
  ) => Promise<Conversation | null>;

  sendNewMessage: (data: {
    conversationId: string;
    receiverId: string;
    content?: string;
    messageType?: "text" | "image" | "video" | "file";
    replyTo?: string;
    attachment?: File | null;
  }) => Promise<Message | null>;

  editExistingMessage: (
    messageId: string,
    content: string,
  ) => Promise<Message | null>;

  deleteExistingMessage: (messageId: string) => Promise<boolean>;

  markMessageRead: (messageId: string) => Promise<void>;

  markChatAsRead: (conversationId: string) => Promise<void>;

  fetchUnreadCount: (conversationId: string) => Promise<void>;

  fetchTotalUnreadCount: () => Promise<void>;

  searchChatMessages: (
    conversationId: string,
    query: string,
    page?: number,
    limit?: number,
  ) => Promise<Message[]>;

  clearConversationMessages: (conversationId: string) => Promise<boolean>;

  setActiveConversation: (conversation: Conversation | null) => void;

  setMessages: (messages: Message[]) => void;

  addMessage: (message: Message) => void;

  clearChat: () => void;
}

/*
|--------------------------------------------------------------------------
| MESSAGE NORMALIZER
|--------------------------------------------------------------------------
|
| Backend:
| sender: { _id: "..." }
| conversation: "..."
|
| Frontend:
| senderId: "..."
| conversationId: "..."
|--------------------------------------------------------------------------
*/

const normalizeMessage = (message: any): Message => {
  return {
    ...message,

    conversationId:
      message.conversationId ||
      message.conversation?._id ||
      message.conversation ||
      "",

    senderId: message.senderId || message.sender?._id || message.sender || "",

    receiverId:
      message.receiverId || message.receiver?._id || message.receiver || "",

    receiver: message.receiver?._id || message.receiver,
  };
};

/*
|--------------------------------------------------------------------------
| STORE
|--------------------------------------------------------------------------
*/

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  activeConversation: null,
  messages: [],

  loadingConversations: false,
  loadingMessages: false,
  sendingMessage: false,
  editingMessage: false,
  deletingMessage: false,

  unreadCounts: {},
  totalUnreadCount: 0,

  /*
    |--------------------------------------------------------------------------
    | GET ALL CONVERSATIONS
    |--------------------------------------------------------------------------
    */

  fetchConversations: async () => {
    try {
      set({
        loadingConversations: true,
      });

      const response = await getConversation();

      const conversations = response.data?.data || response.data || [];

      set({
        conversations: Array.isArray(conversations) ? conversations : [],
      });
    } catch (error) {
      console.error("Failed to fetch conversations:", error);

      set({
        conversations: [],
      });
    } finally {
      set({
        loadingConversations: false,
      });
    }
  },

  /*
    |--------------------------------------------------------------------------
    | GET SINGLE CONVERSATION
    |--------------------------------------------------------------------------
    */

  fetchConversation: async (id) => {
    try {
      const response = await getConversationId(id);

      const conversation = response.data?.data || response.data || null;

      set({
        activeConversation: conversation,
      });
    } catch (error) {
      console.error("Failed to fetch conversation:", error);

      set({
        activeConversation: null,
      });
    }
  },

  /*
    |--------------------------------------------------------------------------
    | GET MESSAGES
    |--------------------------------------------------------------------------
    */

  fetchMessages: async (conversationId, page = 1, limit = 20) => {
    try {
      set({
        loadingMessages: true,
      });

      const response = await getMessages(conversationId, page, limit);

      const data = response.data?.data || response.data || {};

      const rawMessages = Array.isArray(data)
        ? data
        : Array.isArray(data.messages)
          ? data.messages
          : [];

      const messages = rawMessages.map(normalizeMessage);

      set({
        messages,
      });
    } catch (error) {
      console.error("Failed to fetch messages:", error);

      set({
        messages: [],
      });
    } finally {
      set({
        loadingMessages: false,
      });
    }
  },

  /*
    |--------------------------------------------------------------------------
    | CREATE CONVERSATION
    |--------------------------------------------------------------------------
    */

  createNewConversation: async (participantId) => {
    try {
      const targetId = Array.isArray(participantId)
        ? participantId[0]
        : participantId;

      const participants = Array.isArray(participantId)
        ? participantId
        : [participantId];

      const response = await createConversation({
        participantId: targetId,
        participants,
      });

      const conversation = response.data?.data || response.data || null;

      if (conversation) {
        set((state) => ({
          conversations: [
            conversation,
            ...state.conversations.filter(
              (item) => item._id !== conversation._id,
            ),
          ],

          activeConversation: conversation,
        }));
      }

      return conversation;
    } catch (error) {
      console.error("Failed to create conversation:", error);

      return null;
    }
  },

  /*
    |--------------------------------------------------------------------------
    | SEND MESSAGE
    |--------------------------------------------------------------------------
    */

  sendNewMessage: async (data) => {
    try {
      set({
        sendingMessage: true,
      });

      const response = await sendMessage({
        conversationId: data.conversationId,
        receiverId: data.receiverId,
        content: data.content || "",
        messageType: data.messageType || "text",
        replyTo: data.replyTo,
        attachment: data.attachment,
      });

      const rawMessage = response.data?.data || response.data || null;

      if (!rawMessage) {
        return null;
      }

      const message = normalizeMessage(rawMessage);

      set((state) => {
        const exists = state.messages.some((item) => item._id === message._id);

        if (exists) {
          return state;
        }

        return {
          messages: [...state.messages, message],
        };
      });

      return message;
    } catch (error) {
      console.error("Failed to send message:", error);

      return null;
    } finally {
      set({
        sendingMessage: false,
      });
    }
  },

  /*
    |--------------------------------------------------------------------------
    | EDIT MESSAGE
    |--------------------------------------------------------------------------
    */

  editExistingMessage: async (messageId, content) => {
    try {
      set({
        editingMessage: true,
      });

      const response = await editMessage(messageId, content);

      const rawMessage = response.data?.data || response.data || null;

      if (!rawMessage) {
        return null;
      }

      const message = normalizeMessage(rawMessage);

      set((state) => ({
        messages: state.messages.map((item) =>
          item._id === messageId ? message : item,
        ),
      }));

      return message;
    } catch (error) {
      console.error("Failed to edit message:", error);

      return null;
    } finally {
      set({
        editingMessage: false,
      });
    }
  },

  /*
    |--------------------------------------------------------------------------
    | DELETE MESSAGE
    |--------------------------------------------------------------------------
    */

  deleteExistingMessage: async (messageId) => {
    try {
      set({
        deletingMessage: true,
      });

      await deleteMessage(messageId);

      set((state) => ({
        messages: state.messages.filter((message) => message._id !== messageId),
      }));

      return true;
    } catch (error) {
      console.error("Failed to delete message:", error);

      return false;
    } finally {
      set({
        deletingMessage: false,
      });
    }
  },

  /*
    |--------------------------------------------------------------------------
    | MARK SINGLE MESSAGE READ
    |--------------------------------------------------------------------------
    */

  markMessageRead: async (messageId) => {
    try {
      await markMessageAsRead(messageId);

      set((state) => ({
        messages: state.messages.map((message) =>
          message._id === messageId
            ? {
                ...message,
                isRead: true,
                readAt: new Date().toISOString(),
              }
            : message,
        ),
      }));
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
  },

  /*
    |--------------------------------------------------------------------------
    | MARK CONVERSATION READ
    |--------------------------------------------------------------------------
    */

  markChatAsRead: async (conversationId) => {
    try {
      await markConversationAsRead(conversationId);

      set((state) => ({
        messages: state.messages.map((message) =>
          message.conversationId === conversationId
            ? {
                ...message,
                isRead: true,
                readAt: new Date().toISOString(),
              }
            : message,
        ),

        unreadCounts: {
          ...state.unreadCounts,
          [conversationId]: 0,
        },
      }));
    } catch (error) {
      console.error("Failed to mark conversation as read:", error);
    }
  },

  /*
    |--------------------------------------------------------------------------
    | GET CONVERSATION UNREAD COUNT
    |--------------------------------------------------------------------------
    */

  fetchUnreadCount: async (conversationId) => {
    try {
      const response = await getUnreadCount(conversationId);

      const data = response.data?.data || response.data || {};

      const count = Number(data.unreadCount) || 0;

      set((state) => ({
        unreadCounts: {
          ...state.unreadCounts,
          [conversationId]: count,
        },
      }));
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  },

  /*
    |--------------------------------------------------------------------------
    | GET TOTAL UNREAD COUNT
    |--------------------------------------------------------------------------
    */

  fetchTotalUnreadCount: async () => {
    try {
      const response = await getTotalUnreadCount();

      const data = response.data?.data || response.data || {};

      set({
        totalUnreadCount: Number(data.unreadCount) || 0,
      });
    } catch (error) {
      console.error("Failed to fetch total unread count:", error);
    }
  },

  /*
    |--------------------------------------------------------------------------
    | SEARCH MESSAGES
    |--------------------------------------------------------------------------
    */

  searchChatMessages: async (conversationId, query, page = 1, limit = 20) => {
    try {
      if (!query.trim()) {
        return [];
      }

      const response = await searchMessages(conversationId, query, page, limit);

      const data = response.data?.data || response.data || {};

      const rawMessages = Array.isArray(data)
        ? data
        : Array.isArray(data.messages)
          ? data.messages
          : [];

      return rawMessages.map(normalizeMessage);
    } catch (error) {
      console.error("Failed to search messages:", error);

      return [];
    }
  },

  /*
    |--------------------------------------------------------------------------
    | CLEAR CONVERSATION
    |--------------------------------------------------------------------------
    */

  clearConversationMessages: async (conversationId) => {
    try {
      await clearConversation(conversationId);

      set((state) => ({
        messages: state.messages.filter(
          (message) => message.conversationId !== conversationId,
        ),
      }));

      return true;
    } catch (error) {
      console.error("Failed to clear conversation:", error);

      return false;
    }
  },

  /*
    |--------------------------------------------------------------------------
    | SET ACTIVE CONVERSATION
    |--------------------------------------------------------------------------
    */

  setActiveConversation: (conversation) => {
    set({
      activeConversation: conversation,
      messages: [],
    });
  },

  /*
    |--------------------------------------------------------------------------
    | SET MESSAGES
    |--------------------------------------------------------------------------
    */

  setMessages: (messages) => {
    set({
      messages: messages.map(normalizeMessage),
    });
  },

  /*
    |--------------------------------------------------------------------------
    | ADD MESSAGE
    |--------------------------------------------------------------------------
    */

  addMessage: (rawMessage) => {
    const message = normalizeMessage(rawMessage);

    set((state) => {
      const exists = state.messages.some((item) => item._id === message._id);

      if (exists) {
        return state;
      }

      return {
        messages: [...state.messages, message],
      };
    });
  },

  /*
    |--------------------------------------------------------------------------
    | CLEAR CHAT
    |--------------------------------------------------------------------------
    */
  clearChat: () => {
    set({
      activeConversation: null,
      messages: [],
      unreadCounts: {},
    });
  },
}));
