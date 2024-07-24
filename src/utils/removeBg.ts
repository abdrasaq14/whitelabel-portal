import axios from "axios";

const removeBackground = async (file:File) => {
  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("size", "auto");

  try {
    const response = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      formData,
      {
        headers: {
          "X-Api-Key": "7ujxBCreXm54eJi1QZrXQD7p",
          "Content-Type": "multipart/form-data"
        },
        responseType: "blob"
      }
    );

    const resultFile = new File([response.data], file.name, {
      type: "image/png"
    });
      return resultFile;
    // return URL.createObjectURL(resultFile);
  } catch (error) {
    console.error("Error removing background:", error);
    return null;
  }
};

export default removeBackground;
