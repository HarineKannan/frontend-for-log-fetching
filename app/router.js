import EmberRouter from '@ember/routing/router';
import config from 'logfetcher/config/environment';
import { inject } from '@ember/service';

export default class Router extends EmberRouter {

  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {});
