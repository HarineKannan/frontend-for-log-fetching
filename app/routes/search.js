import Route from '@ember/routing/route';
import { inject as controller } from '@ember/controller';

export default class SearchRoute extends Route {

  controllerName = 'fetching-logs';
  @controller SearchFunctionality;
  @controller  ViewSwitching;
  @controller Pagination;
  @controller suggestion;
  @controller ErrorHandling;
  @controller FetchingLogs;
  @controller LastSync;
}