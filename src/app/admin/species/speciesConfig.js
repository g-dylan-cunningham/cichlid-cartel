import { enumArr, enumMap } from '@/app/config';

const { categoryList } = enumArr;
const { categoryMap } = enumMap;

export const fields = [
  {
    component: 'Input',
    label: 'Common Name',
    type: 'text',
    name: 'common_name',
  },
  {
    component: 'Input',
    label: 'Scientific Name',
    type: 'text',
    name: 'scientific_name',
  },
  {
    component: 'Select',
    label: 'Category',
    name: 'category',
    list: categoryList,
    map: categoryMap,
  },
  {
    component: 'TextArea',
    label: 'Description',
    type: 'textarea',
    cols: 50,
    rows: 7,
    name: 'description',
  },
];