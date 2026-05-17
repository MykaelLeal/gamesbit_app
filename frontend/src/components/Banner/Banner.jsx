import bannerImg from "../../assets/banner.png";

import "../../styles/banner.css";

export const Banner = () => {
  return (
    <section className="banner">
      <img src={bannerImg} alt="GamesBit Banner" />
    </section>
  );
};