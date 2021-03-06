"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTsImportCommentConfigSync = exports.getTsImportCommentConfig = void 0;
const commentParser = require("comment-parser");
const fs = require("fs");
const getTsImportCommentConfig = async (tsRelativePath) => {
    const tsContent = await fs.promises.readFile(tsRelativePath, `utf-8`);
    const comments = commentParser.parse(tsContent);
    const commentConfig = comments
        .map((comment) => {
        const metadataTags = comment.tags.filter((tag) => {
            return tag.tag === `tsImport`;
        });
        const metadataJsons = metadataTags.map((metadataTag) => {
            return JSON.parse(metadataTag.description);
        });
        return metadataJsons;
    })
        .flat();
    return commentConfig[0];
};
exports.getTsImportCommentConfig = getTsImportCommentConfig;
const getTsImportCommentConfigSync = (tsRelativePath) => {
    const tsContent = fs.readFileSync(tsRelativePath, `utf-8`);
    const comments = commentParser.parse(tsContent);
    const commentConfig = comments
        .map((comment) => {
        const metadataTags = comment.tags.filter((tag) => {
            return tag.tag === `tsImport`;
        });
        const metadataJsons = metadataTags.map((metadataTag) => {
            return JSON.parse(metadataTag.description);
        });
        return metadataJsons;
    })
        .flat();
    return commentConfig[0];
};
exports.getTsImportCommentConfigSync = getTsImportCommentConfigSync;
//# sourceMappingURL=get-ts-import-comment-config.js.map