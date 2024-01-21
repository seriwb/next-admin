import { useState } from 'react';
import { Pagination } from './index';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as Meta<typeof Pagination>;


export const Sample1: StoryFn<typeof Pagination> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onPageing = (page: number) => { return; };
  return (
    <div style={{ width: '230px' }}>
      <Pagination
        page={0}
        totalNumber={4}
        perPage={4}
        onPaging={onPageing}
      />
    </div>
  )
};
Sample1.storyName = 'single page';

export const Sample2: StoryFn<typeof Pagination> = () => {
  const [page, setPage] = useState(0);
  const onPageing = (page: number) => { setPage(page) };
  return (
    <div style={{ width: '230px' }}>
      <Pagination
        page={page}
        totalNumber={28}
        perPage={4}
        onPaging={onPageing}
      />
    </div>
  )
};
Sample2.storyName = 'page top';

export const Sample3: StoryFn<typeof Pagination> = () => {
  const [page, setPage] = useState(6);
  const onPageing = (page: number) => { setPage(page) };
  return (
    <div style={{ width: '230px' }}>
      <Pagination
        page={page}
        totalNumber={28}
        perPage={4}
        onPaging={onPageing}
      />
    </div>
  )
};
Sample3.storyName = 'page end';
