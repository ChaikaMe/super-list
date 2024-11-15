interface checkBlancFieldsArgument {
  nickname: string;
  real_name: string;
  catch_phrase: string;
  origin_description: string;
  superpowers: string[];
}

export const checkBlancFields = (
  heroTextData: checkBlancFieldsArgument
) => {
  const valuesArray = Object.values(heroTextData);

  const tempData = valuesArray.filter((item) => !Array.isArray(item));
  const tempDataArray = valuesArray.find((item) =>
    Array.isArray(item)
  );

  return (
    tempData.some(
      (item) => typeof item === "string" && item.trim() === ""
    ) ||
    (tempDataArray &&
      tempDataArray.some(
        (item) => typeof item === "string" && item.trim() === ""
      ))
  );
};
