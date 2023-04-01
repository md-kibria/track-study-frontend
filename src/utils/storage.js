class Storage {
    setItem(key, value) {
        localStorage.setItem(key, value);
    }

    getItem(key) {
        return localStorage.getItem(key);
    }

    removeItem(key) {
        localStorage.removeItem(key);
    }
}

const storage = new Storage();

export const setItem = storage.setItem
export const getItem = storage.getItem
export const removeItem = storage.removeItem

export default storage
