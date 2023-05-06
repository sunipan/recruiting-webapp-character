export const calculateModifier = (attributes, attribute) => {
  return Math.floor((attributes[attribute] - 10) / 2);
};
