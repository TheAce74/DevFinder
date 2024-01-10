//types and interfaces
export interface DevFinder {
  theme: "light" | "dark";
  username: string;
}

const parse = (item: string | null): DevFinder => {
  return item === null
    ? {
        theme: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
        username: "TheAce74",
      }
    : JSON.parse(item);
};

const stringify = (item: DevFinder) => {
  return JSON.stringify(item);
};

function getItem(key: string) {
  return parse(localStorage.getItem(key));
}

function setItem(key: string, data: DevFinder) {
  localStorage.setItem(key, stringify(data));
}

function removeItem(key: string) {
  localStorage.removeItem(key);
}

function clear() {
  localStorage.clear();
}

function length() {
  return localStorage.length;
}

export { getItem, setItem, removeItem, clear, length };
