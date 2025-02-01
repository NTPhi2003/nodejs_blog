const Course = require('../models/Course');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .lean()
            .then((course) => {
                res.render('courses/show', { course });
            })
            .catch(next);
    }

    showUpdate(req, res, next) {
        Course.find({})
            .lean()
            .then((courses) => {
                // console.log(courses);
                res.render('courses/update', { courses });
            })
            .catch((error) => {
                next(error);
            });
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/'))
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        // res.json(req.body);
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/'))
            .catch(next);

        // res.send('Course saved');
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id) 
        .lean()
        .then((course) => {
            res.render('courses/edit', { course });
        })
        .catch(next);
        // res.render('courses/edit');
    }
}

module.exports = new CourseController();
