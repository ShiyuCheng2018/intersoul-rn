import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotronConfig = {
    initiate: () => {
        Reactotron.configure({ name: 'InterSoul' })
            .useReactNative()
            .use(reactotronRedux())
            .connect();
    },
    createEnhancer: () => (Reactotron as any).createEnhancer()
};


export default reactotronConfig;
