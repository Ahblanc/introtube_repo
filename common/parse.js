export async function youtuberDataParse(data) {
  if (data) {
    const { title, description, publishedAt, customUrl, thumbnails } =
      data.items[0].snippet;
    const { viewCount, subscriberCount, videoCount } = data.items[0].statistics;
    const banner = data.items[0].brandingSettings.image.bannerExternalUrl;
    const result = {
      yId: data.items[0].id,
      title,
      description,
      publishedAt: toStringByFormatting(publishedAt),
      customUrl,
      thumbnails: thumbnails.medium.url,
      viewCount: Number(viewCount).toLocaleString("ko-KR"),
      subscriberCount: Number(subscriberCount).toLocaleString("ko-KR"),
      videoCount: Number(videoCount).toLocaleString("ko-KR"),
      banner,
    };
    return result;
  } else return "";
}

export async function channelDataParse(data) {
  if (data) {
    const id = data.items[0].snippet.channelId;
    return id;
  } else return "";
}

function leftPad(value) {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
}

function toStringByFormatting(source, delimiter = "-") {
  const date = new Date(source);
  const year = date.getFullYear();
  const month = leftPad(date.getMonth() + 1);
  const day = leftPad(date.getDate());

  return [year, month, day].join(delimiter);
}
