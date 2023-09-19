<template>
    <div class="col-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Basic form elements</h4>
          <p class="card-description">Basic form elements</p>
          <form @submit.prevent="postData" class="forms-sample">
            <div class="form-group">
              <label for="exampleInputName1">Name</label>
              <input v-model="formData.name"
                type="text"
                class="form-control"
                id="exampleInputName1"
                placeholder="Name"
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail3">Email</label>
              <input v-model="formData.email"
                type="text"
                class="form-control"
                id="exampleInputEmail3"
                placeholder="email"
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input v-model="formData.password"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Confirm Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Confirm Password" v-model="formData.confirm_password">
            </div>
            <button type="submit" @click="backToClients" class="btn btn-gradient-primary me-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  const runTimeConfig = useRuntimeConfig();
  export default {
    setup() {
    const router = useRouter();

    // Function to navigate back to /clients
    const backToClients = () => {
      router.push('/clients'); // Use router.push to navigate to the /clients route
    };

    return {
      backToClients,
    };
  },
    data() {
      return {
        register: [],
        formData: {
          name: "",
          email: "",
          password: "",
          confirm_password: ""
        },
      };
    },
    methods: {
      async postData() {
        const {
          data: dataRegister,
          error,
          refresh,
          pending,
        } = await useFetch("/register", {
          headers: {
            Authorization: `Bearer ${runTimeConfig.public.appSecret}`,
          },
          baseURL: runTimeConfig.public.baseUrl,
          method: "post",
          body: this.formData,
        });
        this.clients = dataRegister.value.data.data;
        console.log(this.clients);
      },
    },
  };
  </script>
  