import { emailTypes } from './email';
import { gameTypes } from './game';
import { globalVariablesTypes } from './global_variables';
import { languageTypes } from './language';
import { navigationTypes } from './navigation';
import { terminalTypes } from './terminal';

export default { ...emailTypes, ...gameTypes, ...globalVariablesTypes, ...languageTypes, ...navigationTypes, ...terminalTypes };
