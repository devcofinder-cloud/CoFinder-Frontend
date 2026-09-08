import { create } from "zustand";

import {
  Conversation,
  Message,
  getConversation,
  getConversationId,
  getMessages,
  createConversation,
  editMessage,
  deleteMessage as deleteMessageService,
  markMessageAsRead,
  markConversationAsRead,
  getUnreadCount,
  getTotalUnreadCount,
  searchMessages,
  clearConversation,
  getMessageDetails,
  deleteConversation as deleteConversationService,
} from "@/app/services/chat.service";

export interface MessageDetailUser {
  _id: string;
  name: string;
  displayName?: string;
  email: string;
  username?: string;
  profileImage?: string | null;
  profileImageType?: "avatar" | "image";
}

export interface MediaFile {
  messageId: string;
  messageType: "image" | "video" | "file" | "text";

  url: string;
  name: string;
  type: string;
  size: number;

  sender: {
    _id: string;
    name: string;
    displayName?: string;
    email: string;
    profileImage?: string | null;
    profileImageType?: "avatar" | "image";
  } | null;

  createdAt: string;
}

export interface MessageDetails {
  conversationId: string;

  user: MessageDetailUser | null;

  mediaFiles: MediaFile[];

  totalMedia: number;
}

interface ChatState {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];

  messageDetails: MessageDetails | null;
  loadingMessageDetails: boolean;

  loadingConversations: boolean;
  loadingMessages: boolean;
  sendingMessage: boolean;
  editingMessage: boolean;
  deletingMessage: boolean;
  deleteLoading: boolean;

  unreadCounts: Record<string, number>;
  totalUnreadCount: number;

  fetchConversations: () => Promise<void>;

  fetchConversation: (id: string) => Promise<void>;
  fetchMessageDetails:(id:string)=>Promise<void>;

  fetchMessages: (
    conversationId: string,
    page?: number,
    limit?: number,
  ) => Promise<void>;

  createNewConversation: (
    participantId: string | string[],
  ) => Promise<Conversation | null>;

  editExistingMessage: (
    messageId: string,
    content: string,
  ) => Promise<Message | null>;

  deleteExistingMessage: (messageId: string) => Promise<boolean>;

  markMessageAsDeleted: (messageId: string) => void;

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

  removeMessage: (messageId: string) => void;

  clearChat: () => void;

  deleteConversation: (conversationId: string) => Promise<boolean>;
}

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

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  activeConversation: null,
  messages: [],
  messageDetails: null,
  loadingMessageDetails: false,

  loadingConversations: false,
  loadingMessages: false,
  sendingMessage: false,
  editingMessage: false,
  deletingMessage: false,
  deleteLoading: false,

  unreadCounts: {},
  totalUnreadCount: 0,

  fetchConversations: async () => {
    try {
      set({ loadingConversations: true });

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

      const normalized = rawMessages
        .map(normalizeMessage)
        .filter((msg: Message) => !msg.isDeleted);

      set({
        messages: normalized,
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

  createNewConversation: async (participantId) => {
    try {
      const participants = Array.isArray(participantId)
        ? participantId
        : [participantId];

      const targetId = participants[0];

      if (!targetId) {
        return null;
      }

      const response = await createConversation({
        participantId: targetId,
        participants,
      });

      const conversation = response.data?.data || response.data || null;

      if (!conversation) {
        return null;
      }

      set((state) => ({
        conversations: [
          conversation,
          ...state.conversations.filter(
            (item) => item._id !== conversation._id,
          ),
        ],
        activeConversation: conversation,
      }));

      return conversation;
    } catch (error) {
      console.error("Failed to create conversation:", error);

      return null;
    }
  },

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
          String(item._id) === String(messageId) ? message : item,
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

  deleteExistingMessage: async (messageId) => {
    try {
      set({ deletingMessage: true });

      set((state) => ({
        messages: state.messages.filter(
          (item) => String(item._id) !== String(messageId),
        ),
      }));

      await deleteMessageService(messageId);
      return true;
    } catch (error) {
      console.error("Failed to delete message:", error);
      return false;
    } finally {
      set({ deletingMessage: false });
    }
  },
  markMessageAsDeleted: (messageId: string) => {
    set((state) => ({
      messages: state.messages.map((message) =>
        String(message._id) === String(messageId)
          ? {
              ...message,
              isDeleted: true,
              content: "",
              attachment: undefined,
            }
          : message,
      ),
    }));
  },

  markMessageRead: async (messageId) => {
    try {
      await markMessageAsRead(messageId);

      set((state) => ({
        messages: state.messages.map((message) =>
          String(message._id) === String(messageId)
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

  markChatAsRead: async (conversationId) => {
    try {
      await markConversationAsRead(conversationId);

      set((state) => ({
        messages: state.messages.map((message) =>
          String(message.conversationId) === String(conversationId)
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

  clearConversationMessages: async (conversationId) => {
    try {
      await clearConversation(conversationId);

      set((state) => ({
        messages: state.messages.filter(
          (message) =>
            String(message.conversationId) !== String(conversationId),
        ),
      }));

      return true;
    } catch (error) {
      console.error("Failed to clear conversation:", error);

      return false;
    }
  },

  setActiveConversation: (conversation) => {
    set({
      activeConversation: conversation,
      messages: [],
      messageDetails: null,
    });
  },

  setMessages: (messages) => {
    set({
      messages: messages.map(normalizeMessage),
    });
  },

  addMessage: (rawMessage) => {
    const message = normalizeMessage(rawMessage);

    set((state) => {
      const exists = state.messages.some(
        (item) => String(item._id) === String(message._id),
      );

      if (exists) {
        return state;
      }

      return {
        messages: [...state.messages, message],
      };
    });
  },

  removeMessage: (messageId) => {
    set((state) => ({
      messages: state.messages.filter(
        (message) => String(message._id) !== String(messageId),
      ),
    }));
  },

  clearChat: () => {
    set({
      activeConversation: null,
      messages: [],
      unreadCounts: {},
      messageDetails: null,
    });
  },

  deleteConversation: async (conversationId) => {
    try {
      set({
        deleteLoading: true,
      });

      await deleteConversationService(conversationId);

      set((state) => ({
        conversations: state.conversations.filter(
          (conversation) => String(conversation._id) !== String(conversationId),
        ),

        activeConversation:
          state.activeConversation &&
          String(state.activeConversation._id) === String(conversationId)
            ? null
            : state.activeConversation,

        messages:
          state.activeConversation &&
          String(state.activeConversation._id) === String(conversationId)
            ? []
            : state.messages,
      }));

      return true;
    } catch (error) {
      console.error("Failed to delete conversation:", error);

      return false;
    } finally {
      set({
        deleteLoading: false,
      });
    }
  },
  fetchMessageDetails: async (conversationId: string) => {
    try {
      set({
        loadingMessageDetails: true,
      });

      const response = await getMessageDetails(conversationId);

      const details = response.data?.data || response.data || null;

      set({
        messageDetails: details,
      });
    } catch (error) {
      console.error("Failed to fetch message details:", error);

      set({
        messageDetails: null,
      });
    } finally {
      set({
        loadingMessageDetails: false,
      });
    }
  },
}));
