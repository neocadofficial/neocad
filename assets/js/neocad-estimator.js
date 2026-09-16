/* Separate IDs keep the repository's existing main.js estimator inactive. */
(() => {
  'use strict';
  const form = document.getElementById('quote-estimator');
  if (!form) return;
  const materials = [
    ['Bambu PLA Basic / Matte', 0.02, 0], ['Bambu PETG / PETG HF', 0.02, 0],
    ['Overture ASA', 0.02, 1], ['Bambu ABS', 0.02, 1],
    ['SUNLU TPU 95A', 0.04, 2], ['Elegoo TPU 72D', 0.03, 2],
    ['Tinmorry TPU 95A', 0.03, 2], ['Polymaker PET-CF17', 0.05, 3],
    ['iSANMATE ASA-GF', 0.03, 3], ['Siraya Tech PPA-CF', 0.06, 4]
  ];
  const machines = [['PLA / PETG', 1.75], ['ABS / ASA', 2.50], ['TPU', 2.25], ['Composite (CF / GF)', 3], ['PPA-CF', 3.50]];
  const services = [['None', 0], ['Setup / slicing', 5], ['3D scanning', 25], ['Scan cleanup', 10], ['CAD / reverse engineering', 25], ['Finishing / assembly', 10]];
  const field = name => document.getElementById('quote-' + name);
  for (const [name, rows] of [['material', materials], ['machine', machines], ['service', services]]) {
    rows.forEach((row, i) => field(name).add(new Option(row[0], String(i))));
  }
  const number = name => Math.max(0, Number(field(name).value) || 0);
  const money = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
  function update() {
    const raw = materials[number('material')][1] * number('grams');
    const markup = raw * 0.05;
    const machine = machines[number('machine')][1] * number('hours');
    const contingency = (raw + markup + machine) * 0.05;
    const labor = services[number('service')][1] * number('service-hours');
    const subtotal = raw + markup + machine + contingency + labor;
    const minimum = Math.max(0, 10 - subtotal);
    const shipping = number('shipping');
    const values = {materials: raw, markup, machine, contingency, labor, minimum, shipping, total: subtotal + minimum + shipping};
    Object.entries(values).forEach(([name, value]) => {
      document.getElementById('quote-out-' + name).textContent = money.format(value);
    });
  }
  field('material').addEventListener('change', () => {
    field('machine').value = String(materials[number('material')][2]);
    update();
  });
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', event => event.preventDefault());
  update();
})();
