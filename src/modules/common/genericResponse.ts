export const respond = (path?: string, errMsg?: string) => ({
  error: errMsg && [{ path, message: errMsg }],
  success: !Boolean(errMsg)
});
