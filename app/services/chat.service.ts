import api from "../lib/axios";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

export interface Message {
  _id: string;
  conversation?: string;
  conversationId: string;
  sender?: string;
  senderId: string;
  receiver?: string;
  receiverId?: string;
  content: string;
  messageType: string;

  replyTo?: Message | string | null;

  isRead?: boolean;
  readAt?: string | null;

  isEdited?: boolean;
  editedAt?: string | null;

  isDeleted?: boolean;
  deletedAt?: string | null;

  createdAt: string;
  updatedAt?: string;
}

export interface Participant {
  _id: string;
  name?: string;
  email?: string;
  avatar?: string;
  profileImage?: string;
}

export interface Conversation {
  _id?: string;
  participants: Participant[];

  lastMessage?: string | Message;
  lastMessageAt?: string;
  lastSeen?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalMessages: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage?: boolean;
}

export interface MessagesResponse {
  messages: Message[];
  pagination: Pagination;
}

export interface UnreadCountResponse {
  unreadCount: number;
}

/*
|--------------------------------------------------------------------------
| SEND MESSAGE
|--------------------------------------------------------------------------
*/

export const sendMessage = (data: {
  conversationId: string;
  receiverId: string;
  content: string;
  messageType?: string;
  replyTo?: string;
}) => {
  return api.post("/messages/send", data);
};

/*
|--------------------------------------------------------------------------
| GET MESSAGES
|--------------------------------------------------------------------------
*/

export const getMessages = (
  conversationId: string,
  page = 1,
  limit = 20,
) => {
  return api.get(`/messages/${conversationId}`, {
    params: {
      page,
      limit,
    },
  });
};

/*
|--------------------------------------------------------------------------
| GET SINGLE MESSAGE
|--------------------------------------------------------------------------
*/

export const getMessageById = (messageId: string) => {
  return api.get(`/messages/single/${messageId}`);
};

/*
|--------------------------------------------------------------------------
| EDIT MESSAGE
|--------------------------------------------------------------------------
*/

export const editMessage = (
  messageId: string,
  content: string,
) => {
  return api.patch(`/messages/${messageId}`, {
    content,
  });
};

/*
|--------------------------------------------------------------------------
| DELETE MESSAGE
|--------------------------------------------------------------------------
*/

export const deleteMessage = (
  messageId: string,
) => {
  return api.delete(`/messages/${messageId}`);
};

/*
|--------------------------------------------------------------------------
| MARK MESSAGE AS READ
|--------------------------------------------------------------------------
*/

export const markMessageAsRead = (
  messageId: string,
) => {
  return api.patch(
    `/messages/read/${messageId}`,
  );
};

/*
|--------------------------------------------------------------------------
| MARK CONVERSATION AS READ
|--------------------------------------------------------------------------
*/

export const markConversationAsRead = (
  conversationId: string,
) => {
  return api.patch(
    `/messages/conversation/${conversationId}/read`,
  );
};

/*
|--------------------------------------------------------------------------
| GET CONVERSATION UNREAD COUNT
|--------------------------------------------------------------------------
*/

export const getUnreadCount = (
  conversationId: string,
) => {
  return api.get<{
    data: UnreadCountResponse;
  }>(
    `/messages/unread/${conversationId}`,
  );
};

/*
|--------------------------------------------------------------------------
| GET TOTAL UNREAD COUNT
|--------------------------------------------------------------------------
*/

export const getTotalUnreadCount = () => {
  return api.get<{
    data: UnreadCountResponse;
  }>("/messages/unread");
};

/*
|--------------------------------------------------------------------------
| SEARCH MESSAGES
|--------------------------------------------------------------------------
*/

export const searchMessages = (
  conversationId: string,
  query: string,
  page = 1,
  limit = 20,
) => {
  return api.get(
    `/messages/search/${conversationId}`,
    {
      params: {
        query,
        page,
        limit,
      },
    },
  );
};

/*
|--------------------------------------------------------------------------
| CLEAR CONVERSATION
|--------------------------------------------------------------------------
*/

export const clearConversation = (
  conversationId: string,
) => {
  return api.delete(
    `/messages/conversation/${conversationId}/clear`,
  );
};

/*
|--------------------------------------------------------------------------
| CREATE CONVERSATION
|--------------------------------------------------------------------------
*/

export const createConversation = (data: {
  participantId?: string;
  participants?: string[];
}) => {
  return api.post("/conversations", data);
};

/*
|--------------------------------------------------------------------------
| GET ALL CONVERSATIONS
|--------------------------------------------------------------------------
*/

export const getConversation = () => {
  return api.get("/conversations");
};

/*
|--------------------------------------------------------------------------
| GET SINGLE CONVERSATION
|--------------------------------------------------------------------------
*/

export const getConversationId = (
  id: string,
) => {
  return api.get(`/conversations/${id}`);
};