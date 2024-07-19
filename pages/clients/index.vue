<template>
  <div class="content-wrapper">
    <div class="page-header">
      <h3 class="page-title">List Clients</h3>
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
          <div class="card-body">

            <div class="justify-content-end">
              <a class="nav-link" href="/clients/add">

                <button class="btn btn-gradient-primary me-2">
                  Add Client
                </button>
              </a>
            </div>
            <p class="card-description"></p>
            <div class="table-responsive">
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="clients.length == 0">
                    <td class="text-center" colspan="8">Data Kosong</td>
                  </tr>
                  <tr v-for="(client, index) in clients" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ client.name }}</td>
                    <td>{{ client.token }}</td>
                    <td>{{ client.liveness_range }}</td>
                    <td>{{ client.liveness_threshold }}</td>
                    <td>{{ momentFormat(client.created_at) }}</td>
                    <td>{{ momentFormat(client.updated_at) }}</td>
                    <td>
                      <div class="d-flex align-items-center list-user-action justify-content-end">
                        <nuxt-link :to="'/clients/update?id=' + client.id" class="text-primary">
                          <i class="mdi mdi-table-edit"></i>
                        </nuxt-link>
                        <button @click="deleteClient(client.id)" class="btn text-primary">
                          <i class="mdi mdi-delete"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
import Swal from 'sweetalert2';
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

      const confirmation = await Swal.fire({
        title: 'Apa anda yakin?',
        text: 'Apa anda yakin ingin menghapus data?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya!',
        cancelButtonText: 'Tidak, batalkan!',
      });

      if (confirmation.isConfirmed) {
        Swal.fire({
          title: 'Loading...',
          text: 'Menghapus data, mohon ditunggu!',
        });
        Swal.showLoading();

        try {
          const { data: dataClient, error, refresh, pending } = await useFetch(`/delete-clients/${id}`, {
            headers: {
              Authorization: `Bearer ${runTimeConfig.public.appSecret}`,
            },
            baseURL: runTimeConfig.public.baseUrl,
            method: "delete",
          });

          Swal.close();

          if (error) {
            throw error;
          }

          Swal.fire({
            title: 'Success!',
            text: 'Client deleted successfully!',
            icon: 'success',
          });

          this.clients = dataClient.value.data.data;
          console.log(this.clients);
          this.getData();
        } catch (error) {
          let errorMessage = 'An error occurred.';

          if (error.response && error.response.data) {
            const responseData = error.response.data;
            if (responseData.message) {
              errorMessage = responseData.message;
            }
            if (responseData.errors) {
              errorMessage += '\n\nDetails:\n';
              for (const [field, messages] of Object.entries(responseData.errors)) {
                errorMessage += `${field}: ${messages.join(', ')}\n`;
              }
            }
          }

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
          });
        }
      } else {
        Swal.fire({
          title: 'Cancelled',
          text: 'Client deletion was cancelled.',
          icon: 'info',
        });
      }
    }



  },
  mounted() {
    this.getData();
  },

};
</script>
