class BaseModel {
    validateRequired(value, propertyName) {
        if (value === undefined || value === null || value === '') {
            throw new Error(`"${propertyName}" is required.`);
        }
    }
}

module.exports = BaseModel;
