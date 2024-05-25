export default function fetchYT() {
    let player;

    // loading script file and past it in our html
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onPlayerStateChange = function (event) {
        console.log("state was chenged");
        console.log(event.data);
        if (event.data == 0) {
            console.log("running changeMarkUp...");
            changeMarkUp();
        }
    };

    const videoModule = document.querySelector(".module__video");
    const overlay = document.querySelector(".overlay");
    const cross = document.querySelector(".close");

    function createFrameBox() {
        const frameBox = document.createElement("div");
        frameBox.id = "frame";
        return frameBox;
    }

    function btnPlayHandler() {
        videoModule.addEventListener("click", (e) => {
            if (!e.target.closest(".play__circle")) return;
            const frameBox = createFrameBox();
            if (document.querySelector("iframe[id='frame']")) {
                document.querySelector("iframe[id='frame']").replaceWith(frameBox);
            }
            overlay.style.display = "flex";
            const videoID = e.target.closest(".play").getAttribute("data-url");
            console.log(videoID);
            renderPlayer(videoID);
        });
    }

    function renderPlayer(id) {
        if (document.querySelector("iframe[id='frame']")) return;
        player = new YT.Player("frame", {
            height: "360",
            width: "640",
            videoId: id,
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
        console.log(id);
    }

    function closeVideo() {
        overlay.style.display = "none";
        player.pauseVideo();
    }

    function crossBtnHandler() {
        cross.addEventListener("click", () => {
            closeVideo();
        });
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                closeVideo();
            }
        });
    }

    function changeMarkUp() {
        const tiles = document.querySelectorAll(".module__video-item");
        const firstVideoBarMarkUp = tiles[0].querySelector(".play");
        let secondVideoBarMarkUp = tiles[1].querySelector(".play");
        secondVideoBarMarkUp.innerHTML = firstVideoBarMarkUp.innerHTML;

        setTimeout(() => {
            secondVideoBarMarkUp = firstVideoBarMarkUp;
            tiles[1].style.opacity = "1";
        }, 3000);
    }

    crossBtnHandler();
    btnPlayHandler();
}
