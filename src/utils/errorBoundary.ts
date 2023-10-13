export default async function errorBoundary(
  targetFunction: (...args: any) => any
) {
  try {
    return await targetFunction();
  } catch (err) {
    console.error(err);
  }
}
