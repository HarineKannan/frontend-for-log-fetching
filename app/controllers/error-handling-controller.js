// import { tracked } from '@glimmer/tracking';

// export default class ErrorHandlingController {
//   @tracked syntaxErrorsCount = 0;
//   @tracked errorMessage = '';
//   @tracked Suggestion = [];
//   @tracked syntaxErrorMsg = '';

//   syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
//     this.syntaxErrorsCount++;
//     const expectedTokens = msg.match(/{(.*?)}/);
//     if (expectedTokens) {
//       this.errorMessage = expectedTokens[1];
//       this.Suggestion = this.errorMessage
//         .split(',')
//         .map((token) => token.replace(/'/g, '').trim());
//     } else {
//       this.errorMessage = '';
//       this.Suggestion = [];
//     }
//   }
// }
