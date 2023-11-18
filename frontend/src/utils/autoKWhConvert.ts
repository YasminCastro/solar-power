export function autoKWhConvert(value: number) {
  if (value >= 1000) {
    return { suffix: "MWh", value: (value / 1000).toFixed(2) };
  }

  return { suffix: "kWh", value: value };
}

export default autoKWhConvert;
