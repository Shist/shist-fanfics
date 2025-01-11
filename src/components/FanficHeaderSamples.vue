<template>
  <div class="fanfic-header-samples">
    <div
      class="fanfic-header-samples__label-sample fanfic-header-samples__label-sample_field"
    />
    <div
      class="fanfic-header-samples__label-sample fanfic-header-samples__label-sample_date"
    />
    <div
      class="fanfic-header-samples__label-sample fanfic-header-samples__label-sample_title"
    />
  </div>
</template>

<style lang="scss" scoped>
.fanfic-header-samples {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  &__label-sample {
    @include sample(none, auto, 5px);
    &_field {
      max-width: 500px;
      height: 28px;
      @media (max-width: $phone-l) {
        max-width: 360px;
        height: 20px;
      }
    }
    &_date {
      max-width: 280px;
      height: 28px;
      @media (max-width: $phone-l) {
        max-width: 200px;
        height: 20px;
      }
    }
    &_title {
      align-self: center;
      max-width: 450px;
      height: 36px;
      @media (max-width: $phone-l) {
        max-width: 275px;
        height: 22px;
      }
    }
  }
}
</style>
