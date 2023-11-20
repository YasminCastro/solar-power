export default function calculateEnergySavings(energyInKWh: number) {
  const energyValue = 0.67;

  const energySaved = energyInKWh * energyValue;

  return Math.round(energySaved);
}
