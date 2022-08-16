/**
 * @format
 */
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-get-random-values';

ReactNativeForegroundService.register();
ReactNativeForegroundService.start({
  id: 144,
  title: 'vivo',
  message: "Don't close the app!",
});
AppRegistry.registerComponent(appName, () => App);
