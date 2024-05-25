export default class VideoPlayer {
    curID;
    player;
    curParent;
    constructor(parentElSelector, overlaySelector, closeBtnSelector) {
        this.parents = document.querySelectorAll(parentElSelector);
        this.overlay = document.querySelector(overlaySelector);
        this.cross = document.querySelector(closeBtnSelector);
        // window.onPlayerStateChange = (e) => (e.data == 0 ? this._changeMarkUp() : "");
        this.playBtnHandler();
        this.crossBtnHandler();
        this._fetchYouTubeScript();
    }

    _renderPlayer(id) {
        if (document.querySelector("iframe[id='frame']")) return;
        this.player = new YT.Player("frame", {
            height: "360",
            width: "640",
            videoId: id,
            events: {
                onStateChange: this.onPlayerStateChange,
            },
        });
    }

    onPlayerStateChange = (e) => {
        e.data == 0 ? this._changeMarkUp() : "";
    };

    _fetchYouTubeScript() {
        var tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    _createFrameBox() {
        const frameBox = document.createElement("div");
        frameBox.id = "frame";
        return frameBox;
    }

    _loadNewVideo(id) {
        this.player.loadVideoById({ videoId: id });
    }

    playBtnHandler() {
        this.parents.forEach((parent) => {
            parent.addEventListener("click", (e) => {
                if (!e.target.closest(".play__circle") || e.target.closest(".closed")) return;
                this.curParent = parent;
                const videoID = e.target.closest(".play").getAttribute("data-url");
                if (!this.curID || this.curID === videoID) {
                    this.overlay.style.display = "flex";
                    this._renderPlayer(videoID);
                    this.curID = videoID;
                } else if (videoID !== this.curID) {
                    this.overlay.style.display = "flex";
                    this._loadNewVideo(videoID);
                    this.curID = videoID;
                }
            });
        });
    }

    _closeVideo() {
        this.overlay.style.display = "none";
        this.player.pauseVideo();
    }

    crossBtnHandler() {
        this.cross.addEventListener("click", this._closeVideo.bind(this));
        this.overlay.addEventListener("click", (e) => {
            if (e.target === this.overlay) {
                this._closeVideo(e);
            }
        });
    }

    _changeMarkUp() {
        const tiles = this.curParent.querySelectorAll(".module__video-item") || undefined;
        if (tiles.length === 0) return;
        const firstVideoBarMarkUp = tiles[0].querySelector(".play");
        let secondVideoBarMarkUp = tiles[1].querySelector(".play");
        secondVideoBarMarkUp.innerHTML = firstVideoBarMarkUp.innerHTML;
        tiles[1].style.opacity = "1";
        tiles[1].style.filter = "none";
    }
}
