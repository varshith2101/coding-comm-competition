import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        trim: true
    }, 

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true
    }
});

const Users = mongoose.model('Users' , userSchema);
export default Users;