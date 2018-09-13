<template>
  <div>
    <item-container father-component="item"></item-container>
  </div>
</template>

<script>
import itemContainer from '../../components/item-container'

export default {
  name: 'item',
  components: {
    itemContainer
  }
}
</script>
