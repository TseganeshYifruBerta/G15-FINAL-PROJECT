const express = require('express');
const criteria = require('../../models/grading/criteria');
const sequelize = require("../../database/sequelize");
const creatExam = require('../../models/exam/createExam');
const SelectedQuestionForExam = require('../../models/exam/SelectedQuestionForExam')
const User = require('../../models/auth/user.model');
const addCriteria = async (req, res) => {
    const {
        examId,
        examQuestionId,
        timeComplexity,
        codeQuality,
        codeComment,
        codeCorrectness,
        teacherId,
        gradeValue
    } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const foundExam = await creatExam.findOne({
            where: {
                id: examId
            }
        })
        if (!foundExam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        const foundExamQuestion = await SelectedQuestionForExam.findOne({
            where: {
                question_ids: examQuestionId
            }
        })
        if (!foundExamQuestion) {
            return res.status(404).json({ message: 'Exam Question not found' });
        }

        const foundTeacher = await User.findOne({
            where: {
                id: teacherId
            }

        })
        if (!foundTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }



        if (!examId || !examQuestionId || !teacherId) {
            return res.status(400).json({ message: 'Invalid data received' });
        }
        if (!timeComplexity || !codeQuality || !codeComment || !codeCorrectness || !gradeValue) {
            return res.status(400).json({ message: 'timeComplexity , codeQuality , gradeValue,codeComment and codeCorrectness should not be null' });
        }
        if (timeComplexity < 0 || timeComplexity > 1 || codeQuality < 0 || codeQuality > 1 || codeComment < 0 || codeComment > 1 || codeCorrectness < 0 || codeCorrectness > 1) {
            return res.status(400).json({ message: 'timeComplexity , codeQuality , codeComment and codeCorrectness should be between 0 and 1' });
        }
        const citeriaFound = await criteria.findOne({
            where: {
                examId,
                examQuestionId,
                teacherId
            }
        });
        if (citeriaFound) {
            return res.status(400).json({ message: 'Criteria already exists' });
        }
        const criteriaData =  await criteria.create({
            examId,
            examQuestionId,
            timeComplexity,
            codeQuality,
            codeComment,
            codeCorrectness,
            teacherId,
            gradeValue
        }, { transaction });

        await transaction.commit();
        return res.status(201).json({ message: 'Criteria created successfully' , criteriaData});
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({ error: 'Failed to create criteria', message: error.message });
    }
};

const updateCriteria = async (req, res) => {
    const { criteriaId ,teacherId} = req.params;
    const {

        timeComplexity,
        codeQuality,
        codeComment,
        codeCorrectness,
        gradeValue
    } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const foundCriteria = await criteria.findOne({
            where: {
                id: criteriaId,
                teacherId: teacherId
            }
        })
        if (!foundCriteria) {
            return res.status(404).json({ message: 'Criteria not found' });
        }

       
        if (!timeComplexity || !codeQuality || !codeComment || !codeCorrectness || !gradeValue) {
            return res.status(400).json({ message: 'timeComplexity , codeQuality , gradeValue,codeComment and codeCorrectness should not be null' });
        }
        if (timeComplexity < 0 || timeComplexity > 1 || codeQuality < 0 || codeQuality > 1 || codeComment < 0 || codeComment > 1 || codeCorrectness < 0 || codeCorrectness > 1) {
            return res.status(400).json({ message: 'timeComplexity , codeQuality , codeComment and codeCorrectness should be between 0 and 1' });
        }
        const updatedCriteria = await criteria.findOne({
            where:{
                id: criteriaId,
                teacherId: teacherId
            }
        })
        updatedCriteria.timeComplexity = timeComplexity
        updatedCriteria.codeComment = codeComment
        updatedCriteria.codeCorrectness = codeCorrectness
        updatedCriteria.codeQuality = codeQuality
        updatedCriteria.gradeValue = gradeValue
        await updatedCriteria.save({ transaction });

        // const updatedCriteria = await criteria.update({
        //     timeComplexity,
        //     codeQuality,
        //     codeComment,
        //     codeCorrectness
        // }, {
        //     where: {
        //         examId,
        //         examQuestionId,
        //         teacherId
        //     },
        //     transaction
        // });

        await transaction.commit();
        return res.status(200).json({ message: 'Criteria updated successfully', updatedCriteria });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({ error: 'Failed to update criteria', message: error.message });
    }
};

const deleteCriteria = async (req, res) => {
    const { criteriaId ,teacherId} = req.params;

    const transaction = await sequelize.transaction();

    try {
        const foundCriteria = await criteria.findOne({
            where: {
                id: criteriaId,
                teacherId: teacherId
            }
        })
        if (!foundCriteria) {
            return res.status(404).json({ message: 'Criteria not found' });
        }


        await criteria.destroy({
            where: {
                id: criteriaId,
                teacherId: teacherId
            },
            transaction
        });

        await transaction.commit();
        return res.status(200).json({ message: 'Criteria deleted successfully' });
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({ error: 'Failed to delete criteria', message: error.message });
    }
};

const getCriteriaDetailById = async (req,res) => {
    const { criteriaId ,teacherId} = req.params;
    try {
        const criteriaFound = await criteria.findOne({
            where: {
                id: criteriaId,
                teacherId: teacherId
            }
        });
        if (!criteriaFound) {
            return res.status(404).json({ message: 'Criteria not found' });
        }
        const criteriaData = await criteria.findOne({
            where: {
                id: criteriaId,
                teacherId: teacherId
            }
        });
        if (!criteriaData) {
            return res.status(404).json({ message: 'Criteria not found' });
        }
        return res.status(200).json({ criteriaData });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to get criteria', message: error.message });
    }

    
}
module.exports = { addCriteria, updateCriteria, deleteCriteria , getCriteriaDetailById};
