import { emailActions } from './email';
import { gameActions } from './game';
import { globalVariablesActions } from './global_variables';
import { languageActions } from './language';
import { navigationActions } from './navigation';
import { terminalActions } from './terminal';

export default { ...emailActions, ...gameActions, ...globalVariablesActions, ...languageActions, ...navigationActions, ...terminalActions };
