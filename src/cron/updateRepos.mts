import { PrismaClient } from "@prisma/client";

const API_KEY = process.env.GITHUB_API_KEY;

const prisma = new PrismaClient();

const topics = [
  "javascript",
  "typescript",
  "frontend",
  "react",
  "vue",
  "angular",
  "design-systems",
];

type Repository = {
  id: number;
  name: string;
  html_url: string;
  description: string;
  owner: {
    avatar_url: string;
  };
  created_at: Date;
  updated_at: Date;
  stargazers_count: number;
  forks_count: number;
};

type RepoResponse = {
  total_count: number;
  items: Repository[];
};

const getRepos = async (topic: string): Promise<Repository[]> => {
  const result = await fetch(
    `https://api.github.com/search/repositories?per_page=100&q=topic:${topic}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/vnd.github.mercy-preview+json",
      },
    }
  );
  console.log(result);
  const data = (await result.json()) as RepoResponse;

  return data.items;
};

const insertRepo = async (repo: Repository) => {
  try {
    await prisma.repository.create({
      data: {
        id: repo.id,
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        avatar: repo.owner.avatar_url,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      },
    });
    console.log(repo.name);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    console.log(e);
    console.log("duplicate repo");
  }
};

const updateRepos = async () => {
  topics.forEach(async (topic) => {
    const repos = await getRepos(topic);
    repos.forEach((repo) => {
      insertRepo(repo);
    });
  });
};

const main = () => {
  updateRepos();
};

main();
