export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export const checkStorageEmpty = () => { 
  // if 
}

export const storeTodoLocal = (key, value) => { 
  localStorage.setItem(JSON.stringify(key), JSON.stringify(value));
}

// TODO: fix the keys 
export const deleteTodoLocal = (key) => { 
  localStorage.removeItem(JSON.stringify(key));
}

