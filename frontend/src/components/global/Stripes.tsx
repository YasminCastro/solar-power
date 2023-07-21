import { styled } from "nativewind";
import StripesSvg from "../../assets/shapes/stripes.svg";

//TODO: arrumar os stripes para dividir components

const Stripes: React.FC = () => {
  const StyledStripes = styled(StripesSvg);
  return (
    <StyledStripes
      className=".."
      style={{
        transform: [{ rotate: "90deg" }],
        position: "absolute",
        top: 470,
      }}
    />
  );
};

export default Stripes;
