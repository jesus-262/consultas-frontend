import axios from "axios";




export const downloadImage = config =>
  axios.post(
    "https://fetch-progress.anthum.com/30kbps/images/sunrise-baseline.jpg",
    config
  );