/********************************
 * for making not distract value of data
 * flow with data consistency make flow control
 */

// export class PipelineDataflowControl {
//   constructor(
//     public signupOriginalData?,
//     public signupQueryData?,
//     public signupUserData?,
//     public signupUserObjectToSave?,
//     public signupUserAccountCreated?,
//     public loginOriginalData?,
//     public loginQueryData?,
//     public loginUserData?: Users | null,
//     public loginJwtToken?: string,
//     public loginOutputModel?
//   ) {}
// }
export interface PipelineDataflowControl {
  signupOriginalData?: any;
  signupQueryData?: any;
  signupUserData?: any;
  signupUserObjectToSave?: any;
  signupUserAccountCreated?: any;
  loginOriginalData?: any;
  loginQueryData?: any;
  loginUserData?: any;
  loginJwtToken?: any;
  loginOutputModel?: any;
}

export const pipelineDataflowControl = {
  signupOriginalData: null,
  signupQueryData: null,
  signupUserData: null,
  signupUserObjectToSave: null,
  signupUserAccountCreated: null,
  loginOriginalData: null,
  loginQueryData: null,
  loginUserData: null,
  loginJwtToken: null,
  loginOutputModel: null,
};
