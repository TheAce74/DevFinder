import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: import.meta.env.VITE_TOKEN,
});

async function getUser(username: string) {
  const response = await octokit.request("GET /users/{username}", {
    username: username,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return response;
}

export { getUser };
