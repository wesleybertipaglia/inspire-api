const BaseModel = require('./BaseModel');

class Author extends BaseModel {
    constructor(id, name, birth, death, country, field) {
        super();

        if (id != null) {
            this.validateRequired(name, 'name');
            this.validateRequired(birth, 'birth');
        }

        this.id = id;
        this.name = name;
        this.birth = birth;
        this.death = death;
        this.country = country;
        this.field = field;
    }
}

module.exports = Author;