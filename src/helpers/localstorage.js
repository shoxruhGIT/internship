export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, data);
  } catch (error) {
    console.log("Error in save item");
  }
};

export const getItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.log("Error in get item");
  }
};

export const removeItem = (key) => {
  try {
    return localStorage.removeItem(key);
  } catch (error) {
    console.log("Error in remove item");
  }
};
