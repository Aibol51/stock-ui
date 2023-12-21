import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseUUIDsReq, BaseUUIDReq } from '/@/api/model/baseModel';
import { StockInfo, StockListResp } from './model/stockModel';

enum Api {
  CreateStock = '/sys-api/stock/create',
  UpdateStock = '/sys-api/stock/update',
  GetStockList = '/sys-api/stock/list',
  DeleteStock = '/sys-api/stock/delete',
  GetStockById = '/sys-api/stock',
}

/**
 * @description: Get stock list
 */

export const getStockList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<StockListResp>>(
    { url: Api.GetStockList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new stock
 */
export const createStock = (params: StockInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateStock, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the stock
 */
export const updateStock = (params: StockInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateStock, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete stocks
 */
export const deleteStock = (params: BaseUUIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteStock, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get stock By ID
 */
export const getStockById = (params: BaseUUIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<StockInfo>>(
    { url: Api.GetStockById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
