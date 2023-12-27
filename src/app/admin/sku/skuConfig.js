import { enumArr, enumMap } from '@/app/config';

const { sexList, sizeList } = enumArr;
const { sexMap, sizeMap } = enumMap;
export const fields = [
  {
    component: 'Select',
    label: 'Size',
    name: 'size',
    list: sizeList,
    map: sizeMap,
  },
  {
    component: 'Select',
    label: 'Sex',
    name: 'sex',
    list: sexList,
    map: sexMap,
  },
  {
    component: 'Input',
    label: 'Price (ex. 99.99)',
    type: 'text',
    name: 'price',
  },
  { component: 'Input', label: 'Quantity', type: 'number', name: 'quantity' },
];