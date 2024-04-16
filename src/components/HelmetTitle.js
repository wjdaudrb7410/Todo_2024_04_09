import { Helmet } from "react-helmet-async";

export const HelmetTitle = ({ title }) => {
  return (
    <Helmet>
      <title>WTD | {title}</title>
    </Helmet>
  );
};
