<script>
import { VerticalNav } from '@layouts/components'
import { useLayoutConfigStore } from '@layouts/stores/config'

export default defineComponent({
  props: {
    navItems: {
      type: Array,
      required: true,
    },
    verticalNavAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    const { width: windowWidth } = useWindowSize()
    const configStore = useLayoutConfigStore()
    const isOverlayNavActive = ref(false)
    const isLayoutOverlayVisible = ref(false)
    const toggleIsOverlayNavActive = useToggle(isOverlayNavActive)

    // 通过syncRef同步两个ref的值
    syncRef(isOverlayNavActive, isLayoutOverlayVisible)

    // 当窗口宽度增加到超过overlay导航断点时，如果布局覆盖层可见，则隐藏它
    watch(windowWidth, () => {
      if (!configStore.isLessThanOverlayNavBreakpoint && isLayoutOverlayVisible.value)
        isLayoutOverlayVisible.value = false
    })

    return () => {
      const verticalNavAttrs = toRef(props, 'verticalNavAttrs')
      const { wrapper: verticalNavWrapper, wrapperProps: verticalNavWrapperProps, ...additionalVerticalNavAttrs } = verticalNavAttrs.value

      // 创建垂直导航组件
      const verticalNav = h(VerticalNav, { isOverlayNavActive: isOverlayNavActive.value, toggleIsOverlayNavActive, navItems: props.navItems, ...additionalVerticalNavAttrs }, {
        'nav-header': () => slots['vertical-nav-header']?.(),
        'before-nav-items': () => slots['before-vertical-nav-items']?.(),
      })

      // 创建头部导航栏组件
      const navbar = h('header', { class: ['layout-navbar', { 'navbar-blur': configStore.isNavbarBlurEnabled }] }, [
        h('div', { class: 'navbar-content-container' }, slots.navbar?.({
          toggleVerticalOverlayNavActive: toggleIsOverlayNavActive,
        })),
      ])

      // 创建主要内容区域组件
      const main = h('main', { class: 'layout-page-content' }, h('div', { class: 'page-content-container' }, slots.default?.()))

      // 创建页脚组件
      const footer = h('footer', { class: 'layout-footer' }, [
        h('div', { class: 'footer-content-container' }, slots.footer?.()),
      ])

      // 创建布局覆盖层组件
      const layoutOverlay = h('div', {
        class: ['layout-overlay', { visible: isLayoutOverlayVisible.value }],
        onClick: () => { isLayoutOverlayVisible.value = !isLayoutOverlayVisible.value },
      })

      return h('div', { class: ['layout-wrapper', ...configStore._layoutClasses] }, [
        verticalNavWrapper ? h(verticalNavWrapper, verticalNavWrapperProps, { default: () => verticalNav }) : verticalNav,
        h('div', { class: 'layout-content-wrapper' }, [
          navbar,
          main,
          footer,
        ]),
        layoutOverlay,
      ])
    }
  },
})
</script>

<style lang="scss">
@use "@configured-variables" as variables;
@use "@layouts/styles/placeholders";
@use "@layouts/styles/mixins";

.layout-wrapper.layout-nav-type-vertical {
  // 垂直导航布局的高度设置为100%
  block-size: 100%;

  .layout-content-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-block-size: 100dvh; // 内容区最小高度为视窗高度
    transition: padding-inline-start 0.2s ease-in-out; // 内边距水平开始方向的过渡效果
    will-change: padding-inline-start; // 提前声明哪些属性将会有变化以优化性能

    // 屏幕宽度大于等于1280px时，设置左侧内边距为垂直导航的宽度
    @media screen and (min-width: 1280px) {
      padding-inline-start: variables.$layout-vertical-nav-width;
    }
  }

  .layout-navbar {
    z-index: variables.$layout-vertical-nav-layout-navbar-z-index; // 设置导航栏的层级

    .navbar-content-container {
      block-size: variables.$layout-vertical-nav-navbar-height; // 导航栏容器的高度
    }

    // 根据配置决定是否应用盒状内容样式
    @at-root {
      .layout-wrapper.layout-nav-type-vertical {
        .layout-navbar {
          @if variables.$layout-vertical-nav-navbar-is-contained {
            @include mixins.boxed-content;
          }

            // 否则直接给导航栏容器应用盒状内容样式
          @else {
            .navbar-content-container {
              @include mixins.boxed-content;
            }
          }
        }
      }
    }
  }

  &.layout-navbar-sticky .layout-navbar {
    @extend %layout-navbar-sticky; // 应用固定顶部的样式
  }

  &.layout-navbar-hidden .layout-navbar {
    @extend %layout-navbar-hidden; // 应用隐藏导航栏的样式
  }

  // 底部样式
  .layout-footer {
    @include mixins.boxed-content; // 应用盒状内容样式
  }

  // 布局覆盖层样式
  .layout-overlay {
    position: fixed; // 固定定位
    z-index: variables.$layout-overlay-z-index; // 覆盖层的层级
    background-color: rgb(0 0 0 / 60%); // 半透明黑色背景
    cursor: pointer; // 鼠标指针变为手形
    inset: 0; // 覆盖整个视窗
    opacity: 0; // 默认透明度为0
    pointer-events: none; // 默认不响应鼠标事件
    transition: opacity 0.25s ease-in-out; // 不透明度变化的过渡效果
    will-change: transform; // 提前声明哪些属性将会有变化以优化性能

    &.visible {
      opacity: 1; // 显示时的不透明度为1
      pointer-events: auto; // 显示时响应鼠标事件
    }
  }

  // 当垂直导航折叠时调整内容区域的左内边距
  &.layout-vertical-nav-collapsed .layout-content-wrapper {
    padding-inline-start: variables.$layout-vertical-nav-collapsed-width;
  }

  // 当内容高度固定时，设置内容区域的最大高度为视窗高度
  &.layout-content-height-fixed {
    .layout-content-wrapper {
      max-block-size: 100dvh;
    }

    .layout-page-content {
      display: flex;
      overflow: hidden; // 溢出内容隐藏

      .page-content-container {
        inline-size: 100%; // 宽度占满整个父元素

        > :first-child {
          max-block-size: 100%; // 子元素最大高度为100%
          overflow-y: auto; // 垂直滚动条
        }
      }
    }
  }
}
</style>
