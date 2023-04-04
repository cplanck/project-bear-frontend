import photos from "./Photos";

export const slides = photos.map(({ src, key, width, height, images }) => ({
  src,
  key,
  width,
  height,
  srcSet: images?.map((image) => ({
    src: image.src,
    width: image.width,
    height: image.height
  }))
}));

export const advancedSlides = [
  { ...slides[0], title: "Puppy in sunglasses", description: "Mollie Sivaram" },
  {
    ...slides[1],
    title: "Miami Beach",
    description:
      "Clark Van Der Beken\n\nSouth Beach, Miami Beach, Florida, United States"
  },
  {
    ...slides[2],
    title: "Flamingo",
    description: "Vicko Mozara\n\nVeliki zali, Dubravica, Croatia"
  },
  {
    ...slides[3],
    title: "Starfish on a sand beach",
    description: "Pedro Lastra\n\nKey West, Florida, United States"
  },
  {
    ...slides[4],
    title:
      "The last night of a two week stay on the North Shore of Oahu, Hawaii",
    description: "Sean Oulashin\n\nNorth Shore, Waialua, Hawaii, United States"
  },
  {
    ...slides[5],
    title: "Sunset on Kauai",
    description: "Cristofer Maximilian\n\nKauai, Hawaii, United States"
  },
  {
    ...slides[6],
    title: "RayBan sunglasses",
    description: "Ethan Robertson\n\nSanta Monica, California, United States"
  },
  {
    ...slides[7],
    title: "Find the time",
    description: "Alex Perez\n\nNaples, Florida, United States"
  }
];

export default slides;


//   {
//     type: "video",
//     title: "Big Buck Bunny",
//     description:
//       "The Peach Open Movie Project\n\nBlender Institute, Netherlands",
//     width: 1280,
//     height: 720,
//     poster:
//       "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
//     sources: [
//       {
//         src:
//           "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//         type: "video/mp4"
//       }
//     ]
//   },