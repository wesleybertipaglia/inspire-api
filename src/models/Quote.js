const BaseModel = require('./BaseModel');

class Quote extends BaseModel {
    constructor(id, text, authorId, categoryId, keywords) {
        super();

        if (id != null) {
            this.validateRequired(text, 'text');
            this.validateRequired(authorId, 'authorId');
            this.validateRequired(categoryId, 'categoryId');
        }

        this.id = id;
        this.text = text;
        this.authorId = authorId;
        this.categoryId = categoryId;
        this.keywords = keywords;
        this.likeCount = 0;
        this.shareCount = 0;
    }
}

module.exports = Quote;