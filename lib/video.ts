// YTDlp is a Node.js specific library that can't run in the browser
// Trying to use it in code that runs on both Node.js and the browser will result in a module not found error for modules that ioredis relies on
// If you run into such an error it's recommended to move the code to `getStaticProps` or `getServerSideProps` as those methods guarantee that the code is only run in Node.js.
import YTDlpWrap from 'yt-dlp-wrap';
// const YTDlpWrap = require('yt-dlp-wrap').default;
import path from 'path'; // Import the path module from Node.js

const setYTDlp = async () => {
    //Get the data from the github releases API. In this case get page 1 with a maximum of 5 items.
    let githubReleasesData = await YTDlpWrap.getGithubReleases(1, 5);

    // Calculate the absolute path to the 'lib' folder
    //original path location string -> '@/lib/'
    const libFolderPath = path.resolve(
        __dirname,
        '../video/ytdlpBinaryLocation'
    );

    //Download the yt-dlp binary for the given version and platform to the provided path.
    //By default the latest version will be downloaded to "./yt-dlp" and platform = os.platform().
    await YTDlpWrap.downloadFromGithub(
        libFolderPath
        // '2020.06.16.1',
        // 'win32'
    );

    //Init an instance with a given binary path.
    //If none is provided "yt-dlp" will be used as command.
    const ytDlpWrap = new YTDlpWrap(libFolderPath);
    return ytDlpWrap;

    //The binary path can also be changed later on.
    // ytDlpWrap.setBinaryPath(libFolderPath);
};

interface VideoProps {
    url: string;
    title: string;
}

const downloadVideo = async ({ url, title }: VideoProps) => {
    const ytDlpWrap = await setYTDlp();

    //this fails because it wants to check certificates
    // let metadata = await ytDlpWrap.getVideoInfo(url);
    // let title = metadata.title ;
    // console.log('Downloading movie ', title);

    //TODO: remove this --no-check-cert before production release
    let ytDlpEventEmitter = ytDlpWrap
        .exec([
            '--no-check-certificates',
            url,
            '-f',
            'best',
            '-o',
            `video/output/${title}.mp4`,
        ])
        .on('progress', (progress: any) =>
            console.log(
                progress.percent,
                progress.totalSize,
                progress.currentSpeed,
                progress.eta
            )
        )
        .on('ytDlpEvent', (eventType: any, eventData: any) =>
            console.log(eventType, eventData)
        )
        .on('error', (error: any) => console.error(error))
        .on('close', () => console.log('all done'));

    console.log('PID: ', ytDlpEventEmitter?.ytDlpProcess?.pid);
};

export const videoProcess = async () => {
    const url = 'https://www.youtube.com/watch?v=26Mayv5JPz0';
    const randomNumber = Math.floor(Math.random() * 1001); // Generates a number between 0 and 1000
    const title = `title${randomNumber}`;
    return downloadVideo({ url, title });
};
