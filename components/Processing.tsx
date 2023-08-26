// 'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

/**
 *
 * TODO
 * To get this to work move it into a lib.ts file where we are running just Node.js
 * Then connect to front end via component call and exporting of the functions
 *
 *
 *
 *
 *
 */

// YTDlp is a Node.js specific library that can't run in the browser
// Trying to use it in code that runs on both Node.js and the browser will result in a module not found error for modules that ioredis relies on
// If you run into such an error it's recommended to move the code to `getStaticProps` or `getServerSideProps` as those methods guarantee that the code is only run in Node.js.
import YTDlpWrap from 'yt-dlp-wrap';
// const YTDlpWrap = require('yt-dlp-wrap').default;

const setYTDlp = async () => {
    //Get the data from the github releases API. In this case get page 1 with a maximum of 5 items.
    let githubReleasesData = await YTDlpWrap.getGithubReleases(1, 5);

    //Download the yt-dlp binary for the given version and platform to the provided path.
    //By default the latest version will be downloaded to "./yt-dlp" and platform = os.platform().
    await YTDlpWrap.downloadFromGithub(
        '@/lib/'
        // '2020.06.16.1',
        // 'win32'
    );

    //Init an instance with a given binary path.
    //If none is provided "yt-dlp" will be used as command.
    const ytDlpWrap = new YTDlpWrap('@/lib/');
    //The binary path can also be changed later on.
    ytDlpWrap.setBinaryPath('@/lib/');
};

const videoProcess = () => {
    setYTDlp();
};

const Processing = () => {
    return (
        <Button
        // onClick={() => videoProcess()}
        >
            Processing
        </Button>
    );
};

export default Processing;
