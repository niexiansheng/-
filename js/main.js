// 歌曲搜索接口
var app = new Vue({
    el:"#player",
    data:{
         // 搜索关键字
         query: '',
         // 歌曲列表
         musicList: [],
         // 歌曲url
         musicUrl: '',
         // 是否正在播放
         isPlay: false,
         // 歌曲热门评论
         hotComments: [],
         // 歌曲封面地址
         coverUrl: 'https://i.loli.net/2020/03/23/QEL4rdy5KCsn3cz.png',
         // 显示视频播放
         showVideo: false,
         // mv地址
         mvUrl: ''
        // https://autumnfish.cn/search?keywords=%E7%88%B1%E5%B0%B1%E4%B8%80%E4%B8%AA%E5%AD%97
    },
    methods:{
        searchMusic:function(){
            axios.get('https://autumnfish.cn/search?keywords='+this.query)
            .then((response)=>{
                var that=this;
                that.musicList=response.data.result.songs;
                console.log(that.musicList);
            },
            function(err){

            })
        },
        playMusic:function(musicId){
            // console.log(musicId);
            var that=this;
            axios.get('https://autumnfish.cn/song/url?id=' + musicId)
            .then((response)=>{
                // console.log(response)
                that.musicUrl=response.data.data[0].url;
                // console.log(that.musicUrl)
            });
            //获取歌曲的封面
            axios.get('https://autumnfish.cn/song/detail?ids='+musicId)
            .then((response)=>{
                that.coverUrl = response.data.songs[0].al.picUrl
                // console.log(that.coverUrl);
            });
            //获取歌曲热门评论
            axios.get('https://autumnfish.cn/comment/hot?type=0&id='+musicId)
            .then((response)=>{
                this.hotComments=response.data.hotComments;
                // console.log(response.data.hotComments);
            })
        },
        //auto的play事件
        play:function(){

            this.isPlay=true;
        },
        pause:function(){
            this.isPlay=false;
        },
        //播放mv
        playMv(vid){
            if(vid){
                this.showVideo=true;
                axios.get('https://autumnfish.cn/mv/url?id=' + vid).then(response => {
                    console.log(response)
                    // 暂停歌曲播放
                    this.$refs.audio.pause()
                    // 获取mv地址
                    this.mvUrl = response.data.data.url
                  })
            }
        },
         // 关闭mv界面
         closeMv() {
            this.showVideo = false
            this.$refs.video.pause()
          },
    }
})
