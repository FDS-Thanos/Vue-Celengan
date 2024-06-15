<template>
  <v-card>
    <v-card-title>Filter History</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="fetchHistoryData">
        <v-row>
          <v-col cols="12" sm="6">
            <div class="custom-datepicker">
              <label for="tanggalMulai">Tanggal Mulai:</label>
              <input
                type="date"
                id="tanggalMulai"
                v-model="tanggalMulai"
                placeholder="YYYY-MM-DD"
                pattern="\d{4}-\d{2}-\d{2}"
              />
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="custom-datepicker">
              <label for="tanggalAkhir">Tanggal Akhir:</label>
              <input
                type="date"
                id="tanggalAkhir"
                v-model="tanggalAkhir"
                placeholder="YYYY-MM-DD"
                pattern="\d{4}-\d{2}-\d{2}"
              />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn type="submit" color="primary">Filter</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>

  <v-card>
    <v-card-title>Hasil Filter History</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="data.items"
        :items-per-page="5"
        class="elevation-1"
      >
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref, inject, reactive } from "vue";

export default {
  setup() {
    const myAxios = inject("myAxios");

    const tanggalMulai = ref(null);
    const tanggalAkhir = ref(null);
    const data = reactive({
      items: [],
    });
    const headers = [
      { text: "ID", align: "start", sortable: false, value: "Id" },
      { text: "Account ID", value: "AccountId" },
      { text: "Bank ID", value: "BanTransactionReferencek_id" },
      { text: "Amount", value: "TransactionAmount" },
      { text: "Transaction Date", value: "TransactionDate" },
    ];

    const fetchHistoryData = async () => {
      try {
        const response = await myAxios.get("/transaction/transaction-history");
        data.items = response.data; // Asumsikan data yang diterima adalah array objek
        console.log(data.items);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data history:", error);
      }
    };

    // Panggil fetchHistoryData saat komponen di-mount
    fetchHistoryData();

    return {
      tanggalMulai,
      tanggalAkhir,
      data,
      headers,
      fetchHistoryData,
    };
  },
};
</script>

<style scoped>
.custom-datepicker {
  margin-bottom: 20px;
}

.custom-datepicker label {
  display: block;
  margin-bottom: 8px;
}

.custom-datepicker input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
