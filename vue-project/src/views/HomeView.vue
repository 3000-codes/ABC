<template>
  <main>
    <div>Lorem ipsum dolor sit amet consectetur adipi</div>
  </main>
</template>
<style lang="scss" scoped>
main {
  width: 100%;
  height: 100vh;
  display: flex;

  div {
    width: 100%;
    height: 100%;
    font-size: 70px;
    font-weight: bolder;
    position: relative;
    &::before {
      content: 'Lorem ipsum dolor sit amet consectetur adipi';
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      white-space: nowrap;
      overflow: hidden;
      color: #06ee99;
      border-right: 2px solid #06ee99;
      animation: animate 3s linear infinite;
      filter: drop-shadow(0 0 10px #06ee99);
    }

    @keyframes animate {
      0% {
        width: 0;
      }
      100% {
        width: 100%;
      }
    }
  }
}
</style>
