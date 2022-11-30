<template>
  <div class="popup">
    <div class="popup__body">
      <div class="popup__content">
        <div class="popup__title">
          <div class="popup__title__icon"></div>
          <div class="title">
            {{ title }}
          </div>
        </div>
        <div class="popup__message">
          <ul>
            <li v-for="(v, k) in errors" :key="k">- {{ v }}</li>
          </ul>
        </div>
        <div class="popup__actions"></div>
      </div>
      <div class="close--popup" @click="close"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import * as acs from "@/store/modules/consts.js";

defineProps({
  title: {
    type: String,
    default: "Cảnh báo",
  },
});

const store = useStore();
const errors = computed(() => store.getters.errs);

function close() {
  store.dispatch(acs.SET_ERRORS_ACTION, []);
}
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: var(--overlay-color);
  z-index: 99;
  color: #747474;

  .popup__body {
    width: 360px;
    //height: 170px;
    background-color: #fcf1ea;
    //background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    color: #782538;

    .popup__content {
      margin: 20px;

      .popup__title {
        font-size: 16px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;

        .title {
          margin-left: 10px;
        }

        .popup__title__icon {
          background: url("@/assets/Icons/ic_sprites.svg") no-repeat -358px -358px;
          width: 33px;
          height: 29px;
        }
      }

      .popup__message {
        line-height: 20px;
      }

      .popup__actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;

        .btn-confirm {
          border: 0;
          margin-left: 8px;
        }
      }
    }
  }

  .close--popup {
    /*width: 16px;
    height: 16px;*/
    background: url(@/assets/Icons/ic_X_2.png) no-repeat center;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
  }
}
</style>
