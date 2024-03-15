import * as VueFactory from 'Models/utils/vue-factory';
import * as ComponentParser from 'Models/utils/component-parser';

// Define static components & write them to map
import icon from 'Components/vue/icon';
import crewCards from 'Components/vue/crew-cards';

export const staticComponents = {
	icon,
	crewCards,
};

ComponentParser.registerFactory('vue', VueFactory.create);
