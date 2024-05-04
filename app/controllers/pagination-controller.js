// import { action } from '@ember/object';
// import { tracked } from '@glimmer/tracking';

// export default class PaginationController {
//   @tracked page = 1;
//   @tracked totalPages = 0;
//   @tracked pagesToView = 0;

//   get totalPages() {
//     return Math.ceil(this.TotalHits / this.resultsPerPage);
//   }
//   get pagesToView() {
//     return Math.ceil(this.searchResults.length / this.resultsPerPage);
//   }

//   get paginatedResults() {
//     const startIndex = (this.page - 1) * this.resultsPerPage;
//     const endIndex = Math.min(
//       startIndex + this.resultsPerPage,
//       this.page * this.resultsPerPage,
//     );
//     return this.searchResults.slice(startIndex, endIndex);
//   }

//   @action
//   next() {
//     if (this.page < this.pagesToView) {
//       this.page++;
//       if (this.page % 10 === 0) {
//         this.nextSet();
//       }
//     }
//     console.log(this.page);
//   }

//   @action
//   previous() {
//     if (this.page > 1) {
//       this.page--;
//     }
//     console.log(this.page);
//   }

//   @action
//   async nextSet() {
//     this.pageset++;
//     const payload = this.generateSearchPayload();
//     await this.searchData(
//       'http://localhost:8080/LogFetcher/logFetcher',
//       payload,
//     );
//     if (this.searchResults.length < this.pageSize) {
//       console.log('No more results available');
//       return;
//     }
//     this.totalCount = this.searchResults.length;
//     console.log(this.totalCount);
//     console.log(this.pageset);
//   }
// }
