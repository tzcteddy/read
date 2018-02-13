
<template>
  <div class="star">
    <span v-for="(itemClass,key) in itemClasses" :class="itemClass" class="star-item"></span>
    <span class="score-n">{{score}}分</span>
  </div>
</template>
<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default{
    name:"starscore",
    props:["score"],
    computed:{
      itemClasses(){
        let result = [];
        let score = Math.floor(this.score*2)/2; //将数值调整为整数及.5的形式，例：4.3 => 4；4.6 => 4.5
        let hasDecimal = score %1 !==0;
        let integer = Math.floor(score);
        for(let i =0;i<integer;i++){
          result.push(CLS_ON);
        }
        if(hasDecimal){
          result.push(CLS_HALF);
        }
        while(result.length<LENGTH){
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  }
</script>
<style>
  .star{
    margin-bottom: 1rem;
  }
 .star .star-item{
   display: inline-block;
   width: 0.42rem;
   height: 0.4rem;
   background-repeat: no-repeat;
   background-size: 100%;
 }
  .star .on{
      background-image: url("../assets/star/starIcon.png");
  }
  .star .half{
    background-image: url("../assets/star/starIconh.png");
  }
 .star .off{
   background-image: url("../assets/star/starIconb.png");
 }
  .star .score-n{
    display: inline-block;
    padding: 0 0.2rem;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.2rem;
  }



</style>
