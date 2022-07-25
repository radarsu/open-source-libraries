import * as childProcess from 'child_process';

childProcess.execSync(`./bin/dev generate --from=https://gitlab.radratteam.pl/radioactive-rat/packages/radrat-templates`);
