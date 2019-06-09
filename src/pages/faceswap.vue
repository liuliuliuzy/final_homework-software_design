<template>
    <el-container>
        <el-header>
            <span class = "head-text">This is image after face swap</span>
        </el-header>
        <el-main>
            <!-- <div class="image-show">
              <el-image
                style="width: 100%; height: 100%"
                :src="url"
                :fit="fit">
              </el-image>
              <span><p>click here to love it</p><el-button type="warning" :icon="icon" @click="change"  circle></el-button></span>
            </div> -->
            <div class="image-show">
              <el-popover
                width="700"
                placement="bottom"
                trigger="click">
                <img :src="url1" style="width: 100%; height:100%"/>
                <div class = "button-div">
                  <el-button type="warning" :icon="icon" @click="change"  circle></el-button>
                </div>
                <img slot="reference" :src="url1"  style="max-height: 100px;max-width: 200px">
              </el-popover>
              <el-popover
                width="700"
                placement="bottom"
                trigger="click">
                <img :src="url2" style="width: 100%; height:100%"/>
                <div class = "button-div">
                  <el-button type="warning" :icon="icon" @click="change"  circle></el-button>
                </div>
                <img slot="reference" :src="url2"  style="max-height: 100px;max-width: 200px">
              </el-popover>
              <el-popover
                width="700"
                placement="bottom"
                trigger="click">
                <img :src="url3" style="width: 100%; height:100%"/>
                <div class = "button-div">
                  <el-button type="warning" :icon="icon" @click="change"  circle></el-button>
                </div>
                <img slot="reference" :src="url3"  style="max-height: 100px;max-width: 200px">
              </el-popover>3
            </div>
        </el-main>
    </el-container>
</template>

<script>
export default {
  data(){
    return {
      url1: require('./image/back1.png'),
      url2: require('./image/back2.png'),
      url3: require('./image/back3.png'),
      fit: 'fill',
      icon: "el-icon-star-off",
    }
  },
  methods: {
    change() {
      if (this.icon === 'el-icon-star-off'){
        this.icon = 'el-icon-star-on'; 
      }
      else{ 
        this.icon = 'el-icon-star-off'; 
      }
      //alert("you clicked the button");
    }
  }
}
</script>

<style scoped>
.image-show{
  max-width: 1000px;
  margin: 10px auto;
  text-align: center;
}
.button-div{
  margin: auto;
  text-align: center;
}
.head-text{
  font-family: cursive;
  font-size: 40px;
  font-weight: 100
}
.el-main{
  padding: 5px
}
.el-image{
  border-radius: 3px;
  box-shadow: 0 0 25px #cacac6;
}
.el-button{
  margin: auto;
  display: inline-block;
}
.el-popover{
  text-align: center;
}
</style>
