import CryptoJS from "crypto-js";
export const baseURL = import.meta.env.VITE_APP_API_URL + import.meta.env.VITE_DOCUMENT_URL || "localhost:4000/api/";
export const portalKey = import.meta.env.VITE_PORTAL_KEY;
export const gmsUrl = import.meta.env.VITE_GMS_URL;
// common status code
export const StatusCode = {
  success: 200,
  badRequest: 400,
  unauthorized: 401,
  notacceptable: 406,
  forbidden: 403,
  conflict: 409,
  timeOut: 504,
};

const secretKey = "a2a70b769e6d4d12336723d11273e93b";

export const regexChar = /^[a-zA-Z0-9'\'\-_.,/ ]*$/;
export const regexAlphabet = /^[a-zA-Z'\'\-.,/ ]*$/;
export const regexNumerical = /^[0-9]*$/;

// common loader
export const commonLoader = (className) => {
  if (className == "show") {
    document.body.classList.add("show-loader");
  } else {
    document.body.classList.remove("show-loader");
  }
};

export async function encryptDataWithoutSlash(data) {
  const encData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encData.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Function to encode data
export async function encodeData(data) {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

// Function to decode data
export async function decodeData(encodedData) {
  const bytes = CryptoJS.AES.decrypt(encodedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

//Function to update date format
export const formatDateupdated = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  const day = ("0" + date.getDate()).slice(-2);
  const monthIndex = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const formattedDate = `${day}-${monthIndex}-${year}`;
  return formattedDate;
};