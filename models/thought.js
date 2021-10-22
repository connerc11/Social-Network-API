const { Schema, model, Types} = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
})

const thoughtSchema = new Schema ({
   reactions: [reactionSchema], 
    createdAt: {
        type: Date,
        default: Date.now(),
        
    },
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true,
    }

},
{
    toJSON: {
        getters: true,
    },
    id: false
});



const Thought = model('Thought', thoughtSchema);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

module.exports = Thought