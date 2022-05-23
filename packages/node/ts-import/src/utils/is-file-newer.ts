import * as fs from 'fs';

export const isFileNewer = async (file1: fs.Stats, file2: fs.Stats) => {
    return file1.mtimeMs > file2.mtimeMs;
};
