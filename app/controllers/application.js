import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import queryparserLexer from './antlr/queryparserLexer.js';
import queryparserParser from './antlr/queryparserParser.js';
import  antlr4 from 'antlr4';
import { ErrorListener } from 'antlr4';

// import FetchingLogsController from './fetching-logs-controller';


export default class ApplicationController extends Controller {
  // @tracked fetchingLogsControllerInstance = new FetchingLogsController();

  // @action
  // async fetchLogs() {
  //   this.fetchingLogsControllerInstance.setLogType(this.logtype);
  //   await this.fetchingLogsControllerInstance.fetchLogs();
  // }

  @tracked isTableView = true;
  @tracked isListView = false;
  @tracked searchQuery = "task = '2'";
  @tracked resultsPerPage = 10;
  searchResults = [];
  TotalHits = 0;
  isLoading = false;
  isSuccess = false;
  @tracked searchPerformed = false;
  @tracked NoResults = false;
  @tracked pageset = 1;
  @tracked page = 1;
  pageSize = 0;
  totalCount = 0;
  @tracked moreResultsAvailable = true;
  @tracked showSuggestions = false;
  @tracked syntaxError = false;
  @tracked syntaxErrorMessage = '';
  @tracked Suggestion = [];
  syntaxErrorMsg = '';
  @tracked selectedSuggestionIndex = 0;
  @tracked queryNoChange = false;
  @tracked applicationLastTime = this.getTime;
  @tracked systemLastTime = this.getTime;
  @tracked ProviderNameMenuClicked = false;




 

