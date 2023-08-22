import SearchInput from '@/components/SearchInput';
import React from 'react';
import prismadb from '@/lib/prismadb';
import Categories from '@/components/Categories';

//This is a server component so it has access to the database via utils
const RootPage = async () => {
  const categories = await prismadb.category.findMany();
  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
    </div>
  );
};

export default RootPage;
