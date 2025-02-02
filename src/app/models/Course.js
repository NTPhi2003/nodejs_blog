const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mogooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema(
    {
        name: { type: String, maxLength: 255 },
        description: String,
        image: String,
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    }
);

mongoose.plugin(slug);
Course.plugin(mogooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