  @action
  handleInput(event) {

    this.searchQuery = event.target.value;
    this.selectedSuggestion = null;
    const inputQuery = this.searchQuery;
    console.log(inputQuery);

    const chars = new antlr4.InputStream(inputQuery);
    const lexer = new queryparserLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new queryparserParser(tokens);

    const errorListener = new CustomErrorListener();
    parser.removeErrorListeners();
    parser.addErrorListener(errorListener);
    const lastWord = inputQuery.split(' ').pop().trim();
    parser.query();

    if (errorListener.syntaxErrorsCount > 0) {
      this.syntaxError = true;
      this.syntaxErrorMsg = errorListener.Suggestion;
      let startsWithWords = this.syntaxErrorMsg.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(lastWord.toLowerCase()),
      );
      let containsWords = this.syntaxErrorMsg.filter((suggestion) =>
        suggestion.toLowerCase().includes(lastWord.toLowerCase()),
      );

      let combinedSuggestions = new Set(startsWithWords.concat(containsWords));
      this.syntaxErrorMessage = [...combinedSuggestions];
      console.log('No');
    } else {
      const lastChar = inputQuery.charAt(inputQuery.length - 1);
      if (lastChar === ' ') {
        this.syntaxError = true;
        this.Suggestion = ['and', 'or'];
        this.syntaxErrorMessage = this.Suggestion;
        console.log('Yes');
      }
    }
    this.selectedSuggestionIndex = -1;
    console.log('selectedSuggestionIndex:', this.selectedSuggestionIndex);
    const inputElement = document.getElementById('searchQuery');
  }

  @action
  ProviderNameMenu() {
    this.ProviderNameMenuClicked = true;
    console.log('youc clicked me');
  }

  @action
  switchToTableView() {
    this.isTableView = true;
    this.isListView = false;
    console.log('Switching to table view');
  }

  @action
  switchToListView() {
    this.isTableView = false;
    this.isListView = true;
    console.log('Switching to list view');
  }


  @action
  handleKeyDown(event) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectPreviousSuggestion();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectNextSuggestion();
    } else if (event.key === 'Enter' && this.selectedSuggestionIndex !== 0) {
      this.selectSuggestion(
        this.syntaxErrorMessage[this.selectedSuggestionIndex],
      );
    } else if (event.key === 'Tab') {
      event.preventDefault();
      if (this.selectedSuggestionIndex == -1) {
        this.selectSuggestion(this.syntaxErrorMessage[0]);
      }
    }
  }

  selectPreviousSuggestion() {
    if (this.selectedSuggestionIndex >= 0) {
      if (this.selectedSuggestionIndex === 0) {
        this.selectedSuggestionIndex = this.syntaxErrorMessage.length - 1;
      } else {
        this.selectedSuggestionIndex--;
      }
      this.updateSearchQueryWithSelectedSuggestion();
    } else {
      this.selectedSuggestionIndex = this.syntaxErrorMessage.length - 1;
      this.updateSearchQueryWithSelectedSuggestion();
    }
  }

  selectNextSuggestion() {
    if (this.selectedSuggestionIndex < this.syntaxErrorMessage.length - 1) {
      if (this.selectedSuggestionIndex === this.syntaxErrorMessage.length - 1) {
        this.selectedSuggestionIndex = 0;
      } else {
        this.selectedSuggestionIndex++;
      }
      this.updateSearchQueryWithSelectedSuggestion();
    } else {
      this.selectedSuggestionIndex = 0;
      this.updateSearchQueryWithSelectedSuggestion();
    }
  }

  updateSearchQueryWithSelectedSuggestion() {
    if (
      this.selectedSuggestionIndex !== -1 &&
      this.syntaxErrorMessage[this.selectedSuggestionIndex]
    ) {
      console.log(this.selectedSuggestionIndex);
      const selectedSuggestion =
        this.syntaxErrorMessage[this.selectedSuggestionIndex];
      const words = this.searchQuery.split(' ');
      words[words.length - 1] = selectedSuggestion;
      this.searchQuery = words.join(' ');
    }
  }

  @action
  selectSuggestion(suggestion) {
    if (this.searchQuery.endsWith(' ')) {
      this.searchQuery += suggestion;
    } else {
      const words = this.searchQuery.split(' ');
      words[words.length - 1] = suggestion;
      this.searchQuery = words.join(' ');
    }

    const inputElement = document.getElementById('searchQuery');
  
  }

  get totalPages() {
    return Math.ceil(this.TotalHits / this.resultsPerPage);
  }
  get pagesToView() {
    return Math.ceil(this.searchResults.length / this.resultsPerPage);
  }

  get paginatedResults() {
    const startIndex = (this.page - 1) * this.resultsPerPage;
    const endIndex = Math.min(
      startIndex + this.resultsPerPage,
      this.page * this.resultsPerPage,
    );
    return this.searchResults.slice(startIndex, endIndex);
  }

  @action
  async nextSet() {
    this.pageset++;
    const payload = this.generateSearchPayload();
    await this.searchData(
      'http://localhost:8080/LogFetcher/logFetcher',
      payload,
    );
    if (this.searchResults.length < this.pageSize) {
      console.log('No more results available');
      return;
    }
    this.totalCount = this.searchResults.length;
    console.log(this.totalCount);
    console.log(this.pageset);
  }

  @action
  next() {
    if (this.page < this.pagesToView) {
      this.page++;
      if (this.page % 10 === 0) {
        this.nextSet();
      }
    }
    console.log(this.page);
  }

  @action
  previous() {
    if (this.page > 1) {
      this.page--;
    }
    console.log(this.page);
  }

  async fetchData(url, payload) {
    try {
      this.set('isLoading', true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        this.set('isLoading', false);
        this.set('isSuccess', true);

        setTimeout(() => {
          this.set('isSuccess', false);
        }, 2000);

        console.log('Operation successful');
      } else {
        throw new Error('Operation failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  async searchData(url, payload) {
    try {
      this.set('isLoading', true);
      const searchUrl = new URL(url);
      Object.keys(payload).forEach((key) =>
        searchUrl.searchParams.append(key, payload[key]),
      );

      const response = await fetch(searchUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        this.set('isLoading', false);
        this.set('isSuccess', true);

        setTimeout(() => {
          this.set('isSuccess', false);
        }, 2000);
        const data = await response.json();
        this.TotalHits = data.TotalHits;
        this.pageSize = Math.ceil(this.TotalHits / this.resultsPerPage);
        if (this.TotalHits == 0) {
          this.NoResults = true;

          console.log('no ' + this.NoResults);
          this.NoResults = true;
        }
        console.log('Total Hits: ' + this.TotalHits);
        const newSearchResults = data.searchResults;
        const currentSearchResults = [...this.searchResults];
        const combinedResults = currentSearchResults.concat(newSearchResults);
        this.set('searchResults', combinedResults);
        console.log('Search results:', combinedResults);
        console.log('Operation successful');
      } else {
        throw new Error('Operation failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  @action
  async fetchLogs() {
    const payload = this.generatePayload();
    await this.fetchData(
      'http://localhost:8080/LogFetcher/logFetcher',
      payload,
    );
  }


  @action
  async SyncTime(url, payload) {
    try {
      const searchUrl = new URL(url);
      const jsonPayload = JSON.stringify(payload);
      const response = await fetch(searchUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonPayload,
      });
      if (response.ok) {
        const data = await response.json();
        this.applicationLastTime = data.applicationSyncTime;
        this.systemLastTime = data.SystemSyncTime;
        console.log('Updated applicationLastTime:', this.applicationLastTime);
        console.log('Updated System time:', this.systemLastTime);
      } else {
        console.error('Failed to fetch data from the backend');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  @action
  async getTime() {
    const payload = {};
    await this.SyncTime('http://localhost:8080/LogFetcher/logFetcher', payload);
  }

  @action
  async searchLogs() {
    const newSearchQuery = this.searchQuery.trim();

    this.oldSearchQuery = newSearchQuery;
    this.searchPerformed = false;

    this.searchResults = [];
    if (!this.resultsPerPage) {
      alert('Results Per Page value is not given!');
      return;
    }

    const payload = this.generateSearchPayload();
    await this.searchData(
      'http://localhost:8080/LogFetcher/logFetcher',
      payload,
    );

    this.totalCount = this.searchResults.length;
  }

  @action
  generateSearchPayload() {
    return {
      searchquery: document.getElementById('searchQuery').value,
      page: this.pageset,
      resultsPerPage: this.resultsPerPage,
    };
  }

  generatePayload() {
    return {
      logtype: this.selectedLogType,
    };
  }
}

class CustomErrorListener extends ErrorListener {
  constructor() {
    super();
    this.syntaxErrorsCount = 0;
    this.errorMessage = '';
  }

  syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
    this.syntaxErrorsCount++;
    const expectedTokens = msg.match(/{(.*?)}/);
    if (expectedTokens) {
      this.errorMessage = expectedTokens[1];
      this.Suggestion = this.errorMessage
        .split(',')
        .map((token) => token.replace(/'/g, '').trim());
    } else {
      this.errorMessage = '';
      this.Suggestion = [];
    }
  }
}
