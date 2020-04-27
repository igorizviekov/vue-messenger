<template>
  <section class="form">
    <p v-if="error" class="error">Validation failed</p>
    <div>
      <input
        type="text"
        name="name"
        v-model="form.name"
        placeholder="Your name"
      />
      <br />
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
      <btn @clicked="signup" :disabled="disabled">SUBMIT</btn>
    </div>
  </section>
</template>

<script>
import btn from "../ui/button";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "signup",
  components: { btn },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters(["error"])
  },
  methods: {
    ...mapActions(["sendSignUp"]),
    signup() {
      this.$store.state.user = this.form;
      this.sendSignUp();
    },
    disabled() {
      if (
        this.form.name.length < 3 ||
        this.form.password.length < 5 ||
        this.form.email.length < 5
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>
