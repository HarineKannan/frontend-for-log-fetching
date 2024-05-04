
// import { action } from '@ember/object';
// import { tracked } from '@glimmer/tracking';

// export default class LastSyncController {
//     @action
//   async SyncTime(url, payload) {
//     try {
//       const searchUrl = new URL(url);
//       const jsonPayload = JSON.stringify(payload);
//       const response = await fetch(searchUrl, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: jsonPayload,
//       });
//       if (response.ok) {
//         const data = await response.json();
//         this.applicationLastTime = data.applicationSyncTime;
//         this.systemLastTime = data.SystemSyncTime;
//         console.log('Updated applicationLastTime:', this.applicationLastTime);
//         console.log('Updated System time:', this.systemLastTime);
//       } else {
//         console.error('Failed to fetch data from the backend');
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   }

//   @action
//   async getTime() {
//     const payload = {};
//     await this.SyncTime('http://localhost:8080/LogFetcher/logFetcher', payload);
//   }
  
// }





