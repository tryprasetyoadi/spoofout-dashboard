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
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail3">Token</label>
            <input v-model="formData.token"
              type="text"
              class="form-control"
              id="exampleInputName1"
              placeholder="Token"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputName1">Liveness Range</label>
            <input v-model="formData.liveness_range"
              type="text"
              class="form-control"
              id="exampleInputName1"
              placeholder="Liveness Range"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputName1">Liveness Threshold</label>
            <input type="text" class="form-control" id="exampleInputName1" placeholder="Liveness Thresehold" v-model="formData.liveness_threshold">
          </div>
          <div class="form-group">
            <label>FR Range</label>
            <input type="text" class="form-control" id="exampleInputName1" placeholder="FR Range" v-model="formData.fr_range">
          </div>
          <div class="form-group">
            <label for="exampleInputName1">FR Thresehold</label>
            <input
              type="text" class="form-control" id="exampleInputName1" placeholder="FR Thresehold" v-model="formData.fr_threshold" 
            />
          </div>
          <button type="submit" class="btn btn-gradient-primary me-2">
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
  data() {
    return {
      clients: [],
      formData: {
        name: "",
        token: "",
        liveness_range: "",
        liveness_thresehold: "",
        fr_range: "",
        fr_threshold: "",
        is_active:1
      },
    };
  },
  methods: {
    async postData() {
      const {
        data: dataClient,
        error,
        refresh,
        pending,
      } = await useFetch("/clients", {
        headers: {
          Authorization: `Bearer ${runTimeConfig.public.appSecret}`,
        },
        baseURL: runTimeConfig.public.baseUrl,
        method: "post",
        body: this.formData,
      });
      this.clients = dataClient.value.data.data;
      console.log(this.clients);
    },
  },
};
</script>
