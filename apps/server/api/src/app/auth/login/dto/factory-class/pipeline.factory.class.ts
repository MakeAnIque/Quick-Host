/********************************
 * for making not distract value of data
 * flow with data consistency make flow control
 */

import { Users } from '@quickhost/server';

export interface PipelineDataflowControlInterface {
  readonly originalData;
  queryData?;
  userData?: Users | null;
}

export class PipelineDataflowControl
  implements PipelineDataflowControlInterface
{
  constructor(
    public originalData,
    public queryData?,
    public userData?: Users | null,
    public jwtToken?: string,
    public outputModel?
  ) {}
}

export type Pbfc = PipelineDataflowControlInterface;
