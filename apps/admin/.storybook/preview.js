import "react-datepicker/dist/react-datepicker.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'simplebar-react/dist/simplebar.min.css';
import "../src/styles/globals.scss";
import LegacyImage from "next/legacy/image";
import Image from "next/image";

Image.propTypes = {
  unoptimized: null,
};
Image.defaultProps = {
  unoptimized: true,
};

const OriginalNextLegacyImage = LegacyImage.default;
Object.defineProperty(LegacyImage, "default", {
  configurable: true,
  value: (props) =>
    typeof props.src === "string" ? (
      <OriginalNextLegacyImage {...props} unoptimized blurDataURL={props.src} />
    ) : (
      <OriginalNextLegacyImage {...props} unoptimized />
    ),
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "next-admin",
    values: [
      {
        name: "next-admin",
        value: "#ffffff",
      },
    ],
  },
  nextjs: {
    appDirectory: true,
  }
};

const preview = {
  parameters: {
    options: {
      storySort: {
        method: "alphabetical",
        order: [],
      },
    },
  },
};

export default preview;
