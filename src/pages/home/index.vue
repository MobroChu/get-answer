<template>
  <div>
    <item-container father-component="home"></item-container>
  </div>
</template>

<script>
import itemContainer from '../../components/item-container'

export default {
  name: 'home',
  components: {
    itemContainer
  }
}
</script>
