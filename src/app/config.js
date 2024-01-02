const enumArr = {
  sizeList: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'VARIETY'],
  sexList: ['MALE', 'FEMALE', 'UNSEXED', 'BREEDINGGROUP'],
  categoryList: ["PEACOCK", "HAP", "TANGANYIKA", "OTHER"]
};

const enumMap = {
  sizeMap: {
    XXS: 'up to 1"',
    XS: '1.25-2"',
    S: '2-2.5"',
    M: '2.75-3.25"',
    L: '3.5-4.5"',
    XL: '4.75-5.5"',
    XXL: '5.5-7"',
    XXXL: '7.5"+',
    VARIETY: 'mixed',
  },
  sexMap: {
    MALE: 'male',
    FEMALE: 'female',
    UNSEXED: 'unsexed',
    BREEDINGGROUP: 'breeding group',
  },
  categoryMap: {
    PEACOCK: 'Peacock',
    HAP: 'Hap',
    TANGANYIKA: 'Tanganyikan',
    OTHER: 'other'
  }
};

export { enumArr, enumMap };
