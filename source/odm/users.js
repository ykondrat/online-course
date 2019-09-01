// Core
import mongoose from 'mongoose';
import v4 from 'uuid/v4';

const schema = new mongoose.Schema(
    {
        name: {
            first: {
                type:      String,
                required:  true,
                minlength: 2,
                maxlength: 15,
            },
            last: {
                type:      String,
                required:  true,
                minlength: 2,
                maxlength: 15,
            },
        },
        phones: [
            {
                phone: {
                    type:     String,
                    required: true,
                },
                primary: Boolean,
            },
        ],
        emails: [
            {
                email: {
                    type:     String,
                    required: true,
                    unique:   true,
                    match:    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                },
                primary: Boolean,
            },
        ],
        password: {
            type:      String,
            select:    false,
            minlength: 10,
            required:  true,
        },
        sex: {
            type:     String,
            enum:     [ 'm', 'f' ],
            required: true,
        },
        roles: [
            {
                type:    String,
                default: 'newbie',
                enum:    [ 'newbie', 'student', 'teacher' ],
            },
        ],
        socials: {
            facebook: {
                type:  String,
                match: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            },
            linkedin: {
                type:  String,
                match: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            },
            github: {
                type:  String,
                match: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            },
            skype: {
                type:  String,
                match: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            },
        },
        notes: {
            type:      String,
            maxlength: 250,
        },
        hash: {
            type:     String,
            required: true,
            unique:   true,
            default:  () => v4(),
        },
        disabled: Boolean,
    },
    {
        timestamp: {
            createdAt: 'created',
            updatedAt: 'modified',
        },
    },
);

schema.index({
    'name.first': 1,
    'name.last':  1,
}, {
    name: 'flName',
});
schema.index({
    notes: 'text',
}, {
    name: 'notes',
});

const users = mongoose.model('users', schema);

users.createIndexes();

export { users };
