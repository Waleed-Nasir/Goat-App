import Toast from "react-native-toast-message";
export const showResponseError = (error, api) => {
  console.log("api name:", error, api);
  var authErrorRegex = /4[0-9][1-9]/g;
  var serverErrorRegex = /5[0-9][0-9]/g;
  console.log("error", error);
  if (error.message === "Network Error") {
    return "Please check your network";
  } else {
    if (error.response) {
      let errorCode = JSON.stringify(error.response.status);
      console.log("errorCode:", errorCode);
      console.log("errorRESPONSE:", error.response.data);

      if (error.response.data.status === false && !error.response.data.errors) {
        return error.response.data.message;
      } else if (errorCode === "400") {
        let response = error.response.data;
        var error = "";

        if (response) {
          error = response.message;
        } else {
          var temp = response.data[Object.keys(response.data)[0]];
          error = JSON.stringify(temp).replace("[", "").replace("]", "");
        }
        return error;
      } else if (errorCode === "401") {
        let response = error.response.data;
        var error = "";
        var temp = response.errors[Object.keys(response.errors)[0]];
        error = JSON.stringify(temp).replace("[", "").replace("]", "");
        return error;
      } else if (errorCode === "405") {
        return "Please check API method";
      } else if (errorCode === "420") {
        return `420:${error.response.data.message.toString()}`;
      } else if (errorCode === "404") {
        return "Not Found";
      } else if (authErrorRegex.test(errorCode)) {
        return error.response.data.message.toString();
      } else if (errorCode === "500") {
        return error.response.data.message.toString();
      } else if (serverErrorRegex.test(errorCode)) {
        return "Something went wrong with the server";
      }
    } else {
      return error;
    }
  }
};

const isEmptyOrSpaces = (str) => {
  let _str = str.toString();
  return _str === null || _str.match(/^ *$/) !== null;
};
const validateEmail = (str) => {
  var pattern =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return pattern.test(str);
};
export const Validator = (OBJ) => {
  let ConvertArray = Object.keys(OBJ);
  console.log(OBJ, "ConvertArray");
  let RETURN = true;
  if (ConvertArray.length) {
    for (var i = 0; i < ConvertArray.length; i++) {
      const str = ConvertArray[i];
      const str2 = str.charAt(0).toUpperCase() + str.slice(1);

      if (str2 === "Email") {
        if (isEmptyOrSpaces(OBJ[ConvertArray[i]])) {
          MessageShow("error", "Email Error", "Please Enter a Email");
          RETURN = false;
          break;
        } else if (!validateEmail(OBJ[ConvertArray[i]])) {
          MessageShow("error", "Email Error", "Email is not valid");
          RETURN = false;
          break;
        }
      } else if (isEmptyOrSpaces(OBJ[ConvertArray[i]])) {
        MessageShow("error", `${str2} Error`, `Please Enter a ${str2}`);
        RETURN = false;
        break;
      }
    }
    return RETURN;
  } else {
    MessageShow("error", "No Validation Error");
  }
};

export const MessageShow = (type = "success", title, message) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
  });
};

export const functionFinder = (array = [], product) => {
  console.log(array, "2", product?._id);
  let newArray = new Array(...array);
  if (
    newArray.length &&
    newArray?.map((item) => item?._id)?.includes(product?._id)
  ) {
    console.log(newArray, "4");
    return array.filter((item) => item?._id !== product?._id);
  } else {
    newArray.push(product);
    console.log(newArray, "3");
    return newArray;
  }
};

export const functionAdder = (array = {}, product) => {
  let newArray = { ...array };
  newArray[product?._id] = {
    ...product,
    Qty:
      (newArray[product?._id] && newArray[product?._id]["Qty"] + 1) || 1,
  };
  return newArray;
};
