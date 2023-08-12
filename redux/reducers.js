import { emailReducers } from './email';
import { gameReducers } from './game';
import { globalVariablesReducers } from './global_variables';
import { languageReducers } from './language';
import { navigationReducers } from './navigation';
import { terminalReducers } from './terminal';

export default { ...emailReducers, ...gameReducers, ...globalVariablesReducers, ...languageReducers, ...navigationReducers, ...terminalReducers };
