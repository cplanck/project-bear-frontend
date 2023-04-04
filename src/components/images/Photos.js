const breakpoints = [4320, 2160, 1080, 640, 384, 256, 128];

const unsplashLink = (id, width, height) =>
`https://source.unsplash.com/${id}/${width}x${height}`;

const unsplashPhotos = [
{
    id: "ts1zXzsD7xc",
    width: 1080,
    height: 1620
},
{
    id: "F_r83HEzsXI",
    width: 1080,
    height: 1426
},
{
    id: "m82uh_vamhg",
    width: 1080,
    height: 1440
},
{
    id: "6mze64HRU2Q",
    width: 1080,
    height: 1620
},
{
    id: "7ENqG6Gmch0",
    width: 1080,
    height: 718
},
{
    id: "KMn4VEeEPR8",
    width: 1080,
    height: 718
},
{
    id: "uQDRDqpYJHI",
    width: 1080,
    height: 1620
},
{
    id: "AD6rn3vqG7o",
    width: 1080,
    height: 1620
},
];

const photos = unsplashPhotos.map((photo, index) => {
    const width = photo.width * 4;
    const height = photo.height * 4;
    return {
        src: unsplashLink(photo.id, width, height),
        key: `${index}`,
        width,
        height,
        images: breakpoints.map((breakpoint) => {
        const breakpointHeight = Math.round((height / width) * breakpoint);
        return {
            src: unsplashLink(photo.id, breakpoint, breakpointHeight),
            width: breakpoint,
            height: breakpointHeight
        };
        })
    };
});

export default photos;
