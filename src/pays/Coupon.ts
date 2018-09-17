import * as errors from "../errors";
import * as types from "../types";
import { fetch } from "../utils";
import Base from "./Base";

const SEND_COUPON_BASE = "/mmpaymkttransfers/send_coupon";
const QUERY_COUPON_STOCK_BASE = "/mmpaymkttransfers/query_coupon_stock";
const QUERY_COUPONS_INFO_BASE = "/mmpaymkttransfers/querycouponsinfo";

/**
 * 代金券
 * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_1}
 */
export class Coupon extends Base {
  /**
   * 发放代金券
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_3&index=4}
   */
  public async sendCoupon(options: types.SendCouponOptions) {
    const url = this.completeURL(SEND_COUPON_BASE);
    const extra = await this.createFetchOptions(url, true);
    return fetch<types.SendCouponOptions, types.SendCouponResult>(
      options,
      extra
    ).then(result => {
      if (result.result_code === "FAIL") {
        throw new errors.BusinessError<types.SendCouponReturn>(result);
      }
      return result;
    });
  }

  /**
   * 查询代金券批次
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_4&index=5}
   */
  public async queryCouponStock(options: types.QueryCouponStockOptions) {
    const url = this.completeURL(QUERY_COUPON_STOCK_BASE);
    const extra = await this.createFetchOptions(url);
    return fetch<types.QueryCouponStockOptions, types.QueryCouponStockResult>(
      options,
      extra
    ).then(result => {
      if (result.result_code === "FAIL") {
        throw new errors.BusinessError<types.QueryCouponStockReturn>(result);
      }
      return result;
    });
  }
  /**
   * 查询代金券信息
   * @see {@link https://pay.weixin.qq.com/wiki/doc/api/tools/sp_coupon.php?chapter=12_5&index=6}
   */
  public async queryCouponsInfo(options: types.QueryCouponsInfoOptions) {
    const url = this.completeURL(QUERY_COUPONS_INFO_BASE);
    const extra = await this.createFetchOptions(url);
    return fetch<types.QueryCouponsInfoOptions, types.QueryCouponsInfoResult>(
      options,
      extra
    ).then(result => {
      if (result.result_code === "FAIL") {
        throw new errors.BusinessError<types.QueryCouponsInfoReturn>(result);
      }
      return result;
    });
  }
}