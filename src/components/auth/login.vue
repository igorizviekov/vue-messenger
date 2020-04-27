<template>
  <section class="form">
    <br />
    <div>
      <p v-if="error" class="error">Validation failed</p>
      <input
        type="email"
        name="email"
        v-model="form.email"
        placeholder="Email"
      />
      <br />
      <input
        type="password"
        name="password"
        v-model="form.password"
        placeholder="Password"
      />
      <btn @clicked="login" :disabled="disabled">SUBMIT</btn>
    </div>
  </section>
</template>

<script>
import btn from "../ui/button";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "login",
  components: { btn },
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters(["error"])
  },
  methods: {
    ...mapActions(["sendLogin"]),
    login() {
      this.$store.state.user = this.form;
      this.sendLogin();
    },
    disabled() {
      if (this.form.password.length < 5 || this.form.email.length < 5) {
        return true;
      }
      return false;
    }
  }
};
</script>
