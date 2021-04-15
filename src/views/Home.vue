<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome Progressor (Compo API)" />
    <!-- on écoute l'évènement émis par le component enfant -->
    <Form @createtask="addTask" />
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
setup() {
  // data, c'est ce qui a été émis. qu'on peut nommer comme on veut
    function addTask(data) {
      console.log("Home.vue | task to add", data);
    }
    return { addTask }

}
}
</script>
