import { AppModule } from './app/app.module.js';
import { ArgsService } from './app/args.service.js';
import { bootstrap } from 'provident';

const load = async (tsRelativePath: string, options?: any) => {
    const argsService = new ArgsService(tsRelativePath, options);
    await bootstrap(AppModule, [
        {
            type: ArgsService,
            value: argsService,
        },
    ]);
};

await load(`./somePath`, {
    someOptions: true,
});

export { load };
