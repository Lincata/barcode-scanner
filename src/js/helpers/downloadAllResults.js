import { toastify } from './toastify';

/**
 * @param {string[]} results - the list of values to download
 * @returns void
 */
export function downloadAllResults(results) {
  if (!results.length) {
    toastify('No barcodes have been scanned', { variant: 'warning' });
    return;
  }

  const values = results.map((macAdd, i) => {
    return {
      name: `Device ${i + 1}`,
      visibleName: null,
      hardwareId: macAdd,
      phoneExtension: null,
      sipRegistrationUser: '',
      sipRegistrationPassword: '',
      uid: i + 1,
      master__uid: null,
      location__name: 'Default'
    };
  });
  const a = document.createElement('a');
  const file = new Blob([JSON.stringify(values, null, 2)], { type: 'application/json' });
  a.href = URL.createObjectURL(file);
  a.download = 'devices.json';
  a.click();
  URL.revokeObjectURL(a.href);
}
