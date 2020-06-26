export interface Profile {
  name: string;
  image_url: string;
  subscriber_count: number;
}

export interface Video {
  title: string
  thumbnail_url: string
  id: string
}

export interface VideoUpdate {
  new_title: string
  video_id: string
}
