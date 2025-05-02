import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Category } from '../features/category/types';
import { Video } from '../features/video/types';

type UseUniqueCategoriesHook = (
  videoState: Video,
  setVideoState: Dispatch<SetStateAction<Video>>
) => [
  uniqueCategories: Category[],
  setUniqueCategories: Dispatch<SetStateAction<Category[]>>,
];

export const useUniqueCategories: UseUniqueCategoriesHook = (
  videoState,
  setVideoState
) => {
  const [uniqueCategories, setUniqueCategories] = useState<Category[]>([]);
  const categoriesToKeepRef = useRef<Category[] | undefined>(undefined);

  const { genres, categories } = videoState;

  const filterById = (
    category: Category | undefined,
    index: number,
    self: (Category | undefined)[]
  ): boolean => index === self.findIndex((c) => c?.id === category?.id);

  useEffect(() => {
    const uniqueCategories = genres
      ?.flatMap(({ categories }) => categories)
      .filter(filterById) as Category[];
    setUniqueCategories(uniqueCategories);
  }, [genres]);

  useEffect(() => {
    categoriesToKeepRef.current = categories?.filter((category) =>
      uniqueCategories?.find((c) => c?.id === category.id)
    );
  }, [uniqueCategories, categories]);

  useEffect(() => {
    setVideoState((prev) => ({
      ...prev,
      categories: categoriesToKeepRef.current,
    }));
  }, [uniqueCategories, setVideoState]);

  return [uniqueCategories, setUniqueCategories];
};
