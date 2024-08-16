export const createChatSlice = (set, get) => ({
    selectedChatType: undefined,
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),

    selectedChatData: undefined,
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),

    selectedChatMessages: undefined,
    setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),

    closeChat: () => {
        set({
            selectedChatType: undefined,
            selectedChatData: undefined,
            selectedChatMessages: []
        });
    }
});
