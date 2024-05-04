// import { action } from '@ember/object';
// import { tracked } from '@glimmer/tracking';
// import Controller from '@ember/controller';
// import ApplicationController from './application';
// import { inject as controller } from '@ember/controller';



// export default class FetchingLogsController extends Controller {
//     @controller('application') application; 
    
//     @tracked logtype = null;
   
//     @action
//     setLogType(logtype) {
//       this.logtype = logtype;
//     }

//     @action
//     async fetchLogs() {
//       const payload = this.generatePayload();
//       await this.fetchData(
//         'http://localhost:8080/LogFetcher/logFetcher',
//         payload,
//       );
//     }

//     generatePayload() {
//         return {
//           logtype: this.logtype,
//         };
//       }
    
//     async fetchData(url, payload) {
//         try {
//             this.application.isLoading = true;
//             const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload),
//           });
    
//           if (response.ok) {
//             this.application.isLoading = false;
//             this.application.isSuccess = false;
    
//             setTimeout(() => {
//                 this.application.isSuccess = false;
//             }, 2000);
    
//             console.log('Operation successful');
//           } else {
//             throw new Error('Operation failed');
//           }
//         } catch (error) {
//           console.error('Error:', error.message);
//         }
//       }

// };
