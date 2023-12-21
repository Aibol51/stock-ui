import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseUUIDsReq, BaseUUIDReq } from '/@/api/model/baseModel';
import { StockUserInfo, StockUserListResp } from './model/stockUserModel';

enum Api {
  CreateStockUser = '/sys-api/stock_user/create',
  UpdateStockUser = '/sys-api/stock_user/update',
  GetStockUserList = '/sys-api/stock_user/list',
  DeleteStockUser = '/sys-api/stock_user/delete',
  GetStockUserById = '/sys-api/stock_user',
}

/**
 * @description: Get stock user list
 */

export const getStockUserList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<StockUserListResp>>(
    { url: Api.GetStockUserList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new stock user
 */
export const createStockUser = (params: StockUserInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateStockUser, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the stock user
 */
export const updateStockUser = (params: StockUserInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateStockUser, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete stock users
 */
export const deleteStockUser = (params: BaseUUIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteStockUser, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get stock user By ID
 */
export const getStockUserById = (params: BaseUUIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<StockUserInfo>>(
    { url: Api.GetStockUserById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
