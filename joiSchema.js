const Joi=require("joi");

module.exports.roomSchema = Joi.object ({
    room:Joi.object({
        hosterBlock:Joi.string().required(),
        floorNo:Joi.string().required(),
        roomNo:Joi.number().required(),
        roomType:Joi.string().required(),
        noofStudents:Joi.number().required().min(1).max(7)
    }).required()
});

