interface Image {
    "#text": string;
    size: string;
  }
  
  interface Artist {
    name: string;
    mbid: string;
    url: string;
  }
  
  interface Streamable {
    "#text": string;
    fulltrack: string;
  }
  
  export interface Track {
    name: string;
    duration: string;
    listeners: string;
    mbid: string;
    url: string;
    streamable: Streamable;
    artist: Artist;
    image: Image[];
  }
  export interface TrackPreview {
    name: string;
    
    artist: Artist;
    image: string;
  }

  
  export interface Tracks {
    track: Track[];
  }
  
  interface Attr {
    country: string;
    page: string;
    perPage: string;
    totalPages: string;
    total: string;
  }
  
 export interface TopTracksResponse {
    tracks: Tracks;
    "@attr": Attr;
  }
  