<template>
  <div class="fanfic-body-samples">
    <div class="fanfic-body-samples__paragraph">
      <div class="fanfic-body-samples__paragraph-top"></div>
      <div class="fanfic-body-samples__paragraph-middle"></div>
      <div class="fanfic-body-samples__paragraph-middle"></div>
      <div class="fanfic-body-samples__paragraph-middle"></div>
      <div class="fanfic-body-samples__paragraph-bottom"></div>
    </div>
    <div class="fanfic-body-samples__paragraph">
      <div class="fanfic-body-samples__paragraph-top"></div>
      <div class="fanfic-body-samples__paragraph-middle"></div>
      <div class="fanfic-body-samples__paragraph-middle"></div>
      <div class="fanfic-body-samples__paragraph-middle"></div>
      <div class="fanfic-body-samples__paragraph-middle"></div>
      <div class="fanfic-body-samples__paragraph-middle"></div>
      <div class="fanfic-body-samples__paragraph-bottom"></div>
    </div>
    <div class="fanfic-body-samples__paragraph">
      <div class="fanfic-body-samples__paragraph-top"></div>
      <div class="fanfic-body-samples__paragraph-bottom"></div>
    </div>
    <div class="fanfic-body-samples__paragraph">
      <div class="fanfic-body-samples__paragraph-top"></div>
      <div class="fanfic-body-samples__paragraph-bottom"></div>
    </div>
    <div class="fanfic-body-samples__paragraph">
      <div class="fanfic-body-samples__paragraph-top"></div>
      <div class="fanfic-body-samples__paragraph-middle"></div>
      <div class="fanfic-body-samples__paragraph-middle"></div>
      <div class="fanfic-body-samples__paragraph-middle"></div>
      <div class="fanfic-body-samples__paragraph-bottom"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fanfic-body-samples {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  &__paragraph {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    .fanfic-body-samples__paragraph-top {
      align-self: flex-end;
      @include sample(95%, 24px, 5px);
    }
    .fanfic-body-samples__paragraph-middle {
      @include sample(100%, 24px, 5px);
    }
    .fanfic-body-samples__paragraph-bottom {
      align-self: flex-start;
      @include sample(70%, 24px, 5px);
    }
  }
}
</style>
