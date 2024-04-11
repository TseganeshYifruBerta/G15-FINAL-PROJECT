const Section = require("../../models/auth/section.model")
const sequelize = require("sequelize")

const fetchAllSections = async (req, res) => {
    try {
        const sections = await Section.findAll({
            attributes: ['section'],
            where: {
                role: 'student'
            },
            group: ['section'],
            order: [['section', 'ASC']],
            raw: true
        });

        return res.status(200).json({ sections });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error occurred" });
    }
};


module.exports = fetchAllSections
