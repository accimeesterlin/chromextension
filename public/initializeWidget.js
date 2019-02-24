const iconContainer = `
    <div class="wG J-Z-I" data-tooltip="Tutor App" aria-label="Insert link ‪(⌘K)‬" tabindex="1"
    role="button" aria-pressed="false" aria-haspopup="true" aria-expanded="false" style="user-select: none;">
        <div class="J-J5-Ji J-Z-I-Kv-H" style="user-select: none;">
            <div class="J-J5-Ji J-Z-I-J6-H" style="user-select: none;">
                <!-- This entire set the icons -->
                <div  class="tutorAppIcon aaA aMZ" style="user-select: none;">
                    <div class="a3I" style="user-select: none;">&nbsp;</div>
                </div>
            </div>
        </div>
    </div>
`;


const waitForEl = function (selector, callback) {
    if ($(selector).length) {
        callback();
        return
    }

    setTimeout(function () {
        waitForEl(selector, callback);
    }, 100);
};



$(window).bind('load', function () {
    waitForEl('.a8X.gU .bAK', function () {
        // work the magic
        $('.a8X.gU .bAK').append(iconContainer);
        $('.tutorAppIcon').css({
            backgroundImage: `url('https://avatars.slack-edge.com/2016-10-16/91995446787_0a4aa4fbb71d8872175d_88.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '20px',
            backgroundPosition: 'center'
        });
        console.log('It works like charms!!');



    });
});

$(document).on('click', '.aj9.pp div[role="button"]', function () {
    waitForEl('.a8X.gU .bAK', function () {
        // work the magic
        console.log('It works like shit!!');
        $('.a8X.gU .bAK').append(iconContainer);
        $('.tutorAppIcon').css({
            backgroundImage: `url('https://avatars.slack-edge.com/2016-10-16/91995446787_0a4aa4fbb71d8872175d_88.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '20px',
            backgroundPosition: 'center'
        });


    });
    console.log('We just click the button');
});