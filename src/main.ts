import "./style.css";
import { getErrorMessage } from "./utils/errorMessage";
import { getUser } from "./utils/fetch";
import Swal from "sweetalert2";
import { DevFinder, getItem, setItem } from "./utils/localStorage";
import { format } from "date-fns";

// types and interfaces
type APIData = {
  avatar_url: string;
  name: string | null;
  login: string;
  created_at: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  html_url: string;
  twitter_username?: string | null | undefined;
  company: string | null;
};

//DOM elements
const root = document.documentElement;
const theme = document.querySelector("#theme");
const search = document.forms[0];
const loader = document.querySelector(".fa-spin");
const searchSpan = document.querySelector("#search-span");
const searchBtn = document.querySelector("#search-btn");
const avatar = document.querySelector('img[alt="github avatar"]');
const fullName = document.querySelector('h2[aria-label="full name"]');
const nickName = document.querySelector('p[aria-label="nickname"] span');
const dateJoined = document.querySelector("#date span");
const userBio = document.querySelector('p[aria-label="bio"]');
const stats = document.querySelectorAll(
  'ul[aria-label="stats"] span:first-child'
);
const otherInfo = document.querySelectorAll('ul[aria-label="other info"] span');

//theme
function updateTheme() {
  if (getItem("devFinder").theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

document.addEventListener("DOMContentLoaded", updateTheme);
document.addEventListener("DOMContentLoaded", () =>
  getDetails(getItem("devFinder"))
);

function switchTheme() {
  const devFinder = getItem("devFinder");
  if (devFinder.theme === "light") {
    setItem("devFinder", {
      ...devFinder,
      theme: "dark",
    });
  } else {
    setItem("devFinder", {
      ...devFinder,
      theme: "light",
    });
  }
  updateTheme();
}

theme?.addEventListener("click", switchTheme);

//search user
async function getDetails(e: SubmitEvent | DevFinder) {
  let devFinder: DevFinder;

  if (e instanceof SubmitEvent) {
    e.preventDefault();

    const input = search.querySelector("input");
    if (input?.value === "") return;

    searchSpan?.classList.add("hidden");
    loader?.classList.remove("hidden");
    searchBtn?.setAttribute("disabled", "true");

    const dev = getItem("devFinder");
    devFinder = {
      ...dev,
      username: String(input?.value),
    };
    setItem("devFinder", devFinder);
    if (input) input.value = "";
  } else {
    devFinder = e;
  }

  try {
    const { data } = await getUser(devFinder.username);
    updateUI(data);
  } catch (error) {
    const message = getErrorMessage(error);
    Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonText: "Try again",
      confirmButtonColor: "hsl(347, 91%, 35%)",
    });
  }

  loader?.classList.add("hidden");
  searchSpan?.classList.remove("hidden");
  searchBtn?.removeAttribute("disabled");
}

search?.addEventListener("submit", getDetails);

function updateUI({
  avatar_url,
  name,
  login,
  created_at,
  bio,
  public_repos,
  followers,
  following,
  location,
  html_url,
  twitter_username,
  company,
}: APIData) {
  avatar?.setAttribute("src", avatar_url);
  if (name && fullName) {
    fullName.textContent = name;
  }
  if (nickName) {
    nickName.textContent = login;
  }
  if (dateJoined) {
    const date = format(new Date(created_at), "PP");
    dateJoined.textContent = date;
  }
  if (userBio) {
    if (bio) {
      userBio.textContent = bio;
    } else {
      userBio.textContent = "No Bio Available";
    }
  }
  stats[0].textContent = String(public_repos);
  stats[1].textContent = String(followers);
  stats[2].textContent = String(following);
  const locationLI = otherInfo[0].closest("li");
  const twitterLI = otherInfo[2].closest("li");
  const companyLI = otherInfo[3].closest("li");
  if (location) {
    otherInfo[0].textContent = location;
    if (locationLI) {
      locationLI.classList.remove("opacity-50");
    }
  } else {
    otherInfo[0].textContent = "Not Available";
    if (locationLI) {
      locationLI.classList.add("opacity-50");
    }
  }
  otherInfo[1].textContent = html_url;
  if (twitter_username) {
    otherInfo[2].textContent = twitter_username;
    if (twitterLI) {
      twitterLI.classList.remove("opacity-50");
    }
  } else {
    otherInfo[2].textContent = "Not Available";
    if (twitterLI) {
      twitterLI.classList.add("opacity-50");
    }
  }
  if (company) {
    otherInfo[3].textContent = company;
    if (companyLI) {
      companyLI.classList.remove("opacity-50");
    }
  } else {
    otherInfo[3].textContent = "Not Available";
    if (companyLI) {
      companyLI.classList.add("opacity-50");
    }
  }
}
