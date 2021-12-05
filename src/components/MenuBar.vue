<template>
  <div id="sidebar">
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="48"
      :width="200"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="32"
        :collapsed-icon-size="24"
        :options="menuOptions"
        v-model:value="this.activeKey"
        @click="this.go(this.activeKey)"
      />
    </n-layout-sider>
  </div>
</template>

<script>
import {
  CloudOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
  BarChartOutline as BarCharIcon,
  AddCircleOutline as AddCircleIcon
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { h } from 'vue'
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions = [
  {
    label: 'Control Panel',
    key: '/panel',
    icon: renderIcon(BarCharIcon)
  },
  {
    label: 'Create Server',
    key: '/panel/create',
    icon: renderIcon(AddCircleIcon),
  },
  {
    label: 'A Wild Sheep Chase',
    key: 'a-wild-sheep-chase',
    disabled: true,
    icon: renderIcon(BookIcon)
  },
  {
    label: 'Dance Dance Dance',
    key: 'Dance Dance Dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: 'People',
        key: 'people',
        children: [
          {
            label: 'Narrator',
            key: 'narrator',
            icon: renderIcon(PersonIcon)
          },
          {
            label: 'Sheep Man',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        label: 'Beverage',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: 'Whisky',
            key: 'whisky'
          }
        ]
      },
      {
        label: 'Food',
        key: 'food',
        children: [
          {
            label: 'Sandwich',
            key: 'sandwich'
          }
        ]
      },
      {
        label: 'The past increases. The future recedes.',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }]
export default {
  name: "MenuBar",
  data() {
    return {
      menuOptions,
      collapsed: true,
      activeKey: ""
    }
  },
  methods: {
    go(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss">
#sidebar {
  min-height: 100%;
  display: flex;
  background-color: white;
}
</style>