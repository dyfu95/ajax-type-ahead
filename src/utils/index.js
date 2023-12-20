import axios from "axios";

/**
 * @typedef {import('axios').Method} Method
 */

/**
 *
 * @param {Method} method
 * @param {number} timeout
 * @returns
 */
const createAxiosInstance = (method = "get", timeout = 5000) => {
  return axios.create({
    timeout: timeout,
    method: method,
  });
};
/**
 *
 * @param {string} requestUrl
 * @param {Object} [axiosConfig]
 * @param {Method} [axiosConfig.method]
 * @param {number} [axiosConfig.timeout]
 */
const createAxiosRequest = (
  requestUrl,
  { method = "get", timeout = 5000 } = {}
) => {
  const axiosInstance = createAxiosInstance(method, timeout);

  return () => axiosInstance(requestUrl);
};
/**
 *
 * @param {number} x
 * @returns
 */
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export { createAxiosRequest, numberWithCommas };
