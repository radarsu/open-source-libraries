import * as fs from 'fs';
import * as fsExtra from 'fs-extra';

interface CopyHandlers {
    onExistingFile: () => Promise<ContinueOrder | undefined>;
}

interface ContinueOrder {
    continue: boolean;
}

const copy = async (directory: string, to: string, handlers: CopyHandlers) => {
    const fileExists = await fs.promises.access(to).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    if (fileExists) {
        const order = await handlers.onExistingFile();

        if (!order?.continue) {
            return order;
        }
    }

    await fsExtra.copy(directory, to, {
        recursive: true,
    });
};

export type { ContinueOrder, CopyHandlers };
export { copy };
