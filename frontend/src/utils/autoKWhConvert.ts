interface IReturn {
  suffix: string;
  value: number;
}

export function autoKWhConvert(value: number): IReturn {
  if (value >= 1000) {
    return { suffix: "MWh", value: parseFloat((value / 1000).toFixed(2)) };
  }

  return { suffix: "kWh", value: value };
}

export default autoKWhConvert;
