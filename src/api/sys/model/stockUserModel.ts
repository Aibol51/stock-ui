import { BaseListResp } from '/@/api/model/baseModel';

/**
 *  @description: StockUser info response
 */
export interface StockUserInfo {
  id: string;
  createdAt?: number;
  updatedAt?: number;
  status?: number;
  username?: string;
  nickname?: string;
  password?: string;
  description?: string;
  homePath?: string;
  mobile?: string;
  email?: string;
  avatar?: string;
}

/**
 *  @description: StockUser list response
 */

export type StockUserListResp = BaseListResp<StockUserInfo>;
