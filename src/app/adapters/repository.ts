import { PrismaClient, Repository } from "@prisma/client";

const prisma = new PrismaClient();

const PAGE_SIZE = 10;

export const list = async (page: number): Promise<Repository[]> => {
  const repositories = await prisma.repository.findMany({
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: {
      stars: "desc",
    },
  });

  return repositories;
};
