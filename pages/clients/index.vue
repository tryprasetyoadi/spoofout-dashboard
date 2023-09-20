<template>
  <div class="content-wrapper">
    <div class="page-header">
      <h3 class="page-title">Clients</h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/clients">Dashboard</a></li>
          <li class="breadcrumb-item active" aria-current="page">
            List Clients
          </li>
        </ol>
      </nav>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body ">
            <h4 class="card-title">List Clients</h4>
            <p class="card-description"></p>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Full Name</th>
                  <th>Token</th>
                  <th>Liveness Range</th>
                  <th>Liveness Threshold</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(client, index) in  clients " :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ client.name }}</td>
                  <td>{{ client.token }}</td>
                  <td>{{ client.liveness_range }}</td>
                  <td>{{ client.liveness_threshold }}</td>
                  <td>{{ momentFormat(client.created_at) }}</td>
                  <td>{{ momentFormat(client.updated_at) }}</td>

                  <div class="d-flex align-items-center list-user-action justify-content-end">
                    <nuxt-link :to="'/clients/update?id=' + client.id" class="text-primary">
                      <i class="mdi mdi-table-edit"></i>
                    </nuxt-link>

                    <button @click="deleteClient(client.id)" class="btn text-primary">
                      <i class="mdi mdi-delete"></i>
                    </button>
                  </div>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import axios from 'axios';
import { useRouter } from 'vue-router';
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
      clients: [],
    };
  },
  methods: {
    async getData() {

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
      });
      this.clients = dataClient.value.data.data;
      console.log(this.clients);
    },
    momentFormat(date) {
      return moment(date).format("DD MMMM YYYY - HH:mm:ss");
    },
    data() {
      return {
        clients: [],
        formData: {
          id: "",
        },
      };
    },
    async deleteClient(id) {
      const runTimeConfig = useRuntimeConfig();
      const {
        data: dataClient,
        error,
        refresh,
        pending,
      } = await useFetch(`/delete-clients/${id}`, {
        headers: {
          Authorization: `Bearer ${runTimeConfig.public.appSecret}`,
        },
        baseURL: runTimeConfig.public.baseUrl,
        method: "post",
        body: this.formData,


      });
      this.clients = dataClient.value.data.data;
      console.log(this.clients);
      this.getData();


    },


  },
  mounted() {
    this.getData();
  },

};
</script>
