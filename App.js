import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SurveyCompleteScreen from './screens/SurveyCompleteScreen';
import SurveyScreen from './screens/SurveyScreen';

const stackNav = createStackNavigator({
  Survey: {
    screen: SurveyScreen
  },
  SurveyComplete: {
    screen: SurveyCompleteScreen
  }
})

const AppContainer = createAppContainer(stackNav);

export default AppContainer;