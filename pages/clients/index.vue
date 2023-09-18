<template>
  <div class="content-wrapper">
    <div class="page-header">
      <h3 class="page-title">Clients</h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/clients">Dashboard</a></li>
          <li class="breadcrumb-item active" aria-current="page">List Clients</li>
        </ol>
      </nav>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">List Clients</h4>
            <p class="card-description"></p>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Token</th>
                  <th>Liveness Range</th>
                  <th>Liveness Threshold</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="client in clients.data.data" :key="client.id">
                  <td>{{ client.id }}</td>
                  <td>{{ client.name }}</td>
                  <td>{{ client.token }}</td>
                  <td>{{ client.liveness_range }}</td>
                  <td>{{ client.liveness_threshold }}</td>
                  <td>{{ client.created_at }}</td>
                  <td>{{ client.updated_at }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from '~/services/axios'; // Import the Axios instance you created


const runTimeConfig = useRuntimeConfig();

const {
  data: clients,
  error,
  refresh,
  pending,
} = useFetch('/clients', {
  headers: {
    Authorization: `Bearer ${runTimeConfig.public.appSecret}`,
  },
  baseURL: runTimeConfig.public.baseUrl,
});
</script>




