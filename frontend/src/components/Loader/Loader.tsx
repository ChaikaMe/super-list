import { Grid } from "react-loader-spinner";

export default function Loader() {
  return (
    <Grid
      visible={true}
      height="80"
      width="80"
      color="var(--active)"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{
        width: "100%",
        height: "100%",
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}
