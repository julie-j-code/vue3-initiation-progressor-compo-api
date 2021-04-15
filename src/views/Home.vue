<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome Progressor (Compo API)" />
    <Form />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Form from "@/components/Form.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Form,
  },
};
</script>
