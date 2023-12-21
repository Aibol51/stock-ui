import { BaseListResp } from '/@/api/model/baseModel';

/**
 *  @description: Stock info response
 */
export interface StockInfo {
  id: string;
  createdAt?: number;
  updatedAt?: number;
  status?: number;
  stockName?: string;
  stockCode?: string;
  isRecommend?: boolean;
  stockRise?: string;
  stockFall?: string;
  addTime?: string;
  details?: string;
  stockTags?: string;
}

/**
 *  @description: Stock list response
 */

export type StockListResp = BaseListResp<StockInfo>;
