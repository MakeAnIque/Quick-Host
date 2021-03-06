/********************************
 * for making not distract value of data
 * flow with data consistency make flow control
 */

import { Users } from '@quickhost/server';

// export class PipelineDataflowControl {
//   constructor(
//     public loginOriginalData?,
//     public loginQueryData?,
//     public loginUserData?: Users | null,
//     public loginJwtToken?: string,
//     public loginOutputModel?
//   ) {}
// }
export interface PipelineDataflowControl {
  loginOriginalData?: any;
  loginQueryData?: any;
  loginUserData?: any;
  loginJwtToken?: any;
  loginOutputModel?: any;
}

export const pipelineDataflowControl = {
  loginOriginalData: null,
  loginQueryData: null,
  loginUserData: null,
  loginJwtToken: null,
  loginOutputModel: null,
};
