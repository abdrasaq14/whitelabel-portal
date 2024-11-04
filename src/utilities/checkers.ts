export const isJsonString = (value: string): boolean => {
    try {
      const parsed = JSON.parse(value);
      return typeof parsed === 'object' && parsed !== null;
    } catch (error) {
      return false;
    }
  }