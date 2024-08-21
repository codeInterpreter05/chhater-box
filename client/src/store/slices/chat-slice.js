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

    groups: [],
    setGroups: (groups) => set({ groups }),

    addGroup: (group) => {
        const groups = get().groups;
        set({ groups: [group, ...groups] });
    },

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
    },

    addGroupInGroupList: (message) => {
        const groups = get().groups;
        const data = groups.find((group) => group._id === message.groupId);
        const index = groups.findIndex((group) => group._id === message.groupId);
        if(index!== -1 && index !== undefined){
            groups.splice(index, 1);
            groups.unshift(data);
        }
    },

    addContactsInDMList: (message) => {
        const userId = get().userInfo._id;

        const fromID  = message.sender._id === userId? message.receiver._id : message.sender._id;

        const fromData = message.sender._id === userId? message.receiver : message.sender;

        const dmContacts = get().directMessagesContacts;
        const data = dmContacts.find((contact) => contact._id === fromID);
        const index = dmContacts.findIndex((contact) => contact._id === fromID);

        if(index !== -1 && index!== undefined){
            dmContacts.splice(index, 1);
            dmContacts.unshift(data);
        }else{
            dmContacts.unshift(fromData);
        }
        set({ directMessagesContacts: dmContacts });
    }
});
