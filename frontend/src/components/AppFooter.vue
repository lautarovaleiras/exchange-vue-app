<template>
 <footer>
    <b-link class="footer-item center" href="https://github.com/lautarovaleiras">@Lautaro Valeiras</b-link>
  </footer>
</template>
<script>
export default {
  name: 'app-footer'
}

</script>
<style>
footer {
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between; /* Use space-between to align spans at the beginning, center, and end */
}

.footer-item.center {
  margin: 0 auto; /* Use margin: 0 auto to center align the span in the center */
}

.footer-item.end {
  margin-left: auto; /* Use margin-left: auto to push the span to the end */
}
</style>
