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
          <div class="card-body">
            <h4 class="card-title">List Clients</h4>
            <p class="card-description">
            </p>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Progress</th>
                  <th>Liveness Range</th>
                  <th>Liveness Thresehold</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in data" :key="index">
                  <td>
                    {{ item.id }}
                  </td>
                  <td>{{ item.nama }}</td>
                  <td>
                      {{ item.token }}
                  </td>
                  <td>{{item.liveness_range}}/td>
                  <td>{{item.liveness_thresehold}}</td>
                  <td>{{item.created_at}}</td>
                  <td>{{item.updated_at}}</td>
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
import axios from '~/services/axios'; // Import the Axios instance you created

export default {
  data() {
    return {
      clients: [],
    };
  },
  async asyncData() {
    try {
      const response = await axios.get('/api/clients'); // Replace with your API endpoint
      return {
        clients: response.data.data, // Assuming your API response structure is { "data": [...] }
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        clients: [],
      };
    }
  },
};
</script>
// export default {
//   data() {
//     return {
//       data: [],
//     };
//   },
//   methods: {
//     async getData() {
//       const token = useCookie("token");
//       const response = await useFetch(
//         "https://lsp-micro-spoofout-dashboard-api.btqclk.easypanel.host/api/clients",
//         {
//           method: "get",
//           headers: [{ "Content-Type": "application/json" }, {'Authorization': 'Bearer '+token}],
//         }
//       );
//       console.log(response);
//     },
//   },
//   mounted() {
//     this.getData();
//   },
// };
// </script>
