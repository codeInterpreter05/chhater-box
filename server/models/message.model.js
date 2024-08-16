const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    receiver : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: false,
    }, 
    messageType: {
        type: String,
        enum: ["text", "image"],
        required: true
    },
    content : {
        type: String,
        required: function() {
            return this.messageType === "text"
        },
    },
    fileURL : {
        type: String,
        required: function() {
            return this.messageType === "file"
        },
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model("Message", messageSchema);