export function convertToKWh(value: string) {
  if (value.endsWith('MWh')) {
    return parseFloat(value) * 1000; // Convert MWh to kWh
  } else if (value.endsWith('kWh')) {
    return parseFloat(value); // No conversion needed
  }
}

export function convertToMWh(value: string) {
  if (value.endsWith('kWh')) {
    return parseFloat(value) / 1000; // Convert kWh to MWh
  } else if (value.endsWith('MWh')) {
    return parseFloat(value); // No conversion needed
  }
}

export function autoKWhConvert(value: number) {
  if (value >= 1000) {
    return (value / 1000).toFixed(2) + 'MWh'; // Convert kWh to MWh and append 'MWh'
  } else {
    return value.toFixed(2) + 'kWh'; // No conversion needed, append 'kWh'
  }
}
