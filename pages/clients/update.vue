<template>
  <div class="col-12 grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Update Data</h4>
        <p class="card-description"></p>
        <form @submit.prevent="submitForm" class="forms-sample">
          <div class="form-group">
            <label for="exampleInputName1">Name</label>
            <input
              v-model="data.name"
              type="text"
              class="form-control"
              id="exampleInputName1"
              placeholder="Name"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail3">Token</label>
            <input
              v-model="data.token"
              type="text"
              class="form-control"
              id="exampleInputEmail3"
              placeholder="Token"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputName1">Liveness Range</label>
            <input
              v-model="data.liveness_range"
              type="text"
              class="form-control"
              id="exampleInputName1"
              placeholder="Liveness Range"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputName1">Liveness Threshold</label>
            <input
              v-model="data.liveness_threshold"
              type="text"
              class="form-control"
              id="exampleInputName1"
              placeholder="Liveness Threshold"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputName1">FR Range</label>
            <input
              v-model="data.fr_range"
              type="text"
              class="form-control"
              id="exampleInputName1"
              placeholder="FR Range"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputName1">FR Threshold</label>
            <input
              v-model="data.fr_threshold"
              type="text"
              class="form-control"
              id="exampleInputName1"
              placeholder="FR Threshold"
            />
          </div>
          <button
            type="submit"
            class="btn btn-gradient-primary me-2"
          >
            Update
          </button>
          <button
            type="button"
            @click="backToClients"
            class="btn btn-secondary"
          >
            Back
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
      router.push("/clients"); // Use router.push to navigate to the /clients route
    };

    return {
      backToClients,
    };
  },
  data() {
    return {
      data: {
        name: "",
        token: "",
        liveness_range: "",
        liveness_threshold: "",
        fr_range: "",
        fr_threshold: "",
        is_active: 1,
      },
    };
  },
  methods: {
    async fetch() {
      try {
        const {
          data: dataClient,
          error,
          refresh,
          pending,
        } = await useFetch(`/find/${this.$route.query.id}`, {
          headers: {
            Authorization: `Bearer ${runTimeConfig.public.appSecret}`,
          },
          method: "post",
          baseURL: runTimeConfig.public.baseUrl,
        });
        this.data = dataClient.value.data;
        console.log(this.data);
        // this.data = response.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async submitForm() {
      const {
        data: dataClient,
        error,
        refresh,
        pending,
      } = await useFetch(`/update/${this.$route.query.id}`, {
        headers: {
          Authorization: `Bearer ${runTimeConfig.public.appSecret}`,
        },
        baseURL: runTimeConfig.public.baseUrl,
        method: "post",
        body: this.data,
      });
      console.log('err',error);
      if (dataClient.value) {
        this.backToClients();
      }
    },

    // Your backToClients method code
  },
  async mounted() {
    this.fetch();
  },

  // data() {
  //     return {
  //         data: {
  //             name: '',
  //             token: '',
  //             liveness_range: '',
  //             liveness_threshold: '',
  //             fr_range: '',
  //             fr_threshold: '',
  //             is_active: 1,
  //         },
  //     };
  // },
  // async fetch() {
  //     try {
  //         const response = await this.$axios.get(`/api/find/${this.$route.query.id}`);
  //         this.data = response.data.data;
  //     } catch (error) {
  //         console.error('Error fetching data:', error);
  //     }
  // },
  // methods: {
  //     async submitForm() {
  //         try {
  //             const response = await this.$axios.post(`/api/update/${this.$route.query.id}`, this.data);
  //             this.$swal({
  //                 icon: 'success',
  //                 title: 'Success',
  //                 text: response.data.message,
  //             }).then(() => {
  //                 this.$router.push('/clients');
  //             });
  //         } catch (error) {
  //             this.$swal({
  //                 icon: 'error',
  //                 title: 'Failed',
  //                 text: error.response.data.message,
  //             });
  //         }
  //     },
  //     backToClients() {
  //         this.$router.push('/clients');
  //     },
  // },
  // async mounted() {
  //     await this.fetch();
  // },
};
</script>
