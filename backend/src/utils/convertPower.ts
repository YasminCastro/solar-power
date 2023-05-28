export function convertToKWh(value: string) {
  if (value.endsWith('MWh')) {
    return parseFloat(value) * 1000; // Convert MWh to kWh
  } else if (value.endsWith('kWh')) {
    return parseFloat(value); // No conversion needed
  } else {
    throw new Error(`Invalid unit in value: ${value}`);
  }
}

export function convertToMWh(value: number) {
  return (value / 1000).toFixed(2);
}
