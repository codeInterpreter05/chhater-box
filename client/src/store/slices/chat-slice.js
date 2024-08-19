export const createChatSlice = (set, get) => ({
    selectedChatType: undefined,
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),

    selectedChatData: undefined,
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),

    selectedChatMessages: [],
    setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),

    directMessagesContacts: [],
    setDirectMessagesContacts: (directMessagesContacts) => set({ directMessagesContacts }),

    isUploading: false,
    setIsUploading: (isUploading) => set({ isUploading }),

    isDownloading: false,
    setIsDownloading: (isDowloading) => set({ isDowloading }),

    fileUploadProgress: 0,
    setFileUploadProgress: (fileUploadProgress) => set({ fileUploadProgress }),

    fileDownloadProgress: 0,
    setFileDownloadProgress: (fileDownloadProgress) => set({ fileDownloadProgress }),

    closeChat: () => {
        set({
            selectedChatType: undefined,
            selectedChatData: undefined,
            selectedChatMessages: []
        });
    },

    addMessage: (message) => {
        const selectedChatMessages = get().selectedChatMessages;
        const selectedChatType = get().selectedChatType;
        set({ selectedChatMessages: [...selectedChatMessages, {
            ...message,
            receiver: selectedChatType === 'group'? message.receiver : message.receiver._id,
            sender: selectedChatType === 'group'? message.sender : message.sender._id   
        }] });
    }
});
