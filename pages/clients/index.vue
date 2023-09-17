<template>
  <div class="content-wrapper">
    <div class="page-header">
      <h3 class="page-title">Clients</h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Tables</a></li>
          <li class="breadcrumb-item active" aria-current="page">
            Basic tables
          </li>
        </ol>
      </nav>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Striped Table</h4>
            <p class="card-description">
              Add class <code>.table-striped</code>
            </p>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First name</th>
                  <th>Progress</th>
                  <th>Amount</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in data" :key="index">
                  <td>
                    {{ item.id }}
                  </td>
                  <td>{{ item.nama }}</td>
                  <td>
                    <div class="progress">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style="width: 25%"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </td>
                  <td>$ 77.99</td>
                  <td>May 15, 2015</td>
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
export default {
  data() {
    return {
      data: [],
    };
  },
  methods: {
    async getData() {
      const token = useCookie("token");
      const response = await useFetch(
        "https://lsp-micro-spoofout-dashboard-api.btqclk.easypanel.host/api/clients",
        {
          method: "get",
          headers: [{ "Content-Type": "application/json" }, {'Authorization': 'Bearer '+token}],
        }
      );
      console.log(response);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
