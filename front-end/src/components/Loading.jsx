import ReactLoading from "react-loading";

const Loading = ({ type, color, height, width }) => (
  <ReactLoading
    type={type}
    color={color}
    height={height || "26%"}
    width={width || "26%"}
  />
);

export default Loading;
