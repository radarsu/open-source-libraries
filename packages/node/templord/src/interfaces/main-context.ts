import { Template } from './template.interface';

interface MainContext {
    targetDirectoryPath: string;
    responses: any;
    selectedTemplate: Template;
}

export { MainContext };
