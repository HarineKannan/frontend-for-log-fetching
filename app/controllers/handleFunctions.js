// import Controller from '@ember/controller';
// import { action } from '@ember/object';
// import { tracked } from '@glimmer/tracking';


// export default class HandleFunctionsController extends Controller {
//     @tracked selectedSuggestionIndex = 0;
//     @tracked selectedSuggestion = null;
  
//   handleKeyDown(event) {
//     if (event.key === 'ArrowUp') {
//       event.preventDefault();
//       this.selectPreviousSuggestion();
//     } else if (event.key === 'ArrowDown') {
//       event.preventDefault();
//       this.selectNextSuggestion();
//     } else if (event.key === 'Enter' && this.selectedSuggestionIndex !== 0) {
//       this.selectSuggestion(
//         this.syntaxErrorMessage[this.selectedSuggestionIndex],
//       );
//     } else if (event.key === 'Tab') {
//       event.preventDefault();
//       if (this.selectedSuggestionIndex == -1) {
//         this.selectSuggestion(this.syntaxErrorMessage[0]);
//       }
//     }
//   }

//  selectPreviousSuggestion() {
//     if (this.selectedSuggestionIndex >= 0) {
//       if (this.selectedSuggestionIndex === 0) {
//         this.selectedSuggestionIndex = this.syntaxErrorMessage.length - 1;
//       } else {
//         this.selectedSuggestionIndex--;
//       }
//       this.updateSearchQueryWithSelectedSuggestion();
//     } else {
//       this.selectedSuggestionIndex = this.syntaxErrorMessage.length - 1;
//       this.updateSearchQueryWithSelectedSuggestion();
//     }
//   }

//   selectNextSuggestion() {
//     if (this.selectedSuggestionIndex < this.syntaxErrorMessage.length - 1) {
//       if (this.selectedSuggestionIndex === this.syntaxErrorMessage.length - 1) {
//         this.selectedSuggestionIndex = 0;
//       } else {
//         this.selectedSuggestionIndex++;
//       }
//       this.updateSearchQueryWithSelectedSuggestion();
//     } else {
//       this.selectedSuggestionIndex = 0;
//       this.updateSearchQueryWithSelectedSuggestion();
//     }
//   }

//   updateSearchQueryWithSelectedSuggestion() {
//     if (
//       this.selectedSuggestionIndex !== -1 &&
//       this.syntaxErrorMessage[this.selectedSuggestionIndex]
//     ) {
//       console.log(this.selectedSuggestionIndex);
//       const selectedSuggestion =
//         this.syntaxErrorMessage[this.selectedSuggestionIndex];
//       const words = this.searchQuery.split(' ');
//       words[words.length - 1] = selectedSuggestion;
//       this.searchQuery = words.join(' ');
//     }
//   }

//   @action
//   selectSuggestion(suggestion) {
//     if (this.searchQuery.endsWith(' ')) {
//       this.searchQuery += suggestion;
//     } else {
//       const words = this.searchQuery.split(' ');
//       words[words.length - 1] = suggestion;
//       this.searchQuery = words.join(' ');
//     }

//     const inputElement = document.getElementById('searchQuery');
  
//   }
// }



