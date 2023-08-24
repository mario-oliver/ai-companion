import SearchInput from '@/components/SearchInput';
import React from 'react';
import prismadb from '@/lib/prismadb';
import Categories from '@/components/Categories';
import Companions from '@/components/Companions';

interface RootPageProps {
  //every server component has access to teh searchParams
  searchParams: {
    categoryId: string;
    name: string;
  };
}

//This is a server component so it has access to the database via utils
const RootPage = async ({ searchParams }: RootPageProps) => {
  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      //NAME search: bc we added @db.Text,   previewFeatures = ["fullTextSearch", "fullTextIndex"], and   @@fulltext([name]) in our model, we can do the following name search
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    //we want to get the count of all messages produces at server run
    //rather than doing a `count messageCount = await prismadb.message.SOMEQUERYHERE
    //do the following below
    include: {
      _count: {
        select: {
          //this essentially counts all fields in teh Model's ->   messages Message[]

          messages: true,
        },
      },
    },
  });

  const categories = await prismadb.category.findMany();
  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
};

export default RootPage;
