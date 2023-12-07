const BaseModel = require('./BaseModel');

class Category extends BaseModel {
    constructor(id, name) {
        super();

        if (id != null) {
            this.validateRequired(name, 'name');
        }

        this.id = id;
        this.name = name;
    }
}

module.exports = Category;