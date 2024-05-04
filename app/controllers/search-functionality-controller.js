// import { action } from '@ember/object';
// import { tracked } from '@glimmer/tracking';
// import { inject as service } from '@ember/service';

// export default class SearchFunctionalityController {
//   @tracked searchQuery = "task = '2'";
//   @tracked searchResults = [];
//   @tracked TotalHits = 0;
//   @tracked isLoading = false;
//   @tracked isSuccess = false;
//   @tracked NoResults = false;
//   @tracked pageset = 1;
//   @tracked page = 1;
//   @tracked moreResultsAvailable = true;
//   @tracked showSuggestions = false;
//   @tracked syntaxError = false;
//   @tracked syntaxErrorMessage = '';
//   @tracked Suggestion = [];

//   async searchData(url, payload) {
//     try {
//       this.set('isLoading', true);
//       const searchUrl = new URL(url);
//       Object.keys(payload).forEach((key) =>
//         searchUrl.searchParams.append(key, payload[key]),
//       );

//       const response = await fetch(searchUrl, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         this.set('isLoading', false);
//         this.set('isSuccess', true);

//         setTimeout(() => {
//           this.set('isSuccess', false);
//         }, 2000);
//         const data = await response.json();
//         this.TotalHits = data.TotalHits;
//         this.pageSize = Math.ceil(this.TotalHits / this.resultsPerPage);
//         if (this.TotalHits == 0) {
//           this.NoResults = true;

//           console.log('no ' + this.NoResults);
//           this.NoResults = true;
//         }
//         console.log('Total Hits: ' + this.TotalHits);
//         const newSearchResults = data.searchResults;
//         const currentSearchResults = [...this.searchResults];
//         const combinedResults = currentSearchResults.concat(newSearchResults);
//         this.set('searchResults', combinedResults);
//         console.log('Search results:', combinedResults);
//         console.log('Operation successful');
//       } else {
//         throw new Error('Operation failed');
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   }

//   @action
//   async searchLogs() {
//     const newSearchQuery = this.searchQuery.trim();
//     this.oldSearchQuery = newSearchQuery;
//     this.searchPerformed = false;
//     this.searchResults = [];
//     if (!this.resultsPerPage) {
//       alert('Results Per Page value is not given!');
//       return;
//     }
//     const payload = this.generateSearchPayload();
//     await this.searchData('http://localhost:8080/LogFetcher/logFetcher', payload);
//     this.totalCount = this.searchResults.length;
//   }

//   generateSearchPayload() {
//     return {
//       searchquery: this.searchQuery,
//       page: this.pageset,
//       resultsPerPage: this.resultsPerPage,
//     };
//   }
  
// }
