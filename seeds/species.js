/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('species').delete()
  await knex('species').insert([
    {specie_id: "clq6q4mgc0000kd69t75qumfa", region: 'Malawi', subgroup: 'Peacock', common_name: 'Dragon Blood', scientific_name: 'Aulonocara', description: 'Very bright colors and long fins', updated_at: knex.fn.now()},
    {specie_id: "clq6q4mgc0000kd69t75qumfb", region: 'Malawi', subgroup: 'Hap', common_name: 'Red Empress', scientific_name: 'Protomelas Similis', description: 'Getting lots of red. These seem health and happy.', updated_at: knex.fn.now()},
    {specie_id: "clq6q4mgc0000kd69t75qumfc", region: 'Malawi', subgroup: 'Hap', common_name: 'Malawi Hawk', scientific_name: 'Aristochromis Crystii', description: 'Starting to color up around the head. Great shape', updated_at: knex.fn.now()},
  ]);
  await knex('skus').delete()
  await knex('skus').insert([
    {sku_id: "clq6q4mgc0000kd69t75qumfd", price: '11.99', size: 'S',  specie_id: "clq6q4mgc0000kd69t75qumfa", updated_at: knex.fn.now(), quantity: 3, sex: "MALE", is_available: false, is_oos: false },
    {sku_id: "clq6q4mgc0000kd69t75qumfg", price: '.99',   size: 'XS', specie_id: "clq6q4mgc0000kd69t75qumfb", updated_at: knex.fn.now(), quantity: 0, sex: "MALE", is_available: true,  is_oos: false },
    {sku_id: "clq6q4mgc0000kd69t75qumfh", price: '5.99',   size: 'M', specie_id: "clq6q4mgc0000kd69t75qumfb", updated_at: knex.fn.now(), quantity: 0, sex: "MALE", is_available: false, is_oos: true },
    {sku_id: "clq6q4mgc0000kd69t75qumfe", price: '3.99',  size: 'XS', specie_id: "clq6q4mgc0000kd69t75qumfc", updated_at: knex.fn.now(), quantity: 2, sex: "FEMALE", is_available: false, is_oos: false },
    {sku_id: "clq6q4mgc0000kd69t75qumff", price: '21.99', size: 'L',  specie_id: "clq6q4mgc0000kd69t75qumfc", updated_at: knex.fn.now(), quantity: 6, sex: "UNSEXED", is_available: false, is_oos: false },
  ]);
};
