// import { submit } from 'lib/submit';
// import { FileUploadError, FileUploadSuccess } from 'pages/api/images/images';
// import { catchError, delay, mergeMap, Observable, of, tap } from 'rxjs';
// import { openModal } from 'store/widgets/actions/modals-actions';
// import { closePopup, openPopup } from 'store/widgets/actions/popup-actions';

// export const postPictureAndConfirm = (
//   data: Observable<unknown>,
//   path: string
// ) => {
//   // const { data: sessionData } = useSession();
//   const sendData = submit(data, path);
//   return of(1).pipe(
//     tap(() => {
//       closePopup('success-popup');
//     }),
//     sendData,
//     mergeMap(async (result) => {
//       const success = (await result.response.json()) as
//         | FileUploadSuccess
//         | FileUploadError;

//       openPopup(
//         'success-popup',
//         success.ok
//           ? {
//               type: 'Success',
//               payload: success.message,
//             }
//           : {
//               type: 'Error',
//               payload: success.error,
//             }
//       );
//       return success?.file || undefined;
//     }),
//     delay(10000),
//     tap((file) => {
//       closePopup('success-popup');
//       if (file)
//         openPopup('success-popup', {
//           type: 'Error',
//           payload: (
//             <div>
//               Doriti sa schimbati numele fisierului
//               <button
//                 onClick={() => {
//                   openModal('picture-change-name-modal', {
//                     oldFilename: file,
//                     name: path,
//                   });
//                 }}
//               >
//                 DA
//               </button>
//               <button> NU </button>
//             </div>
//           ),
//         });
//     }),
//     catchError((err) => of(err))
//   );
// };
