// first string is conversationId, second string is last responseId
const conversations = new Map<string, string>(); // storing in memory

export const conversationRepository = {
  setLastResponseId(conversationId: string, responseId: string) {
    conversations.set(conversationId, responseId);
  },
  getLastResponseId(conversationId: string) {
    return conversations.get(conversationId);
  },
};
