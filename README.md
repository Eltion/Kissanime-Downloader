# Kissanime-Downloader
This is a userscript that will batch download episodes form KissAnime.

# Version 3.0
1. Added support for IDM (Internet Download Manager).
2. Added beta sever support.

## How to Install
1. Install [Tampermonkey (Chrome)](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) or [ Greasemonkey(Firefox)](https://addons.mozilla.org/firefox/addon/greasemonkey/)
2. Install the [script](https://greasyfork.org/en/scripts/31080-kissanime-multi-downloader)

## How to Use
Visit a Anime page in Kissanime and at the bottom you should see some options like this:
1. Start - Write the number form which you want to start to download(including it). Default value = 1
2. End - Write the number of episode where you want to stop downloading(including it). Default value = Total number of episodes.
3. Quality - Format example: 1080,720,480,360 - this would check if there exist a 1080p version of that episode if not than it will check for the next quality and so on. Other example - 360,480,720,1080 this will download the lowest quality possible. Default value = 720,480,360

4. Select one of the options below:
    1. Text  - Creates a text list from which you can download eposides in windows. See below "How to Download"
    2. HTML  - Creates a html file with all links.
    3. M3U8  - Creates a m3u8 playlist (Play with VLC or MX Player).
    4. IDM   - Creates a bat file which starts IDM (with the correnct episode name)

5.Select one of the options below:
    1. Beta         - Downloads form beta server
    2. RapidVideo   - Downloads from rapidVideo 
   
6. Click the green download button    

## How to Download
After creating list.txt follow these steps
1. [Download](https://github.com/Eltion/Kissanime-Downloader/raw/master/KissAnime%20Downloader.zip) and extract "Kissanime Downloader.zip" or  [Download](https://github.com/Eltion/Kissanime-Downloader/raw/master/Downloader.sh)(Linux/macOS)

### Windows
2. Inside the "Kissanime Downloader" folder copy list.txt
3. Run Downloader.bat
4. Set the name of folder where to save the episodes.

### Linux/macOS
2. Install curl
3. Edit the loaction inside the script
4. Copy list.txt
5. Run Downloader.sh

## Video Tutorial for How to Use

https://rawgit.com/Eltion/Kissanime-Downloader/master/VideoTutorial.html
